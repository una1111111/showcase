import { useState } from 'react'
import { PORTRAIT_SRC } from '../config/site'

/**
 * #home 首页门版式导航（活泼浅蓝版）
 * 布局参考「大贴纸人物 + 右侧大菜单」的封面式个人主页：
 * - 左下：本人的卡通形象大贴纸（厚白边 + 阴影 + 微旋转，从屏幕边缘探出来）
 * - 右侧：01–04 巨型菜单（Projects / Resume / Agent / Contact）
 * - 气泡：一句活泼的招呼，呼应经典的 "Leaving so soon?"
 * 固定 100dvh、overflow-hidden；Header / 抽屉在 Header 组件内。
 */

const MENU_ITEMS = [
  { no: '01', label: 'Projects', href: '#projects' },
  { no: '02', label: 'Resume', href: '#resume' },
  { no: '03', label: 'Agent', href: '#agent' },
  { no: '04', label: 'Contact', href: '#contact' },
]

/* 各行悬浮时的小面积彩色（第一行默认珊瑚红高亮） */
const ROW_COLOR = ['text-coral', 'hover:text-mint', 'hover:text-grape', 'hover:text-sky']

export default function Home() {
  /* 卡通图片加载失败时显示虚线占位贴纸 */
  const [portraitError, setPortraitError] = useState(false)

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-transparent">
      {/* 小装饰：漂浮星星 / 小圆点（存在感很低，纯 CSS） */}
      <div
        className="animate-float pointer-events-none absolute left-[6%] top-[20%] z-10 hidden text-3xl text-sun sm:block"
        aria-hidden
      >
        ✦
      </div>
      <div
        className="animate-float pointer-events-none absolute bottom-[34%] right-[44%] z-10 hidden h-4 w-4 rounded-full bg-pink sm:block"
        style={{ animationDelay: '2.2s' }}
        aria-hidden
      />

      {/* ========== 左侧：卡通形象大贴纸（从屏幕边缘探出来） ========== */}
      <div className="pointer-events-none absolute bottom-[-2.5vh] left-[-7vw] z-10 h-[50vh] sm:left-[3vw] sm:h-[78vh]">
        <div className="anim-rise relative h-full" style={{ animationDelay: '250ms' }}>
          {portraitError ? (
            /* 图片缺失时的占位贴纸 */
            <div className="flex h-full w-[23vh] items-center justify-center rounded-[2rem] border-2 border-dashed border-ink/30 bg-white/70 shadow-card sm:w-[34vh]">
              <div className="flex flex-col items-center gap-2 px-4 text-center">
                <span className="text-4xl">🎨</span>
                <span className="font-display text-sm font-semibold text-ink/70">我的卡通形象</span>
              </div>
            </div>
          ) : (
            <img
              src={PORTRAIT_SRC}
              alt="丁一的卡通形象"
              onError={() => setPortraitError(true)}
              draggable={false}
              className="h-full w-auto rotate-[-3deg] rounded-[2rem] border-[6px] border-white shadow-card"
            />
          )}
        </div>
      </div>

      {/* ========== 招呼气泡（压在贴纸右上方） ========== */}
      <div
        className="anim-fade pointer-events-none absolute bottom-[41vh] left-[8vw] z-30 sm:bottom-[63vh] sm:left-[29vw]"
        style={{ animationDelay: '700ms' }}
      >
        <div className="animate-float relative rotate-[2deg] rounded-3xl border-2 border-ink/10 bg-white px-5 py-3 shadow-sticker">
          <p className="whitespace-nowrap font-display text-[13px] font-semibold text-ink sm:text-base">
            来都来了，先从哪一站开始逛？
          </p>
          {/* 气泡小尾巴 */}
          <span
            className="absolute -bottom-[9px] left-8 h-4 w-4 rotate-45 border-b-2 border-r-2 border-ink/10 bg-white"
            aria-hidden
          />
        </div>
      </div>

      {/* ========== 右侧：01–04 巨型菜单 ========== */}
      <nav
        aria-label="首页大菜单"
        className="absolute right-5 top-[15vh] z-20 sm:right-[7vw] sm:top-1/2 sm:-translate-y-1/2"
      >
        <ol className="flex flex-col items-start gap-2 sm:gap-4">
          {MENU_ITEMS.map((item, i) => (
            <li key={item.no} className="anim-fade" style={{ animationDelay: `${420 + i * 90}ms` }}>
              <a
                href={item.href}
                className={`group flex items-baseline gap-3 transition-transform duration-300 hover:-translate-x-2 sm:gap-5 ${
                  i === 0 ? 'text-coral' : `text-ink ${ROW_COLOR[i]}`
                }`}
              >
                <span className="font-display text-xs font-semibold tabular-nums text-ink/30 sm:text-sm">
                  {item.no}
                </span>
                <span className="font-display text-[clamp(2.1rem,9vw,5.5rem)] font-semibold leading-none tracking-tight">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ol>
        <p
          className="anim-fade mt-5 hidden font-display text-[12px] font-semibold tracking-[0.18em] text-ink/40 sm:block"
          style={{ animationDelay: '900ms' }}
        >
          点任意一站，翻我的故事 →
        </p>
      </nav>

      {/* ========== 底部小字版权（仅桌面端） ========== */}
      <footer className="anim-fade pointer-events-none absolute inset-x-10 bottom-6 z-10 hidden justify-end sm:flex">
        <span className="font-display text-[11px] font-medium tracking-[0.16em] text-ink/35">
          © 2026 Ding Yi · Made with curiosity
        </span>
      </footer>
    </section>
  )
}
