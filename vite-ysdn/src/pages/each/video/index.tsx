import React, { FC } from 'react';
import { useParams } from 'react-router';
import { baseurl } from '../../../auth';
import Ajax from '../../../component/AjaxResponse';
import VideoRender from './Render';

const EachVideo: FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <Ajax
            Request={{ url: baseurl + `/video/${id}` }}
            Component={VideoRender}
        />
    );
};
