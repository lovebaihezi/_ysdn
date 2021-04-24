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
        <Row>
            <Col span={12} offset={6}>
                <Carousels autoplay>
                    {imgUrls.map((url) => (
                        <img
                            key={url.concat(new Date().toISOString())}
                            src={url}
                            alt="960*480 picture"
                        />
                    ))}
                </Carousels>
            </Col>
        </Row>
    );
}
