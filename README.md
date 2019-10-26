Convert your tsconfig paths to jest `moduleNameMappers`.  
This introduces many bug fixes and improvements to [archived](https://github.com/ryohey/tsconfig-paths-jest) [tsconfig-paths-jest](https://www.npmjs.com/package/tsconfig-paths-jest) package.  

## Usage
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

## Options

- __startsWith:__ ensures that all the replaced paths (keys in the tsconfig) happen at the beginning of the path. is `true` by default.
