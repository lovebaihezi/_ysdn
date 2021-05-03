import Avatar from 'antd/lib/avatar/avatar';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import './avatarLink.css';

const AvatarLink: FC<
    { onClick?: React.MouseEventHandler<HTMLDivElement> } & {
        src?: string;
        name: string;
        nickname: string;
    }
> = (prop) => {
    const H = useHistory();
    function f(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        H.push(`/user/${prop.name}`);
    }
    return (
        <div
            className="avatarLink"
            style={{ color: 'unset' }}
            onClick={(e) => {
                e.stopPropagation();
                prop.onClick ? prop.onClick(e) : f(e);
            }}
            {...prop}
        >
            {prop.src !== undefined ? <Avatar src={prop.src} /> : null}
            <span className="avatarLinkSpan">{prop.nickname}</span>
        </div>
    );
};

export default AvatarLink;
