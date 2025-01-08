"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeyObj = exports.handleTree = exports.handleTreeMenu = exports.keyObj = exports.camelCase = void 0;
const _ = require("lodash");
const objUtils = require === null || require === void 0 ? void 0 : require('./objUtils');
/**
 * 将数组中的每个对象的属性名转换为驼峰命名法
 *
 * @param {any[]} arr - 需要转换的数组
 * @returns {any[]} 返回转换后的数组
 */
function camelCase(arr = []) {
    var _a;
    // 如果数组为空，则返回原数组
    if (!arr) {
        return arr;
    }
    // 深拷贝数组，避免修改原数组
    const _arr = (_a = _ === null || _ === void 0 ? void 0 : _.cloneDeep) === null || _a === void 0 ? void 0 : _a.call(_, arr);
    // 如果深拷贝后的数组为空或长度小于1，则返回该数组
    if (!(_arr) || (_arr === null || _arr === void 0 ? void 0 : _arr.length) < 1) {
        return _arr;
    }
    // 如果数组不支持forEach方法，则返回该数组
    if (!(_arr === null || _arr === void 0 ? void 0 : _arr['forEach'])) {
        return _arr;
    }
    // 遍历数组中的每个对象，将其属性名转换为驼峰命名法
    _arr === null || _arr === void 0 ? void 0 : _arr.forEach(item => {
        var _a;
        item = (_a = objUtils === null || objUtils === void 0 ? void 0 : objUtils.camelCase) === null || _a === void 0 ? void 0 : _a.call(objUtils, item);
    });
    // 返回转换后的数组
    return _arr;
}
exports.camelCase = camelCase;
/**
 * 将数组转换为对象，对象的键为数组元素的指定属性值，值为具有相同属性值的元素数组
 *
 * @param {any[]} arr - 需要转换的数组
 * @param {string} columnName - 用作对象键的属性名
 * @returns {any} 返回转换后的对象
 */
