import { Carousel as Carousels } from 'antd';

const contentStyle = {
    height: 320,
    color: '#fff',
    lineHeight: '320px',
    textAlgin: 'center',
    display: 'flex',
    justifyContent: 'center',
    background: '#364d79',
};

export default function Carousel() {
    return (
        <div
            style={{
                width: '100%',
                height: 320,
                padding: '24px 0',
                display: 'flex',
                justifyContent: 'center',
            }}>
            <Carousels style={{ maxWidth: 960, height: 320 }}>
                <div>
                    <code style={contentStyle}>1</code>
                </div>
                <div>
                    <code style={contentStyle}>2</code>
                </div>
                <div>
                    <code style={contentStyle}>3</code>
                </div>
            </Carousels>
        </div>
    );
}
