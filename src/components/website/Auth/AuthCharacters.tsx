"use client";

import { useEffect, useRef } from 'react';
import styles from './AuthCharacters.module.css';

/**
 * idle      – follow the cursor
 * watching  – read along with the field being typed in
 * shy       – look away while a hidden password is typed
 * peek      – password shown: the purple one sneaks a look, the others stay polite
 * happy     – smiling eyes, rosy cheeks and a bounce (Google sign-in, success)
 * sad       – look down, frown and shake (wrong details)
 */
export type CharacterMood = 'idle' | 'watching' | 'shy' | 'peek' | 'happy' | 'sad';

type AuthCharactersProps = {
  mood: CharacterMood;
  /** The field being typed in, so the characters can read along. */
  watchTarget?: HTMLElement | null;
  /** How many characters have been typed in that field. */
  typed?: number;
};

// Drawing space; the characters stand on y = 261.
const VIEW_X = 0;
const VIEW_W = 302;

type Character = { key: 'purple' | 'black' | 'orange' | 'yellow'; eyes: [number, number][]; whites: boolean; lean: number };

const CHARACTERS: Character[] = [
  { key: 'purple', eyes: [[75, 41], [108, 41]], whites: true, lean: 7 },
  { key: 'black', eyes: [[165, 89], [189, 89]], whites: true, lean: 6 },
  { key: 'orange', eyes: [[66, 186], [93, 186]], whites: false, lean: 3 },
  { key: 'yellow', eyes: [[226, 137], [250, 137]], whites: false, lean: 5 },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function AuthCharacters({ mood, watchTarget = null, typed = 0 }: AuthCharactersProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const frame = useRef(0);
  const latest = useRef({ mood, watchTarget, typed });
  const scheduleUpdate = useRef<(() => void) | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const update = () => {
      frame.current = 0;
      const svg = svgRef.current;
      if (!svg) return;
      const part = (name: string) => svg.querySelector<SVGElement>(`[data-part="${name}"]`);
      const rect = svg.getBoundingClientRect();
      const scale = rect.width / VIEW_W;
      const toScreen = (x: number, y: number) => [rect.left + (x - VIEW_X) * scale, rect.top + y * scale];
      const { mood: currentMood, watchTarget: target, typed: typedCount } = latest.current;

      const lookAway = [rect.left - 500, rect.top - 300];
      const lookDown = [rect.left + rect.width / 2, rect.bottom + 600];
      let watchPoint: number[] | null = null;
      if (target) {
        const field = target.getBoundingClientRect();
        watchPoint = [field.left + 16 + Math.min(field.width - 32, typedCount * 7.5), field.top + field.height / 2];
      }
      // Without a mouse (phones) they look toward the form.
      const resting = pointer.current ? [pointer.current.x, pointer.current.y] : [rect.right + 320, rect.top + rect.height * 0.35];

      for (const character of CHARACTERS) {
        let point = resting;
        if (currentMood === 'watching' && watchPoint) point = watchPoint;
        else if (currentMood === 'shy') point = lookAway;
        else if (currentMood === 'peek') point = character.key === 'purple' && watchPoint ? watchPoint : lookAway;
        else if (currentMood === 'sad') point = lookDown;

        const faceX = (character.eyes[0][0] + character.eyes[1][0]) / 2;
        const faceY = character.eyes[0][1];
        const [screenX, screenY] = toScreen(faceX, faceY);
        const dx = point[0] - screenX;
        const dy = point[1] - screenY;
        const distance = Math.max(Math.hypot(dx, dy), 1);
        const strength = Math.min(1, distance / 260);
        const nx = (dx / distance) * strength;
        const ny = (dy / distance) * strength;

        const peeking = currentMood === 'peek' && character.key === 'purple';
        const lean = reduceMotion ? 0 : peeking ? -11 : clamp(-nx * character.lean, -character.lean, character.lean);
        const body = part(`body-${character.key}`);
        if (body) body.style.transform = `skewX(${lean.toFixed(2)}deg)`;

        const face = part(`face-${character.key}`);
        if (face) face.style.transform = reduceMotion ? '' : `translate(${(nx * 7).toFixed(2)}px, ${(ny * 4.5).toFixed(2)}px)`;

        if (character.whites) {
          for (const index of [0, 1]) {
            const pupil = part(`pupil-${character.key}${index}`);
            if (pupil) pupil.style.transform = `translate(${(nx * 2.8).toFixed(2)}px, ${(ny * 2.6).toFixed(2)}px)`;
          }
        }
      }
    };

    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };
    scheduleUpdate.current = schedule;
    const onPointerMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      schedule();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      scheduleUpdate.current = null;
    };
  }, []);

  // New mood or typing: refresh where everyone is looking.
  useEffect(() => {
    latest.current = { mood, watchTarget, typed };
    scheduleUpdate.current?.();
  }, [mood, watchTarget, typed]);

  const happyEye = ([x, y]: [number, number], color: string, key: string) =>
    <path key={key} d={`M${x - 5} ${y + 2}Q${x} ${y - 5} ${x + 5} ${y + 2}`} stroke={color} />;

  return (
    <svg ref={svgRef} className={`${styles.characters} ${styles[mood] ?? ''}`} viewBox={`${VIEW_X} 0 ${VIEW_W} 262`} aria-hidden="true" focusable="false">
      {/* Purple – tall and curious */}
      <g className={`${styles.bouncer} ${styles.purple}`}>
        <g data-part="body-purple" className={styles.body}>
          <path d="M48 261V16a6 6 0 0 1 6-6h100a6 6 0 0 1 6 6v245Z" fill="#6c3bef" />
          <g data-part="face-purple" className={styles.face}>
            <g className={`${styles.eyesOpen} ${styles.blinkSlow}`}>
              {CHARACTERS[0].eyes.map(([x, y], index) => <g key={index}>
                <circle cx={x} cy={y} r="6.5" fill="#fff" />
                <circle data-part={`pupil-purple${index}`} cx={x} cy={y} r="3.2" fill="#1d1d1f" />
              </g>)}
            </g>
            <g className={styles.eyesHappy} fill="none" strokeWidth="2.6" strokeLinecap="round">
              {CHARACTERS[0].eyes.map((eye, index) => happyEye(eye, '#fff', `h${index}`))}
            </g>
            <ellipse className={styles.blush} cx="66" cy="54" rx="7" ry="3.5" />
            <ellipse className={styles.blush} cx="117" cy="54" rx="7" ry="3.5" />
            <path className={styles.mouthSmile} d="M82 55Q91.5 64 101 55" stroke="#fff" />
            <path className={styles.mouthSad} d="M83 61Q91.5 54 100 61" stroke="#fff" />
          </g>
        </g>
      </g>

      {/* Black – calm and steady */}
      <g className={`${styles.bouncer} ${styles.black}`}>
        <g data-part="body-black" className={styles.body}>
          <path d="M152 261V73a6 6 0 0 1 6-6h63a6 6 0 0 1 6 6v188Z" fill="#2b2b2d" />
          <g data-part="face-black" className={styles.face}>
            <g className={`${styles.eyesOpen} ${styles.blinkMid}`}>
              {CHARACTERS[1].eyes.map(([x, y], index) => <g key={index}>
                <circle cx={x} cy={y} r="6" fill="#fff" />
                <circle data-part={`pupil-black${index}`} cx={x} cy={y} r="3" fill="#1d1d1f" />
              </g>)}
            </g>
            <g className={styles.eyesHappy} fill="none" strokeWidth="2.4" strokeLinecap="round">
              {CHARACTERS[1].eyes.map((eye, index) => happyEye(eye, '#fff', `h${index}`))}
            </g>
            <path className={styles.mouthSmile} d="M169 101Q177 108 185 101" stroke="#fff" />
            <path className={styles.mouthSad} d="M170 105Q177 99 184 105" stroke="#fff" />
          </g>
        </g>
      </g>

      {/* Orange – soft and round */}
      <g className={`${styles.bouncer} ${styles.orange}`}>
        <g data-part="body-orange" className={styles.body}>
          <path d="M10 261A91 125 0 0 1 192 261Z" fill="#f2996b" />
          <g data-part="face-orange" className={styles.face}>
            <g className={`${styles.eyesOpen} ${styles.blinkFast}`} fill="#2b2b2d">
              {CHARACTERS[2].eyes.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="4" />)}
            </g>
            <g className={styles.eyesHappy} fill="none" strokeWidth="2.6" strokeLinecap="round">
              {CHARACTERS[2].eyes.map((eye, index) => happyEye(eye, '#2b2b2d', `h${index}`))}
            </g>
            <ellipse className={styles.blush} cx="53" cy="198" rx="8" ry="4" />
            <ellipse className={styles.blush} cx="106" cy="198" rx="8" ry="4" />
            <path className={styles.mouthSmile} d="M70 199Q79.5 210 89 199" stroke="#2b2b2d" />
            <path className={styles.mouthSad} d="M71 205Q79.5 198 88 205" stroke="#2b2b2d" />
          </g>
        </g>
      </g>

      {/* Yellow – the one with the straight face */}
      <g className={`${styles.bouncer} ${styles.yellow}`}>
        <g data-part="body-yellow" className={styles.body}>
          <path d="M198 261V164a47 47 0 0 1 94 0v97Z" fill="#e8d56a" />
          <g data-part="face-yellow" className={styles.face}>
            <g className={`${styles.eyesOpen} ${styles.blinkMid}`} fill="#2b2b2d">
              {CHARACTERS[3].eyes.map(([x, y], index) => <circle key={index} cx={x} cy={y} r="3.5" />)}
            </g>
            <g className={styles.eyesHappy} fill="none" strokeWidth="2.4" strokeLinecap="round">
              {CHARACTERS[3].eyes.map((eye, index) => happyEye(eye, '#2b2b2d', `h${index}`))}
            </g>
            <ellipse className={styles.blush} cx="215" cy="152" rx="6.5" ry="3.5" />
            <ellipse className={styles.blush} cx="261" cy="152" rx="6.5" ry="3.5" />
            <path className={styles.mouthFlat} d="M218 167H267" stroke="#2b2b2d" />
            <path className={styles.mouthSmile} d="M222 163Q242.5 180 263 163" stroke="#2b2b2d" />
            <path className={styles.mouthSad} d="M225 172Q242.5 162 260 172" stroke="#2b2b2d" />
          </g>
        </g>
      </g>
    </svg>
  );
}
