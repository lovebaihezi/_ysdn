import useTimeout, { PromiseTimeout } from './index';
import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';

test('should push 1 after 2', async () => {
    const testing: number[] = [];
    const f = PromiseTimeout(500);
    const g = waitFor(async () => {
        await f;
        testing.push(1);
    });
    testing.push(2);
    await g;
    const [a1, a2] = testing;
    expect(testing.length).toBe(2);
    expect(a1).toBe(2);
    expect(a2).toBe(1);
});

test('nothing', () => {
    // const { result } = renderHook<
    //     never,
    //     [boolean, Error, (time: number) => Promise<void>]
    // >(() => useTimeout());
    // const [T, E, G] = result.current;
});
