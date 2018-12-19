module.exports = {
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.graphql$/,
      use: ['graphql-tag/loader'],
    });
    return config;
  }
}