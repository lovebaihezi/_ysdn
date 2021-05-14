import { useState, useEffect, useRef } from 'react';

type registerEvent = {
    onclose?: (event: CloseEvent) => void;
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
    const webSocket = useRef<WebSocket>(new WebSocket(url, protocols));
    const needSendMessage = useRef<
        (string | ArrayBufferLike | Blob | ArrayBufferView)[]
    >([]);
    const send = (
        data: string | ArrayBufferLike | Blob | ArrayBufferView,
    ) => {};
    useEffect(() => {
        webSocket.current.onclose = (event: CloseEvent) => {};
        webSocket.current.onopen = (event: Event) => {
            registerEvent;
        };
    }, [messageList.length, newestMessage?.data]);
    return [{ newestMessage, error, messageList }, send];
}
