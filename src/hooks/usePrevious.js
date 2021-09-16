import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        if (value) {
            ref.current = value;
        }
    });
    return ref.current;
}
