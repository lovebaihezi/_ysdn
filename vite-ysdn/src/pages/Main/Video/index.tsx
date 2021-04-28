import { Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import TagSwitch, { InnerTag, useTag } from '../../../component/TagSwitch';
import { useFetchProps } from '../../../tools/hook/useFetch';
import PagedVideo from './pagedVideo';

// const MainContain: FC<{ OuterTag: string }> = ({ OuterTag }) => {
//     const tag = useTag();
//     const Request: useFetchProps = {
//         url: baseurl + `/article/${OuterTag}/${tag}`,
//     };
//     return useMemo(() => <Ajax Request={Request} Component={PagedArticles} />, [
//         tag,
//         OuterTag,
//     ]);
// };

const MainContain: FC<{ OuterTag: string }> = ({ OuterTag }) => {
    const tab = useTag();
    const Request: useFetchProps = {
        url: baseurl + `/video/${OuterTag}/${tab}`,
    };
    return useMemo(() => <Ajax Request={Request} Component={PagedVideo} />, [
        tab,
    ]);
};

export default function Video() {
    return (
        <Row>
            <Col span={22} offset={1}>
                <TagSwitch
                    tags={[
                        'all',
                        'recommend',
                        'front-end',
                        'client-side',
                        'server-side',
                        'QA',
                        'media',
                        'algorithm',
                        'data',
                        'common',
                        'product',
                        'security',
                        'project',
                    ]}
                    tabBarExtraContent={<Link to="/update/video">submit</Link>}
                >
                    <InnerTag
                        Component={MainContain}
                        tags={['Hottest', 'Newest']}
                    />
                </TagSwitch>
            </Col>
        </Row>
    );
}
