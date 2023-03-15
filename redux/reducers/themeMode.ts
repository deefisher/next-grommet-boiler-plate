import { GrommetProps } from 'grommet';
import { SetThemeModeAction } from '../actions';
import { reduxConstants } from '../constants';

export const themeMode = (state: GrommetProps['themeMode'] = 'auto', action: SetThemeModeAction) => {
    switch (action.type) {
        case reduxConstants.THEME_MODE_SET:
            return action.themeMode;
        default:
            return state;
    }
};
