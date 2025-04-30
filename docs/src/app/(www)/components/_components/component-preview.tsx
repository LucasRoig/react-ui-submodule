"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../@components/tabs";
import { ToggleGroup, ToggleGroupItem } from "../../../../@components/toggle-group";
import { cn } from "../../../../@lib/shadcn-utils";
import { Webview } from "./webview";

export type ComponentPreviewProps = Readonly<{
  children: React.ReactNode;
  url: string;
}>;

export function ComponentPreview(props: ComponentPreviewProps) {
  const [size, setSize] = useState<"tablet" | "smartphone" | "fullwidth">("fullwidth");
  return (
    <Tabs defaultValue="preview">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <ToggleGroup type="single" value={size} onValueChange={(v) => setSize(v as typeof size)}>
          <ToggleGroupItem value="fullwidth">
            <Monitor />
          </ToggleGroupItem>
          <ToggleGroupItem value="tablet">
            <Tablet />
          </ToggleGroupItem>
          <ToggleGroupItem value="smartphone">
            <Smartphone />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="border rounded-md overflow-hidden mt-4">
        <TabsContent value="preview" className="bg-gray-100">
          <Webview
            title="preview"
            src={props.url}
            className={cn(
              "relative z-20 w-full bg-background",
              size === "tablet" && "w-xl border-r",
              size === "smartphone" && "w-sm border-r",
            )}
          />
        </TabsContent>
        <TabsContent value="code" className="[&_pre]:p-4 [&_pre]:overflow-auto">
          {props.children}
        </TabsContent>
      </div>
    </Tabs>
  );
}
