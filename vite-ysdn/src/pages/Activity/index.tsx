import { Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { baseurl } from '../../auth';
import Ajax from '../../component/AjaxResponse';
import TagSwitch, { useTag } from '../../component/tagSwitch';
import { useFetchProps } from '../../tools/hook/useFetch';

import PagedActivities from './pagedActivities';

const MainContain: FC = () => {
    const tag = useTag();
    const Request: useFetchProps = {
        url: baseurl + `/activity/tags/${tag}`,
        option: {
            method: 'POST',
        },
    };
    return useMemo(
        () => <Ajax Request={Request} Component={PagedActivities} />,
        [tag],
    );
};

export default function Activities() {
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
                >
                    <TagSwitch tags={['Hottest', 'Newest']}>
                        <MainContain />
                    </TagSwitch>
                </TagSwitch>
            </Col>
        </Row>
    );
}
