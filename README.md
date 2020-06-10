# mall V1.1.0

> API: 请联系 wechat 账号: **coderwhy001**

> <a href="http://mall.coderlion.com" target="_blank">在线演示地址</a>

### 免责声明

- 本站仅供学习, 不做任何盈利目的, API 来自 **coderwhy001**

- 在代码中将隐藏部分 API 接口, 需要最新接口请联系 **coderwhy001**

### 如何安装与使用

```base
git clone https://github.com/coderlion4/mall.git  //下载 mall

cd mall // 进入 mall目录

npm install // 安装依赖

npm run serve // 运行 mall

npm run build  // 项目打包
```

##### 部署时nginx的配置(hisotry模式下在vue路由中刷新导致404问题)

```shell
location / {
  try_files $uri $uri/ @router;   #需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
  index  index.html index.htm;
}
    
location @router {
  rewrite ^.*$ /index.html last;  #/index.html前面有空格
}
```

<a href="https://router.vuejs.org/zh/guide/essentials/history-mode.html">更多服务器配置</a>

### 技术栈

- Vue2.0 (核心框架)
- Vue-CLI 4.0 (Vue脚手架)
- Vue-Router (SPA页面路由)
- Vuex (状态管理)
- Axios (网络请求)
- Mixin (混入)
- Bus (事件总线)
- ES 6 (JavaScript 语言的下一代标准)
- Less (CSS 预处理器)
- Better-Scroll (让移动端的滚动更为流畅)
- FastClick (解决移动端点击300ms延迟)
- Vue-Lazyload (懒加载工具)
- PostCss (css代码转化工具)

### 页面欣赏

##### 首页
![image](https://github.com/coderlion4/mall/blob/master/projectImage/IMG_1004.PNG)

![image](https://github.com/coderlion4/mall/blob/master/projectImage/IMG_1005.PNG)

##### 详情页

![image](https://github.com/coderlion4/mall/blob/master/projectImage/IMG_1006.PNG)

##### 分类

![image](https://github.com/coderlion4/mall/blob/master/projectImage/IMG_1007.PNG)

![image](https://github.com/coderlion4/mall/blob/master/projectImage/IMG_1008.PNG)

##### 购物车

![image](https://github.com/coderlion4/mall/blob/master/projectImage/IMG_1009.PNG)

##### 我的

![image](https://github.com/coderlion4/mall/blob/master/projectImage/IMG_1010.PNG)

### 更新说明

#### V1.1.0 (2020.04.19)

- 修复了移动端浏览器在**显示/隐藏**工具栏时高度bug
- 为代码加入大量注释
- 提高代码复用性
- 优化移动端 300ms 点击延迟

#### V1.0.0 (2020.03.28）

- 发布正式版
