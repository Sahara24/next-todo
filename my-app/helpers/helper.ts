import { useEffect, useRef } from "react";

export const useClickOutside = (handler: Function) => {
    const domNode = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      const domHandler = (event: any) => {
        if (!domNode.current!.contains(event.target)) {
          handler();
        }
      };
      document.addEventListener("mousedown", domHandler);
      return () => {
        document.removeEventListener("mousedown", domHandler);
      };
    });
    return domNode;
  };