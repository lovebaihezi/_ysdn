import { Button, Col, Row } from 'antd';
import React, { FC, useState } from 'react';
import { StarOutlined, StarFilled } from '@ant-design/icons';

export const MarkButton: FC<{
    onClick?: (state?: boolean, amount?: number) => void;
    initial: boolean;
    amount: number;
}> = ({ onClick, initial, amount }) => {
    const [state, setState] = useState(initial);
    const [amounts, setAmounts] = useState(amount);
    return (
        <Row
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Col span={24}>
                <Button
                    onClick={(e) => {
                        setState(!state);
                        if (state) {
                            setAmounts(amounts - 1);
                        } else {
                            setAmounts(amounts + 1);
                        }
                        onClick && onClick(state, amounts);
                    }}
                    type="link"
                >
                    {state ? <StarFilled /> : <StarOutlined />}
                    {amounts}
                </Button>
            </Col>
        </Row>
    );
};
