import {
    Anchor,
    Box,
    BoxProps,
    Button,
    Page,
    PageContent,
    ResponsiveContext,
    Sidebar,
    Text,
    ThemeContext,
} from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import React from 'react';
import { useApp } from '../../../pages/_app';

import { AppBar } from '../../organisms/AppBar';
import { Tree } from '../../organisms/Tree';

export interface DataModelPageTemplateProps extends BoxProps {
    /** DataModelPageTemplate component children */
    children: React.ReactNode;
}

/** DataModelPageTemplate that displays data models */
export const DataModelPageTemplate = ({ children, ...props }: DataModelPageTemplateProps) => {
    const [isSideBarVisible, setIsSideBarVisible] = React.useState(true);

    const { dark, setDark } = useApp();

    const size = React.useContext(ResponsiveContext);

    React.useEffect(() => {
        if (size !== 'medium' && size !== 'large') {
            setIsSideBarVisible(false);
        } else {
            setIsSideBarVisible(true);
        }
    }, [size]);

    return (
        <Page height={'100%'} {...props}>
            <AppBar>
                <Box direction="row" align="end">
                    <Text size="small" weight={'lighter'}>
                        METADATA
                    </Text>
                    <Text size="medium" weight={'normal'}>
                        exchange
                    </Text>
                </Box>
                <Button
                    a11yTitle={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    icon={dark ? <Moon /> : <Sun />}
                    onClick={() => setDark(!dark)}
                    tip={{
                        content: (
                            <Box pad="small" round="small" background={dark ? 'dark-1' : 'light-3'}>
                                {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            </Box>
                        ),
                        plain: true,
                    }}
                />
            </AppBar>
            <Box direction="row" flex={'grow'}>
                {isSideBarVisible && (
                    <Sidebar
                        width={{ min: '282px' }}
                        background={{ dark: 'darkBlue', light: 'white' }}
                        border={{
                            color: { dark: '#34446d', light: 'transparent' },
                            size: 'xsmall',
                            side: 'right',
                        }}
                        align="center"
                        header={
                            <ThemeContext.Extend
                                value={{
                                    box: {
                                        extend: `
                        white-space: break-spaces; 
                        & a {
                            text-decoration: underline;
                        }
                        `,
                                    },
                                }}
                            >
                                <Box direction="row" margin={{ bottom: 'medium' }}>
                                    <Anchor color={{ dark: 'white', light: 'black' }} weight="normal">
                                        Classes
                                    </Anchor>
                                    {`  /  `}
                                    <Anchor color={{ dark: 'white', light: 'black' }} weight="normal">
                                        Abstract
                                    </Anchor>
                                    {`  /  `}
                                    <Anchor color={{ dark: 'white', light: 'black' }} weight="bold">
                                        Location
                                    </Anchor>
                                </Box>
                                <Tree />
                            </ThemeContext.Extend>
                        }
                        elevation={'large'}
                    ></Sidebar>
                )}
                <Box width="100%">
                    <PageContent>{children}</PageContent>
                </Box>
            </Box>
        </Page>
    );
};
