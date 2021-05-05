import React, { FC } from 'react';
import { useParams } from 'react-router';

const EachVideo: FC = () => {
    const { id } = useParams<{id: string}>();
    
}
