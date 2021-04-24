import { Button, Col, Row } from 'antd';
import React, { FC, useState } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const CommentButton: FC<{
    link: string;
    amount: number;
}> = ({ amount, link }) => (
    <Link
        onClick={(e) => {
            e.stopPropagation();
        }}
        to={link}
    >
        <Button type="link">
            <CommentOutlined />
            {amount}
        </Button>
    </Link>
);
