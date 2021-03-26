import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';

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

describe('test render and', () => {});
