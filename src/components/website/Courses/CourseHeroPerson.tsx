import type { ReactNode } from "react";

// Illustrated person for the course hero, drawn in a 220x280 box (head at the top, cut at the waist)
// and placed inside the 304x308 hero frame. Real-life proportions with soft painted shading (light from
// the upper left), so the people read as real humans while staying plain SVG: sharp at any size, no image files.

export type HeroPerson = {
  skin: string;
  hair: "short" | "side" | "curly" | "long" | "bun" | "ponytail";
  hairColor?: string;
  outfit: "sweatshirt" | "top" | "blazer";
  /** Main outfit colour (matched to the backdrop's accent). */
  color: string;
  pose: "point" | "tablet" | "books" | "crossed" | "thumbsUp" | "wave";
  mouth?: "smile" | "open";
  glasses?: boolean;
  beard?: boolean;
  /** Tie colour (blazer only). */
  tie?: string;
  /** Colour of the top under a blazer. */
  shirt?: string;
  /** Notebook cover colour for the books pose. */
  prop?: string;
};

type Point = [x: number, y: number, width: number];

const INK = "#1c1311";
const HAIR = "#241814";

// Mix two #rrggbb colours (t = share of b).
function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (shift: number) => Math.round(((pa >> shift) & 255) * (1 - t) + ((pb >> shift) & 255) * t);
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}

const fmt = (n: number) => Math.round(n * 10) / 10;

// Smooth curve through points (Catmull-Rom as cubic Béziers), without the initial M.
function through(points: number[][]) {
  let d = "";
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)], p1 = points[i], p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${fmt(c1[0])} ${fmt(c1[1])} ${fmt(c2[0])} ${fmt(c2[1])} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return d;
}

// Closed smooth outline through points.
function closed(points: number[][]) {
  const n = points.length;
  let d = `M${fmt(points[0][0])} ${fmt(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n], p1 = points[i], p2 = points[(i + 1) % n], p3 = points[(i + 2) % n];
    d += `C${fmt(p1[0] + (p2[0] - p0[0]) / 6)} ${fmt(p1[1] + (p2[1] - p0[1]) / 6)} ${fmt(p2[0] - (p3[0] - p1[0]) / 6)} ${fmt(p2[1] - (p3[1] - p1[1]) / 6)} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return `${d}Z`;
}

