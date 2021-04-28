import { Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import TagSwitch, { useTag } from '../../../component/TagSwitch';
import { useFetchProps } from '../../../tools/hook/useFetch';
import PagedArticles from './pagedQA';
import Extra from './rightSide';

const MainContain: FC = () => {
    const tag = useTag();
    const Request: useFetchProps = {
        url: baseurl + `/QA/tags/${tag}`,
        option: {
            method: 'POST',
        },
    };
    return useMemo(() => <Ajax Request={Request} Component={PagedArticles} />, [
        tag,
    ]);
};

export default function QA() {
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
                    <TagSwitch tags={['Hottest', 'Newest']}>
                        <MainContain />
                    </TagSwitch>
                </TagSwitch>
            </Col>
        </Row>
    );
}
