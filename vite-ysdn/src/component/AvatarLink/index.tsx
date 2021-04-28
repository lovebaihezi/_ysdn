import Avatar from 'antd/lib/avatar/avatar';
import React, { FC } from 'react';
import { Link, LinkProps, useHistory } from 'react-router-dom';

import './avatarLink.css';

const AvatarLink: FC<
    { onClick?: React.MouseEventHandler<HTMLDivElement> } & {
        src?: string;
    } & {
        name: string;
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
            onClick={prop.onClick ?? f}
            {...prop}
        >
            {prop.src !== undefined ? <Avatar src={prop.src} /> : null}
            <span className="avatarLinkSpan">{prop.name}</span>
        </div>
    );
};

export default AvatarLink;
