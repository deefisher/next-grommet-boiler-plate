import React from 'react';
import { Box, BoxProps, Spinner, Text } from 'grommet';
import {
    AppsRounded,
    Book,
    CircleQuestion,
    Code,
    Cube,
    Cubes,
    Dashboard,
    Document,
    FormDown,
    FormNext,
    History,
    IconProps,
    Link,
    Script,
    Tag,
} from 'grommet-icons';
import { useRef, useState } from 'react';
import TreeView, { INode, INodeRendererProps } from 'react-accessible-treeview';
import styled from 'styled-components';
import { theme } from '../../../styles';
import { useRouter } from 'next/router';

export enum Data {
    'data_model' = 'data_model',
    'data_class' = 'data_class',
    'data_element' = 'data_element',
    'data_type' = 'data_type',
    'measurement_unit' = 'measurement_unit',
    'validation_rule' = 'validation_rule',
    'asset' = 'asset',
    'tag' = 'tag',
    'catalogue_element' = 'catalogue_element',
    'data_model_imports' = 'data_model_imports',
    'data_model_history' = 'data_model_history',
}

const dataIconMap: Record<Data, React.ReactElement<IconProps>> = {
    [Data.data_model]: <Book size="19px" />,
    [Data.data_class]: <Cubes size="19px" />,
    [Data.data_element]: <Cube size="19px" />,
    [Data.data_type]: <AppsRounded size="19px" />,
    [Data.measurement_unit]: <Dashboard size="19px" />,
    [Data.validation_rule]: <Script size="19px" />,
    [Data.asset]: <Tag size="19px" />,
    [Data.tag]: <Link size="19px" />,
    [Data.catalogue_element]: <Document size="19px" />,
    [Data.data_model_imports]: <Code size="19px" />,
    [Data.data_model_history]: <History size="19px" />,
};

interface TreeNode extends INode {
    type?: Data;
    url?: string;
}

interface TreeNodeRendererProps extends INodeRendererProps {
    element: TreeNode;
}

const initialData: TreeNode[] = [
    {
        name: '',
        id: 0,
        children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        parent: null,
        url: `/exchange-editor/datamodel/51780/${Data.data_model}`,
    },
    {
        name: 'Abstract Classes',
        children: [],
        id: 1,
        parent: 0,
        type: Data.data_model,
        url: `/exchange-editor/datamodel/51780/${Data.data_model}`,
    },
    {
        name: 'Data Classes',
        children: [],
        id: 2,
        parent: 0,
        isBranch: true,
        type: Data.data_class,
        url: `/exchange-editor/datamodel/51780/${Data.data_class}`,
    },
    {
        name: 'Data Elements',
        children: [],
        id: 3,
        parent: 0,
        type: Data.data_element,
        url: `/exchange-editor/datamodel/51780/${Data.data_element}`,
    },
    {
        name: 'Data Types',
        children: [],
        id: 4,
        parent: 0,
        type: Data.data_type,
        url: `/exchange-editor/datamodel/51780/${Data.data_type}`,
    },
    {
        name: 'Measurement Units',
        children: [],
        id: 5,
        parent: 0,
        type: Data.measurement_unit,
        url: `/exchange-editor/datamodel/51780/${Data.measurement_unit}`,
    },
    {
        name: 'Business Rules',
        children: [],
        id: 6,
        parent: 0,
        type: Data.validation_rule,
        url: `/exchange-editor/datamodel/51780/${Data.validation_rule}`,
    },
    {
        name: 'Assets',
        children: [],
        id: 7,
        parent: 0,
        type: Data.asset,
        url: `/exchange-editor/datamodel/51780/${Data.asset}`,
    },
    {
        name: 'Tags',
        children: [],
        id: 8,
        parent: 0,
        type: Data.tag,
        url: `/exchange-editor/datamodel/51780/${Data.tag}`,
    },
    {
        name: 'Deprecated Items',
        children: [],
        id: 9,
        parent: 0,
        type: Data.catalogue_element,
        url: `/exchange-editor/datamodel/51780/${Data.catalogue_element}`,
    },
    {
        name: 'Imported Data Models',
        children: [],
        id: 10,
        parent: 0,
        type: Data.data_model_imports,
        url: `/exchange-editor/datamodel/51780/${Data.data_model_imports}`,
    },
    {
        name: 'Versions',
        children: [],
        id: 11,
        parent: 0,
        type: Data.data_model_history,
        url: `/exchange-editor/datamodel/51780/${Data.data_model_history}`,
    },
];

const StyledBox = styled(Box)`
    & ul {
        list-style: none;
        padding: 0px;
    }
    & li:focus-visible {
        outline: none;
    }
    & div {
        box-shadow: none;
    }
`;

