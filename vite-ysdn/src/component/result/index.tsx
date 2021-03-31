import { Result } from 'antd';
import React, { FC } from 'react';

const AjaxError: FC<{ error: Error | undefined }> = ({ error }) => {
    return <Result />;
};

export default AjaxError;
