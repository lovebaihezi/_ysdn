import { Col, Row } from 'antd';
import React, { FC, useState } from 'react';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';

export const LikeButton: FC<{
    onClick: CallableFunction;
    initial: boolean;
    amount: number;
}> = ({ onClick, initial, amount }) => {
    const [state, setState] = useState(initial);
    const [amounts, setAmounts] = useState(amount);
    return (
        <Row
            onClick={() => {
                setState(!state);
                if (state) {
                    setAmounts(amounts - 1);
                } else {
                    setAmounts(amounts + 1);
                }
                onClick();
            }}
        >
            <Col span={24} className="actionButton">{state ? <LikeFilled /> : <LikeOutlined />}</Col>
        </Row>
    );
};
