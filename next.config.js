/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.FLUENTFFMPEG_COV': false
        })
        )
     
        return config
      },

    experimental: {
        instrumentationHook: true
    }
};

export default config;
