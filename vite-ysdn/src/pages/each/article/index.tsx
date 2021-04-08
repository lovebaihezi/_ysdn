import { Skeleton, Spin } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import { useFetchProps } from '../../../tools/hook/useFetch';
import Render from './Render';

export default function ArticlePage() {
    const { id } = useParams<{ id: string }>();
    const RequestInfo: useFetchProps = {
        url: baseurl + `/article/${id}`,
        option: {},
    };
    return (
        <>
            <Ajax
                Request={RequestInfo}
                Component={Render}
                Waiting={() => <Spin size="large" />}
            />
        </>
    );
}
