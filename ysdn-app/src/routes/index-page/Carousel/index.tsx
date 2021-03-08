import { Carousel as Carousels } from 'antd';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlgin: 'center',
    display: 'flex',
    justifyContent: 'center',
    background: '#364d79',
};

export default function Carousel() {
    return (
        // <Container maxWidth="md" style={{ padding: '24px' }}>
        <Carousels>
            <div>
                <h3 style={contentStyle}>
                    <code style={{ textAlign: 'center' }}>1</code>
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <code style={{ textAlign: 'center' }}>2</code>
                </h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    <code style={{ textAlign: 'center' }}>3</code>
                </h3>
            </div>
        </Carousels>
        // </Container>
    );
}
