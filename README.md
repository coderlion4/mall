# mall V1.1.0

模仿**蘑菇街**的一个移动端商城

> api: 请联系wechat账号: **coderwhy001**

> <a href="https://mall.itzjh.cn" target="_blank">在线演示地址</a>

> 联系作者
> ![image](https://github.com/jrzjh4/mall/blob/master/projectImage/code.JPG)

### 免责声明

- 本站仅供学习, 不做任何盈利目的, 资源来自**coderwhy001**

- 在代码中将隐藏部分api接口, 需要最新接口请联系**coderwhy001**

### 如何安装与使用

```base
git clone https://github.com/jrzjh4/mall.git  //下载 mall

cd mall // 进入 mall目录

npm install // 安装依赖

npm run serve // 运行 mall

npm run build  // 项目打包
```

##### 部署时nginx的配置(hisotry模式下在vue路由中刷新导致404问题)

```base64
location / {
  try_files $uri $uri/ @router;   #需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
  index  index.html index.htm;
}
    
location @router {
  rewrite ^.*$ /index.html last;  #/index.html前面有空格
}
```

<a href="https://router.vuejs.org/zh/guide/essentials/history-mode.html">来自Vue Router</a>

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
![image](https://github.com/jrzjh4/mall/blob/master/projectImage/IMG_1004.PNG)

![image](https://github.com/jrzjh4/mall/blob/master/projectImage/IMG_1005.PNG)

##### 详情页

![image](https://github.com/jrzjh4/mall/blob/master/projectImage/IMG_1006.PNG)

##### 分类

![image](https://github.com/jrzjh4/mall/blob/master/projectImage/IMG_1007.PNG)

![image](https://github.com/jrzjh4/mall/blob/master/projectImage/IMG_1008.PNG)

##### 购物车

![image](https://github.com/jrzjh4/mall/blob/master/projectImage/IMG_1009.PNG)

##### 我的

![image](https://github.com/jrzjh4/mall/blob/master/projectImage/IMG_1010.PNG)

### 更新说明

#### V1.1.0 (2020.04.19)

- 修复了移动端浏览器在**显示/隐藏**工具栏时高度bug
- 为代码加入大量注释
- 提高代码复用性
- 优化移动端 300ms 点击延迟

#### V1.0.0 (2020.03.28）

- 发布正式版


### 其他说明

- 跟随**coderwhy**老师完成的小项目
- 感谢**coderwhy**, **尤大**以及在我遇到问题时热心帮助的**小伙伴们~**
