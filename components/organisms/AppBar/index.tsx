import { Header, HeaderProps } from 'grommet';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled(Header)`
    z-index: 2;
`;

export interface AppBarProps extends HeaderProps {
    /** AppBar component children */
    children?: React.ReactNode;
}

/** AppBar for this application */
export const AppBar = ({ ...props }: AppBarProps) => {
    return (
        <StyledHeader
            background="brand"
            pad={{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation="medium"
            a11yTitle="AppBar"
            {...props}
        />
    );
};
