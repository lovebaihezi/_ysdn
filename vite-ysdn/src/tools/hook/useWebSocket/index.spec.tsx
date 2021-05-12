import {} from 'react';
import ws from 'ws';
import '@babel/polyfill';
import 'whatwg-fetch';
import WebSocket from 'ws';
import useWebSocket from './index';
import { act, renderHook } from '@testing-library/react-hooks';

const WebSocketPromise = (url: string) =>
    new Promise<WebSocket>((resolve, reject) => {
        const ws = new WebSocket(url);
        ws.on('open', () => {
            resolve(ws);
        });
        ws.on('error', (e) => {
            reject(e);
        });
    });

describe('useWebsocket test', () => {
    // const MessageList: ws.MessageEvent[] = [];
    // const ws_server = new ws.Server({ port: 8001 });
    // beforeAll(async () => {
    //     const ws = await new Promise<WebSocket>((resolve, reject) => {
    //         ws_server.on('connection', (ws) => {
    //             resolve(ws);
    //         });
    //         ws_server.on('listening')
    //         ws_server.on('error', (error) => {
    //             reject(error);
    //         });
    //     });
    //     ws.onmessage = (message: ws.MessageEvent) => {
    //         console.log(message);
    //         MessageList.push(message);
    //         ws.send(message.data);
    //     };
    // });
    // afterEach(() => {
    //     let length = MessageList.length;
    //     for (let i = 0; i < length; i++) {
    //         MessageList.pop();
    //     }
    // });
    // afterAll(() => {
    //     ws_server.close();
    // });
    test('can i connect server?', async () => {
        const message = '["message from websocket test"]';
        const url = 'ws://localhost:8000';
        const ws = await WebSocketPromise(url);
        ws.send(message);
        const result = await new Promise<string>((resolve, reject) => {
            ws.on('message', (message) => {
                resolve(message as string);
            });
        });
        expect(message).toBe(message);
        ws.close();
    });
    // test('call use WebSocket, send message and check if it get', async () => {
    //     const message = '["message from jest"]';
    //     const url = 'ws://localhost:8000';
    //     const { result } = renderHook(() => useWebSocket(url));
    //     {
    //         const [{ newestMessage, error, messageList }, send] =
    //             result.current;
    //         expect(newestMessage).toBeUndefined();
    //         expect(error).toBeUndefined();
    //         act(() => send(message));
    //     }
    //     {
    //         const [{ newestMessage, messageList, error }] = result.current;
    //         expect(error).toBeUndefined();
    //         expect(newestMessage).toBe(message);
    //         expect(messageList).toStrictEqual([message]);
    //     }
    // });
});
