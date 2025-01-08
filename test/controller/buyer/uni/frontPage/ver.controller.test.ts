import { ver } from './ver.controller.test';

describe('ver', () => {
  it('should return the version information', async () => {
    const result = await ver();
    expect(result).toEqual({
      ver: '0.0.1',
      title: '第一版程序',
      content: '程序第一版',
      apk: '',
      ios: '',
      isForceUpdate: '0',
      appVersionCode: '0',
    });
  });
});
