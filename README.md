Convert your tsconfig paths to jest `moduleNameMappers`.
I created this as [tsconfig-paths-jest](https://www.npmjs.com/package/tsconfig-paths-jest) is not maintained anymore (archived).  
Specially this package will escape the special character like `$` in `$components`.

# Usage
In your `jest.config.js` file:  
```javascript
const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');
const moduleNameMapper = getJestMappersFromTSConfig();

module.exports = {
  moduleNameMapper,
  // ... other configs
}
```

It assumes you have tsconfig besides your `jest.config.js` file.  
You can also provide the path to your tsconfig if it is in a non-standard location:  
```javascript
const path = require('path');
const getJestMappersFromTSConfig = require('tsconfig-paths-jest-mapper');
const tsconfigPath = path.resolve(__dirname, '../../tsconfig.json');
const moduleNameMapper = getJestMappersFromTSConfig(tsconfigPath);

module.exports = {
  moduleNameMapper,
  // ... other configs
}
```
