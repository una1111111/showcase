import { useEffect, useState } from 'react'
import { X } from 'lucide-react' // 全站唯一图标：仅用于移动端抽屉关闭按钮
import { NAV_ITEMS, SOCIAL_LINKS } from '../config/site'
import type { Route } from '../hooks/useHashRoute'

interface HeaderProps {
  route: Route
  /** 是否播放首页入场时序动画（仅 #home 首屏） */
  playEntrance: boolean
}

/* 当前页导航对应的小胶囊颜色（活泼但只做小面积点缀） */
const ACTIVE_COLOR: Record<string, string> = {
  projects: 'text-coral',
  resume: 'text-mint',
  agent: 'text-grape',
  contact: 'text-sky',
}

export default function Header({ route, playEntrance }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  /* 抽屉打开时锁定 body 滚动；关闭 / 卸载时恢复 */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  /* 路由切换后自动关闭抽屉 */
  useEffect(() => {
    setDrawerOpen(false)
  }, [route])

  /* ESC 关闭抽屉（无障碍） */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* 入场动画样式：仅首页首屏播放，子页面直接展示 */
  const entrance = (className: string) => (playEntrance ? `${className} anim-fade` : className)
  const entranceStyle = (delay: number) =>
    playEntrance ? { animationDelay: `${delay}ms` } : undefined

  return (
    <>
      {/* ============ z-30：顶部 Header 导航栏（桌面 + 移动端共用） ============ */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30">
        {/* 顶部浅色渐隐，保证导航在任意内容上可读，非图片 */}
        <div className="absolute inset-0 h-24 bg-gradient-to-b from-paper via-paper/80 to-transparent" />

        <div className="relative flex h-16 items-center justify-between px-5 sm:h-20 sm:px-10">
          {/* 左上：品牌名（童趣字体 + 彩色小圆点） */}
          <a
            href="#home"
            className={entrance(
              'pointer-events-auto flex items-center gap-1.5 font-display text-xl font-semibold tracking-wide text-ink',
            )}
            style={entranceStyle(200)}
          >
            Ding Yi
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          </a>

          {/* 桌面端：年份 / 导航 / 社交链接 */}
          <div className="pointer-events-auto hidden items-center gap-8 md:flex">
            <span
              className={entrance('font-display text-sm font-medium text-ink/45')}
              style={entranceStyle(350)}
            >
              2026
            </span>

            <nav className="flex items-center gap-6">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={route === item.id ? 'page' : undefined}
                  className={entrance(
                    `font-display text-[15px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:opacity-70 ${
                      route === item.id ? ACTIVE_COLOR[item.id] : 'text-ink/70'
                    }`,
                  )}
                  style={entranceStyle(420 + i * 80)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="h-4 w-px bg-ink/15" />

            <nav className="flex items-center gap-5">
              {SOCIAL_LINKS.map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={entrance(
                    'font-display text-[15px] font-semibold text-ink/70 transition-opacity duration-300 hover:opacity-60',
                  )}
                  style={entranceStyle(700 + i * 80)}
                >
                  {s.name}
                </a>
              ))}
            </nav>
          </div>

          {/* 移动端：汉堡按钮（抽屉打开时旋转变淡，与右上角 X 完成「变形」交接） */}
          <button
            type="button"
            aria-label="打开菜单"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className={`pointer-events-auto flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-2xl border border-ink/15 bg-white/70 transition-all duration-300 md:hidden ${
              drawerOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
            }`}
          >
            <span className="h-[2px] w-5 rounded-full bg-ink" />
            <span className="h-[2px] w-5 rounded-full bg-ink" />
          </button>
        </div>
      </header>

      {/* ============ z-40：移动端右侧滑抽屉 + 遮罩 ============ */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${drawerOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!drawerOpen}
      >
        {/* 遮罩：点击关闭抽屉 */}
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* 抽屉面板：浅色贴纸风 */}
        <aside
          className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col justify-center gap-12 rounded-l-[2rem] border-l border-ink/10 bg-white/95 px-8 pb-10 pt-24 shadow-card transition-transform duration-500 ease-[cubic-bezier(0.22,0.8,0.3,1)] ${
            drawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* SITE INDEX：站内导航，竖向排布 + 交错延迟入场 */}
          <div>
            <p className="mb-6 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-ink/40">
              Site Index
            </p>
            <nav className="flex flex-col gap-5">
              {NAV_ITEMS.map((item, i) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`font-display text-3xl font-semibold transition-all duration-500 ${
                    drawerOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                  } ${route === item.id ? ACTIVE_COLOR[item.id] : 'text-ink'}`}
                  style={{ transitionDelay: drawerOpen ? `${140 + i * 70}ms` : '0ms' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* FIND ME：社交链接（仅 Github），竖向排布 + 交错延迟入场 */}
          <div>
            <p className="mb-6 font-display text-[11px] font-bold uppercase tracking-[0.3em] text-ink/40">
              Find Me
            </p>
            <nav className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-fit font-display text-xl text-ink/70 transition-all duration-500 hover:opacity-60 ${
                    drawerOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: drawerOpen ? `${420 + i * 70}ms` : '0ms',
                  }}
                >
                  {s.name}
                </a>
              ))}
            </nav>
          </div>

          <p className="absolute bottom-8 font-display text-[11px] tracking-[0.25em] text-ink/30">
            © 2026 DING YI
          </p>
        </aside>
      </div>

      {/* ============ z-50：抽屉关闭 X 按钮，永远处于最顶层 ============ */}
      <button
        type="button"
        aria-label="关闭菜单"
        onClick={() => setDrawerOpen(false)}
        tabIndex={drawerOpen ? 0 : -1}
        className={`fixed right-5 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-ink shadow-sticker transition-all duration-300 md:hidden ${
          drawerOpen
            ? 'rotate-90 scale-100 opacity-100'
            : 'pointer-events-none rotate-0 scale-75 opacity-0'
        }`}
      >
        <X size={22} strokeWidth={2} />
      </button>
    </>
  )
}
