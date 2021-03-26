import React from 'react';
import { Badge, Button, Col, Row, Tag } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useFetchJson } from '../../tools/hook/useFetch';

import {
    CommentOutlined,
    LikeOutlined,
    StarOutlined,
    EyeOutlined,
    LikeFilled,
    StarFilled,
} from '@ant-design/icons';
import { AjaxJson } from '../../interface';
import { MouseEventHandler } from 'react';

const iconStyle = { fontSize: 20 };

const CardTag: FC<{ name: string }> = ({ name }) => (
    <Link to={`/tags/ + ${name}`}>
        <Tag color="#108ee9">{name}</Tag>
    </Link>
);

const CardComment: FC<{ link: string; amount: number }> = ({
    link,
    amount,
}) => (
    <Link to={'/' + link + '/comments'}>
        <Badge count={amount}>
            <CommentOutlined style={iconStyle} />
        </Badge>
    </Link>
);

const LikeButton: FC<{
    initial: boolean;
    onClick: MouseEventHandler<HTMLSpanElement>;
}> = ({ initial, onClick }) => {
    return initial ? (
        <LikeFilled onClick={onClick} style={iconStyle} />
    ) : (
        <LikeOutlined onClick={onClick} style={iconStyle} />
    );
};

const MarkButton: FC<{
    initial: boolean;
    onClick: MouseEventHandler<HTMLSpanElement>;
}> = ({ initial, onClick }) => {
    return initial ? (
        <StarFilled onClick={onClick} style={iconStyle} />
    ) : (
        <StarOutlined onClick={onClick} style={iconStyle} />
    );
};

const CardRead: FC<{ amount: number }> = ({ amount } = { amount: 0 }) => (
    <Badge count={amount} size="small" showZero={true}>
        <EyeOutlined style={iconStyle} />
    </Badge>
);

function CardAction<T extends Partial<AjaxJson.production>>(prop: T) {
    const { read, tags, title, commentsAmount, liked, marked, id } = prop;
    const [[r], f, c] = useFetchJson<{ liked: boolean }>({
        url: '',
        option: {},
    });
    const [[R], F, C] = useFetchJson<{ marked: boolean }>({
        url: '',
        option: {},
    });
    return (
        <Row wrap={false}>
            <Col span={10}>
                {tags !== undefined &&
                    tags.map((v) => <CardTag name={v.name} />)}
            </Col>
            <Col span={10} offset={4}>
                <Row wrap={false}>
                    <Col span={4} offset={1}>
                        {read !== undefined && <CardRead amount={read} />}
                    </Col>
                    <Col span={4} offset={1}>
                        {title !== undefined &&
                            commentsAmount !== undefined &&
                            id !== undefined && (
                                <CardComment
                                    link={id.toString()}
                                    amount={commentsAmount}
                                />
                            )}
                    </Col>
                    <Col span={4} offset={1}>
                        {liked !== undefined && (
                            <LikeButton
                                onClick={() => {
                                    f();
                                }}
                                initial={r?.liked ?? liked}
                            />
                        )}
                    </Col>
                    <Col span={4} offset={1}>
                        {marked !== undefined && (
                            <MarkButton
                                onClick={() => {
                                    F();
                                }}
                                initial={R?.marked ?? marked}
                            />
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CardAction;
