import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './MenuLink.css';

export const MenuLink: FC<LinkProps<History>> = (prop) => {
    return (
        <Link className="Link" {...prop}>
            {prop.children}
        </Link>
    );
};
