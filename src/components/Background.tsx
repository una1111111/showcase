/**
 * 全站固定装饰背景：浅蓝底 + 几块超大柔光彩色 blob + 小圆点
 * - 纯 CSS（radial-gradient），不使用任何图片资源
 * - 颜色低透明度、面积克制，保证业务文字可读性
 * - pointer-events-none，不拦截任何交互
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden>
      {/* 三块柔光彩色：珊瑚红（左）、薄荷绿（右）、阳光黄（下中） */}
      <div
        className="animate-float absolute -left-32 -top-24 h-[46vmax] w-[46vmax] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff9a8f 0%, transparent 65%)' }}
      />
      <div
        className="animate-float absolute -right-40 top-1/4 h-[44vmax] w-[44vmax] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #8fd9ff 0%, transparent 65%)',
          animationDelay: '1.6s',
        }}
      />
      <div
        className="animate-float absolute -bottom-40 left-1/3 h-[42vmax] w-[42vmax] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #ffe08a 0%, transparent 65%)',
          animationDelay: '3s',
        }}
      />
    </div>
  )
}
