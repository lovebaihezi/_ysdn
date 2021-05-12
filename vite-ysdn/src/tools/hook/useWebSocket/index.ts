import { useState, useEffect, useRef } from 'react';

type registerEvent = {
    onclose?: (event: Event) => void;
    onopen?: (event: Event) => void;
    onmessage?: <T>(event: MessageEvent) => T;
    onerror?: <T>(event: Event) => T;
};
// feature first, leave this after
export default function useWebSocket(
    url: string,
    protocols?: string | string[],
    registerEvent?: registerEvent,
): [
    Partial<{
        newestMessage: MessageEvent;
        error: Event;
    }> & { messageList: MessageEvent[] },
    (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void,
] {
    const [newestMessage, setNewestMessage] = useState<MessageEvent>();
    const [messageList, setMessageList] = useState<MessageEvent[]>([]);
    const [error, setError] = useState<Event>();
    const webSocket = useRef<WebSocket>();
    const needSendMessage = useRef<
        (string | ArrayBufferLike | Blob | ArrayBufferView)[]
    >([]);
    const IntervalTimeout = useRef<NodeJS.Timeout>();
    const sendMessage = (ws: WebSocket) => {
        for (const message of needSendMessage.current) {
            ws.send(message);
        }
    };
    const send = (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
        const ws = webSocket.current;
        if (ws) {
            if (ws.readyState === 1) {
                needSendMessage.current.push(data);
                sendMessage(ws);
                needSendMessage.current = [];
            } else {
                needSendMessage.current.push(data);
                IntervalTimeout.current = setInterval(() => {
                    if (ws.readyState === 1) {
                        clearInterval(
                            IntervalTimeout.current?.[Symbol.toPrimitive](),
                        );
                        sendMessage(ws);
                    }
                }, 100);
            }
        } else {
            throw new Error('WebSocket not init!');
        }
    };
    useEffect(() => {
        webSocket.current = new WebSocket(url, protocols);
        const ws = webSocket.current;
        ws.onopen = (_: Event) => {
            console.log(_);
        };
        ws.addEventListener('message', (message) => {
            setNewestMessage(message);
            setMessageList([...messageList, message]);
        });
        ws.addEventListener('error', (event: Event) => {
            setError(event);
            webSocket.current = new WebSocket(url, protocols);
        });
    }, []);
    useEffect(() => {
        return () => {
            if (webSocket.current) {
                webSocket.current?.close();
            }
        };
    });
    return [{ newestMessage, error, messageList }, send];
}
