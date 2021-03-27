import React from 'react';
import { Carousel as Carousels, Col, Row, Image } from 'antd';
import './Carousel.css';

const imgUrls = [
    'https://dummyimage.com/960x320',
    'https://dummyimage.com/960x320',
    'https://dummyimage.com/960x320',
];

export default function Carousel() {
    return (
        <Carousels autoplay>
            {imgUrls.map((url) => (
                <Row key={url.concat(new Date().toISOString())}>
                    <Col span={12} offset={6}>
                        <Image src={url} alt="960*320 picture" />
                    </Col>
                </Row>
            ))}
        </Carousels>
    );
}
