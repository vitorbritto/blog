import { visit } from "unist-util-visit";
import type { Root, Heading, List, Parent } from "mdast";

interface NodeToReplace {
  index: number;
  parent: Parent;
  title: string;
  list: List;
}

interface MdxJsxAttribute {
  type: "mdxJsxAttribute";
  name: string;
  value: string;
}

interface MdxJsxFlowElement {
  type: "mdxJsxFlowElement";
  name: string;
  attributes: MdxJsxAttribute[];
  children: List[];
}

export function remarkReferencesAccordion() {
  return (tree: Root) => {
    const nodesToReplace: NodeToReplace[] = [];

    // First pass: collect all references sections
    visit(tree, "heading", (node: Heading, index: number, parent: Parent | undefined) => {
      if (!parent) return;
      if (
        node.depth === 2 &&
        node.children.length > 0 &&
        node.children[0].type === "text"
      ) {
        const firstChild = node.children[0];
        const headingText = firstChild.value.toLowerCase();
        
        if (
          headingText === "references" ||
          headingText === "referências"
        ) {
          // Find the next list node (references list)
          let nextIndex = index + 1;
          let referencesList: List | null = null;

          // Look for the next list or until we hit another heading
          while (nextIndex < parent.children.length) {
            const nextNode = parent.children[nextIndex];
            if (nextNode.type === "list") {
              referencesList = nextNode as List;
              break;
            } else if (nextNode.type === "heading") {
              break;
            }
            nextIndex++;
          }

          if (referencesList) {
            nodesToReplace.push({
              index,
              parent,
              title: firstChild.value,
              list: referencesList,
            });
          }
        }
      }
    });

    // Second pass: replace nodes (in reverse order to maintain indices)
    nodesToReplace.reverse().forEach(({ index, parent, title, list }) => {
      const listIndex = parent.children.indexOf(list);
      
      // Remove the heading and list
      parent.children.splice(listIndex, 1);
      parent.children.splice(index, 1);
      
      // Insert the accordion component
      const accordionNode: MdxJsxFlowElement = {
        type: "mdxJsxFlowElement",
        name: "ReferencesAccordion",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "title",
            value: title,
          },
        ],
        children: [list],
      };
      // Type assertion needed because Parent.children expects mdast nodes
      parent.children.splice(index, 0, accordionNode as unknown as Parent["children"][number]);
    });
  };
}

