import { Carousel as Carousels } from 'antd';
import { CSSProperties } from 'react';

const contentStyle: CSSProperties & { textAlgin: string } = {
    width: '100%',
    maxWidth: 960,
    minWidth: 320,
    height: '50vh',
    color: '#fff',
    lineHeight: '50vh',
    textAlgin: 'center',
    display: 'flex',
    justifyContent: 'center',
    background: '#364d79',
};

export default function Carousel() {
    return (
        <div
            style={{
                width: 'calc(100% - 100px)',
                height: '50vh',
                margin: '48px  50px',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Carousels
                style={{ width: '50vw', minWidth: 320, maxWidth: '1280' }}
                autoplay
            >
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
