import { Col, Empty, Row } from 'antd';
import React, { useMemo } from 'react';
import { FC } from 'react';
import { baseurl, useUserDetail } from '../../../auth';
import Ajax, { Component } from '../../../component/AjaxResponse';
import TagSwitch, { InnerTag, useTag } from '../../../component/TagSwitch';
import { AjaxJson } from '../../../interface';
import { useFetchProps } from '../../../tools/hook/useFetch';

const ActivityComponent: Component<{ userList: AjaxJson.userInfo[] }> = ({
    Response,
}) => {
    return <></>;
};

const Activity: FC = () => {
    const [user] = useUserDetail();
    if (user === null) {
        return <Empty description={'你还未登录哦'} />;
    }
    return (
        <Ajax
            Request={{ url: baseurl + `/user/find/${user.username}/follow` }}
            Component={ActivityComponent}
        />
    );
};

export default Activity;
