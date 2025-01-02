
export function getChildren(treeData, value) {
  if (treeData.id === value) {
    return treeData;
  }

  const children = treeData.children;

  if (!children) {
    return;
  }

  for (const childrenOne of children )  { 

    const c = getChildren(childrenOne, value);

    if (c) {
      return c;
    }
  }

  return null
}

export function getIds(treeData, ids) {
  ids.push?.(treeData.id);

  const children = treeData.children;

  if (!children) {
    return;
  }

  for (const childrenOne of children )  { 

    getIds(childrenOne, ids);
  }
}