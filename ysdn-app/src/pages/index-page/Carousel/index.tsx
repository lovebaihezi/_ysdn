import { Carousel as Carousels, Col, Row } from 'antd';
import './Carousel.css';

const imgUrls = [
    'https://i.pinimg.com/originals/8a/01/df/8a01df9729fa6b2913d97cb911b5afd3.jpg',
    'https://sun9-47.userapi.com/impf/c855528/v855528715/15b01a/EDnGkTad4YM.jpg?size=1440x2160&quality=96&sign=a9c4b53d8309f98bbb6a5b7596fa2b18&type=album',
    'https://i.pinimg.com/564x/35/22/47/352247cb8ec993df86990e9385678a8d.jpg',
    'https://i.pinimg.com/originals/c6/30/44/c63044d605cc0bb9d7554075226a32c9.jpg',
    'https://i.pinimg.com/564x/01/96/76/019676fea2dd62b7324320877d4f426d.jpg',
    'https://i.pinimg.com/564x/3b/12/d3/3b12d3a110ff8bff2ccbdadf015516f9.jpg',
    'https://i.pinimg.com/564x/c8/bd/c8/c8bdc8026ee90085e5cbc47fe46631f7.jpg',
    'https://i.pinimg.com/564x/b7/36/59/b736594911c4ffe7e1d9d2ba93511873.jpg',
    'https://i.pinimg.com/564x/b1/5d/f3/b15df3f3b2ad53b5dcc3e87a4edbb3c1.jpg',
];

export default function Carousel() {
    return (
        <Carousels autoplay>
            {imgUrls.map(url => (
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
