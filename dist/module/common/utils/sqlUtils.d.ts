export declare function mypairs(obj?: any): any;
export declare function where(obj?: any, tableName?: string): string;
export declare function like(columns?: any[], searchValues?: string, formName?: string): string;
export declare function orderBy(sortName?: string, tableName?: string, sortOrder?: string): string;
export declare function limit(startRow: number, pageSize: number, total: number): string;
export declare function selectCount(fromSql?: string, whereSql?: string): string;
export declare function selectPage(selectSql?: string, fromSql?: string, whereSql?: string, orderBySql?: string, limitSql?: string): string;
export declare function getStart(pageNum?: number, pageSize?: number): number;
export declare function toStrOrNum(obj?: string): string;
export declare function whereOr(columnName?: string, columnIds?: any[]): string;
export declare function rulesCombinator(rule?: any): string;
export declare function query(query?: string): string;
export declare function whereOrFilters(filtersStr?: string): string;
export declare function intersectionTime(start?: string, end?: string, startColumnName?: string, endColumnName?: string): string;
export declare function mulColumnLike(arr: any[], formName?: string): string;
