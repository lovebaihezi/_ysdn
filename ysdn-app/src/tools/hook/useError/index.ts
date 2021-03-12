import { useState, useCallback } from 'react';

//simple test passed
export default function useError(
    initial: string = 'just unexpected error or nothing happened...'
): [Error, (e: string) => void] {
    const initialState = new Error(initial);
    const [error, setError] = useState<Error>(initialState);
    return [error, useCallback((e: string) => setError(new Error(e)), [])];
}
