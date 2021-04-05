import { Tag } from 'antd';
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const TagLink: FC<
    LinkProps<unknown> &
        React.RefAttributes<HTMLAnchorElement>
> = (prop) => {
    function f(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.stopPropagation();
    }
    return (
        <Link onClick={f} {...prop}>
            <Tag color="#108ee9">{prop.children}</Tag>
        </Link>
    );
};

export default TagLink;
