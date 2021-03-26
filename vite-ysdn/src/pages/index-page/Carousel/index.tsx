import React from 'react';
import { Carousel as Carousels, Col, Row } from 'antd';
import './Carousel.css';

const imgUrls = [
    'https://i.pinimg.com/564x/b7/36/59/b736594911c4ffe7e1d9d2ba93511873.jpg',
    'https://i.pinimg.com/564x/b1/5d/f3/b15df3f3b2ad53b5dcc3e87a4edbb3c1.jpg',
];

export default function Carousel() {
    return (
        <Carousels autoplay>
            {imgUrls.map((url) => (
                <Row key={url.slice(10, 20)}>
                    <Col span={12} offset={6}>
                        <div
                            className="autoImg"
                            style={{
                                height: '50vh',
                                minHeight: 480,
                                width: '100%',
                                backgroundImage: `url(${url})`,
                            }}
                        ></div>
                    </Col>
                </Row>
            ))}
        </Carousels>
    );
}
