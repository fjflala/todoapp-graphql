/**
 * Module dependencies
 */
const withSass = require('@zeit/next-sass')

/**
 * Next configs
 */
module.exports = withSass({
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.graphql$/,
      use: ['graphql-tag/loader'],
    });
    return config;
  }
});
