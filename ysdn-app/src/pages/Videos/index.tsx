import React from 'react';
import { useParams } from 'react-router-dom';
export default function Videos() {
    const { id } = useParams<{ id: string }>();
    return <>{id}</>;
}
