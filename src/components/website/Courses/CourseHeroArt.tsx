import type { CourseHero } from "./courseHero";
import CourseHeroPerson from "./CourseHeroPerson";
import styles from "./CourseHeroArt.module.css";

// Everything (backdrop and person) is drawn in one 304×308 frame, so it stays lined up at every size.
type Box = { x: number; y: number; width: number; height: number; rx: number };
type Geometry = {
  small: Box;
  big: Box;
  tall: Box;
  dots: [number, number, number][];
  plus: string; // transform for the plus doodle (drawn around 38.5, 32.5)
  arrow: string; // transform for the looping arrow (drawn around 250, 14)
  spiral: string; // transform for the spiral (drawn around 30, 286)
};

// Layout A: big block behind the head and shoulder; B is A mirrored; C has a round block behind the head.
// The green blocks are sized so brand green is about 30% of the backdrop left visible around the person.
const LAYOUT_A: Geometry = {
  small: { x: 18, y: 138, width: 76, height: 84, rx: 24 },
  big: { x: 138, y: 32, width: 140, height: 140, rx: 32 },
  tall: { x: 206, y: 184, width: 64, height: 112, rx: 32 },
  dots: [
    [150, 14, 4], [195, 14, 4], [240, 14, 4],
    [292, 64, 7], [292, 106, 7], [292, 148, 7], [292, 190, 4],
    [100, 102, 5], [56, 102, 9], [56, 60, 5],
  ],
  plus: "",
  arrow: "translate(22 8)",
  spiral: "",
};

const LAYOUT_C: Geometry = {
  small: { x: 14, y: 176, width: 62, height: 104, rx: 31 },
  big: { x: 58, y: 16, width: 188, height: 188, rx: 94 },
  tall: { x: 234, y: 170, width: 58, height: 122, rx: 29 },
  dots: [
    [32, 66, 9], [32, 108, 9], [32, 150, 5],
    [276, 40, 5], [276, 82, 9], [276, 124, 9],
  ],
  plus: "translate(238 219)",
  arrow: "translate(-218 12)",
  spiral: "translate(240 0)",
};

const BRAND_GREEN = "#0eb47e";
const BRAND_GREEN_DEEP = "#064e37";

const PLUS = "M34 32.5H43M38.5 28V37";
const ARROW = "M243.5 17.5C244 10.5 252 7.5 257 10.5C260 12.5 260.5 16.5 258.5 19M243.5 17.5L241.5 13.5M243.5 17.5L247.5 15.5";
const SPIRAL = "M31 286c0-1.6 2.2-1.8 2.6-.3.5 2-2 3.6-4 2.6-2.6-1.2-2.3-5.2.6-6.2 3.6-1.3 7.2 1.3 6.8 5-.3 2.6-2 4.4-4.4 5.2 3 .4 5.6-.2 7.6-1.8";

export default function CourseHeroArt({ hero, alt, className }: { hero: CourseHero; alt: string; className?: string }) {
  const { palette, layout } = hero;
  const geometry = layout === "C" ? LAYOUT_C : LAYOUT_A;

  return (
    <div className={className}>
      <svg className={styles.decor} viewBox="0 0 304 308" role="img" aria-label={alt}>
        <rect width="304" height="308" rx="16" fill={palette.panel} />
        <g transform={layout === "B" ? "matrix(-1 0 0 1 304 0)" : undefined}>
          <g fill={palette.dot}>
            {geometry.dots.map(([cx, cy, r]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />)}
          </g>
          <rect {...geometry.small} fill={palette.soft} />
          <rect {...geometry.big} fill={BRAND_GREEN} />
          <rect {...geometry.tall} fill={BRAND_GREEN_DEEP} />
          <g fill="none" stroke={palette.accent} strokeLinecap="round" strokeLinejoin="round">
            <path d={PLUS} transform={geometry.plus || undefined} strokeWidth="1.8" />
            <path d={ARROW} transform={geometry.arrow || undefined} strokeWidth="1.4" />
            <path d={SPIRAL} transform={geometry.spiral || undefined} strokeWidth="1.4" />
          </g>
        </g>
        {hero.photo ? (
          <image
            href={hero.photo.src}
            x={hero.personX - (hero.photo.size * hero.photo.width) / hero.photo.height / 2}
            y={308 - hero.photo.size}
            width={(hero.photo.size * hero.photo.width) / hero.photo.height}
            height={hero.photo.size}
            preserveAspectRatio="xMidYMax meet"
          />
        ) : (
          <CourseHeroPerson person={hero.person} cx={hero.personX} scale={hero.personScale} />
        )}
      </svg>
    </div>
  );
}
