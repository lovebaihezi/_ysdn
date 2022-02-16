import { Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import TagSwitch, { InnerTag, useTag } from '../../../component/TagSwitch';
import { useFetchProps } from '../../../tools/hook/useFetch';
import PagedArticles from './pagedArticles';
import Extra from './rightSide';

const MainContain: FC<{ OuterTag: string }> = ({ OuterTag }) => {
    const tag = useTag();
    const Request: useFetchProps = {
        url: baseurl + `/article/choose/${OuterTag}/${tag}`,
    };
    return useMemo(
        () => <Ajax Request={Request} Component={PagedArticles} />,
        [tag, OuterTag],
    );
};

export default function Article() {
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
                    RightSideContent={<Extra />}
                >
                    <InnerTag
                        tags={['Hottest', 'Newest']}
                        title={['最热', '最新']}
                        Component={MainContain}
                    />
                </TagSwitch>
            </Col>
        </Row>
    );
}
