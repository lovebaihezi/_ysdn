import { Card } from 'antd';
import React, { useMemo } from 'react';
import { useFetchProps } from '../../../../../tools/hook/useFetch';
import Ajax, { Component } from '../../../../../component/AjaxResponse';

const Magazine: Component<{}> = ({ Response }) => {
    return <Card></Card>;
};

export default function Periodicals({ name }: { name: string }) {
    const RequestInfo: useFetchProps = {
        url: `/${name}/periodicals/`,
        option: {
            method: 'POST',
        },
    };
    return useMemo(
        () => <Ajax Request={RequestInfo} Component={Magazine} />,
        [],
    );
}
