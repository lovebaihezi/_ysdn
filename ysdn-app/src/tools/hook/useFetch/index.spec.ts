import * as React from 'react';
import useFetch, { useAjaxJson } from './index';
import { render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// *use node as server (maybe this is the most possible way) or rewrite fetch and XMLHTTPRequest
const server = setupServer(
    rest.post('/user/denied', (req, res, ctx) => {
        return res(ctx.json({ msg: 'access denied' }));
    }),
    rest.post('/user/404', (req, res, ctx) => {
        return res(ctx.status(404, '404 not Found'));
    }),
    rest.get('/', (req, res, ctx) => {
        if (req.headers.get('Content-Type') === 'application/json') {
            return res(ctx.json({ msg: 'access granted' }));
        }
        return res(ctx.status(400, 'method not allowed'));
    }),
    rest.post('/', (req, res, ctx) => {
        if (req.headers.get('Content-Type') === 'application/json') {
            return res(ctx.json({ msg: 'access granted' }));
        }
        return res(ctx.status(400, 'method not allowed'));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

type useFetchReturnType = [
    Response | undefined,
    Error,
    (url: string, option: RequestInit) => Promise<void>,
    (e: string) => void
];

// *test initial state
test('useFetch ,initial state', async () => {
    const { result } = renderHook<
        never,
        [
            Response | undefined,
            Error,
            (url: string, option: RequestInit) => Promise<void>,
            (e: string) => void
        ]
    >(() => useFetch());
    const [R, E, F, C] = result.current;
    expect(R).toBe(undefined);
    expect(E).toStrictEqual(
        new Error('just unexpected error or nothing happened...')
    );
});

// *test success fetch

describe('use Fetch,with get method to "/" but different headers', () => {
    test('Content-Type : application/json should be response "{ msg: "access granted" }"', async () => {
        const { result } = renderHook<never, useFetchReturnType>(() =>
            useFetch()
        );
        const [, , F] = result.current;
        await act(
            async () =>
                await F('/', {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                })
        );
        const [R] = result.current;
        expect(R).toBeDefined();
        const X = await R?.json().catch(console.error);
        expect(X).toStrictEqual({ msg: 'access granted' });
    });
    test('should be response 400 and "method not allowed"', async () => {
        const { result } = renderHook<never, useFetchReturnType>(() =>
            useFetch()
        );
        const [, , F] = result.current;
        await act(async () => await F('/', { method: 'GET' }));
        const [R] = result.current;
        const text = R?.statusText;
        const code = R?.status;
        expect(code).toBe(400);
        expect(text).toStrictEqual('method not allowed');
    });
});

// *test failed fetch

// *test fetch success but cors

// *test fetch success but server denied

// *test fetch success but server denied

// *test fetch success but server respond out of time limits

// * test AjaxJson success

describe('use AjaxJson', () => {
    test('should get { msg : access granted }', async () => {
        const { result } = renderHook(() => useAjaxJson<{ msg: string }>());
        const [, , F] = result.current;
        await act(
            async () =>
                await F('/', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                })
        );
        const [R] = result.current;
        expect(R).toBeDefined();
        expect(R).toStrictEqual({ msg: 'access granted' });
    });
});
