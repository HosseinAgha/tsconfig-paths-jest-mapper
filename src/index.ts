import { loadSync } from 'tsconfig';

function escapeRegExp(text: string) {
  // we don't excape * in tsconfig paths
  // but we should escape other special characters
  return text.replace(/[-[\]{}()+?.,\\^$|#\s]/g, '\\$&');
}

export const getJestMappersFromTSConfig = (tsconfigPath: string, options: { startsWith: boolean } = { startsWith: true }) => {
  const { config } = loadSync('', tsconfigPath);
  if (!config.compilerOptions || !config.compilerOptions.paths) {
    throw new Error('paths field not found in tsconfig compiler options');
  }

  const paths: Record<string, string[]> = config.compilerOptions.paths;
  const moduleNameMapper: Record<string, string> = {};
  let pathKeys = Object.keys(paths);
  // remove equivalant paths: we don't need $errors when we have $errors/*
  pathKeys = pathKeys.filter((key) => {
    const keyRegExp = new RegExp(`^${escapeRegExp(key).replace('*', '\\*')}`);
    return !pathKeys.some((k) => key !== k && keyRegExp.test(k));
  })

  for (const key of pathKeys) {
    const valueArray = paths[key];
    if (!Array.isArray(valueArray) || valueArray.length !== 1) {
      throw new Error(`paths should be an array with exactly one element for mapping to work.\n Check value of: ${key}`);
    }

    const [ value ] = valueArray;
    let source = escapeRegExp(key).replace(/\/\*/, "(/?.*)");
    if(options.startsWith) {
      source = `^${source}`;
    }
    const path = `<rootDir>/${value.replace(/\/?\*/, "$1")}`;
    moduleNameMapper[source] = path;
  }

  return moduleNameMapper;
}

export default getJestMappersFromTSConfig;
module.exports = getJestMappersFromTSConfig;
