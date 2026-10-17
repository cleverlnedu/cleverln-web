// Inlined at the top of <body> by the root layout so it runs before first paint.
// The logo splash plays only when the tab is refreshed — not on first open, not when coming back
// from Google sign-in or an email link, and never during in-app navigation.
export const brandIntroScript = `try{var n=performance.getEntriesByType("navigation")[0];var reload=n?n.type==="reload":performance.navigation&&performance.navigation.type===1;if(reload)document.documentElement.dataset.brandIntro="play"}catch(e){}`;
