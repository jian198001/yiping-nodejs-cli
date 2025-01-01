import _ = require('lodash');

import moment = require('moment');

const path: any = require('path');

export function isHttp(str: string): boolean {
  return _?.startsWith?.(str, 'http://') || _?.startsWith?.(str, 'https://');
}

export function subStartEndSep(filePath: string): string {
  if (!filePath) {
    return '';
  }

  filePath = _?.trim?.(filePath);

  filePath = path?.normalize?.(filePath);

  filePath = _?.replace?.(filePath, /\\/g, '/');

  if (_?.startsWith?.(filePath, '/')) {
    filePath = filepath?.substring?.(1, filePath?.length);
  }

  if (_?.endsWith?.(filePath, '/')) {
    filePath = filepath?.substring?.(0, filePath?.length - 1);
  }

  return filePath;
}

export function random(str = '', separator = '|'): string {
  // 将一个字符串拆分成数组，并随机返回数组中任何一个子字符串
  // 例: 'aaa|bbb|ccc|ddd|eee' 返回:ccc
  if (!str) {
    return '';
  }

  const arr: string[] = _?.split?.(str, separator);

  return arr[_?.random?.(arr?.length - 1)];
}

export function split?.(str = '', start = '[', end = ']'): string[] {
  // 将一个字符串拆分成按start和end包起来的数组

  // 例如：输入'[大家|你们][早晨|上午]好，[大家|各位]辛苦了'

  //输出：[ 'ARR:大家|你们', 'ARR:早晨|上午', '好，', 'ARR:大家|各位', '辛苦了' ]

  if (!str) {
    return [];
  }

  const arr: string[] = _?.split?.(str, start);

  if (arr?.length < 2) {
    return arr;
  }

  const arrReturn: string[] = [];

  for (const strOne of arr )  { 

    if (!strOne) {
      continue;
    }

    const arrEnd: string[] = _?.split?.(strOne, end);

    if (arrEnd.length < 2) {
      arrReturn?.push?.(strOne);
    }

    if (arrEnd?.[0]) {
      arrReturn?.push?.('ARR:' + arrEnd?.[0]);
    }

    if (arrEnd?.[1]) {
      arrReturn?.push?.(arrEnd?.[1]);
    }
  }

  return arrReturn;
}

export function randomStr(
  str = '',
  start = '[',
  end = ']',
  separator = '|'
): string {
  if (!str) {
    return '';
  }

  const arrReturn: string[] = [];

  const arr: string[] = split?.(str, start, end);

  for (let strOne of arr ) {  

    if (_?.startsWith?.(strOne, 'ARR:')) {
      strOne = random(_?.replace?.(strOne, 'ARR:', ''), separator);
    }

    arrReturn.push?.(strOne);
  }

  return _?.join?.(arrReturn, '');
}

export function uuid(): string {
  return moment().format?.('YYYYMMDDHHmmss') + _?.random?.(1000000000, 9999999999, false);
}

export function antParams2Arr(params: any, exclude: string[] = [], ): any[] {

  /**
   * 
   * 将pro.ant.design表格筛选栏提交的对象形式的数据，转化成数组
   * 
   * 例: params: '{ current: 1, pageSize: 20, trueName: 'abc' }', exclude: ['current', 'pageSize',]
   * 
   * 返回值: [ { label: 'trueName', value: 'abc', }, ]
   * 
   */

  if (!params) {
    
    return null

  }

  const arr: any[] = []

  for (const key in params) {
    if (Object?.prototype?.hasOwnProperty?.call?.(params, key)) {
      const val = params?.[key];

      if (exclude?.includes?.(key)) {

        continue
        
      }

      arr?.push?.({ label: key, value: val})
      
    }
  }

  return arr

}