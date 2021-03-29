import React, { useEffect } from 'react';
import { Badge, Button, Col, Row, Tag } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useFetchJson } from '../../tools/hook/useFetch';

import {
    MinusCircleFilled,
    CommentOutlined,
    LikeOutlined,
    StarOutlined,
    EyeOutlined,
    LikeFilled,
    StarFilled,
} from '@ant-design/icons';
import { AjaxJson } from '../../interface';
import { MouseEventHandler } from 'react';
import { useAuth } from '../../auth';

const iconStyle = { fontSize: 20 };

const CardTag: FC<{ name: string }> = ({ name }) => (
    <Link to={`/tags/${name}`}>
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

type limit = {
    read: number;
    tags?: AjaxJson.tag[];
    title: string;
    commentsAmount: number;
    liked: boolean;
    marked: boolean;
    id: string;
};

function CardAction<T extends limit>(content: T) {
    const { read, tags, title, commentsAmount, liked, marked, id } = content;
    const user = useAuth();
    const { Account } = user ? user : { Account: { auth: 'denied' } };
    const { auth } = Account ?? { auth: 'denied' };
    const [[r], f, c] = useFetchJson<{ liked: boolean }>({
        url: `/${auth}/like/${id}`,
        option: { method: liked ? 'DEL' : 'PUT' },
    });
    const [[R], F, C] = useFetchJson<{ marked: boolean }>({
        url: `/${auth}/mark/${id}`,
        option: { method: marked ? 'DEL' : 'PUT' },
    });
    return (
        <Row wrap={false}>
            <Col span={9} offset={1}>
                {tags !== undefined ? (
                    tags.map((v) => (
                        <Col
                            key={v.name}
                            span={24 / tags.length > 4 ? 4 : 24 / tags.length}
                        >
                            <CardTag name={v.name} />
                        </Col>
                    ))
                ) : (
                    <MinusCircleFilled />
                )}
            </Col>
            <Col span={10} offset={4}>
                <Row wrap={false}>
                    <Col span={4} offset={1}>
                        {read !== undefined ? (
                            <CardRead amount={read} />
                        ) : (
                            <MinusCircleFilled />
                        )}
                    </Col>
                    <Col span={4} offset={1}>
                        {title !== undefined &&
                        commentsAmount !== undefined &&
                        id !== undefined ? (
                            <CardComment
                                link={id.toString()}
                                amount={commentsAmount}
                            />
                        ) : (
                            <MinusCircleFilled />
                        )}
                    </Col>
                    <Col span={4} offset={1}>
                        {liked !== undefined ? (
                            <LikeButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    f();
                                }}
                                initial={r?.liked ?? liked}
                            />
                        ) : (
                            <MinusCircleFilled />
                        )}
                    </Col>
                    <Col span={4} offset={1}>
                        {marked !== undefined ? (
                            <MarkButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    F();
                                }}
                                initial={R?.marked ?? marked}
                            />
                        ) : (
                            <MinusCircleFilled />
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default CardAction;
