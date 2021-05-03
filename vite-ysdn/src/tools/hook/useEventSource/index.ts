import { useEffect, useState } from 'react';

//todo : finish use Event Source
export default function useEventSource(
    url: string,
    eventSourceInitDict?: EventSourceInit,
) {
    const ES = new EventSource(url, eventSourceInitDict);
    const [message, setMessage] = useState<MessageEvent>();
    const [error, setError] = useState<Error>();
    const [open, setOpen] = useState();
    ES.onmessage = (e) => {
        setMessage(e);
    };
    ES.onerror = (e) => {
        setError(new Error('error on event source!'));
    };
    useEffect(() => ES.close());
    return [{ message, error }];
}
