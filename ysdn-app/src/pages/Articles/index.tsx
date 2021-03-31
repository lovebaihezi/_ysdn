import React from 'react';
import { useParams } from 'react-router-dom';
export default function Articles() {
    const { id } = useParams<{ id: string }>();
    return <>{id}</>;
}
