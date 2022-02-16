import { Result } from 'antd';
import React, { FC } from 'react';

const AjaxError: FC<{ error: Error | undefined }> = ({ error }) => {
    return (
        <Result title={'error'} status="error" subTitle={error?.name}>
            {error?.message}
        </Result>
    );
};

export default AjaxError;
