import { Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import TagSwitch, { useTag } from '../../../component/tagSwitch';
import { useFetchProps } from '../../../tools/hook/useFetch';
import PagedArticles from './pagedArticles';
import Extra from './rightSide';

const MainContain: FC = () => {
    const tab = useTag();
    const Request: useFetchProps = {
        url: baseurl + `/article/tags/${tab}`,
        option: {
            method: 'POST',
        },
    };
    return useMemo(() => <Ajax Request={Request} Component={PagedArticles} />, [
        tab,
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
                    <TagSwitch tags={['Hottest', 'Newest']}>
                        <MainContain />
                    </TagSwitch>
                </TagSwitch>
            </Col>
        </Row>
    );
}