const StyledSpinner = styled(Spinner)`
    padding: 9px;
`;

export interface TreeProps extends BoxProps {
    /** Data in the form of an arra of TreeNodes */
    data: TreeNode[];
    /** TreeNode ids that are currently selected */
    selectedIds: number[];
    /** TreeNode ids that are currently expanded (need isBranch === true)*/
    expandedIds: number[];
    /** DataModelPage component children */
    children?: React.ReactNode;
}

export const Tree = () => {
    const loadedAlertElement = useRef<HTMLDivElement>(null);
    const [data, setData] = useState(initialData);
    const [nodesAlreadyLoaded, setNodesAlreadyLoaded] = useState<TreeNode[]>([]);
    const [selectedId, setSelectedId] = useState<number>();

    const router = useRouter();

    React.useEffect(() => {
        const id = initialData.find((treeNode) => treeNode.url === router.pathname)?.id;
        if (id) {
            setSelectedId(id);
        }
    }, [router]);

    const updateTreeData = (list: TreeNode[], id: number, children: TreeNode[]) => {
        const data = list.map((node) => {
            if (node.id === id) {
                node.children = children.map((el) => {
                    return el.id;
                });
            }
            return node;
        });
        return data.concat(children);
    };

    const onLoadData = ({ element }: { element: TreeNode }): Promise<void> => {
        return new Promise((resolve) => {
            if (element.children && element.children.length > 0) {
                resolve();
            } else {
                setTimeout(() => {
                    setData((value) =>
                        updateTreeData(value, element.id, [
                            {
                                name: `Abstract Class Record`,
                                children: [],
                                id: value.length,
                                parent: element.id,
                                isBranch: true,
                                type: Data.data_model,
                            },
                            {
                                name: `Data Elements`,
                                children: [],
                                id: value.length + 1,
                                parent: element.id,
                                type: Data.data_element,
                            },
                        ]),
                    );
                    resolve();
                }, 1000);
            }
        });
    };

    const wrappedOnLoadData = async (props: { element: TreeNode }) => {
        const nodeHasNoChildData = props.element.children && props.element.children.length === 0;
        const nodeHasAlreadyBeenLoaded = nodesAlreadyLoaded.find((e) => e.id === props.element.id);

        await onLoadData(props);

        if (nodeHasNoChildData && !nodeHasAlreadyBeenLoaded) {
            const el: HTMLDivElement | null = loadedAlertElement.current;
            setNodesAlreadyLoaded([...nodesAlreadyLoaded, props.element]);
            el && (el.innerHTML = `${props.element.name} loaded`);

            // Clearing aria-live region so loaded node alerts no longer appear in DOM
            setTimeout(() => {
                el && (el.innerHTML = '');
            }, 5000);
        }
    };

    return (
        <Box width={'100%'} align="start" pad={{ left: 'xsmall', right: 'medium' }}>
            <Box height={{ min: '20px' }} ref={loadedAlertElement} role="alert" aria-live="polite"></Box>
            <StyledBox>
                <TreeView
                    data={data}
                    aria-label="Checkbox tree"
                    onLoadData={wrappedOnLoadData}
                    propagateSelect
                    togglableSelect
                    propagateSelectUpwards
                    {...(selectedId && {
                        selectedIds: [selectedId],
                        expandedIds: [selectedId],
                    })}
                    nodeRenderer={({
                        element,
                        isBranch,
                        isExpanded,
                        isSelected,
                        isHalfSelected,
                        getNodeProps,
                        level,
                        handleSelect,
                        handleExpand,
                    }: TreeNodeRendererProps) => {
                        return (
                            <Box {...getNodeProps({ onClick: handleExpand })}>
                                <Box
                                    direction="row"
                                    gap="small"
                                    align="center"
                                    pad={'5px'}
                                    margin={{ left: `${20 * (level - 1)}px` }}
                                    {...(isSelected && { background: `${theme.global.colors.secondary}75` })}
                                    onClick={(e) => {
                                        router.push(`${element?.url}`);
                                        handleSelect(e);
                                    }}
                                >
                                    {isBranch ? (
                                        isExpanded && element.children.length === 0 ? (
                                            <StyledSpinner size="3px" color={'secondary'} />
                                        ) : isExpanded ? (
                                            <FormDown />
                                        ) : (
                                            <FormNext />
                                        )
                                    ) : (
                                        <FormNext color="transparent" />
                                    )}
                                    {element.type ? dataIconMap[Data[element.type]] : <CircleQuestion />}
                                    <Text size="15px">{element.name}</Text>
                                </Box>
                            </Box>
                        );
                    }}
                />
            </StyledBox>
        </Box>
    );
};
