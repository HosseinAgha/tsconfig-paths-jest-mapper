import { loadSync } from 'tsconfig';

function escapeRegExp(text: string) {
  // we don't excape * in tsconfig paths
  // but we should escape other special characters
  return text.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&');
}

export const getJestMappersFromTSConfig = (tsconfigPath: string) => {
  const { config } = loadSync('', tsconfigPath);
  if (!config.compilerOptions || !config.compilerOptions.paths) {
    throw new Error('paths field not found in tsconfig compiler options');
  }

  const paths: Record<string, string[]> = config.compilerOptions.paths;
  const moduleNameMapper: Record<string, string> = {};
  for (let [key, valueArray] of Object.entries(paths)) {
    if (!Array.isArray(valueArray) || valueArray.length !== 1) {
      throw new Error(`paths should be an array with exactly one element for mapping to work.\n Check value of: ${key}`);
    }

    const [ value ] = valueArray;
    const source = escapeRegExp(key).replace(/\*/, "(.*)");
    const path = `<rootDir>/${value.replace(/\*/, "$1")}`;
    moduleNameMapper[source] = path;
  }

  return moduleNameMapper;
}

export default getJestMappersFromTSConfig;
module.exports = getJestMappersFromTSConfig;
