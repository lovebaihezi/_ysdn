import { Row, Col, Skeleton } from 'antd';
import React, { lazy, Suspense } from 'react';
import NavBar from '../../../component/NavBar';
import Carousel from './carousel';
const IndexArticle = lazy(() => import('./Recommend/article'));
const IndexQA = lazy(() => import('./Recommend/qa'));
const IndexMo = lazy(() => import('./Recommend/monograph'));
const IndexVideo = lazy(() => import('./Recommend/video'));

export default function IndexPage() {
    return (
        <Row>
            <Col span={24}>
                <Carousel />
            </Col>
            <Col span={22} offset={1}>
                <Suspense fallback={<Skeleton />}>
                    <IndexMo />
                </Suspense>
            </Col>
            <Col span={22} offset={1}>
                <Suspense fallback={<Skeleton />}>
                    <IndexArticle />
                </Suspense>
            </Col>
            <Col span={22} offset={1}>
                <Suspense fallback={<Skeleton />}>
                    <IndexQA />
                </Suspense>
            </Col>
            <Col span={22} offset={1}>
                <Suspense fallback={<Skeleton />}>
                    <IndexVideo />
                </Suspense>
            </Col>
            <Col span={22} offset={1}></Col>
        </Row>
    );
}
