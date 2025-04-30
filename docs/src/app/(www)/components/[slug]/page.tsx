import { MDXContent } from "@content-collections/mdx/react";
import { allComponents } from "content-collections";
import { Title } from "../../../../@components/typography";
import { ComponentPreview } from "../_components/component-preview";

export default async function ComponentPage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params;
  const component = allComponents.find((component) => component.slug === slug);
  if (!component) {
    return <div>Component with slug {slug} not found</div>;
  }
  return (
    <div>
      <MDXContent
        code={component.mdx}
        components={{
          ComponentPreview: ({ children, url }: { children: React.ReactNode; url: string }) => (
            <div className="mb-6">
              <ComponentPreview url={url}>{children}</ComponentPreview>
            </div>
          ),
          h1: ({ children }: { children: React.ReactNode }) => <Title.H1 className="mb-8  ">{children}</Title.H1>,
          h2: ({ children }: { children: React.ReactNode }) => <Title.H2 className="mb-6">{children}</Title.H2>,
          p: ({ children }: { children: React.ReactNode }) => <p className="mb-6">{children}</p>,
          ul: ({ children }: { children: React.ReactNode }) => (
            <ul
              className={`
                pl-4 mb-6 [&_ul]:mb-0
                list-disc [&_ul]:list-[circle] [&_ul_ul]:list-[square]
              `}
            >
              {children}
            </ul>
          ),
        }}
      />
    </div>
  );
}
