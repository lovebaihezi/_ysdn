import { FetchJson, useFetchJson, useFetchProps } from './index';
import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { FC, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
// *use node as server (maybe this is the most possible way) or rewrite fetch and XMLHTTPRequest
const server = setupServer(
    rest.post('/user/denied', (req, res, ctx) => {
        return res(ctx.json({ msg: 'access denied' }));
    }),
    rest.post('/user/404', (req, res, ctx) => {
        return res(ctx.status(404, '404 not Found'));
    }),
    rest.get('/', (req, res, ctx) => {
        return res(ctx.json({ msg: 'success' }));
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

const Test: FC = () => {
    const url = '/';
    const option = {};
    const [[r], f] = useFetchJson<{ msg: string }>({ url, option });
    useEffect(() => {
        f();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <code>{r ? r.msg : 'loading'}</code>;
};

describe('fetch could be called,and it should run', () => {
    test('call fetch to get /', async () => {
        const url = '/';
        const option = {};
        const { result } = renderHook<useFetchProps, FetchJson<{ msg: string }>>(() =>
            useFetchJson<{ msg: string }>({ url, option })
        );
        const [, f] = result.current;
        await act(async () => await f());
        const [[R]] = result.current;
        expect(R).toBeDefined();
        expect(R).toStrictEqual({ msg: 'success' });
    });
    test('call fetch in FC', async () => {
        render(<Test />);
        await waitFor(() => {
            const R = screen.getAllByText('success');
            expect(R).toBeDefined();
        });
    });
    test('call fetch in FC and immediately umount it to check if the fetch will be canceled', async () => {
        const { unmount } = render(<Test />);
        await waitFor(async () => {
            const result = screen.getAllByText('loading');
            expect(result).toBeDefined();
            unmount();
        });
    });
});
