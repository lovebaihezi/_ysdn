import { Tag } from 'antd';
import React, { FC } from 'react';
import { useHistory } from 'react-router';

const TagLink: FC<{
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    link: string;
}> = (prop) => {
    const H = useHistory();
    function f(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
        H.push(prop.link);
    }
    return (
        <div onClick={prop.onClick ?? f}>
            <Tag color="#108ee9">{prop.children}</Tag>
        </div>
    );
};

export default TagLink;
