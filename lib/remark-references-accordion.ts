import { visit } from "unist-util-visit";
import type { Root, Heading, List } from "mdast";

export function remarkReferencesAccordion() {
  return (tree: Root) => {
    const nodesToReplace: Array<{ index: number; parent: any; title: string; list: List }> = [];

    // First pass: collect all references sections
    visit(tree, "heading", (node: Heading, index: number, parent: any) => {
      if (
        node.depth === 2 &&
        node.children.length > 0 &&
        node.children[0].type === "text" &&
        (node.children[0].value.toLowerCase() === "references" ||
          node.children[0].value.toLowerCase() === "referências")
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
            title: node.children[0].value,
            list: referencesList,
          });
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
      parent.children.splice(index, 0, {
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
      } as any);
    });
  };
}

