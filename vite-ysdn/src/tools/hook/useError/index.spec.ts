import { act, renderHook } from '@testing-library/react-hooks';
import useError from './index';

test('should send error', () => {
    const { result } = renderHook<
        never,
        [Error | undefined, (e: string | undefined) => void]
    >(() => useError());
    const [E, S] = result.current;
    expect(E).toBeUndefined();
    act(() => S('nothing important ,just test'));
    const [E2] = result.current;
    expect(E2).toStrictEqual(new Error('nothing important ,just test'));
});
