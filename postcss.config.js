module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,   // 视口宽度, 对应的是设计稿宽度
      viewportHeight: 667,  // 视口高度, 对应的是设计稿的高度
      unitPrecision: 5,     // 指定'px'转换为视口单位值的小数位数(保留5位小数)
      viewportUnit: "vw",   // 指定需要转换成的视口单位, 建议使用vw
      selectorBlackList: ["ignore"],   // 指定不需要转换的类
      minPixelValue: 1,     // 小于或等于'1px'不转换为视口单位
      mediaQuery: false     // 允许在媒体查询中转换'px'
    }
  }
}