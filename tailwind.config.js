/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /* 活泼浅蓝主题色板：
         paper 浅蓝底（主背景） / ink 近黑（主文字）
         其余为小面积彩色辅助，只用于标签、按钮、装饰、点缀文字 */
      colors: {
        paper: '#e7f1fd', // 浅蓝色底
        ink: '#14181f', // 近黑主文字
        accent: '#ff5c00', // 亮橙：主按钮 / 高亮标签
        coral: '#ff6f61', // 珊瑚红：辅助点缀
        sun: '#ffc53d', // 阳光黄：手绘下划线 / 贴纸
        mint: '#1fb892', // 薄荷绿
        sky: '#3d8bff', // 天空蓝
        grape: '#7c6cf0', // 葡萄紫
        pink: '#ff8fb3', // 粉色
      },
      fontFamily: {
        /* 正文：圆润无衬线，中文回退苹方/雅黑 */
        body: ['Nunito', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        /* 标题：Fredoka（英文圆润童趣味）+ 站酷快乐体（中文童趣） */
        display: ['Fredoka', '"ZCOOL KuaiLe"', '"PingFang SC"', 'sans-serif'],
      },
      boxShadow: {
        /* 贴纸风柔和投影 */
        sticker: '0 12px 30px -12px rgba(20,24,31,0.25)',
        card: '0 18px 45px -24px rgba(20,24,31,0.28)',
      },
    },
  },
  plugins: [],
}
