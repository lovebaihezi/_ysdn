import { Button } from 'antd';
import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';

export const AnswerButton: FC<{ amount: number }> = ({ amount }) => (
    <Button
        onClick={(e) => {
            e.stopPropagation();
        }}
        type="primary"
    >
        Answer:{amount}
        <EditOutlined />
    </Button>
);
