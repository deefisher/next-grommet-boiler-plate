import { Box, BoxProps, Button, Form, FormField, Text, TextInput } from 'grommet';
import { AddCircle } from 'grommet-icons';
import React from 'react';
import nextId, { useId } from 'react-id-generator';
import styled from 'styled-components';

const StyledFormField = styled(FormField)`
    flex-direction: row;
    align-items: center;
    & > div {
        border: solid 1px rgba(0, 0, 0, 0.33);
        border-radius: 4px;
    }
    & > label {
        width: 120px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow-x: hidden;
    }
`;

export interface EditDataFormProps extends BoxProps {
    /** Object containing current values */
    values: { [key: string]: string };
    /** EditDataForm component children */
    children?: React.ReactNode;
}

export const a11yTitle_EditDataForm = 'Edit Data Form';

/** EditDataForm that allows for dynamic update of data */
export const EditDataForm = ({ values, ...props }: EditDataFormProps) => {
    const [formData, setFormData] = React.useState({ ...values });
    const [showNewRow, setShowNewRow] = React.useState(false);

    const initialIdList = useId(Object.values(values)?.length);
    const [idList, setIdList] = React.useState(initialIdList);

    const [newKeyValue, setNewKeyValue] = React.useState('');
    const onChangeNewKey = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewKeyValue(e.target.value);
    }, []);

    const [newValue, setNewValue] = React.useState('');
    const onChangeNewValue = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.target.value);
    }, []);

    const onAcceptNewData = React.useCallback(() => {
        setShowNewRow(false);
        setIdList([...idList, nextId()]);
        setFormData({ ...formData, [newKeyValue]: newValue });
    }, [newKeyValue, newValue, formData, idList]);

    const fieldIdPrefix = 'data-edit-input';

    return (
        <Box a11yTitle={a11yTitle_EditDataForm} pad={'medium'} {...props}>
            <Form
                value={formData}
                onChange={(nextValue) => setFormData(nextValue)}
                onReset={() => setFormData({ ...values })}
                onSubmit={({ value }) => {
                    alert(JSON.stringify(value, null, 2));
                }}
            >
                <>
                    {Object.keys(formData).map((key, i) => {
                        return (
                            <Box
                                key={`${fieldIdPrefix}-${idList[i]}`}
                                direction="row"
                                justify="between"
                                align="center"
                                gap="small"
                            >
                                <StyledFormField
                                    dir="row"
                                    name={key}
                                    htmlFor={`${fieldIdPrefix}-${idList[i]}`}
                                    label={key}
                                    {...(i === Object.keys(formData)?.length - 1 && { margin: '0px' })}
                                >
                                    <TextInput id={`${fieldIdPrefix}-${idList[i]}`} name={key} />
                                </StyledFormField>
                                {i === Object.keys(formData)?.length - 1 && (
                                    <Button
                                        plain
                                        onClick={() => setShowNewRow(true)}
                                        label={
                                            <Box fill>
                                                <AddCircle color={showNewRow ? 'transparent' : '#444444'}></AddCircle>
                                            </Box>
                                        }
                                    />
                                )}
                            </Box>
                        );
                    })}
                    {showNewRow && (
                        <Box pad={'small'} direction="row" gap="small" align="center">
                            <Box width={'120px'}>
                                <TextInput onChange={onChangeNewKey} />
                            </Box>
                            <Box>
                                <TextInput onChange={onChangeNewValue} />
                            </Box>
                            <Button
                                onClick={onAcceptNewData}
                                label={
                                    <Box fill>
                                        <Text>Ok</Text>
                                    </Box>
                                }
                            />
                        </Box>
                    )}
                    <Box justify="between" direction="row" gap="medium" margin={{ top: 'large' }}>
                        <Button type="reset" label="Reset" />
                        <Button type="submit" primary label="Submit" />
                    </Box>
                </>
            </Form>
        </Box>
    );
};
