## 统一管理 api

文件夹 modules 对接口进行模块区分。
通过 index.js 暴露出去，有俩地会用到，asyncData 和 vue。

```javascript
// 同时注入context 和 Vue中，以$为前缀调用
import api from '@/api'
export default ({ app }, inject) => {
  inject('api', api)
}
```

## 自适应方案

flexible + rem + postcss-px2rem-exclude

- nuxt.config.js 配置

```JavaScript
build: {
    postcss: {
      plugins: {
        'postcss-px2rem-exclude': {
          remUnit: 100, // 100px = 1rem
          exclude: /node_modules/, // 排除第三方组件转换
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
}
```

- flexible.js 调整

```javaScript
function setRemUnit() {
    var rem = docEl.clientWidth > 750 ? 100 : (docEl.clientWidth / 750) * 100
    docEl.style.fontSize = rem + 'px'
}
```

## v-lazyBox：元素可视 > 动画及回调

使用 intersection-observer 判断元素是否进入可视区，并通过 vue 指令绑定在元素上。
由于通过指令的方式，事件执行是在元素生成之后，需要对页面加载时，已经在可视区的元素
做隐藏处理 opacity = 0。

## webpack-spritesmith：合成雪碧图

```javascript
const templateFunction = require('./config/spriteTem')
const SpritesmithPlugin = require('webpack-spritesmith')
export default {
  build: {
    extend(config, { isDev, isClient }) {
      // 将小图标拼接成雪碧图
      config.plugins.push(
        new SpritesmithPlugin({
          src: {
            cwd: './static/icons', // 需要合并的图片目录
            glob: ['*.png', '*.jpg'],
          },
          target: {
            image: './static/img/sprite.png', // 雪碧图保存地址
            css: [
              [
                './styles/sprite.scss', // 雪碧图样式保存地址
                {
                  format: 'function_based_template', // 引用自己的模板
                },
              ],
            ],
          },
          apiOptions: {
            cssImageRef: '/img/sprite.png', // css background:url引入雪碧图的地址
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
    },
  },
}
```

## image-webpack-loader：压缩图片

```javascript
export default {
  build: {
    extend(config, { isDev, isClient }) {
      if (isClient) {
        // 图片压缩
        config.module.rules[config.module.rules.length - 3].use.push({
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
            mozjpeg: {
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
```
