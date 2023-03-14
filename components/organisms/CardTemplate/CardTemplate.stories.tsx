import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardTemplate } from '.';

export default {
    title: 'General/CardTemplate',
    component: CardTemplate,
} as ComponentMeta<typeof CardTemplate>;

const Template: ComponentStory<typeof CardTemplate> = (args) => <CardTemplate {...args} />;

export const Default = Template.bind({});
Default.args = { title: 'Hello' };
