import React from 'react';
import { useParams } from 'react-router';
export default function QA() {
    const { id } = useParams<{ id: string }>();
    return <>{id}</>;
}
