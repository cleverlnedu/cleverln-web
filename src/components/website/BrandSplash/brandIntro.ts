// Inlined at the top of <body> by the root layout so it runs before first paint on every full page load
// (first open and every refresh): the page never flashes before the splash. In-app navigation doesn't rerun it.
export const brandIntroScript = `document.documentElement.dataset.brandIntro="play"`;
