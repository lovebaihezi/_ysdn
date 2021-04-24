import { Button } from 'antd';
import React, { FC, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

export const FollowButton: FC<{ amount: number; initial: boolean }> = ({
    amount,
}) => {
    const [] = useState();
    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
            }}
            type="default"
        >
            follow
            <PlusOutlined />
        </Button>
    );
};
