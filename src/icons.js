// Linien-Icons (24×24, currentColor)
const s = d => `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;

const paths = {
  stairs: s('M3 20h5v-4h4v-4h4V8h5'),
  cellar: s('M3 9h5v4h4v4h4v3h5M18 3v8m-3-3 3 3 3-3'),
  window: s('M4 3h13v18H4zM10.5 3v18M4 12h13M20 3.5l.6 1.4 1.4.6-1.4.6L20 7.5l-.6-1.4-1.4-.6 1.4-.6z'),
  office: s('M2 13h20M4 13v7M20 13v7M8 4h8v6H8zM12 10v3M9 20h6M12 16v4'),
  parking: s('M3 3h9v10H3zM6 11V5h2.5a2 2 0 0 1 0 4H6M13 16l1.5-3.5h5L21 16v4h-8zM14 20v1.5M20 20v1.5'),
  bin: s('M4 6h16M9 6V3.5h6V6M6 6l1 15h10l1-15M10 10v7M14 10v7'),
  sparkle: s('M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z'),
  check: s('M5 12.5l4.5 4.5L19 7.5'),
  arrow: s('M5 12h14M13 6l6 6-6 6'),
  chevron: s('M6 9l6 6 6-6'),
  pin: s('M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z') + '<circle cx="12" cy="9.5" r="2.3" fill="currentColor"/>',
  phone: s('M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z'),
  mail: s('M3 5h18v14H3zM3 6l9 7 9-7'),
  clock: s('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2'),
  shield: s('M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5'),
  euro: s('M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9'),
  user: s('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0'),
  calendar: s('M4 5h16v16H4zM4 10h16M8 3v4M16 3v4'),
  search: s('M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4'),
  file: s('M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5'),
  handshake: s('M3 11l4-4 5 2 5-2 4 4M7 7v6l5 4 5-4V7M12 9v8'),
  plus: s('M12 5v14M5 12h14'),
  menu: s('M4 7h16M4 12h16M4 17h16'),
  close: s('M6 6l12 12M18 6L6 18'),
  wa: '<path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"/>',
};

export const icon = (name, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
