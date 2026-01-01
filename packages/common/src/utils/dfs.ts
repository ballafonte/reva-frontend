/**
 * Author: Princeton Legree (princetonlegree.com)
 * Copyright (c) 2023 Princeton Legree. All rights reserved.
 */

/**
 * Implementation of DFS (depth-first search) Algorithm to traverse a tree.
 *
 * A use case of this function is to find the shortest path from a start to a target node. Given a
 * start node, this returns the node in the tree below the start node with the target value (or
 * `null` if it doesn't exist). Runs in `O(n)`, where `n` is the number of nodes in the tree, or
 * `O(b^d)`, where `b` is the branching factor and `d` is the depth.
 *
 * @param node - the node to start the search from
 * @param searchOpts - search options
 * @param searchOpts.childrenKey - which key accesses the value property for this node so that it can be skipped during recursive calls
 * @param searchOpts.valueKey - which key accesses the value property for this node so that it can be skipped during recursive calls
 * @param checkNode - a callback that assesses whether the currently visited node is the one being sought and processes it
 * @param checkChild -
 * @return - the node containing the target value or null if it doesn't exist.
 */
export const dfs = <T, K extends keyof T>(
  node: T,
  { childrenKey, valueKey }: { childrenKey?: K; valueKey: K },
  checkNode: (node: T) => boolean,
  checkChild: (child: T[K]) => boolean
): T | null => {
  if (checkNode(node)) {
    // We have found the goal node we we're searching for
    return node as T;
  }

  // Recurse with all children
  const children: T = childrenKey ? (node[childrenKey] as T) : node;
  Object.keys(children as Record<K, T>).forEach((i: string) => {
    if (i !== valueKey) {
      const child = children[i as K];
      if (checkChild(child)) {
        const result = dfs(
          child as T,
          { childrenKey, valueKey },
          checkNode,
          checkChild
        );
        if (result !== null) {
          // We've found the goal node while going down that child
          return result;
        }
      }
    }
  });

  return null;
};
