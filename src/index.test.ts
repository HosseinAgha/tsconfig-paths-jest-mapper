import tsconfigPathsJestMapper from './index';
import path from 'path';

describe('test lib', () => {
  it('should load tsconfig', async () => {
    await tsconfigPathsJestMapper(path.resolve(__dirname, '../test/right-config'));
  })

  it('should not accept configs with no paths field', async () => {
    const config = path.resolve(__dirname, '../test/no-paths-field');
    expect(tsconfigPathsJestMapper(config)).rejects.toThrow();
  })

  it('should only accept array paths', async () => {
    try {
      await tsconfigPathsJestMapper(path.resolve(__dirname, '../test/wrong-path-value'));
    } catch (e) {
      expect(e.message).toContain('Check value of: @app/*')
    }
  })

  it('should convert paths to jest moduleNameMapper', async () => {
    const mappers = await tsconfigPathsJestMapper(path.resolve(__dirname, '../test/right-config'));
    expect(mappers).toEqual({
      "\\$components/(.*)": "<rootDir>/src/components/$1",
      "@app/(.*)": "<rootDir>/src/app/$1"
    })
  })
})
