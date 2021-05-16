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
        url: baseurl + `/video/choose/${OuterTag}/${tab}`,
    };
    return useMemo(
        () => <Ajax Request={Request} Component={PagedVideo} />,
        [tab],
    );
};

export default function Video() {
    return (
        <Row>
            <Col span={22} offset={1}>
                <TagSwitch
                    tags={[
                        'all',
                        // 'recommend',
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
                    title={[
                        '全部',
                        '前端',
                        '客户端',
                        '服务端',
                        '问答',
                        '媒体',
                        '算法',
                        '数据',
                        '通识',
                        '产品',
                        '安全',
                        '工程',
                    ]}
                    tabBarExtraContent={<Link to="/update/video">submit</Link>}
                >
                    <InnerTag
                        Component={MainContain}
                        tags={['Hottest', 'Newest']}
                        title={['最热','最新']}
                    />
                </TagSwitch>
            </Col>
        </Row>
    );
}
