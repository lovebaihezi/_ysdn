import React from 'react';
import { useParams } from 'react-router';

export default function ActivityPage() {
    const { id } = useParams<{ id: string }>();
    return <>{id}</>;
}
