import merge from 'lodash/merge';

import { EditorTheme } from '../models';
import { ThemeType } from './default';

export function getStyles(theme: EditorTheme): ThemeType | null {
  try {
    const defaultTheme = require('./default').default;
    const targetTheme = require(`./${theme}`).default || {};

    return merge({}, defaultTheme, targetTheme);
  } catch (err) {
    console.error(`Failed to import theme '${theme}'`);
    return null;
  }
}
