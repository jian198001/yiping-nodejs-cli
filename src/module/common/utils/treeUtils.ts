/**
 * 导入lodash库，用于处理字符串和数组
 */
import _ = require('lodash');

/**
 * 导入moment库，用于处理日期和时间
 */
import moment = require('moment');

/**
 * 导入path模块，用于处理文件路径
 */
const path: any = require('path');

/**
 * 检查字符串是否以'http://'或'https://'开头
 * 
 * @param {string} str - 需要检查的字符串
 * @returns {boolean} 如果字符串以'http://'或'https://'开头，则返回true，否则返回false
 */
export function isHttp(str: string): boolean {
  // 使用lodash的startsWith方法检查字符串是否以'http://'或'https://'开头
  return _?.startsWith?.(str, 'http://') || _?.startsWith?.(str, 'https://');
}

/**
 * 处理文件路径，去除首尾空格，规范化路径，将反斜杠替换为斜杠，去除开头和结尾的斜杠
 * 
 * @param {string} filePath - 需要处理的文件路径
 * @returns {string} 处理后的文件路径
 */
export function subStartEndSep(filePath: string): string {
  // 如果文件路径为空，则返回空字符串
  if (!filePath) {
    return '';
  }

  // 去除文件路径首尾的空格
  filePath = _?.trim?.(filePath);

  // 规范化文件路径
  filePath = path?.normalize?.(filePath);

  // 将反斜杠替换为斜杠
  filePath = _?.replace?.(filePath, /\\/g, '/');

  // 如果文件路径以斜杠开头，则去除开头的斜杠
  if (_?.startsWith?.(filePath, '/')) {
    filePath = filePath?.substring?.(1, filePath?.length);
  }

  // 如果文件路径以斜杠结尾，则去除结尾的斜杠
  if (_?.endsWith?.(filePath, '/')) {
    filePath = filePath?.substring?.(0, filePath?.length - 1);
  }

  // 返回处理后的文件路径
  return filePath;
}

/**
 * 将一个字符串拆分成数组，并随机返回数组中任何一个子字符串
 * 
 * @param {string} str - 需要拆分的字符串
 * @param {string} separator - 用于拆分字符串的分隔符，默认为'|'
 * @returns {string} 随机返回的子字符串
 */
export function random(str = '', separator = '|'): string {
  // 如果字符串为空，则返回空字符串
  if (!str) {
    return '';
  }

  // 使用lodash的split方法将字符串拆分成数组
  const arr: string[] = _?.split?.(str, separator);

  // 使用lodash的random方法随机返回数组中的一个子字符串
  return arr[_?.random?.(arr?.length - 1)];
}

/**
 * 获取树形数据中指定值的子节点
 * 
 * @param {Object} treeData - 树形数据对象
 * @param {any} value - 要查找的子节点的值
 * @returns {Object|null} 返回找到的子节点对象，如果未找到则返回null
 */
export function getChildren(treeData, value) {
  // 如果当前节点的id等于要查找的值，则返回当前节点
  if (treeData.id === value) {
    return treeData;
  }

  // 获取当前节点的子节点数组
  const children = treeData.children;

  // 如果当前节点没有子节点，则返回null
  if (!children) {
    return;
  }

  // 遍历子节点数组，递归调用getChildren函数查找子节点
  for (const childrenOne of children )  { 
    // 递归调用getChildren函数，查找子节点
    const c = getChildren(childrenOne, value);
    // 如果找到了子节点，则返回该子节点
    if (c) {
      return c;
    }
  }

  // 如果没有找到子节点，则返回null
  return null
}

/**
 * 获取树形数据中所有节点的id
 * 
 * @param {Object} treeData - 树形数据对象
 * @param {Array} ids - 用于存储id的数组
 */
export function getIds(treeData, ids) {
  // 将当前节点的id添加到ids数组中
  ids.push?.(treeData.id);

  // 获取当前节点的子节点数组
  const children = treeData.children;

  // 如果当前节点没有子节点，则返回
  if (!children) {
    return;
  }

  // 遍历子节点数组，递归调用getIds函数获取所有子节点的id
  for (const childrenOne of children )  { 
    // 递归调用getIds函数，获取所有子节点的id
    getIds(childrenOne, ids);
  }
}
/**
 * 处理树形数据，将其转换为带有子节点的树形结构
 * 
 * @param {Array} tree - 树形数据数组
 * @param {string} id - 节点ID的属性名
 * @param {string} parentId - 父节点ID的属性名
 * @param {string} children - 子节点列表的属性名
 * @returns {Array} 返回处理后的树形结构数组
 */
export function handleTree(data: any, id: any, parentId: any, children: any) {
  // 将树形数据中的每个节点的属性名转换为驼峰命名法
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

  // 如果没有传入树形数据，则返回空数组
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
   * @param {Object} o - 当前节点对象
   */
  function adaptToChildrenList(o) {
    // 如果当前节点的子节点列表不为空
    if (childrenListMap?.[o?.[config?.id]] !== null) {
      // 为当前节点添加子节点列表
      o[config?.childrenList] = childrenListMap?.[o[config?.id]];
    }
    // 如果当前节点有子节点
    if (o[config?.childrenList]) {
      // 遍历子节点，递归地为子节点添加子节点列表
      for (const c of o?.[config?.childrenList]) {
        adaptToChildrenList?.(c);
      }
    }
  }

  // 返回处理后的树形结构数组
  return tree;
}

/**
 * 将数组转换为对象，对象的键为数组元素的指定属性值，值为具有相同属性值的元素数组
 * 
 * @param {Array} arr - 需要转换的数组
 * @param {string} columnName - 用作对象键的属性名
 * @returns {Object} 返回转换后的对象
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

  // 如果没有传入数组，则返回空对象
  if (!arr) {
    return {};
  }

  // 遍历数组，将每个元素的指定属性值作为键，元素本身作为值，存储到对象中
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
 * @param {Array} data - 树形菜单数据数组
 * @returns {Array} 返回处理后的树形结构数组
 */
export function handleTreeMenu(data: any) {
  // 用于存储子节点列表的映射表
  const childrenListMap: any = {};
  // 用于存储节点ID的映射表
  const nodeIds: any = {};
  // 用于存储树形结构的数组
  const tree: any[] = [];

  // 如果没有传入树形菜单数据，则返回空数组
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
   * @param {Object} o - 当前节点对象
   */
  function adaptToChildrenList(o) {
    // 如果当前节点的子节点列表不为空
    if (childrenListMap?.[o?.[config?.id]] !== null) {
      // 为当前节点添加子节点列表
      o[config?.childrenList] = childrenListMap?.[o[config?.id]];
    }
    // 如果当前节点有子节点
    if (o[config?.childrenList]) {
      // 遍历子节点，递归地为子节点添加子节点列表
      for (const c of o?.[config?.childrenList]) {
        adaptToChildrenList?.(c);
      }
    }
  }

  // 返回处理后的树形结构数组
  return tree;
}
