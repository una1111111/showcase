import { useState } from 'react'
import { PORTRAIT_SRC } from '../config/site'

/**
 * #home 首页全屏 Hero（活泼浅蓝版）
 * - 固定 100dvh，overflow-hidden，首屏禁止页面滚动
 * - 图层顺序：
 *   底层浅蓝背景 → z-10 Marquee → z-10 彩色分割线 → sm:z-10 桌面 Footer
 *   → z-20 卡通人物贴纸像框 → Header / 抽屉 / X 在 Header 组件内
 */

/* Marquee 文案拆成几段上色：黑字为主、彩色字为辅 */
const MARQUEE_WORDS: { text: string; cls: string }[] = [
  { text: 'Ding ', cls: 'text-ink' },
  { text: 'Yi ', cls: 'text-accent' },
  { text: '— ', cls: 'text-mint' },
  { text: 'Activity ', cls: 'text-sky' },
  { text: 'Marketing', cls: 'text-grape' },
]

function MarqueeLine() {
  return (
    <span className="flex items-center whitespace-nowrap pr-[5vw]">
      {MARQUEE_WORDS.map((w) => (
        <span
          key={w.text}
          className={`font-display text-[15vh] font-semibold leading-none tracking-tight sm:text-[25vh] ${w.cls}`}
        >
          {w.text}
        </span>
      ))}
      {/* 句尾小太阳点缀，纯 CSS 圆形 */}
      <span className="ml-[3vw] h-[7vh] w-[7vh] shrink-0 rounded-full bg-sun sm:h-[11vh] sm:w-[11vh]" aria-hidden />
    </span>
  )
}

export default function Home() {
  /* 卡通形象图片加载失败时显示虚线占位贴纸；放入 public/portrait.png 后自动切换 */
  const [portraitError, setPortraitError] = useState(false)

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-transparent">
      {/* ========== 图层1：浅蓝纯色底（透明露出 App 的柔光背景） ========== */}
      <div className="absolute inset-0 anim-fade" />

      {/* 小装饰：左上漂浮星星 / 右下小圆点（纯 CSS，存在感很低） */}
      <div
        className="animate-float absolute left-[8%] top-[24%] z-10 hidden text-3xl text-sun sm:block"
        aria-hidden
      >
        ✦
      </div>
      <div
        className="animate-float absolute bottom-[30%] left-[16%] z-10 hidden h-4 w-4 rounded-full bg-pink sm:block"
        style={{ animationDelay: '2.2s' }}
        aria-hidden
      />

      {/* ========== 图层2：z-10 无缝循环 Marquee 巨型滚动标题 ========== */}
      <div className="absolute inset-0 z-10 flex items-center overflow-hidden">
        <div
          className="anim-fade flex w-max animate-marquee"
          style={{ animationDelay: '150ms' }}
        >
          {/* 同一句文案重复两遍，配合 translateX(-50%) 实现无缝循环 */}
          {[0, 1].map((i) => <MarqueeLine key={i} />)}
        </div>
      </div>

      {/* ========== 图层3：z-10 彩色水平分割线，自左向右展开 ========== */}
      <div className="absolute inset-x-5 bottom-[17vh] z-10 sm:inset-x-10 sm:bottom-[128px]">
        <div
          className="anim-line h-[3px] w-full rounded-full bg-gradient-to-r from-coral via-sun to-mint"
          style={{ animationDelay: '520ms' }}
        />
      </div>

      {/* ========== 图层4：sm:z-10 桌面端底部 Footer（移动端隐藏，保证首屏纯粹） ========== */}
      <footer
        className="anim-fade absolute inset-x-10 bottom-9 z-10 hidden items-end justify-between sm:flex"
        style={{ animationDelay: '720ms' }}
      >
        {/* 左栏：简短个人标签，每个标签配彩色小点 */}
        <div className="flex flex-col gap-1.5">
          {[
            { text: 'Activity Operator', dot: 'bg-coral' },
            { text: 'AIGC-Enhanced Marketer', dot: 'bg-grape' },
            { text: 'Project Practitioner', dot: 'bg-mint' },
          ].map((item) => (
            <span
              key={item.text}
              className="flex items-center gap-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/75"
            >
              <span className={`h-2 w-2 rounded-full ${item.dot}`} aria-hidden />
              {item.text}
            </span>
          ))}
        </div>
        {/* 右栏：聚焦方向（贴纸风小胶囊） */}
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/45">
            Focus on
          </span>
          <span className="rotate-[-2deg] rounded-2xl border-2 border-ink bg-white px-4 py-1.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em] shadow-sticker">
            Brand &amp; Event Marketing
          </span>
        </div>
      </footer>

      {/* ========== 图层5：z-20 卡通人物形象贴纸像框（浮于滚动文字之上） ==========
          【卡通头像替换位置】
          把你的卡通人物形象（建议透明底 PNG，竖向构图）命名为 portrait.png
          放到 public/ 目录即可自动生效；未放入时显示虚线占位贴纸。
          pointer-events-none：形象层不拦截任何点击。 */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[56vh] -translate-x-1/2 sm:left-auto sm:right-[8vw] sm:h-[72vh] sm:translate-x-0">
        <div className="anim-rise relative h-full" style={{ animationDelay: '300ms' }}>
          {portraitError ? (
            /* 卡通形象缺失时的占位贴纸（替换 public/portrait.png 后自动消失） */
            <div className="relative flex h-full w-[36vh] max-w-[72vw] items-center justify-center rounded-[2.5rem] border-2 border-dashed border-ink/30 bg-white/70 shadow-sticker">
              <div className="flex flex-col items-center gap-2 px-6 text-center">
                <span className="text-4xl">🎨</span>
                <span className="font-display text-sm font-semibold text-ink/70">
                  我的卡通形象
                </span>
                <span className="text-[11px] leading-relaxed tracking-wide text-ink/40">
                  【头像替换位置】
                  <br />
                  上传为 public/portrait.png
                </span>
              </div>
            </div>
          ) : (
            <div className="relative h-full">
              {/* 贴纸白底，承托透明底卡通图 */}
              <div className="h-full w-[36vh] max-w-[72vw] rounded-[2.5rem] border-2 border-ink/10 bg-white/80 shadow-sticker" />
              <img
                src={PORTRAIT_SRC}
                alt="Ding Yi 的卡通形象（请替换为本人卡通人物 PNG）"
                onError={() => setPortraitError(true)}
                className="absolute inset-0 h-full w-[36vh] max-w-[72vw] object-contain p-3"
                draggable={false}
              />
            </div>
          )}

          {/* 摇摆小徽章：Hi!（装饰贴纸，图片缺失/存在都展示） */}
          <span
            className="animate-wiggle absolute -right-3 top-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-sun font-display text-lg font-bold text-ink shadow-sticker sm:-right-5"
            aria-hidden
          >
            Hi!
          </span>
        </div>
      </div>
    </section>
  )
}
