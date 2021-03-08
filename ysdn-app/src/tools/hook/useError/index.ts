import { useState, useEffect } from 'react';

export default function useError(
    initial: string = 'just unexpected error'
): [Error, (e: string) => void] {
    const initialState = new Error(initial);
    const [error, setError] = useState<Error>(initialState);
    return [error, (e: string) => setError(new Error(e))];
}
