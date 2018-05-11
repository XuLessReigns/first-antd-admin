# first-antd-admin
antd-admin

开始之前：

    确保 node 版本是 6.5 +

    用 cnpm 或 yarn 能节约你安装依赖的时间

-----------------------------------------------------------------------------------------

Step 1. 安装 dva-cli 并创建应用


先安装 dva-cli，并确保版本是 0.7.x。

    $ npm i dva-cli@0.7 -g

    $ dva -v

    0.7.0

然后创建应用：

    $ dva new first-demo

    $ cd first-demo 

-----------------------------------------------------------------------------------------

Step 2. 配置 antd 和 babel-plugin-import


babel-plugin-import 用于按需引入 antd 的 JavaScript 和 CSS，这样打包出来的文件不至于太大。

    $ npm i antd --save

    $ npm i babel-plugin-import --save-dev

修改 .roadhogrc，在 "extraBabelPlugins" 里加上：

    ["import", { "libraryName": "antd", "style": "css" }]

-----------------------------------------------------------------------------------------

Step 3. 配置代理，能通过 RESTFul 的方式访问 http://localhost:8000/api/users


修改 .roadhogrc，加上 "proxy" 配置：

    "proxy": {

      "/api": {

        "target": "http://jsonplaceholder.typicode.com/",

        "changeOrigin": true,

        "pathRewrite": { "^/api" : "" }

      }

    },

-----------------------------------------------------------------------------------------

然后启动应用：(这个命令一直开着，后面不需要重启)

$ npm start

浏览器会自动开启，并打开 http://localhost:8000 。

-----------------------------------------------------------------------------------------

完成用户管理的CURD应用的原地址： https://github.com/sorrycc/blog/issues/18

详细组件文档源地址见：http://ant.design/components/menu-cn/
