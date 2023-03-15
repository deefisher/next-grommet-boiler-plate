import { GrommetProps } from 'grommet';
import { reduxConstants } from '../constants';

export interface SetThemeModeAction {
    type: reduxConstants.THEME_MODE_SET;
    themeMode: GrommetProps['themeMode'];
}

export const setThemeModeAction = (themeMode: GrommetProps['themeMode']): SetThemeModeAction => ({
    type: reduxConstants.THEME_MODE_SET,
    themeMode,
});
