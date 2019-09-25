import tsconfigPathsJestMapper from './index';
import path from 'path';

describe('test lib', () => {
  it('should load tsconfig', () => {
    tsconfigPathsJestMapper(path.resolve(__dirname, '../test/right-config'));
  })

  it('should convert paths to jest moduleNameMapper', () => {
    const mappers = tsconfigPathsJestMapper(path.resolve(__dirname, '../test/right-config'));
    expect(mappers).toEqual({
      "\\$main": "<rootDir>/src/index.ts",
      "\\$components(/?.*)": "<rootDir>/src/components$1",
      "\\$errors(/?.*)": "<rootDir>/src/errors$1",
      "@app(/?.*)": "<rootDir>/src/app$1"
    })
  })

  it('should not accept configs with no paths field', () => {
    const config = path.resolve(__dirname, '../test/no-paths-field');
    expect(() => tsconfigPathsJestMapper(config)).toThrowError();
  })

  it('should only accept array paths', () => {
    try {
      tsconfigPathsJestMapper(path.resolve(__dirname, '../test/wrong-path-value'));
    } catch (e) {
      expect(e.message).toContain('Check value of: @app/*')
    }
  })
})
