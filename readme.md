# EazyGO

更容易简单的页面跳转



#### 功能

​	可以使用 name、页面标题来跳转页面（当然也可以用 路由 、免pages/路由 来跳转）



​	name 可以自定义，没有的话会自动添加，将路由最后一个节点作为name

​	如pages中，页面路径为 a/b/c/d,则name为d

​	name重复，则取第一个



#### 安装

将 pages.js 、pageR.js  以及 script目录 复制到根目录

然后在项目根目录，创建文件 vue.config.js  将下面代码复制进来

```
const TransformPages = require('./pageR')
const tfPages = new TransformPages()
module.exports = {
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    }
}
```

核心文件 ：script/ego.js



#### 如何使用

导入 ego.js 然后 ego.rgo(跳转的页面,[是否重定向]) 



#### 兼容问题

插件核心逻辑，只不过修改和读取了pages.json ,我也没试过，应该可以吧



#### 组件前置(使用者不用管)

该组件的完成离不开这个项目和钩子



uniapp的 pages.js 钩子

读取pages.json 的插件 https://ext.dcloud.net.cn/plugin?id=1220

