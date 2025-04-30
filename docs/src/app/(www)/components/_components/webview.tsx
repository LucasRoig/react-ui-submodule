"use client";

import { useRef, useState } from "react";
import { cn } from "../../../../@lib/shadcn-utils";

export type WebviewProps = {
  title: string;
  src: string;
  className?: string;
};
export function Webview(props: WebviewProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1);
  return (
    <iframe
      ref={ref}
      title={props.title}
      src={props.src}
      height={height}
      className={cn(props.className)}
      onLoad={() => {
        setHeight(ref.current?.contentWindow?.document.body.scrollHeight || 1);
      }}
    />
  );
}