function keyObj(arr = [], columnName = '') {
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
    const obj = {};
    // 如果数组为空，则返回空对象
    if (!arr) {
        return {};
    }
    // 遍历数组中的每个元素，将其指定属性值作为键，元素本身作为值，存储到对象中
    arr === null || arr === void 0 ? void 0 : arr.forEach((item) => {
        var _a, _b;
        const col = item === null || item === void 0 ? void 0 : item[columnName];
        // 如果对象中不存在该键，则创建一个新的数组
        if (!(obj === null || obj === void 0 ? void 0 : obj[col])) {
            obj[col] = [];
        }
        // 将元素添加到对应的数组中
        (_b = (_a = obj[col]) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.call(_a, item);
    });
    // 返回转换后的对象
    return obj;
}
exports.keyObj = keyObj;
/**
 * 处理树形菜单数据，将其转换为带有子节点的树形结构
 *
 * @param {any} data - 树形菜单数据
 * @returns {any[]} 返回处理后的树形结构数组
 */
function handleTreeMenu(data) {
    var _a, _b, _c;
    // 用于存储子节点列表的映射表
    const childrenListMap = {};
    // 用于存储节点ID的映射表
    const nodeIds = {};
    // 用于存储树形结构的数组
    const tree = [];
    // 如果数据为空，则返回空数组
    if (!data) {
        return tree;
    }
    // 遍历树形菜单数据，构建子节点列表映射表和节点ID映射表
    for (const d of data) {
        const parentId = d === null || d === void 0 ? void 0 : d.parentId;
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d === null || d === void 0 ? void 0 : d.pid] = d;
        (_b = (_a = childrenListMap[parentId]) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.call(_a, d);
    }
    // 遍历树形菜单数据，构建树形结构数组
    for (const d of data) {
        const parentId = d === null || d === void 0 ? void 0 : d.parentId;
        if ((nodeIds === null || nodeIds === void 0 ? void 0 : nodeIds[parentId]) == null) {
            (_c = tree === null || tree === void 0 ? void 0 : tree.push) === null || _c === void 0 ? void 0 : _c.call(tree, d);
        }
    }
    // 遍历树形结构数组，为每个节点添加子节点列表
    for (const t of tree) {
        adaptToChildrenList === null || adaptToChildrenList === void 0 ? void 0 : adaptToChildrenList(t);
    }
    /**
     * 递归地为节点添加子节点列表
     *
     * @param {any} o - 当前节点对象
     */
    function adaptToChildrenList(o) {
        // 如果当前节点的子节点列表不为空
        if ((childrenListMap === null || childrenListMap === void 0 ? void 0 : childrenListMap[o === null || o === void 0 ? void 0 : o.pid]) !== null) {
            // 为当前节点添加子节点列表
            o.children = childrenListMap === null || childrenListMap === void 0 ? void 0 : childrenListMap[o === null || o === void 0 ? void 0 : o.pid];
        }
        // 如果当前节点有子节点
        if (o === null || o === void 0 ? void 0 : o.children) {
            // 遍历子节点，递归地为子节点添加子节点列表
            for (const c of o === null || o === void 0 ? void 0 : o.children) {
                adaptToChildrenList === null || adaptToChildrenList === void 0 ? void 0 : adaptToChildrenList(c);
            }
        }
    }
    // 返回处理后的树形结构数组
    return tree;
}
exports.handleTreeMenu = handleTreeMenu;
/**
 * 处理树形数据，将其转换为带有子节点的树形结构
 *
 * @param {any} data - 树形数据
 * @param {any} id - 节点ID的属性名
 * @param {any} parentId - 父节点ID的属性名
 * @param {any} children - 子节点列表的属性名
 * @returns {any[]} 返回处理后的树形结构数组
 */
function handleTree(data, id, parentId, children) {
    var _a, _b, _c;
    // 将树形数据中的每个对象的属性名转换为驼峰命名法
    data = camelCase === null || camelCase === void 0 ? void 0 : camelCase(data);
    // 配置对象，包含节点ID、父节点ID和子节点列表的属性名
    const config = {
        id: id || 'id',
        parentId: parentId || 'parentId',
        childrenList: children || 'children',
    };
    // 用于存储子节点列表的映射表
    const childrenListMap = {};
    // 用于存储节点ID的映射表
    const nodeIds = {};
    // 用于存储树形结构的数组
    const tree = [];
    // 如果数据为空，则返回空数组
    if (!data) {
        return tree;
    }
    // 遍历树形数据，构建子节点列表映射表和节点ID映射表
    for (const d of data) {
        const parentId = d === null || d === void 0 ? void 0 : d[config === null || config === void 0 ? void 0 : config.parentId];
        if ((childrenListMap === null || childrenListMap === void 0 ? void 0 : childrenListMap[parentId]) == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d[config === null || config === void 0 ? void 0 : config.id]] = d;
        (_b = (_a = childrenListMap[parentId]) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.call(_a, d);
    }
    // 遍历树形数据，构建树形结构数组
    for (const d of data) {
        const parentId = d[config === null || config === void 0 ? void 0 : config.parentId];
        if (nodeIds[parentId] == null) {
            (_c = tree === null || tree === void 0 ? void 0 : tree.push) === null || _c === void 0 ? void 0 : _c.call(tree, d);
        }
    }
    // 遍历树形结构数组，为每个节点添加子节点列表
    for (const t of tree) {
        adaptToChildrenList === null || adaptToChildrenList === void 0 ? void 0 : adaptToChildrenList(t);
    }
    /**
     * 递归地为节点添加子节点列表
     *
     * @param {any} o - 当前节点对象
     */
    function adaptToChildrenList(o) {
        // 如果当前节点的子节点列表不为空
        if ((childrenListMap === null || childrenListMap === void 0 ? void 0 : childrenListMap[o === null || o === void 0 ? void 0 : o[config === null || config === void 0 ? void 0 : config.id]]) !== null) {
            // 为当前节点添加子节点列表
            o[config === null || config === void 0 ? void 0 : config.childrenList] = childrenListMap === null || childrenListMap === void 0 ? void 0 : childrenListMap[o[config === null || config === void 0 ? void 0 : config.id]];
        }
        // 如果当前节点有子节点
        if (o[config === null || config === void 0 ? void 0 : config.childrenList]) {
            // 遍历子节点，递归地
            for (const c of o === null || o === void 0 ? void 0 : o[config === null || config === void 0 ? void 0 : config.childrenList]) {
                adaptToChildrenList === null || adaptToChildrenList === void 0 ? void 0 : adaptToChildrenList(c);
            }
        }
    }
    return tree;
}
exports.handleTree = handleTree;
function getKeyObj(arr = []) {
    var _a, _b;
    const obj = {};
    if (!arr)
        return obj;
    for (const o of arr) {
        const key = (_b = ((_a = _ === null || _ === void 0 ? void 0 : _.keys) === null || _a === void 0 ? void 0 : _a.call(_, o))) === null || _b === void 0 ? void 0 : _b[0];
        obj[key] = o === null || o === void 0 ? void 0 : o[key];
    }
    return obj;
}
exports.getKeyObj = getKeyObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlVdGlscy5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL2NvbW1vbi91dGlscy9hcnJheVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRCQUE2QjtBQUU3QixNQUFNLFFBQVEsR0FBUSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUcsWUFBWSxDQUFDLENBQUM7QUFFOUM7Ozs7O0dBS0c7QUFDSCxTQUFnQixTQUFTLENBQUMsTUFBYSxFQUFFOztJQUN2QyxnQkFBZ0I7SUFDaEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxnQkFBZ0I7SUFDaEIsTUFBTSxJQUFJLEdBQVUsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsU0FBUyxrREFBRyxHQUFHLENBQUMsQ0FBQztJQUV4QywyQkFBMkI7SUFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxJQUFHLENBQUMsRUFBRTtRQUMvQixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRyxTQUFTLENBQUMsQ0FBQSxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCwyQkFBMkI7SUFDM0IsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7UUFDbkIsSUFBSSxHQUFHLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFNBQVMseURBQUcsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXO0lBQ1gsT0FBTyxJQUFJLENBQUM7QUFD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