// Outline of a tapered limb along a centre line, with round ends.
function limb(points: Point[]) {
  const normals = points.map((_, i) => {
    const a = points[Math.max(0, i - 1)], b = points[Math.min(points.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len];
  });
  const left = points.map(([x, y, w], i) => [x + (normals[i][0] * w) / 2, y + (normals[i][1] * w) / 2]);
  const right = points.map(([x, y, w], i) => [x - (normals[i][0] * w) / 2, y - (normals[i][1] * w) / 2]).reverse();
  const endR = points[points.length - 1][2] / 2, startR = points[0][2] / 2;
  return `M${fmt(left[0][0])} ${fmt(left[0][1])}${through(left)}A${fmt(endR)} ${fmt(endR)} 0 0 0 ${fmt(right[0][0])} ${fmt(right[0][1])}${through(right)}A${fmt(startR)} ${fmt(startR)} 0 0 0 ${fmt(left[0][0])} ${fmt(left[0][1])}Z`;
}

// Small deterministic random generator (for hair texture), so server and client render the same.
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

const MIRROR = "matrix(-1 0 0 1 220 0)";

function colours(person: HeroPerson, feminine: boolean) {
  const { skin, color } = person;
  const hair = person.hairColor ?? HAIR;
  return {
    skin,
    skinLight: mix(skin, "#fff2e8", 0.22),
    skinShade: mix(skin, "#5a2416", 0.26),
    skinDeep: mix(skin, "#2c0f08", 0.5),
    line: mix(skin, "#4a1c10", 0.4),
    nail: mix(skin, "#f7dcd4", 0.5),
    blush: "#d8604c",
    lip: feminine ? mix(skin, "#a8364c", 0.55) : mix(skin, "#8c3934", 0.3),
    hair,
    hairDark: mix(hair, "#000000", 0.5),
    hairLight: mix(hair, "#a88470", 0.42),
    cloth: color,
    clothLight: mix(color, "#ffffff", 0.16),
    clothShade: mix(color, "#000000", 0.2),
    clothDeep: mix(color, "#000000", 0.42),
    shirt: person.shirt ?? "#f6f5f1",
  };
}

type Kit = { id: string; f: boolean; person: HeroPerson; c: ReturnType<typeof colours> };
const url = (k: Kit, name: string) => `url(#${k.id}-${name})`;

// ---------------------------------------------------------------- head geometry

// Right half of the face outline, from the top of the skull to the chin (mirrored for the left).
const FACE_F = [[110, 31], [124, 33], [134.5, 41], [139.2, 54], [140.6, 68], [140, 82], [137.4, 95], [132.4, 106], [125, 114.5], [117, 119.5], [110, 121]];
const FACE_M = [[110, 30], [125, 32], [137, 40], [142, 54], [143.5, 68], [143.5, 83], [141.5, 97], [137, 108], [129, 116], [119, 120.5], [110, 121.5]];
const facePath = (half: number[][]) => closed([...half, ...half.slice(1, -1).reverse().map(([x, y]) => [220 - x, y])]);

const neckPath = (nw: number) =>
  `M${110 - nw} 96V128C${110 - nw} 134 ${110 - nw - 5} 138 ${110 - nw - 13} 141H${110 + nw + 13}C${110 + nw + 5} 138 ${110 + nw} 134 ${110 + nw} 128V96Z`;

const TRUNK_F = "M94 133C84 138 72 140 61 142.5C48 145.5 39.5 153 38 168L40 200L54 300H166L180 200L182 168C180.5 153 172 145.5 159 142.5C148 140 136 138 126 133Z";
const TRUNK_M = "M91 133C80 138 65 140 53 142.5C38 146 30 154 29 170L31 202L46 300H174L189 202L191 170C190 154 182 146 167 142.5C155 140 140 138 129 133Z";

// ---------------------------------------------------------------- hair

type HairShapes = { back?: ReactNode; mid?: ReactNode; front: string; detail?: ReactNode; locks?: ReactNode };

const CAP = "M78 82C75.5 70 75 59 77 49.5C80 34 93 24 110 24C127 24 140 34 143 49.5C145 59 144.5 70 142 82C141 74 139.6 66 136.5 60C132 52 122 46 110 45.5C98 46 88 52 83.5 60C80.4 66 79 74 78 82Z";
const LONG_LEFT = "M110 27C96 26 84 31 78 42C72 54 71 70 72 88C73 110 72 132 70 152C68 168 66 182 68 196C74 200 80 200 86 196C84 182 85 166 86 150C87 132 86 112 84 96C83 84 82.5 72 85 62C88 52 96 44 106 37C108 34 109.5 31 110 27Z";

// Short men's cuts: the sides are faded, so the skin shows through towards the ears.
function fade(k: Kit) {
  return (
    <g clipPath={url(k, "hairClip")}>
      <rect x={70} y={54} width={16} height={31} fill={url(k, "fade")} />
      <rect x={134} y={54} width={16} height={31} fill={url(k, "fade")} />
    </g>
  );
}

function strands(k: Kit, paths: string[], width = 0.9) {
  return paths.map((d, i) => (
    <path key={d} d={d} stroke={i % 2 ? k.c.hairDark : k.c.hairLight} strokeWidth={width} opacity={i % 2 ? 0.55 : 0.4} fill="none" strokeLinecap="round" />
  ));
}

function sheen(k: Kit, d: string, width = 4, opacity = 0.55) {
  return <path d={d} stroke={k.c.hairLight} strokeWidth={width} opacity={opacity} fill="none" strokeLinecap="round" filter={url(k, "blur2")} />;
}

function curlyShapes() {
  const rnd = random(7);
  const bumps = Array.from({ length: 17 }, (_, i) => {
    const a = Math.PI * (1.03 + (i * 0.94) / 16) + (rnd() - 0.5) * 0.08;
    const r = 32 + (rnd() - 0.5) * 3;
    return [110 + r * Math.cos(a), 48 + r * Math.sin(a), 5 + rnd() * 3.2] as const;
  });
  const curls: (readonly [number, number, number])[] = [];
  for (let row = 0; row < 9; row++) {
    for (let x = 74 + (row % 2) * 2.6; x < 147; x += 5.2) {
      const cx = x + (rnd() - 0.5) * 2, cy = 13 + row * 4.6 + (rnd() - 0.5) * 2;
      if (((cx - 110) / 35) ** 2 + ((cy - 50) / 37) ** 2 < 1) curls.push([cx, cy, (rnd() - 0.5) * 60] as const);
    }
  }
  return { bumps, curls };
}

function hairShapes(k: Kit): HairShapes {
  const { c } = k;
  switch (k.person.hair) {
    case "short":
      return {
        front: "M77.2 84C76.4 72 75.6 62 75.8 52C77 33 92 21 111 21C130 21 143.5 33 144.2 52C144.4 62 143.6 72 142.8 84L139.6 78C139.7 74 139.6 66 138.4 61C136.5 58 135 55 133.6 53C128 50 120 49 110 49.4C100 49 92 50 86.4 53C85 55 83.5 58 81.6 61C80.5 66 80.4 72 80.4 78L77.2 84Z",
        detail: (
          <>
            {fade(k)}
            {sheen(k, "M90 31C98 25 112 23 124 26")}
            {strands(k, ["M110 23C99 25 89 32 84 44", "M113 23C104 27 96 35 93 47", "M116 23C123 27 131 35 135 46", "M119 24C127 28 136 37 140 50", "M106 24C100 30 98 39 99 48", "M118 25C116 32 116 40 118 48", "M100 26C93 31 87 39 83 50", "M125 26C131 31 137 40 139 55"], 0.8)}
          </>
        ),
      };
    case "side":
      return {
        front: "M77.2 84C76.4 72 75.4 62 75.6 51C77 32 92 19.5 112 19.5C131.5 19.5 144 32 144.6 51C144.8 62 143.8 72 142.8 84L139.6 78C139.7 74 139.4 67 138 62C136 57 131 54 124 53C116 52 106 50.5 99 47.5C96 50 92 51.5 87 53.5C85 56 83.4 58.6 81.6 61.6C80.5 66 80.4 72 80.4 78L77.2 84Z",
        detail: (
          <>
            {fade(k)}
            {sheen(k, "M101 27C112 22.5 127 23.5 135 31")}
            {strands(k, ["M97 44C104 34 118 30 132 36C138 40 141 46 142 52", "M98 45.5C108 39 122 39 134 49", "M99 47C110 45 124 47 135.5 58", "M96 44C102 30 116 23 130 26", "M95 44C90 46 85 51 81.5 58", "M94 42C89 41 84 44 80 50", "M100 48C112 49 126 53 136 62"], 0.85)}
            <path d="M96 46C95 38 96 31 99 24" stroke={c.hairDark} strokeWidth={1.2} opacity={0.7} fill="none" strokeLinecap="round" />
          </>
        ),
      };
    case "curly": {
      const { bumps, curls } = curlyShapes();
      return {
        front: "M77.2 84C76.4 72 75.4 62 75.4 52C75.4 32 90 14 111 14C132 14 145 32 144.8 52C144.8 62 143.8 72 142.8 84L139.6 78C139.7 74 139.4 67 138 62C136 57 133 54 128 52.4C122 51 116 51.4 110 51.6C104 51.4 98 51 92 52.4C88 54 85 57 82 61.6C80.5 66 80.4 72 80.4 78L77.2 84Z",
        mid: bumps.map(([x, y, r]) => <circle key={`${x}`} cx={fmt(x)} cy={fmt(y)} r={fmt(r)} fill={url(k, "hair")} />),
        detail: (
          <g clipPath={url(k, "hairClip")}>
            {curls.map(([x, y, a], i) => (
              <g key={i} transform={`translate(${fmt(x)} ${fmt(y)}) rotate(${Math.round(a)})`} fill="none" strokeLinecap="round" strokeWidth={1.1}>
                <path d="M-2.6 0.6A2.7 2.7 0 0 1 2 -1.8" stroke={c.hairLight} opacity={0.55} />
                <path d="M2.6 -0.2A2.7 2.7 0 0 1 -1.6 2.2" stroke={c.hairDark} opacity={0.7} />
              </g>
            ))}
            {sheen(k, "M92 26C100 20 112 18 124 21", 5, 0.45)}
            <rect x={70} y={54} width={16} height={31} fill={url(k, "fade")} />
            <rect x={134} y={54} width={16} height={31} fill={url(k, "fade")} />
          </g>
        ),
      };
    }
    case "long":
      return {
        back: <path d="M110 24C88 24 72 38 70 62C68 92 69 120 64 150C61 170 60 186 64 198C78 204 142 204 156 198C160 186 159 170 156 150C151 120 152 92 150 62C148 38 132 24 110 24Z" fill={c.hairDark} />,
        front: `${LONG_LEFT.replace(/Z$/, "")}ZM110 27C124 26 136 31 142 42C148 54 149 70 148 88C147 110 148 132 150 152C152 168 154 182 152 196C146 200 140 200 134 196C136 182 135 166 134 150C133 132 134 112 136 96C137 84 137.5 72 135 62C132 52 124 44 114 37C112 34 110.5 31 110 27Z`,
        detail: (
          <>
            {sheen(k, "M88 40C93 34.5 100 31 107 30")}
            {sheen(k, "M132 40C127 34.5 120 31 113 30", 3, 0.35)}
            {sheen(k, "M75.6 62C74.4 74 74.4 86 75 98", 3, 0.4)}
            {strands(k, [
              "M107 31C96 34 86 42 81 56C77 70 77 90 77.5 110C78 130 76 160 72 188",
              "M104 33C94 38 86 48 83 62C80 78 80.5 96 80.5 116C80.5 140 79 166 77 192",
              "M100 32C90 36 81 46 77.5 62C75 76 75 96 75 118C75 140 72 166 69 190",
              "M113 31C124 34 134 42 139 56C143 70 143 90 142.5 110C142 130 144 160 148 188",
              "M116 33C126 38 134 48 137 62C140 78 139.5 96 139.5 116C139.5 140 141 166 143 192",
              "M120 32C130 36 139 46 142.5 62C145 76 145 96 145 118C145 140 148 166 151 190",
            ])}
          </>
        ),
      };
    case "bun":
    case "ponytail": {
      const bun = k.person.hair === "bun";
      return {
        back: bun ? (
          <g>
            <ellipse cx={110} cy={21} rx={16} ry={13} fill={url(k, "hair")} />
            {strands(k, ["M97 22C98 13 110 8 119 12C125 16 123 25 115 26C109 27 106 21 110 18", "M100 27C96 20 101 11 110 10", "M121 28C126 22 124 14 118 11"], 1)}
          </g>
        ) : undefined,
        mid: bun ? undefined : (
          <g>
            <path d="M134 44C150 48 160 66 160 90C160 116 154 140 146 160C143 168 140 174 136 178C137 160 140 140 141 120C142 100 141 84 138 70Z" fill={url(k, "hair")} />
            {strands(k, ["M140 52C152 62 155 84 153 108C151 132 146 152 140 170", "M138 60C146 74 148 96 146 120C145 138 142 154 139 168", "M143 50C155 58 158 80 157 102"], 0.9)}
            <path d="M133 46C139 44 143 47 144 52" stroke={c.hairDark} strokeWidth={4} strokeLinecap="round" fill="none" />
          </g>
        ),
        front: CAP,
        detail: (
          <>
            {sheen(k, "M89 41C95 32 103 28 110 27.5")}
            {sheen(k, "M131 41C125 32 117 28 110 27.5", 3, 0.3)}
            {strands(k, ["M85 60C89 45 99 34 108 29", "M95 50C99 40 104 33 109 29.5", "M110 46V28", "M125 50C121 40 116 33 111 29.5", "M135 60C131 45 121 34 112 29", "M80 72C80 56 88 40 104 30", "M140 72C140 56 132 40 116 30"], 0.85)}
          </>
        ),
      };
    }
  }
}

// ---------------------------------------------------------------- face

function Eye({ k }: { k: Kit }) {
  const { c, f } = k;
  return (
    <g transform="translate(97.5 76) scale(1.1) translate(-97.5 -76)">
      <path d="M90.9 76.2C93.2 72.4 99.8 71.6 104 76.4C101.4 79.2 94.8 79.6 90.9 76.2Z" fill="#f4eee8" />
      <g clipPath={url(k, "eye")}>
        <circle cx={97.6} cy={75.9} r={3.3} fill={url(k, "iris")} />
        <circle cx={97.6} cy={75.9} r={3.3} fill="none" stroke="#140b08" strokeWidth={0.5} opacity={0.7} />
        <circle cx={97.6} cy={75.9} r={1.45} fill="#0b0605" />
        <path d="M90.9 76.2C93.2 72.4 99.8 71.6 104 76.4C99.8 74 93.6 74.2 90.9 76.2Z" fill={c.skinDeep} opacity={0.35} />
      </g>
      <path d="M103.6 76.6C100.4 79 94.6 79.2 91.4 76.8" stroke={c.skinShade} strokeWidth={0.8} opacity={0.6} fill="none" strokeLinecap="round" />
      <path d="M91.6 73.4C94 70 100 69.4 103.4 72.6" stroke={c.skinDeep} strokeWidth={0.8} opacity={0.45} fill="none" strokeLinecap="round" />
      <path d="M90.4 76.6C93 72.1 99.8 71.3 104.3 76.4" stroke={INK} strokeWidth={f ? 1.8 : 1.3} fill="none" strokeLinecap="round" />
      {f && <path d="M91.8 76C90.5 74.9 89.2 74.2 87.5 73.6C88.7 74.9 89.8 76 90.7 77Z" fill={INK} />}
      {f && <path d="M91.6 77C95 79.3 100.4 79.1 103.4 77" stroke={INK} strokeWidth={0.55} opacity={0.35} fill="none" strokeLinecap="round" />}
    </g>
  );
}

function Brow({ k }: { k: Kit }) {
  const d = k.f
    ? "M104.4 68.2C100.5 65.6 94.5 64.8 89.4 68.6C94.6 66.8 100.4 68 104.2 70.8Z"
    : "M104.6 67.4C100.6 65 94.2 64.4 88.4 67.4C88.6 68.6 89 69.2 89.6 69.2C94.8 67.8 100.4 68.4 104.4 71.2Z";
  return <path d={d} fill={k.c.hair === HAIR ? "#2a1b16" : k.c.hairDark} opacity={0.92} />;
}

const MOUTH_OPEN = "M100.4 103.2C104.6 102.6 115.4 102.6 119.6 103.2C117.4 108.6 102.6 108.6 100.4 103.2Z";

function Mouth({ k }: { k: Kit }) {
  const { c, f, person } = k;
  const lipDark = mix(c.lip, "#2a0c0b", 0.28);
  const line = mix(c.lip, "#1a0606", 0.55);
  if (person.mouth === "open") {
    return (
      <g>
        <path d="M102.8 93.8C99.4 96.6 97.8 100.6 98.4 104.6M117.2 93.8C120.6 96.6 122.2 100.6 121.6 104.6" stroke={c.skinShade} strokeWidth={1} opacity={0.5} fill="none" strokeLinecap="round" filter={url(k, "blur1")} />
        <path d="M100.8 104.4C103.4 109.4 116.6 109.4 119.2 104.4C118 111 102 111 100.8 104.4Z" fill={c.lip} />
        <path d={MOUTH_OPEN} fill="#45140f" />
        <g clipPath={url(k, "mouth")}>
          <ellipse cx={110} cy={108.4} rx={5.6} ry={1.8} fill="#a8484f" opacity={0.75} />
          <path d="M101.4 103.3C105.6 103 114.4 103 118.6 103.3L117.8 105.4C113.4 106.3 106.6 106.3 102.2 105.4Z" fill="#efe8de" />
          <path d="M100 102.6H120V104.2H100Z" fill={c.skinDeep} opacity={0.22} />
          <path d="M106.8 103.2V105.8M110 103.1V106.1M113.2 103.2V105.8" stroke="#cfc4b8" strokeWidth={0.4} opacity={0.5} />
        </g>
        <path d="M99 103C102.6 101.2 106.4 100.2 108.4 100.8Q110 101.2 111.6 100.8C113.6 100.2 117.4 101.2 121 103C116 102 104 102 99 103Z" fill={lipDark} />
        <ellipse cx={111} cy={109.4} rx={3.2} ry={0.7} fill="#ffffff" opacity={0.22} />
      </g>
    );
  }
  return (
    <g>
      <path d="M101.6 104.6C104 108.8 116 108.8 118.4 104.6C114.4 105.3 105.6 105.3 101.6 104.6Z" fill={c.lip} />
      <path d={f ? "M100.6 104C103 102.6 105.6 101.2 107.8 101.8Q110 102.4 112.2 101.8C114.4 101.2 117 102.6 119.4 104C115.6 104.6 104.4 104.6 100.6 104Z" : "M101 104C103.4 103 105.8 102.2 107.8 102.6Q110 103 112.2 102.6C114.2 102.2 116.6 103 119 104C115.4 104.5 104.6 104.5 101 104Z"} fill={lipDark} />
      <path d="M99.6 103.2C100.4 103.8 101.2 104.2 102 104.4C106 105.2 114 105.2 118 104.4C118.8 104.2 119.6 103.8 120.4 103.2" stroke={line} strokeWidth={0.9} fill="none" strokeLinecap="round" />
      <ellipse cx={111} cy={106.4} rx={3.6} ry={0.9} fill="#ffffff" opacity={f ? 0.3 : 0.18} filter={url(k, "blur1")} />
      <path d="M99.4 102.4C98.8 103.3 99 104.2 99.7 104.8M120.6 102.4C121.2 103.3 121 104.2 120.3 104.8" stroke={c.skinShade} strokeWidth={0.8} opacity={0.6} fill="none" strokeLinecap="round" />
    </g>
  );
}

function Beard({ k }: { k: Kit }) {
  const { c } = k;
  const rnd = random(11);
  const hairs = Array.from({ length: 90 }, () => {
    const a = Math.PI * (0.05 + rnd() * 0.9), r = 0.55 + rnd() * 0.45;
    return [110 + 31 * r * Math.cos(a), 92 + 30 * r * Math.sin(a)] as const;
  });
  return (
    <g>
      <g filter={url(k, "blur0")}>
        <path d="M77.5 80C77 96 82 110 92 118C98 123 104 125.5 110 125.5C116 125.5 122 123 128 118C138 110 143 96 142.5 80C140 86 138 91 134 95C128 99 124 100 121 103.5C118 108 114 111 110 111C106 111 102 108 99 103.5C96 100 92 99 86 95C82 91 80 86 77.5 80Z" fill={c.hair} opacity={0.94} />
        <path d="M99.4 102.6C102 99 107 98.2 110 99.4C113 98.2 118 99 120.6 102.6C117 101.4 113 101.2 110 102C107 101.2 103 101.4 99.4 102.6Z" fill={c.hair} />
      </g>
      <g clipPath={url(k, "faceClip")}>
        {hairs.map(([x, y], i) => (
          <path key={i} d={`M${fmt(x)} ${fmt(y)}l${fmt((x - 110) * 0.04)} 2.2`} stroke={i % 2 ? c.hairLight : c.hairDark} strokeWidth={0.6} opacity={0.45} strokeLinecap="round" />
        ))}
      </g>
    </g>
  );
}

function Glasses({ k }: { k: Kit }) {
  const frame = "#2a2120";
  return (
    <g>
      <g opacity={0.25} filter={url(k, "blur1")} transform="translate(0.8 2.2)">
        <rect x={88.4} y={69.6} width={18.6} height={13.4} rx={4.6} fill="none" stroke={k.c.skinDeep} strokeWidth={1.4} />
        <rect x={113} y={69.6} width={18.6} height={13.4} rx={4.6} fill="none" stroke={k.c.skinDeep} strokeWidth={1.4} />
      </g>
      <g stroke={frame} strokeWidth={1.4} fill="#ffffff" fillOpacity={0.1}>
        <rect x={88.4} y={69.6} width={18.6} height={13.4} rx={4.6} />
        <rect x={113} y={69.6} width={18.6} height={13.4} rx={4.6} />
        <path d="M107 74.6Q110 72.4 113 74.6M88.4 73.4L79 72M131.6 73.4L141 72" fill="none" strokeLinecap="round" />
      </g>
      <path d="M91 80.5L97.5 71.5M115.6 80.5L122.1 71.5" stroke="#ffffff" strokeWidth={1.2} opacity={0.35} strokeLinecap="round" />
    </g>
  );
}

function Ears({ k }: { k: Kit }) {
  const { c, f } = k;
  const dx = f ? 0 : 2;
  const ear = (
    <g transform={`translate(${dx} 0)`}>
      <path d="M140 73C144.5 69 150 70.5 150.5 77.5C151 85 148.5 93 143.5 97.5C141.5 99.2 140 98 140 96Z" fill={c.skin} />
      <ellipse cx={144.6} cy={84} rx={2.2} ry={4.6} fill={c.skinShade} opacity={0.55} filter={url(k, "blur1")} />
      <path d="M143 76.4C146 75 147.6 79 146.6 84C146 88 144.6 90.6 143.6 92.6" stroke={c.line} strokeWidth={1} opacity={0.55} fill="none" strokeLinecap="round" />
    </g>
  );
  const hoops = (k.person.hair === "bun" || k.person.hair === "ponytail") && (
    <>
      <circle cx={146.4} cy={99.6} r={2.6} fill="none" stroke="#d6a84a" strokeWidth={1.1} />
      <circle cx={73.6} cy={99.6} r={2.6} fill="none" stroke="#d6a84a" strokeWidth={1.1} />
    </>
  );
  return (
    <g>
      {ear}
      <g transform={MIRROR}>{ear}</g>
      {/* the right ear sits on the shadow side */}
      <path d="M140 73C144.5 69 150 70.5 150.5 77.5C151 85 148.5 93 143.5 97.5C141.5 99.2 140 98 140 96Z" fill={c.skinShade} opacity={0.3} transform={`translate(${dx} 0)`} />
      {hoops}
    </g>
  );
}

function Face({ k, hairFront }: { k: Kit; hairFront: string }) {
  const { c, f, person } = k;
  const hi = mix(c.skin, "#ffffff", 0.55);
  return (
    <g>
      <path d={facePath(f ? FACE_F : FACE_M)} fill={url(k, "face")} />
      <g clipPath={url(k, "faceClip")}>
        {/* form shadow on the far side, under the brow, around the nose and under the lip */}
        <path d="M128 28C152 52 152 100 124 130H164V28Z" fill={c.skinShade} opacity={0.6} filter={url(k, "blur4")} />
        <ellipse cx={97.5} cy={75} rx={9.5} ry={5.4} fill={c.skinShade} opacity={0.4} filter={url(k, "blur2")} />
        <ellipse cx={122.5} cy={75} rx={9.5} ry={5.4} fill={c.skinShade} opacity={0.45} filter={url(k, "blur2")} />
        <path d="M112.6 74C114 80 115.6 87 116.2 92.4C114.4 93.6 112.6 93 112 91Z" fill={c.skinShade} opacity={0.7} filter={url(k, "blur1")} />
        <ellipse cx={110.5} cy={98} rx={6.5} ry={1.7} fill={c.skinShade} opacity={0.55} filter={url(k, "blur1")} />
        <ellipse cx={110.5} cy={110.4} rx={6.5} ry={1.9} fill={c.skinShade} opacity={0.5} filter={url(k, "blur1")} />
        <path d="M84 104C92 118 128 118 136 104V128H84Z" fill={c.skinShade} opacity={0.35} filter={url(k, "blur4")} />
        <ellipse cx={92.5} cy={91} rx={8} ry={5.5} fill={c.blush} opacity={f ? 0.24 : 0.14} filter={url(k, "blur4")} />
        <ellipse cx={127.5} cy={91} rx={8} ry={5.5} fill={c.blush} opacity={f ? 0.22 : 0.12} filter={url(k, "blur4")} />
        {/* highlights */}
        <ellipse cx={103} cy={54} rx={11} ry={6} fill={hi} opacity={0.4} filter={url(k, "blur4")} />
        <path d="M109.2 79L108.7 89.5" stroke={hi} strokeWidth={2.4} opacity={0.28} strokeLinecap="round" filter={url(k, "blur1")} />
        <circle cx={108.7} cy={92.6} r={1.7} fill={hi} opacity={0.32} filter={url(k, "blur1")} />
        <ellipse cx={89.5} cy={84.5} rx={6} ry={3} fill={hi} opacity={0.35} filter={url(k, "blur2")} />
        <ellipse cx={108.5} cy={116} rx={4.5} ry={2} fill={hi} opacity={0.35} filter={url(k, "blur2")} />
        {/* hair casts a soft shadow on the forehead */}
        <path d={hairFront} fill={c.skinDeep} opacity={0.35} transform="translate(1 3)" filter={url(k, "blur2")} />
      </g>
      {person.beard && <Beard k={k} />}
      <Brow k={k} />
      <g transform={MIRROR}><Brow k={k} /></g>
      <Eye k={k} />
      <g transform={MIRROR}><Eye k={k} /></g>
      {/* catchlights stay on the light side in both eyes */}
      <circle cx={98.9} cy={74.5} r={1} fill="#ffffff" />
      <circle cx={123.9} cy={74.5} r={1} fill="#ffffff" />
      <circle cx={96.5} cy={77} r={0.45} fill="#ffffff" opacity={0.6} />
      <circle cx={121.5} cy={77} r={0.45} fill="#ffffff" opacity={0.6} />
      <g transform={f ? "translate(110 92) scale(0.93) translate(-110 -92)" : undefined}>
        <path d="M113 78C113.6 84 114.4 88 115.2 91" stroke={c.skinShade} strokeWidth={1} opacity={0.35} fill="none" strokeLinecap="round" filter={url(k, "blur0")} />
        <path d="M104.6 91.2C102.4 92.6 102.6 95.6 105.4 96M115.4 91.2C117.6 92.6 117.4 95.6 114.6 96" stroke={c.line} strokeWidth={1} opacity={0.75} fill="none" strokeLinecap="round" />
        <ellipse cx={107} cy={95.9} rx={1.9} ry={0.95} transform="rotate(14 107 95.9)" fill={c.skinDeep} opacity={0.8} />
        <ellipse cx={113} cy={95.9} rx={1.9} ry={0.95} transform="rotate(-14 113 95.9)" fill={c.skinDeep} opacity={0.8} />
        <path d="M105.8 96.4Q110 98 114.2 96.4" stroke={c.skinShade} strokeWidth={0.9} opacity={0.55} fill="none" strokeLinecap="round" />
      </g>
      <Mouth k={k} />
      {person.glasses && <Glasses k={k} />}
    </g>
  );
}

// ---------------------------------------------------------------- body and clothes

function Neck({ k }: { k: Kit }) {
  const nw = k.f ? 12.5 : 15.5;
  return (
    <g>
      <path d={neckPath(nw)} fill={url(k, "neck")} />
      <g clipPath={url(k, "neckClip")}>
        <path d={facePath(k.f ? FACE_F : FACE_M)} transform="translate(1 7)" fill={k.c.skinDeep} opacity={0.45} filter={url(k, "blur2")} />
        <rect x={110 + nw - 5} y={96} width={12} height={50} fill={k.c.skinShade} opacity={0.5} filter={url(k, "blur2")} />
      </g>
    </g>
  );
}

function Trunk({ k }: { k: Kit }) {
  const { c, f, person } = k;
  const cw = f ? 22 : 25;
  const nw = f ? 12.5 : 15.5;
  return (
    <g>
      <path d={f ? TRUNK_F : TRUNK_M} fill={url(k, "trunk")} />
      <g clipPath={url(k, "trunkClip")}>
        <ellipse cx={113} cy={146} rx={cw + 8} ry={9} fill={c.clothDeep} opacity={0.3} filter={url(k, "blur4")} />
        <path d="M70 200C84 214 92 240 90 290M150 200C136 214 128 240 130 290" stroke={c.clothDeep} strokeWidth={6} opacity={0.12} fill="none" filter={url(k, "blur4")} />
      </g>
      {person.outfit === "sweatshirt" && (
        <g>
          <path d={`M${110 - cw} 135C${114 - cw} 147 ${106 + cw} 147 ${110 + cw} 135L${103 + cw} 133C${99 + cw} 141 ${121 - cw} 141 ${117 - cw} 133Z`} fill={c.clothShade} />
          <path d={`M${113.5 - cw} 134C${118 - cw} 144 ${102 + cw} 144 ${106.5 + cw} 134`} stroke={c.clothDeep} strokeWidth={6} strokeDasharray="0.7 1.5" opacity={0.35} fill="none" />
          <path d={`M${113.5 - cw} 137C${118 - cw} 146.5 ${102 + cw} 146.5 ${106.5 + cw} 137`} stroke={c.clothLight} strokeWidth={0.8} opacity={0.6} fill="none" />
        </g>
      )}
      {person.outfit === "top" && (
        <g>
          <path d={`M${108 - cw} 134C${113 - cw} 160 ${107 + cw} 160 ${112 + cw} 134Z`} fill={url(k, "chest")} />
          <path d="M97 146.5C92 144.6 86 144.2 80 145.4M123 146.5C128 144.6 134 144.2 140 145.4" stroke={c.skinShade} strokeWidth={1.3} opacity={0.5} fill="none" strokeLinecap="round" filter={url(k, "blur0")} />
          <path d="M97 144.6C92 142.8 86 142.4 80.5 143.4" stroke={mix(c.skin, "#ffffff", 0.4)} strokeWidth={1} opacity={0.4} fill="none" strokeLinecap="round" filter={url(k, "blur0")} />
          <path d={`M${109 - cw} 135C${114 - cw} 160.5 ${106 + cw} 160.5 ${111 + cw} 135`} stroke={c.clothShade} strokeWidth={2.2} fill="none" />
          <path d="M98.5 137C100 150 120 150 121.5 137" stroke="#d8ab52" strokeWidth={0.7} fill="none" />
          <circle cx={110} cy={147.8} r={1.6} fill="#e2b85c" stroke="#b98a35" strokeWidth={0.4} />
        </g>
      )}
      {person.outfit === "blazer" && (
        <g>
          <path d="M96 133L110 226L124 133Z" fill={url(k, "shirt")} />
          {person.tie ? (
            <g>
              <path d="M107 147H113L117 205L110 214L103 205Z" fill={person.tie} />
              <path d="M107 147H113L117 205L110 214L103 205Z" fill={url(k, "tieShade")} />
              <path d="M104 160L116 152M103.4 172L116.6 163M103.6 184L117 175M104.4 196L117.6 187" stroke={mix(person.tie, "#000000", 0.25)} strokeWidth={1.2} opacity={0.45} />
              <path d="M105.5 138.5H114.5L113 147.6H107Z" fill={mix(person.tie, "#000000", 0.12)} />
            </g>
          ) : (
            <g>
              <path d="M101.6 133L110 156L118.4 133Z" fill={url(k, "chest")} />
            </g>
          )}
          <path d={`M${110 - nw - 1} 127C${109 - nw} 136 ${108 - nw} 142 ${107 - nw} 149L104.6 146L110 ${person.tie ? 139 : 136}Z`} fill={c.shirt} stroke={mix(c.shirt, "#000000", 0.18)} strokeWidth={0.6} />
          <path d={`M${110 + nw + 1} 127C${111 + nw} 136 ${112 + nw} 142 ${113 + nw} 149L115.4 146L110 ${person.tie ? 139 : 136}Z`} fill={mix(c.shirt, "#000000", 0.06)} stroke={mix(c.shirt, "#000000", 0.18)} strokeWidth={0.6} />
          <path d={`M96 133L${102 - cw} 156L${109 - cw} 161L${105 - cw} 167L110 238V226Z`} fill={mix(c.cloth, "#ffffff", 0.08)} stroke={c.clothDeep} strokeWidth={0.7} strokeLinejoin="round" />
          <path d={`M124 133L${118 + cw} 156L${111 + cw} 161L${115 + cw} 167L110 238V226Z`} fill={c.clothShade} stroke={c.clothDeep} strokeWidth={0.7} strokeLinejoin="round" />
          <path d={`M98 140L${104 - cw} 158`} stroke={mix(c.cloth, "#ffffff", 0.3)} strokeWidth={0.8} opacity={0.5} />
          <path d="M110 238L113 300" stroke={c.clothDeep} strokeWidth={1.2} />
          <circle cx={110.6} cy={247} r={2.8} fill={c.clothDeep} />
          <circle cx={110.1} cy={246.5} r={1} fill={mix(c.cloth, "#ffffff", 0.3)} opacity={0.6} />
          <circle cx={112} cy={276} r={2.8} fill={c.clothDeep} />
          <path d="M128 196L149 192.5" stroke={c.clothDeep} strokeWidth={1.4} opacity={0.6} strokeLinecap="round" />
          {person.tie && <path d="M131 195.6L134.6 189.4L138.6 194.6L142.6 189.8L146 193Z" fill={mix(person.tie, "#ffffff", 0.2)} />}
        </g>
      )}
    </g>
  );
}

function UpperArm({ k, pts, side }: { k: Kit; pts: Point[]; side: "L" | "R" }) {
  const sign = side === "L" ? 1 : -1;
  const edge = pts.slice(1).map(([x, y, w]) => [x + (sign * w) / 2, y]);
  return (
    <g>
      <path d={limb(pts)} fill={url(k, side === "L" ? "armL" : "armR")} mask={url(k, "armFade")} />
      <path d={`M${fmt(pts[0][0] + sign * pts[0][2] * 0.42)} 186${through([[pts[0][0] + sign * pts[0][2] * 0.42, 186], ...edge])}`} stroke={k.c.clothDeep} strokeWidth={1.4} opacity={0.4} fill="none" filter={url(k, "blur0")} />
    </g>
  );
}

// ---------------------------------------------------------------- hands (wrist at 0,0)

type HandKind = "open" | "point" | "thumb" | "grip";

const HAND = 0.8;

function Finger({ k, pts, nail }: { k: Kit; pts: Point[]; nail?: boolean }) {
  const a = pts[pts.length - 2], b = pts[pts.length - 1];
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  const nx = a[0] + (b[0] - a[0]) * 0.8, ny = a[1] + (b[1] - a[1]) * 0.8;
  const m = pts[1], p = pts[0], q = pts[2] ?? pts[1];
  const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
  const n = [-(q[1] - p[1]) / len, (q[0] - p[0]) / len];
  return (
    <g>
      <path d={limb(pts)} fill={url(k, "hand")} stroke={k.c.line} strokeWidth={0.7} strokeLinejoin="round" />
      <path d={`M${fmt(m[0] - n[0] * m[2] * 0.3)} ${fmt(m[1] - n[1] * m[2] * 0.3)}L${fmt(m[0] + n[0] * m[2] * 0.3)} ${fmt(m[1] + n[1] * m[2] * 0.3)}`} stroke={k.c.line} strokeWidth={0.6} opacity={0.4} strokeLinecap="round" />
      {nail && <ellipse cx={fmt(nx)} cy={fmt(ny)} rx={fmt(b[2] * 0.48)} ry={fmt(b[2] * 0.3)} transform={`rotate(${fmt(ang)} ${fmt(nx)} ${fmt(ny)})`} fill={k.c.nail} stroke={k.c.line} strokeWidth={0.4} />}
    </g>
  );
}

function Hand({ k, kind, x, y, angle = 0, flip = false }: { k: Kit; kind: HandKind; x: number; y: number; angle?: number; flip?: boolean }) {
  const { c } = k;
  const skin = { fill: url(k, "hand"), stroke: c.line, strokeWidth: 0.7, strokeLinejoin: "round" as const };
  const bar = (bx: number, by: number, w: number, h: number) => <rect x={bx} y={by} width={w} height={h} rx={h / 2} {...skin} />;
  let body: ReactNode;
  switch (kind) {
    case "open":
      body = (
        <>
          <path d={limb([[0, 14, 16], [0, -2, 17]])} {...skin} />
          <Finger k={k} pts={[[9.5, -8, 10], [16.5, -16.5, 8.6], [22, -25, 7.6]]} />
          <Finger k={k} pts={[[-10, -27, 6.4], [-12.2, -36.5, 6], [-14, -44.5, 5.2]]} />
          <Finger k={k} pts={[[-4.2, -29.5, 7], [-5.2, -41, 6.6], [-6.1, -52, 5.8]]} />
          <Finger k={k} pts={[[2, -30, 7.4], [2.3, -42, 7], [2.6, -55, 6.2]]} />
          <Finger k={k} pts={[[8.4, -29, 7.2], [10, -40, 6.8], [11.6, -50, 6]]} />
          <path d="M-9.5 2C-12.5 -6 -14 -17 -13 -27.5C-12.5 -31 -9 -32 -5 -32H6C10.5 -32 13 -30.5 13.5 -27C14 -20 15 -12 12.5 -4C10.5 1 6 2.5 0 2.5Z" {...skin} />
          <path d="M-12 -21C-4 -19 4 -21 12 -26M-11 -13C-4 -13 3 -15 8 -20M10 -5C6 -11 5 -19 7 -27" stroke={c.line} strokeWidth={0.7} opacity={0.4} fill="none" strokeLinecap="round" />
          <ellipse cx={-3} cy={-12} rx={7} ry={9} fill={c.skinShade} opacity={0.3} filter={url(k, "blur2")} />
        </>
      );
      break;
    case "point":
      body = (
        <>
          <path d={limb([[16, -0.5, 15.5], [0, -0.5, 17]])} {...skin} />
          <path d="M3 -10C-6 -12.5 -18 -13 -26 -11C-31.5 -9.5 -33 -3 -32.5 3C-32 9.5 -27 13.5 -19 13.5C-9 13.5 -1 11.5 3 9C5 4 5 -5 3 -10Z" {...skin} />
          {bar(-35, -3.5, 15, 7)}
          {bar(-33.5, 2.8, 14, 6.2)}
          {bar(-30.5, 8.4, 11.5, 5.2)}
          <Finger k={k} pts={[[-24, -6.8, 8], [-38, -7.8, 7.2], [-54, -8.8, 6.4]]} />
          <ellipse cx={-50.6} cy={-10.6} rx={3.2} ry={1.1} fill={c.nail} stroke={c.line} strokeWidth={0.4} />
          <Finger k={k} pts={[[-3, -6, 10.4], [-14.5, -2.5, 8.6], [-26, -0.6, 7.4]]} nail />
        </>
      );
      break;
    case "thumb":
      body = (
        <>
          <path d={limb([[0, 14, 16], [0, -2, 17]])} {...skin} />
          <path d="M-12 1C-14.5 -8 -15 -22 -12.5 -33C-8 -36.5 8 -36.5 12.5 -33C15 -22 14.5 -8 12 1Z" {...skin} />
          <Finger k={k} pts={[[-6, -31, 10.4], [-5.6, -43, 9.4], [-4.6, -55, 8.4]]} nail />
          {bar(-13.5, -36, 26, 7.4)}
          {bar(-14, -29, 27, 7.2)}
          {bar(-13.5, -22, 26, 6.8)}
          {bar(-12.5, -15.4, 23.5, 6)}
          <path d="M4 -35V-29.6M4.4 -28V-22.6M4 -21V-16M3.4 -14.4V-10.2" stroke={c.line} strokeWidth={0.6} opacity={0.45} strokeLinecap="round" />
        </>
      );
      break;
    case "grip":
      body = (
        <>
          <path d={limb([[-16, 0, 15.5], [0, 0, 17]])} {...skin} />
          <Finger k={k} pts={[[23.5, 11.2, 6.2], [31, 12.6, 5.8], [37, 15.4, 5.2]]} nail />
          <Finger k={k} pts={[[25, 5, 7.2], [34.5, 6.2, 6.6], [41.5, 9.4, 5.8]]} nail />
          <Finger k={k} pts={[[25.5, -2, 7.6], [35.5, -1.2, 7], [43.5, 1.8, 6.2]]} nail />
          <Finger k={k} pts={[[24.5, -9, 7.4], [34, -9, 6.8], [42, -6.5, 6]]} nail />
          <path d="M-1 -10.5C8 -13.5 18 -14 26 -12.5C28.5 -6 28.5 6 26 13C18 14 8 13 -1 10.5C-3 4 -3 -4 -1 -10.5Z" {...skin} />
          <path d="M4 -6L23 -8.5M4.5 -1.5L24 -2M4 3L23.5 4.6" stroke={c.line} strokeWidth={0.6} opacity={0.3} strokeLinecap="round" />
          {[[24.5, -9], [25.5, -2], [25, 5], [23.5, 11.2]].map(([kx, ky]) => <ellipse key={ky} cx={kx} cy={ky} rx={2.2} ry={1.6} fill={mix(c.skin, "#ffffff", 0.35)} opacity={0.5} />)}
        </>
      );
      break;
  }
  return <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${flip ? -HAND : HAND} ${HAND})`}>{body}</g>;
}

function Forearm({ k, pts }: { k: Kit; pts: Point[] }) {
  const { c, person } = k;
  const end = pts[pts.length - 1], prev = pts[pts.length - 2];
  const angle = (Math.atan2(end[1] - prev[1], end[0] - prev[0]) * 180) / Math.PI;
  const at = `translate(${end[0]} ${end[1]}) rotate(${fmt(angle)})`;
  return (
    <g>
      <path d={limb(pts)} fill={c.clothDeep} opacity={0.3} transform="translate(2 4)" filter={url(k, "blur2")} />
      {person.outfit === "blazer" && <rect x={-4} y={-end[2] / 2 + 1.5} width={9} height={end[2] - 3} rx={2} fill={c.shirt} stroke={mix(c.shirt, "#000000", 0.2)} strokeWidth={0.6} transform={at} />}
      <path d={limb(pts)} fill={url(k, "sleeve")} stroke={c.clothDeep} strokeWidth={0.8} strokeOpacity={0.5} />
      {person.outfit === "sweatshirt" && (
        <g transform={at}>
          <rect x={-8} y={-end[2] / 2 - 0.5} width={9} height={end[2] + 1} rx={3} fill={c.clothShade} />
          <path d={`M-3.5 ${-end[2] / 2}V${end[2] / 2}`} stroke={c.clothDeep} strokeWidth={9} strokeDasharray="0.7 1.5" opacity={0.35} />
        </g>
      )}
    </g>
  );
}

// Tablet turned towards the viewer, showing a course video and progress.
function Tablet() {
  return (
    <g>
      <rect x={59} y={179} width={102} height={71} rx={7} fill="#1c2025" />
      <rect x={63.5} y={183.5} width={93} height={62} rx={3} fill="#f7f9fa" />
      <path d="M66.5 183.5H153.5A3 3 0 0 1 156.5 186.5V191H63.5V186.5A3 3 0 0 1 66.5 183.5Z" fill="#eaeef1" />
      <circle cx={68.5} cy={187.3} r={1.4} fill="#0eb47e" />
      <rect x={72} y={186.4} width={18} height={1.8} rx={0.9} fill="#c5ccd3" />
      <rect x={68} y={195} width={52} height={31} rx={2.5} fill="#0eb47e" />
      <path d="M68 214L84 205L98 216L108 209L120 216V223.5A2.5 2.5 0 0 1 117.5 226H70.5A2.5 2.5 0 0 1 68 223.5Z" fill="#064e37" opacity={0.35} />
      <circle cx={94} cy={210.5} r={6.5} fill="#ffffff" opacity={0.95} />
      <path d="M92.2 207.4V213.6L97.2 210.5Z" fill="#0eb47e" />
      <rect x={68} y={230.5} width={52} height={2.2} rx={1.1} fill="#dfe4e8" />
      <rect x={68} y={230.5} width={30} height={2.2} rx={1.1} fill="#0eb47e" />
      <rect x={68} y={236.5} width={36} height={2.2} rx={1.1} fill="#c5ccd3" />
      <rect x={126} y={195} width={25} height={2.2} rx={1.1} fill="#c5ccd3" />
      <rect x={126} y={200.5} width={18} height={2.2} rx={1.1} fill="#dfe4e8" />
      {[[127, 12], [133, 18], [139, 14], [145, 22]].map(([bx, h]) => (
        <rect key={bx} x={bx} y={226 - h} width={4} height={h} rx={1} fill={bx % 2 ? "#0eb47e" : "#064e37"} />
      ))}
      <rect x={126} y={230.5} width={25} height={2.2} rx={1.1} fill="#dfe4e8" />
      <path d="M63.5 183.5H110L84 245.5H63.5Z" fill="#ffffff" opacity={0.06} />
    </g>
  );
}

// ---------------------------------------------------------------- poses

type Pose = { armL: Point[]; armR: Point[]; under?: ReactNode; front?: ReactNode };

function pose(k: Kit): Pose {
  const { f, person } = k;
  const dx = f ? 0 : 8;
  const [w0, w1, w2] = f ? [33, 30, 28] : [37, 33, 30];
  const L = (x: number) => x - dx, R = (x: number) => x + dx;
  const downL: Point[] = [[L(54), 172, w0], [L(49), 215, w1], [L(48), 262, w2], [L(48), 312, w2 - 1]];
  const downR: Point[] = [[R(166), 172, w0], [R(171), 215, w1], [R(172), 262, w2], [R(172), 312, w2 - 1]];
  const bentL: Point[] = [[L(54), 172, w0], [L(49), 216, w1], [L(50), 268, w2]];
  const bentR: Point[] = [[R(166), 172, w0], [R(171), 216, w1], [R(170), 268, w2]];
  switch (person.pose) {
    case "point":
      return {
        armL: [[L(54), 172, w0], [L(45), 214, w1], [L(40), 256, w2]],
        armR: downR,
        front: (
          <>
            <Hand k={k} kind="point" x={L(30)} y={200} angle={45} />
            <Forearm k={k} pts={[[L(40), 256, w2 - 1], [L(34), 228, 24], [L(31), 205, 19]]} />
          </>
        ),
      };
    case "thumbsUp":
      return {
        armL: downL,
        armR: [[R(166), 172, w0], [R(175), 214, w1], [R(180), 256, w2]],
        front: (
          <>
            <Hand k={k} kind="thumb" x={R(190)} y={202} angle={8} />
            <Forearm k={k} pts={[[R(180), 256, w2 - 1], [R(186), 230, 24], [R(189), 208, 19]]} />
          </>
        ),
      };
    case "wave":
      return {
        armL: downL,
        armR: [[R(166), 172, w0], [R(186), 200, w1], [R(202), 226, w2]],
        front: (
          <>
            <Hand k={k} kind="open" x={R(206)} y={160} angle={10} />
            <Forearm k={k} pts={[[R(202), 226, w2 - 1], [R(204), 194, 24], [R(205), 166, 19]]} />
          </>
        ),
      };
    case "crossed":
      return {
        armL: bentL,
        armR: bentR,
        under: <Forearm k={k} pts={[[R(172), 280, w2], [120, 263, 25], [L(62), 244, 22]]} />,
        front: (
          <>
            <Hand k={k} kind="grip" x={R(142)} y={240} angle={-24} />
            <Forearm k={k} pts={[[L(48), 280, w2], [98, 263, 25], [R(138), 243, 21]]} />
          </>
        ),
      };
    case "tablet": {
      const palm = "M47 245C44 234 46 220 54 212C58 209 64 210 66 214V243C61 249 51 250 47 245Z";
      const thumb: Point[] = [[61, 231, 10], [66, 221.5, 8.4], [70.5, 213, 7.4]];
      return {
        armL: bentL,
        armR: bentR,
        front: (
          <>
            <Forearm k={k} pts={[[L(50), 282, w2], [L(52), 262, 25], [56, 245, 20]]} />
            <Forearm k={k} pts={[[R(170), 282, w2], [R(168), 262, 25], [164, 245, 20]]} />
            <path d={palm} fill={url(k, "hand")} stroke={k.c.line} strokeWidth={0.7} />
            <path d={palm} fill={url(k, "hand")} stroke={k.c.line} strokeWidth={0.7} transform={MIRROR} />
            <Tablet />
            <Finger k={k} pts={thumb} nail />
            <g transform={MIRROR}><Finger k={k} pts={thumb} nail /></g>
          </>
        ),
      };
    }
    case "books": {
      const cover = person.prop ?? "#e4e0d8";
      return {
        armL: bentL,
        armR: downR,
        front: (
          <>
            <g transform="rotate(-7 90 206)">
              <rect x={62} y={164} width={60} height={84} rx={3} fill="#f3efe7" stroke="#d9d3c8" strokeWidth={0.6} />
              <path d="M120.5 168V244M118.5 168V244" stroke="#d9d3c8" strokeWidth={0.5} />
              <rect x={58} y={162} width={60} height={84} rx={3.5} fill={cover} />
              <rect x={58} y={162} width={60} height={84} rx={3.5} fill={url(k, "cover")} />
              <rect x={58} y={162} width={7} height={84} rx={2} fill={mix(cover, "#000000", 0.14)} />
              <rect x={108} y={162} width={3} height={84} fill={mix(cover, "#000000", 0.45)} />
              <rect x={74} y={180} width={26} height={9} rx={1.5} fill="#ffffff" opacity={0.7} />
            </g>
            <Hand k={k} kind="grip" x={98} y={244} angle={-58} />
            <Forearm k={k} pts={[[L(48), 280, w2], [74, 262, 25], [96, 248, 21]]} />
          </>
        ),
      };
    }
  }
}

// ---------------------------------------------------------------- person

const TILT: Record<HeroPerson["pose"], number> = { point: -3, wave: 3, thumbsUp: 2.5, crossed: 0, tablet: -2, books: 2.5 };

export default function CourseHeroPerson({ person, cx, scale = 1 }: { person: HeroPerson; cx: number; scale?: number }) {
  const f = person.hair === "long" || person.hair === "bun" || person.hair === "ponytail";
  const k: Kit = { id: `hp${hash(JSON.stringify(person))}`, f, person, c: colours(person, f) };
  const { c } = k;
  const hair = hairShapes(k);
  const { armL, armR, under, front } = pose(k);
  const face = facePath(f ? FACE_F : FACE_M);
  const blur = (name: string, sd: number) => (
    <filter id={`${k.id}-${name}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={sd} /></filter>
  );
  const linear = (name: string, stops: [number, string, number?][], x2 = 1, y2 = 0, x1 = 0, y1 = 0) => (
    <linearGradient id={`${k.id}-${name}`} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map(([o, col, op]) => <stop key={o} offset={o} stopColor={col} stopOpacity={op} />)}
    </linearGradient>
  );
  return (
    <g transform={`translate(${cx - 110 * scale} ${308 - 280 * scale}) scale(${scale})`}>
      <defs>
        {blur("blur0", 0.35)}
        {blur("blur1", 0.8)}
        {blur("blur2", 1.6)}
        {blur("blur4", 3.6)}
        <radialGradient id={`${k.id}-face`} cx="0.4" cy="0.42" r="0.66">
          <stop offset="0" stopColor={c.skinLight} />
          <stop offset="0.55" stopColor={c.skin} />
          <stop offset="1" stopColor={c.skinShade} />
        </radialGradient>
        <radialGradient id={`${k.id}-iris`} cx="0.5" cy="0.62" r="0.6">
          <stop offset="0" stopColor="#7a4c2c" />
          <stop offset="0.6" stopColor="#3d2416" />
          <stop offset="1" stopColor="#1a0f0a" />
        </radialGradient>
        {linear("fade", [[0, c.skinShade, 0], [0.35, c.skinShade, 0.35], [1, c.skin, 0.88]], 0, 1)}
        <linearGradient id={`${k.id}-armFadeG`} gradientUnits="userSpaceOnUse" x1="0" y1="158" x2="0" y2="188">
          <stop offset="0" stopColor="#ffffff" stopOpacity={0} />
          <stop offset="1" stopColor="#ffffff" stopOpacity={1} />
        </linearGradient>
        <mask id={`${k.id}-armFade`} maskUnits="userSpaceOnUse" x="-80" y="0" width="380" height="340">
          <rect x="-80" y="0" width="380" height="340" fill={url(k, "armFadeG")} />
        </mask>
        {linear("neck", [[0, c.skinShade], [0.6, mix(c.skin, c.skinShade, 0.45)], [1, c.skin]], 0, 1)}
        {linear("chest", [[0, c.skinShade], [0.45, c.skin], [1, c.skinLight]], 0, 1)}
        {linear("hand", [[0, c.skinLight], [0.5, c.skin], [1, c.skinShade]], 1, 1)}
        {linear("hair", [[0, c.hairLight], [0.35, c.hair], [1, c.hairDark]], 0.7, 1, 0.2, 0)}
        {linear("trunk", [[0, c.clothShade], [0.3, c.clothLight], [0.62, c.cloth], [1, c.clothDeep]])}
        {linear("armL", [[0, c.clothShade], [0.45, mix(c.cloth, c.clothLight, 0.5)], [1, c.cloth]])}
        {linear("armR", [[0, c.cloth], [0.6, c.clothShade], [1, mix(c.clothShade, c.clothDeep, 0.5)]])}
        {linear("sleeve", [[0, c.clothLight], [0.55, c.cloth], [1, c.clothShade]], 0.4, 1)}
        {linear("shirt", [[0, mix(c.shirt, "#000000", 0.12)], [0.4, c.shirt], [1, mix(c.shirt, "#000000", 0.05)]], 0, 1)}
        {linear("tieShade", [[0, "#ffffff", 0.22], [0.5, "#000000", 0], [1, "#000000", 0.25]])}
        {linear("metal", [[0, "#eef0f3"], [0.5, "#dde1e6"], [1, "#c6ccd3"]], 1, 1)}
        {linear("cover", [[0, "#ffffff", 0.22], [0.5, "#ffffff", 0], [1, "#000000", 0.16]], 1, 1)}
        <clipPath id={`${k.id}-faceClip`}><path d={face} /></clipPath>
        <clipPath id={`${k.id}-neckClip`}><path d={neckPath(f ? 12.5 : 15.5)} /></clipPath>
        <clipPath id={`${k.id}-trunkClip`}><path d={f ? TRUNK_F : TRUNK_M} /></clipPath>
        <clipPath id={`${k.id}-eye`}><path d="M90.9 76.2C93.2 72.4 99.8 71.6 104 76.4C101.4 79.2 94.8 79.6 90.9 76.2Z" /></clipPath>
        <clipPath id={`${k.id}-mouth`}><path d={MOUTH_OPEN} /></clipPath>
        <clipPath id={`${k.id}-hairClip`}>
          <path d={hair.front} />
          {person.hair === "curly" && curlyShapes().bumps.map(([x, y, r]) => <circle key={x} cx={fmt(x)} cy={fmt(y)} r={fmt(r)} />)}
        </clipPath>
      </defs>
      <g transform={`rotate(${TILT[person.pose]} 110 128)`}>{hair.back}</g>
      <Neck k={k} />
      <Trunk k={k} />
      {under}
      <UpperArm k={k} pts={armL} side="L" />
      <UpperArm k={k} pts={armR} side="R" />
      <g transform={`rotate(${TILT[person.pose]} 110 128)`}>
        {person.hair === "ponytail" && hair.mid}
        <Ears k={k} />
        <Face k={k} hairFront={hair.front} />
        {person.hair === "curly" && hair.mid}
        <path d={hair.front} fill={url(k, "hair")} />
        {hair.detail}
      </g>
      {hair.locks}
      {front}
    </g>
  );
}
