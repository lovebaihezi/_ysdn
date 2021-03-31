import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useToken } from '../../auth';
import { AjaxJson } from '../../interface';
import { useFetchJson } from '../../tools/hook/useFetch';

const OwnInfo: FC<{ user: AjaxJson.user }> = ({ user }) => {
    return <>{}</>;
};

export default function I() {
    const token = useToken();
    const [[r,l,e],f,c] = useFetchJson<AjaxJson.user>({url : '/userInfo/me',option :{
        method : 'POST',
        headers : new Headers({})
    }})
}
