import { Button, Col, Row } from 'antd';
import React, { FC, useState } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

export const CommentButton: FC<{
    link: string;
    amount: number;
}> = ({ amount, link }) => {
    const H = useHistory();
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                H.push(link);
            }}
        >
            <Button type="link">
                <CommentOutlined />
                {amount}
            </Button>
        </div>
    );
};
