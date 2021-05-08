import React from 'react';
import { Carousel as Carousels, Col, Image, Row } from 'antd';
import './Carousel.css';

const width = 960;
const height = 480;

const imgUrls = [
    `http://127.0.0.1:8080/picture/c1.png`,
    `http://127.0.0.1:8080/picture/c2.png`,
    `http://127.0.0.1:8080/picture/c3.png`,
];

export default function Carousel() {
    return (
        <Row>
            <Col style={{ width, margin: '0 auto' }}>
                <Carousels autoplay>
                    {imgUrls.map((url) => (
                        <img
                            key={url.concat(new Date().toISOString())}
                            src={url}
                            alt="picture"
                            width={width}
                            height={height}
                        />
                    ))}
                </Carousels>
            </Col>
        </Row>
    );
}
