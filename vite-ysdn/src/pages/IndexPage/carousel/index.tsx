import React from 'react';
import { Carousel as Carousels, Col, Row } from 'antd';
import './Carousel.css';

const imgUrls = [
    'https://dummyimage.com/960x480',
    'https://dummyimage.com/960x480',
    'https://dummyimage.com/960x480',
];

export default function Carousel() {
    return (
        <Carousels autoplay>
            {imgUrls.map((url) => (
                <Row key={url.concat(new Date().toISOString())}>
                    <Col className="carousel" span={12} offset={6}>
                        <img src={url} alt="960*480 picture" />
                    </Col>
                </Row>
            ))}
        </Carousels>
    );
}
