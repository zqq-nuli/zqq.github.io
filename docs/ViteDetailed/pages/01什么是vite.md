---
    title:  什么是 Vite ?
---

# {{ $frontmatter.title }}
[参考学习网课地址--b站付金权的前端课](https://www.bilibili.com/video/BV1GN4y1M7P5)
## 前言
如果我们要学习`vite`，那么我们要先了解什么是`vite`，有人说:`vite`就是`webpack`，一样的嘛！  
对的 其实个人认为这两个差不多，但是现在为什么`Vue`团队逐渐抛弃掉`webpack`，转而使用`vite`了呢?我个人认为
1. `vite`快，是真的要比`webpack`快，具体体现在了打包、开发环境的热更新、项目启动上
2. 相比于`vite`，`webpack`配置和使用起来是过于麻烦的(不排除多年以后 `vite` 也变成这样)，例如使用scss，不知道多少开发者被`node-sass`，`sass-loader`这两个东西折磨过
3. 个人认为，可能也有尤雨溪的一些私心在里面吧，想要完善整个`Vue`生态，以至于后来的开发者会认为，`vite`天生就是和`Vue`绑定再一起的，其实`vite`是可以抽出来单独用的

## pnpm create vite 做了什么？
当我们敲下 `pnpm create vite` 后
1. 全局安装`create vite`脚手架
2. 再运行`create-vite`的`bin`目录下的一个执行配置开始构建项目

这其实和我们`Vue2`的`vue-cli`是类似的，我们先去安装`vue-cli`然后再去使用cli创建项目  
这里其实部分人会有个误区，认为这是`vite`再帮我们去创建项目，其实不然 **这个过程中vite什么都没做**  

- `vue-cli`:给你一套初始化后的模板，**内置webpack**
- `create-vite`:给你一套所有东西都准备好的模板，**内置vite**  

`vue`团队希望弱化`vite`的存在，希望更多的去使用 `create-vite` ，但是我们去学习的时候这两个是要分清楚的。  
`vite`和`webpack`都是开箱即用的(out of box)  

 **例如:** 你自己去构建一个项目，想要使用`vite`，那么当我们`pnpm init`后，手动创建`index.html`然后下载`vite`在`package.json`中的`scripts`对象中添加`"dev":"vite"`，然后就可以直接`pnpm dev`去使用`vite`帮你启动项目了
 ```json
     "scripts": {
        "dev": "vite",
        "build": "vite build"
    },
 ```

 ## vite 的预加载

在学习vite的预加载之前，我们要先了解一些东西，我们平时导包，一般分为两种情况  
```js
    import xxx from "包名" // 直接从 node_modules 里导入
    import xxx from "./xxx/xxx/xxx.js" // 从文件中导入
```
如果我们不使用`vite`，那么在`index.html`中使用`script`标签`type="module"`开启`ES6`的话 从文件中导入也是可以实现的，但是我们无法直接通过包名导入包  
既然我们已经规范使用`node_modules`来导包，为什么浏览器不直接帮我们导入呢？
这涉及到一个包的嵌套的问题，如果浏览器可以通过`node_modules`来导包，那么可能某些包依赖更多包，会一直嵌套进去无穷无尽，那么我们会有无数个网络请求资源。  

### vite的依赖于构建
那么如果我们使用`vite`，他是怎么帮我们处理的呢？
当我们通过`vite`启动后，他看到有直接导入包，且没有相对路径的时候，会开启路径补全，这个是在构建周期中做的事情，然后启动本地服务器，运行`index.html`，这和你使用`LiveSeaver`是类似的不过后者不带预构建功能  
找寻过程是从当前目录一级一级的向上找，直至找到根目录或者找到对应依赖后停止  
```js
    import _ from 'loadsh';
    import _ from '/node_modules/.vite/deps/lodash.js?v=*'
```

**为什么补全的路径都是绝对路径而不是相对路径呢？**  
因为我们要区分生产环境和开发环境，当我们处于开发环境时 每次`pnpm dev`都会从新跑一遍项目，那么我们使用相对路径也会从新找一遍，但如果我们是生产环境的话，`vite`会交给`rollup`的库去完成生产环境的打包。  
还有一个原因就是，我们有些库用的是`commonJS规范`导出和编写，有些是使用`ESmodule规范`导出和编写，那么无法做到统一，所以`vite`会在启动的时候，找到所有的依赖，先使用`ESbuild`将所有模块统一成`ESmodule规范`，然后将所有需要的模块打包至`node_modules/.vite/deps目录`下，这样就可以对所有模块进行一个统一集成，并且同时也解决了缓存的问题，如果某个模块有更新，那么直接删除掉从新打包新的模块，这样未更新的模块使用静态缓存文件，已更新的则从新打包，大大减少了打包速度和启动速度，不至于某个模块更新导致整体全部更新的情况。

```js
// a.js
export default function a(){}
```
```js
    //index.js
    export {default as a} from './a.js'

    // 这个写法相当于 
    import a from './a.js'
    export const a = a;

```
vite重写后

```js
    //index.js?v=*
    function a{}
```

它解决了三个问题
1. 不同的第三方包会有不同的导出格式，这个是`vite`无法约束的问题
2. 一次性对路径的处理上可以直接使用`.vite/deps`，方便路径重写
3. 网络多包传输的性能问题，假设一个库依赖了很多的模块，那么会造成性能问题，这也是原生`esmodule`规范不敢支持`node_modules`的原因之一
    有了依赖于构建以后 ,无论他又多少`export`和`import`，`vite`会尽量的去将其继承成一个或者几个模块
