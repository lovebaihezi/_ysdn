import React from 'react';
import { Spin } from 'antd';
import { FC, lazy, Suspense } from 'react';

const LogoImg = lazy(() => import('./Logo'));

export const Logo: FC = () => (
    <Suspense fallback={<Spin size="default" />}>
        <LogoImg />
    </Suspense>
);
