import Avatar from 'antd/lib/avatar/avatar';
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './avatarLink.css';

const AvatarLink: FC<
    LinkProps<unknown> &
        React.RefAttributes<HTMLAnchorElement> & { src?: string } & {
            name: string;
        }
> = (prop) => {
    function f(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation();
    }
    return (
        <Link
            className="avatarLink"
            style={{ color: 'unset' }}
            onClick={f}
            {...prop}
        >
            {prop.src !== undefined ? <Avatar src={prop.src} /> : null}
            <span className="avatarLinkSpan">{prop.name}</span>
        </Link>
    );
};

export default AvatarLink;
