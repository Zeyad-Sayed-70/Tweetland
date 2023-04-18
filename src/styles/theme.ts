import { lightTheme, darkTheme } from './themes/AppThemes';

// Light / Dark Mode
export let mode: string = JSON.parse(localStorage.getItem('theme') as string) || 'light';

// Object of Themes [Add a New Theme Here]
const themes = {
  'dark': darkTheme,
  'light': lightTheme
};

// get specific theme style data depends on selected mode
export function getTheme(mode: string) {
  if ( themes[mode] === undefined ) return lightTheme;

  return themes[mode];
}