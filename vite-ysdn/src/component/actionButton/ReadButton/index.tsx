import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EyeFilled } from '@ant-design/icons';
import { Button } from 'antd';

export const ReadButton: FC<{ amount: number; link: string }> = ({
    amount,
    link,
}) => {
    const H = useHistory();
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                H.push(link);
            }}
        >
            <Button type="link">
                <EyeFilled />
                {amount}
            </Button>
        </div>
    );
};
