import React from 'react';
import { useParams } from 'react-router';
export default function Monographic() {
    const { id } = useParams<{ id: string }>();
    return <>{id}</>;
}
