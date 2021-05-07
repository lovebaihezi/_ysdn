import { Card, Col, Row } from 'antd';
import React, { FC } from 'react';
import { useParams } from 'react-router';
import { baseurl } from '../../auth';
import Ajax, { Component } from '../../component/AjaxResponse';
import UserLink from '../../component/UserLink';
import { AjaxJson } from '../../interface';
import PagedArticles from '../Main/Article/pagedArticles';
import PagedVideos from '../Main/Video/pagedVideo';

// function fold<T>(array: T[],time = 2) : [T[]][] {
//     if(time < 1) {
//         throw new Error('ParamError: the second param should not less than 1')
//     }
//     let i = 0;
//     const final = [];
//     for(;i < array.length;i++) {
//         const each = [];
//         for(let j = 0;j < time;j++) {
//             if(j + time > array.length) {

//             }
//         }
//     }
// }

// function *fold2<T>(array: T[]) {
//     for(let i = 0;i < array.length;i++) {

//     }
// }

const PageUser: Component<AjaxJson.userInfo[]> = ({ Response }) => {
    return (
        <Row>
            <Col span={22} offset={1}>
                {Response.map((user) => (
                    <Card>
                        <UserLink user={user} />
                    </Card>
                ))}
            </Col>
        </Row>
    );
};

const SearchResult: Component<{
    article: AjaxJson.article[];
    user: AjaxJson.userInfo[];
    video: AjaxJson.video[];
}> = ({ Response }) => {
    return (
        <>
            <Row>
                <Col span={4} offset={10}>
                    <Card>
                        find :
                        <strong style={{ padding: 10 }}>
                            {Object.values(Response).reduce(
                                (prev, v) => prev + v.length,
                                0,
                            )}
                        </strong>
                        result
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <PagedArticles Response={Response.article} />
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <PageUser Response={Response.user} />
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <PagedVideos Response={Response.video} />
                </Col>
            </Row>
        </>
    );
};

const Search: FC = () => {
    const { value } = useParams<{ value: string }>();
    return (
        <Ajax
            Request={{ url: baseurl + `/search/${value}` }}
            Component={SearchResult}
        />
    );
};

export default Search;
