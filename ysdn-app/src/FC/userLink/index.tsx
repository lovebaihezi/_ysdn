import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { AjaxJson } from '../../interface';

export default function UserLink({ v }: { v: AjaxJson.userInfo }) {
    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                location.href = `/user/${v.Account.auth}`;
            }}
        >
            <Avatar src={v.avatarUrl} />
        </div>
    );
}
