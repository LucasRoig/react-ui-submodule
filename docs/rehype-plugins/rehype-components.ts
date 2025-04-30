import fs from "node:fs";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import type { UnistNode, UnistTree } from "./unist-types";

// import { Index } from "../__registry__"
// import { styles } from "../registry/registry-styles"

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const file = getNodeAttributeByName(node, "file")?.value as string;
        const url = getNodeAttributeByName(node, "url")?.value as string;
        if (!name) {
          const errorMsg = "Error parsing ComponentPreview: name attribute is required";
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        if (!file) {
          const errorMsg = `Error parsing ComponentPreview ${name}: file attribute is required`;
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
          const errorMsg = `Error parsing ComponentPreview ${name}: file ${file} does not exist`;
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        if (!url) {
          const errorMsg = `Error parsing ComponentPreview ${name}: url attribute is required`;
          console.error(errorMsg);
          throw new Error(errorMsg);
        }

        try {
          // for (const style of styles) {
          // const component = Index[style.name][name]
          // const src = component.files[0]?.path

          // Read the source file.
          // let source = `
          //     export default test() {
          //       return <div>Hello world</div>
          //     }
          //   `;
          let source = fs.readFileSync(file, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          // source = source.replaceAll(
          //   `@/registry/${style.name}/`,
          //   "@/components/"
          // )
          source = source.replaceAll("export default", "export");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: "srcTodo",
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          );
          // }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

// function getComponentSourceFileContent(node: UnistNode) {
//   const src = getNodeAttributeByName(node, "src")?.value as string

//   if (!src) {
//     return null
//   }

//   // Read the source file.
//   const filePath = path.join(process.cwd(), src)
//   const source = fs.readFileSync(filePath, "utf8")

//   return source
// }
