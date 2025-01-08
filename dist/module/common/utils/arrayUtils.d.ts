/**
 * 将数组中的每个对象的属性名转换为驼峰命名法
 *
 * @param {any[]} arr - 需要转换的数组
 * @returns {any[]} 返回转换后的数组
 */
export declare function camelCase(arr?: any[]): any[];
/**
 * 将数组转换为对象，对象的键为数组元素的指定属性值，值为具有相同属性值的元素数组
 *
 * @param {any[]} arr - 需要转换的数组
 * @param {string} columnName - 用作对象键的属性名
 * @returns {any} 返回转换后的对象
 */
export declare function keyObj(arr?: any[], columnName?: string): any;
/**
 * 处理树形菜单数据，将其转换为带有子节点的树形结构
 *
 * @param {any} data - 树形菜单数据
 * @returns {any[]} 返回处理后的树形结构数组
 */
export declare function handleTreeMenu(data: any): any[];
/**
 * 处理树形数据，将其转换为带有子节点的树形结构
 *
 * @param {any} data - 树形数据
 * @param {any} id - 节点ID的属性名
 * @param {any} parentId - 父节点ID的属性名
 * @param {any} children - 子节点列表的属性名
 * @returns {any[]} 返回处理后的树形结构数组
 */
export declare function handleTree(data: any, id: any, parentId: any, children: any): any[];
export declare function getKeyObj(arr?: any[]): any;
