import React, { FC } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import { useFetchProps } from '../../../tools/hook/useFetch';
import Info from './info';
import { Switch, Route } from 'react-router';
import InformationUpdate from './InformationUpdate';
import UpdateTag from './UpdateTag';

export default function User() {
    const { username } = useParams<{ username: string }>();
    const { path, url } = useRouteMatch();
    const RequestInfo: useFetchProps = {
        url: baseurl + `/user/${username}`,
    };
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Ajax Request={RequestInfo} Component={Info} />
            </Route>
            <Route exact path={`${url}/uploadInfo`}>
                <InformationUpdate />
            </Route>
            <Route exact path={`${url}/uploadTag`}>
                <UpdateTag />
            </Route>
        </Switch>
    );
}
