import devConfig from './dev.config.js';
import qaConfig from './qa.config.js';

const ENV = process.env.TEST_ENV || 'qa'; // Default to 'qa' if not set

let config;

switch (ENV) {
    case 'qa':
        config = qaConfig;
        break;
    case 'dev':
    default:
        config = devConfig;
        break;
}

module.exports = config;