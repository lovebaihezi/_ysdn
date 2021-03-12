import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import useError from './index';

test('should send error', () => {
    const { result } = renderHook<never, [Error, (e: string) => void]>(() =>
        useError()
    );
    const [E, S] = result.current;
    expect(E).toStrictEqual(
        new Error('just unexpected error or nothing happened...')
    );
    act(() => S('nothing important ,just test'));
    const [E2] = result.current;
    expect(E2).toStrictEqual(new Error('nothing important ,just test'));
});
