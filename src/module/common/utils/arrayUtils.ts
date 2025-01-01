import _ = require('lodash');

const objUtils: any = require?.('./objUtils');

/**
 * 将数组中的每个对象的属性名转换为驼峰命名法
 * 
 * @param {any[]} arr - 需要转换的数组
 * @returns {any[]} 返回转换后的数组
 */
export function camelCase(arr: any[] = []): any[] {
  // 如果数组为空，则返回原数组
  if (!arr) {
    return arr;
  }

  // 深拷贝数组，避免修改原数组
  const _arr: any[] = _?.cloneDeep?.(arr);

  // 如果深拷贝后的数组为空或长度小于1，则返回该数组
  if (!(_arr) || _arr?.length < 1) {
    return _arr;
  }

  // 如果数组不支持forEach方法，则返回该数组
  if (!_arr?.['forEach']) {
    return _arr;
  }

  // 遍历数组中的每个对象，将其属性名转换为驼峰命名法
  _arr?.forEach(item => {
    item = objUtils?.camelCase?.(item);
  });

  // 返回转换后的数组
  return _arr;
}

/**
 * 将数组转换为对象，对象的键为数组元素的指定属性值，值为具有相同属性值的元素数组
 * 
 * @param {any[]} arr - 需要转换的数组
 * @param {string} columnName - 用作对象键的属性名
 * @returns {any} 返回转换后的对象
 */
export function keyObj(arr: any[] = [], columnName = ''): any {
  /**
   * 将一个数组转换成一个对象
   * 
   * 这个对象的每个key，对应的value值是一个数组
   * 
   * 例: 数组: [ { trueName: '刘德华', area: '香港', age: 62, }, { trueName: '张学友', area: '香港', age: 65, }, { trueName: '胡歌', area: '大陆', age: 35, }, ], columnName: 'area'
   * 
   * 返回值:
   * 
   * {
   * 
   * '香港': [{ trueName: '刘德华', area: '香港', age: 62, }, { trueName: '张学友', area: '香港', age: 65, }, ],
   * 
   * '大陆': [{ trueName: '胡歌', area: '大陆', age: 35, }, ],
   * 
   *  }
   */

  // 用于存储转换后的对象
  const obj: any = {};

  // 如果数组为空，则返回空对象
  if (!arr) {
    return {};
  }

  // 遍历数组中的每个元素，将其指定属性值作为键，元素本身作为值，存储到对象中
  arr?.forEach((item: any) => {
    const col: any = item?.[columnName];

    // 如果对象中不存在该键，则创建一个新的数组
    if (!obj?.[col]) {
      obj[col] = [];
    }

    // 将元素添加到对应的数组中
    obj[col]?.push?.(item);
  });

  // 返回转换后的对象
  return obj;
}

/**
 * 处理树形菜单数据，将其转换为带有子节点的树形结构
 * 
 * @param {any} data - 树形菜单数据
 * @returns {any[]} 返回处理后的树形结构数组
 */
export function handleTreeMenu(data: any) {
  // 用于存储子节点列表的映射表
  const childrenListMap: any = {};
  // 用于存储节点ID的映射表
  const nodeIds: any = {};
  // 用于存储树形结构的数组
  const tree: any[] = [];

  // 如果数据为空，则返回空数组
  if (!data) {
    return tree;
  }

  // 遍历树形菜单数据，构建子节点列表映射表和节点ID映射表
  for (const d of data) {
    const parentId = d?.parentId;
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d?.pid] = d;
    childrenListMap[parentId]?.push?.(d);
  }

  // 遍历树形菜单数据，构建树形结构数组
  for (const d of data) {
    const parentId = d?.parentId;
    if (nodeIds?.[parentId] == null) {
      tree?.push?.(d);
    }
  }

  // 遍历树形结构数组，为每个节点添加子节点列表
  for (const  t of tree) {
    adaptToChildrenList?.(t);
  }

  /**
   * 递归地为节点添加子节点列表
   * 
   * @param {any} o - 当前节点对象
   */
  function adaptToChildrenList(o) {
    // 如果当前节点的子节点列表不为空
    if (childrenListMap?.[o?.pid] !== null) {
      // 为当前节点添加子节点列表
      o.children = childrenListMap?.[o?.pid];
    }
    // 如果当前节点有子节点
    if (o?.children) {
      // 遍历子节点，递归地为子节点添加子节点列表
      for (const c of o?.children) {
        adaptToChildrenList?.(c);
      }
    }
  }

  // 返回处理后的树形结构数组
  return tree;
}

/**
 * 处理树形数据，将其转换为带有子节点的树形结构
 * 
 * @param {any} data - 树形数据
 * @param {any} id - 节点ID的属性名
 * @param {any} parentId - 父节点ID的属性名
 * @param {any} children - 子节点列表的属性名
 * @returns {any[]} 返回处理后的树形结构数组
 */
export function handleTree(data: any, id: any, parentId: any, children: any) {
  // 将树形数据中的每个对象的属性名转换为驼峰命名法
  data = camelCase?.(data);

  // 配置对象，包含节点ID、父节点ID和子节点列表的属性名
  const config: any = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  };

  // 用于存储子节点列表的映射表
  const childrenListMap: any = {};
  // 用于存储节点ID的映射表
  const nodeIds: any = {};
  // 用于存储树形结构的数组
  const tree: any[] = [];

  // 如果数据为空，则返回空数组
  if (!data) {
    return tree;
  }

  // 遍历树形数据，构建子节点列表映射表和节点ID映射表
  for (const d of data) {
    const parentId = d?.[config?.parentId];
    if (childrenListMap?.[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config?.id]] = d;
    childrenListMap[parentId]?.push?.(d);
  }

  // 遍历树形数据，构建树形结构数组
  for (const d of data) {
    const parentId = d[config?.parentId];
    if (nodeIds[parentId] == null) {
      tree?.push?.(d);
    }
  }

  // 遍历树形结构数组，为每个节点添加子节点列表
  for (const  t of tree) {
    adaptToChildrenList?.(t);
  }

  /**
   * 递归地为节点添加子节点列表
   * 
   * @param {any} o - 当前节点对象
   */
  function adaptToChildrenList(o) {
    // 如果当前节点的子节点列表不为空
    if (childrenListMap?.[o?.[config?.id]] !== null) {
      // 为当前节点添加子节点列表
      o[config?.childrenList] = childrenListMap?.[o[config?.id]];
    }
    // 如果当前节点有子节点
    if (o[config?.childrenList]) {
      // 遍历子节点，递归地
      for (const c of o?.[config?.childrenList]) {
        adaptToChildrenList?.(c);
      }
    }
  }

  return tree;
}

export function getKeyObj(arr: any[] = []): any {
  const obj: any = {};

  if (!arr) return obj;

  for (const o of arr )  { 

    const key: string = (_?.keys?.(o))?.[0];

    obj[key] = o?.[key];
  }

  return obj;
}
