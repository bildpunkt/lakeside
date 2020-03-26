const fs = require('fs');
const path = require('path');

module.exports = class ConfigurationCollector {
  constructor() {
    this.customPath = '';
    this.configEnv = '';

    this.getConfigurationEnvironment();
  }

  /**
   * Method that determines which configuration environment should be used
   * 
   * Priority (lower in list = higher):
   * - environment variables (lakeside_*)
   * - npm environment variables (npm_package_lakeside_*)
   * - package.json
   * - .lakesiderc[.js|.json]
   * - custom file path with --config argument
   */
  getConfigurationEnvironment() {
    const processEnvKeys = Object.keys(process.env);

    const isLakesideEnv = processEnvKeys.some(function (key) {
      return key.startsWith('lakeside_');
    });

    if (isLakesideEnv) {
      this.configEnv = 'env';
    }

    const isPackageEnv = processEnvKeys.some(function (key) {
      return key.startsWith('npm_package_lakeside');
    });

    if (isPackageEnv) {
      this.configEnv = 'packageEnv';
    }

    if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
      const packageJson = require(path.join(process.cwd(), 'package.json'));

      if (packageJson['lakeside'] !== undefined) {
        this.configEnv = 'package';
      }
    }

    if (fs.existsSync(path.join(process.cwd(), '.lakesiderc')) ||
        fs.existsSync(path.join(process.cwd(), '.lakesiderc.json')) ||
        fs.existsSync(path.join(process.cwd(), '.lakesiderc.js'))) {
      this.configEnv = 'lakesiderc';
    }

    const cliArguments = process.argv.slice(2);
    if (cliArguments.includes('--config')) {
      const customPath = cliArguments[cliArguments.indexOf('--config') + 1];
      
      if (fs.existsSync(path.join(process.cwd(), customPath))) {
        this.configEnv = 'custom';
        this.customPath = path.join(process.cwd(), customPath);
      }
      else {
        throw new Error('Configuration file not found in path specified after --config flag!');
      }
    }

    if (this.configEnv === '') {
      throw new Error('No suitable configuration found in any of the possible locations!');
    }
  }

  /**
   * Method handling which method of configuration loading should be executed
   */
  resolveConfiguration() {
    switch (this.configEnv) {
      case 'env':
        return this.loadFromEnvironment('lakeside_');
      case 'packageEnv':
        return this.loadFromEnvironment('npm_package_lakeside_');
      case 'package':
        return this.loadFromPackage();
      case 'lakesiderc':
        return this.loadFromFile();
      case 'custom':
        return this.loadFromFile(this.customPath);
    }
  }

  /**
   * Loads the configuration from environment variables with a given prefix
   * 
   * @param {*} prefix - prefix for the environment variable
   */
  loadFromEnvironment(prefix) {
    let config = {};

    let envVariables = Object.entries(process.env);
    envVariables = envVariables.filter(function (variable) {
      return variable[0].startsWith(prefix);
    });

    envVariables.forEach(function (variable) {
      let key = variable[0];
      const value = variable[1];

      key = key.replace(prefix, '');

      let keyPath = key.split('_');
      let tmp = config;

      // FIXME: Something in here is broken causing deepest level value keys to appear on the root of tmp!
      keyPath.forEach(function (kPath, index) {
        if (tmp[kPath] === undefined) {
          if (index !== (keyPath.length - 1)) {
            tmp = tmp[kPath] = {};
          }
          else {
            tmp[kPath] = value;
          }
        }
      });

      Object.assign(config, tmp);
    });

    return config;
  }

  /**
   * Loads the configuration from the package.json
   */
  loadFromPackage() {
    const packageJson = require(path.join(process.cwd(), 'package.json'));

    return packageJson['lakeside'];
  }

  /**
   * Loads the configuration from a file
   * 
   * @param {*} filePath - optional custom file path
   */
  loadFromFile(filePath) {
    if (filePath === undefined) {
      filePath = path.join(process.cwd(), '.lakesiderc');
    }

    return require(filePath);
  }
}