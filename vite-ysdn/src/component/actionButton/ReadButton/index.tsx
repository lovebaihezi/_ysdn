import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { EyeFilled } from '@ant-design/icons';
import { Button } from 'antd';

export const ReadButton: FC<{ amount: number; link: string }> = ({
    amount,
    link,
}) => (
    <Link
        onClick={(e) => {
            e.stopPropagation();
        }}
        to={link}
    >
        <Button type="link">
            <EyeFilled />
            {amount}
        </Button>
    </Link>
);
