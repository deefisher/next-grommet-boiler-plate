import { grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

const secondaryColor = '#E05F71';

export const theme = deepMerge(grommet, {
    global: {
        colors: {
            brand: '#223052',
            secondary: secondaryColor,
            darkBlue: '#141B30',
        },
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px',
        },
        elevation: {
            dark: {
                none: 'none',
                xsmall: '0px 2px 2px rgba(0, 0, 0, 0.40)',
                small: '0px 4px 4px rgba(0, 0, 0, 0.40)',
                medium: '0px 6px 8px rgba(0, 0, 0, 0.40)',
                large: '0px 8px 16px rgba(0, 0, 0, 0.40)',
                xlarge: '0px 10px 24px rgba(0, 0, 0, 0.40)',
            },
        },
        focus: { border: { color: 'secondary' } },
    },
    tab: { border: { size: '0px' }, pad: 'none' },
});
