import { Box, BoxProps, Text } from 'grommet';
import React from 'react';

export interface TipContentProps extends BoxProps {
    /** TipContent component children */
    children?: React.ReactNode;
}

export const a11yTitle_TipContent = 'Tip Content';

/** TipContent that contains the content for tool tip */
export const TipContent = ({ children, ...props }: TipContentProps) => {
    return (
        <Box pad={'small'} round="small" background={'#d4d4d4'} a11yTitle={a11yTitle_TipContent} {...props}>
            <Text>{children}</Text>
        </Box>
    );
};
