import { Button, Col, Row } from 'antd';
import React, { FC, useState } from 'react';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { useFetchJson } from '../../../tools/hook/useFetch';

export const LikeButton: FC<{
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
                    {state ? <LikeFilled /> : <LikeOutlined />}
                    {amounts}
                </Button>
            </Col>
        </Row>
    );
};
