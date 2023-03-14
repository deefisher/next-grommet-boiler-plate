import React, { useContext } from 'react';
import { BoxTypes, Card, CardBody, CardFooter, CardHeader, Heading, Paragraph, ResponsiveContext } from 'grommet';

export interface CardTemplateProps extends BoxTypes {
    /** title for card template */
    title: string;
}
/** CardTemplate that... */
export const CardTemplate = ({ title, ...props }: CardTemplateProps) => {
    const size = useContext(ResponsiveContext);

    return (
        <Card {...props}>
            <CardHeader pad="medium">
                <Heading level={2} margin="none">
                    {title}
                </Heading>
            </CardHeader>
            <CardBody pad="medium">
                <Paragraph maxLines={size === 'small' ? 3 : undefined}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor non nulla ac vehicula.
                    Aliquam erat volutpat. Mauris auctor faucibus est at mattis. Aliquam a enim ac nisi aliquam
                    consectetur et ac velit. Mauris ut imperdiet libero.
                </Paragraph>
            </CardBody>
            <CardFooter pad="medium" background="background-contrast">
                Footer
            </CardFooter>
        </Card>
    );
};
