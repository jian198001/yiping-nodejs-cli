/**
 * Jest配置文件
 * 
 * 该文件导出一个包含Jest配置选项的对象。
 * 
 * @module jest.config
 */
module.exports = {
  /**
   * 指定Jest使用的预设配置。
   * 
   * 这里使用了'ts-jest'预设，它是一个用于在Jest中测试TypeScript代码的预设。
   */
  preset: 'ts-jest',

  /**
   * 指定Jest测试的运行环境。
   * 
   * 这里设置为'node'，表示Jest将在Node.js环境中运行测试。
   */
  testEnvironment: 'node',

  /**
   * 指定Jest忽略的测试文件路径模式。
   * 
   * 这里设置为忽略'<rootDir>/test/fixtures'目录下的所有文件，这些文件可能是测试的固定数据或示例代码，不应该被视为测试用例。
   */
  testPathIgnorePatterns: ['<rootDir>/test/fixtures'],

  /**
   * 指定Jest在生成代码覆盖率报告时忽略的文件路径模式。
   * 
   * 这里设置为忽略'<rootDir>/test/'目录下的所有文件，这些文件通常是测试代码本身，不应该包含在代码覆盖率报告中。
   */
  coveragePathIgnorePatterns: ['<rootDir>/test/'],
};