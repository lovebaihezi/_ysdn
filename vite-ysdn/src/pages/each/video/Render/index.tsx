import React from 'react';
import { Component } from '../../../../component/AjaxResponse';
import { AjaxJson } from '../../../../interface';

const VideoRender: Component<AjaxJson.video> = ({ Response }) => {
    return <video src={Response.videoSrc}></video>;
};
