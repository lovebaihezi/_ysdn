import { FC } from 'react';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
    MinusCircleFilled,
    CommentOutlined,
    LikeOutlined,
    StarOutlined,
    EyeOutlined,
    LikeFilled,
    StarFilled,
} from '@ant-design/icons';
import { useAuth } from '../../auth';
import { MouseEventHandler } from 'react';
import { AjaxJson } from '../../interface';
import { Badge, Button, Card, Col, Row, Tag } from 'antd';
import { useFetchJson } from '../../tools/hook/useFetch';

function forbidden(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
}

const iconStyle = { fontSize: 20 };

const CardTag: FC<{ name: string }> = ({ name }) => (
    <Tag
        color="#108ee9"
        onClick={(e) => {
            forbidden(e);
            location.href = `/tags/${name}`;
        }}
    >
        {name}
    </Tag>
);

const CardComment: FC<{ link: string; amount: number }> = ({
    link,
    amount,
}) => (
    <Row
        onClick={(e) => {
            forbidden(e);
            location.href = `/${link}`;
        }}
    >
        <Col span={24}>
            <CommentOutlined style={iconStyle} />
        </Col>
    </Row>
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

const CardRead: FC<{ amount: number }> = ({ amount }) => (
    // <Badge count={amount} size="small" showZero={true}>
    <Row>
        <Col span={12}>
            <EyeOutlined style={iconStyle} />
        </Col>
        <Col span={10} offset={1}>
            {amount}
        </Col>
    </Row>
    // </Badge>
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

function CardAction<T extends limit>(
    content: T,
    type: 'articles' | 'monographic' | 'videos' | 'QAs',
) {
    const { read, tags, title, commentsAmount, liked, marked, id } = content;
    const user = useAuth();
    const [[r], f, c] = useFetchJson<{ liked: boolean }>({
        url: `/${user}/like/${id}`,
        option: { method: liked ? 'DEL' : 'PUT' },
    });
    const [[R], F, C] = useFetchJson<{ marked: boolean }>({
        url: `/${user}/mark/${id}`,
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
            <Col span={10} offset={2}>
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
                                link={`${type}/${id.toString()}`}
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
                                    forbidden(e);
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
                                    forbidden(e);
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
