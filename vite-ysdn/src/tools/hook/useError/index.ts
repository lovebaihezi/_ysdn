import { useState, useCallback } from 'react';

//simple test passed
export default function useError(): [
    Error | undefined,
    (e: string | undefined) => void,
] {
    const [error, setError] = useState<Error>();
    return [
        error,
        useCallback((e) => {
            if (e !== undefined) setError(new Error(e));
        }, []),
    ];
}
