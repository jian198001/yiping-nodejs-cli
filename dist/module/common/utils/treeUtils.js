"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIds = exports.getChildren = void 0;
function getChildren(treeData, value) {
    if (treeData.id === value) {
        return treeData;
    }
    const children = treeData.children;
    if (!children) {
        return;
    }
    for (const childrenOne of children) {
        const c = getChildren(childrenOne, value);
        if (c) {
            return c;
        }
    }
    return null;
}
exports.getChildren = getChildren;
function getIds(treeData, ids) {
    var _a;
    (_a = ids.push) === null || _a === void 0 ? void 0 : _a.call(ids, treeData.id);
    const children = treeData.children;
    if (!children) {
        return;
    }
    for (const childrenOne of children) {
        getIds(childrenOne, ids);
    }
}
exports.getIds = getIds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvY29tbW9uL3V0aWxzL3RyZWVVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxTQUFnQixXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUs7SUFDekMsSUFBSSxRQUFRLENBQUMsRUFBRSxLQUFLLEtBQUssRUFBRTtRQUN6QixPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUVELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFbkMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE9BQU87S0FDUjtJQUVELEtBQUssTUFBTSxXQUFXLElBQUksUUFBUSxFQUFJO1FBRXBDLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLEVBQUU7WUFDTCxPQUFPLENBQUMsQ0FBQztTQUNWO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQTtBQUNiLENBQUM7QUFyQkQsa0NBcUJDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHOztJQUNsQyxNQUFBLEdBQUcsQ0FBQyxJQUFJLG9EQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV4QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRW5DLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPO0tBQ1I7SUFFRCxLQUFLLE1BQU0sV0FBVyxJQUFJLFFBQVEsRUFBSTtRQUVwQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzFCO0FBQ0gsQ0FBQztBQWJELHdCQWFDIn0=