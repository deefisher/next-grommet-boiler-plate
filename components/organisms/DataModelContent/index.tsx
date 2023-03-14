import { Box, BoxProps, GrommetProps, Tab, Tabs, ThemeContext } from 'grommet';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

export interface DataModelConent {
    tabTitle: string;
    content: React.ReactNode;
}

export interface DataModelContentProps extends BoxProps {
    /** DataModelContent component children */
    children?: React.ReactNode;
    /** An array of data for each tab*/
    dataModelContentArray: DataModelConent[];
}

/** DataModelContent that displays data based on selected tab */
export const DataModelContent = ({ dataModelContentArray, ...props }: DataModelContentProps) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    // const themeMode = useSelector(
    //     (state: { themeMode: GrommetProps['themeMode'] }): GrommetProps['themeMode'] => state?.themeMode,
    // );

    return (
        <Box margin={{ top: 'medium' }}>
            <Tabs
                onActive={(index) => {
                    setActiveTabIndex(index);
                }}
            >
                {dataModelContentArray.map((dataModelContent: DataModelConent, index: number) => (
                    <ThemeContext.Extend
                        value={{
                            tab: {
                                extend: `border-radius: 5px; color: ${/* themeMode === 'dark' ? '#b0b0b0' :  */'#ffffff'};`,
                                pad: { vertical: 'xsmall', horizontal: 'small' },
                                background: { color: 'secondary', opacity: activeTabIndex === index ? '1' : '0.5' },
                                color: 'inherit',
                                active: { color: 'white' },
                            },
                        }}
                        key={`data-tab-${index}`}
                    >
                        <Tab title={dataModelContent.tabTitle}>{dataModelContent.content}</Tab>
                    </ThemeContext.Extend>
                ))}
            </Tabs>
        </Box>
    );
};
