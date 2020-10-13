const path = require('path')
const templateFunction = require('./config/spriteTem')
const SpritesmithPlugin = require('webpack-spritesmith')

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'byPage',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/js/flexible.js' }],
  },
  router: {
    middleware: 'auth',
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['element-ui/lib/theme-chalk/index.css', '@/styles/normalize'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/axios', ssr: true },
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/babel-polyfill', ssr: true },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: '~/styles/var.scss',
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  buildModules: [
    // Simple usage
  ],

  build: {
    extractCSS: process.env.NODE_ENV == 'production',
    postcss: {
      plugins: {
        'postcss-px2rem-exclude': {
          remUnit: 100,
          exclude: /node_modules/,
        },
      },
      preset: {
        // css3兼容性
        autoprefixer: {
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 10',
          ],
        },
      },
    },
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' },
        ],
      ],
    },
    transpile: [/^element-ui/],
    extend(config, { isDev, isClient }) {
      // 将小图标拼接成雪碧图
      config.plugins.push(
        new SpritesmithPlugin({
          src: {
            cwd: './static/icons',
            glob: ['*.png', '*.jpg'],
          },
          target: {
            image: './static/img/sprite.png',
            css: [
              [
                './styles/sprite.scss',
                {
                  // 引用自己的模板
                  format: 'function_based_template',
                },
              ],
            ],
          },
          apiOptions: {
            cssImageRef: '/img/sprite.png',
          },
          customTemplates: {
            function_based_template: templateFunction,
          },
          spritesmithOptions: {
            algorithm: 'binary-tree',
            padding: 10,
          },
        })
      )
      if (isClient) {
        // 图片压缩
        config.module.rules[config.module.rules.length - 3].use.push({
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
            mozjpeg: {
              // 压缩 jpeg 的配置
              progressive: true,
              quality: 100,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.95, 1],
              speed: 1,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 100,
            },
          },
        })
      }
    },
  },
}
