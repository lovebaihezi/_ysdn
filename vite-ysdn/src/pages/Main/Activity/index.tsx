import { Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import TagSwitch, { InnerTag, useTag } from '../../../component/TagSwitch';
import { useFetchProps } from '../../../tools/hook/useFetch';

import PagedActivities from './pagedActivities';

const MainContain: FC<{ OuterTag: string }> = ({ OuterTag }) => {
    const tag = useTag();
    const Request: useFetchProps = {
        url: baseurl + `/activity/${OuterTag}/${tag}`,
    };
    return useMemo(
        () => <Ajax Request={Request} Component={PagedActivities} />,
        [tag, OuterTag],
    );
};

//todo :
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
                    <InnerTag
                        tags={['Hottest', 'Newest']}
                        Component={MainContain}
                    />
                </TagSwitch>
            </Col>
        </Row>
    );
}
