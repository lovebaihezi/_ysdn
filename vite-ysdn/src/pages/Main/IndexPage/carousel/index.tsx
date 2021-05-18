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
            <Col style={{ margin: '0 auto' }}>
                <Row>
                    <Col style={{ width }} flex="auto">
                        <Carousels autoplay>
                            <img
                                src={imgUrls[0]}
                                alt="picture"
                                width={width}
                                height={height}
                            />
                            <img
                                src={imgUrls[1]}
                                alt="picture"
                                width={width}
                                height={height}
                            />
                            <img
                                src={imgUrls[2]}
                                alt="picture"
                                width={width}
                                height={height}
                            />
                        </Carousels>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
