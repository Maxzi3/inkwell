import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
    handler: () => void,
    listenCapturing: boolean = true
): RefObject<T | null> {
    const modalRef = useRef<T | null>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                handler();
            }
        };

        document.addEventListener("click", handleClick, listenCapturing);
        return () => {
            document.removeEventListener("click", handleClick, listenCapturing);
        };
    }, [handler, listenCapturing]);

    return modalRef;
}
