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
        url: baseurl + `/article/${OuterTag}/${tag}`,
    };
    return useMemo(() => <Ajax Request={Request} Component={PagedArticles} />, [
        tag,
        OuterTag,
    ]);
};

export default function Article() {
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
                    RightSideContent={<Extra />}
                >
                    <InnerTag
                        tags={['Hottest', 'Newest']}
                        Component={MainContain}
                    />
                </TagSwitch>
            </Col>
        </Row>
    );
}
