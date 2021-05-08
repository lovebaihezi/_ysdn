import React, { FC } from 'react';
import { useParams } from 'react-router';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import { useFetchProps } from '../../../tools/hook/useFetch';
import Info from './info';

export default function User() {
    const { username } = useParams<{ username: string }>();
    const RequestInfo: useFetchProps = {
        url: baseurl + `/user/${username}`,
    };
    return <Ajax Request={RequestInfo} Component={Info} />;
}
