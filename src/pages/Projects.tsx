import { useState } from 'react'
import { PROJECTS, GROWTH_LINE, type ProjectCase, type ProjectSection } from '../data/projects'
import PageHeading from '../components/PageHeading'

/**
 * #projects 项目成长叙事页（全站最高权重页面）
 * 顶部是一条「成长叙事线」：7 个节点 = 阶段 + 当时的问题 + 得出的答案，
 * 点击任一节点会展开并滚动到对应卡片。
 * 卡片为「问题 → 职责 → 数据 → 洞察」闭环结构，媒体链接嵌在卡内。
 * 文案 / 数据全部来自 src/data/projects.ts，改内容不用动本组件。
 */

/* 叙事线节点圆点颜色（按成长阶段着色，仅显示彩色圆点，不显示阶段文字） */
const PHASE_DOT: Record<string, string> = {
  发现: 'bg-coral',
  手段: 'bg-sky',
  验证: 'bg-grape',
  深化: 'bg-mint',
  独立: 'bg-accent',
}

export default function Projects() {
  /* 当前展开的卡片 id；点击叙事线节点 / 卡片头部都会更新 */
  const [openId, setOpenId] = useState<string | null>(null)

  /* 点击叙事线节点：展开对应卡片并平滑滚动到位（留顶部导航高度） */
  const jumpToProject = (id: string) => {
    setOpenId(id)
    requestAnimationFrame(() => {
      document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div className="anim-page mx-auto w-full max-w-5xl px-5 pb-28 pt-28 sm:px-10 sm:pt-36">
      <PageHeading kicker="Selected Work" title="快来看看我的成长经历" pill="coral" />

      {/* 开篇导语：鲜活有互动感，不堆岗位术语，不贴 JD */}
      <div className="mt-2 max-w-3xl rounded-3xl border-2 border-ink/10 bg-white/75 p-6 shadow-sticker sm:p-8">
        <p className="text-base leading-8 text-ink/80 sm:text-lg sm:leading-9">
          嘿，先别急着划走！👀 这里装着我从校园定向赛一路做到省级活动的七段真实经历——
          每一段都从上一段留下的<span className="font-bold text-coral">一个问题</span>开始，
          我在里面<span className="font-bold text-coral">做了什么、看到了什么数字、又想明白了什么</span>，
          全都摊开给你看。
        </p>
        <p className="mt-3 text-sm leading-7 text-ink/55">
          建议先顺着下面这条「成长叙事线」往下滑——点任意节点，就能跳转到对应的项目卡片。
        </p>
      </div>

      {/* ========== 成长叙事线 ========== */}
      <GrowthThread onJump={jumpToProject} />

      {/* 项目卡片列表：留白充足 */}
      <div className="mt-12 flex flex-col gap-5">
        {PROJECTS.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------- 成长叙事线：7 个问答节点 ---------------- */

function GrowthThread({ onJump }: { onJump: (id: string) => void }) {
  return (
    <section aria-label="成长叙事线" className="mt-10">
      <h2 className="mb-5 flex items-center gap-2.5 font-display text-xl font-bold text-ink">
        <span className="h-2.5 w-2.5 rounded-full bg-coral" aria-hidden />
        我的成长叙事线
        <span className="font-body text-xs font-normal text-ink/40">（问题串成的一条线）</span>
      </h2>

      {/* 桌面端：横向排列、由细线串联；节点可点击跳转 */}
      <ol className="hidden gap-3 md:grid md:grid-cols-7">
        {GROWTH_LINE.map((node, i) => (
          <li key={node.projectId} className="relative">
            {/* 节点之间的连接线（最后一个不画） */}
            {i !== GROWTH_LINE.length - 1 && (
              <span className="absolute left-[calc(50%+14px)] top-[9px] h-0.5 w-[calc(100%-28px+0.75rem)] bg-ink/15" aria-hidden />
            )}
            <button
              type="button"
              onClick={() => onJump(node.projectId)}
              className="group flex w-full flex-col items-center text-center"
            >
              <span
                className={`relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full ${PHASE_DOT[node.phase]} ring-4 ring-paper transition-transform duration-300 group-hover:scale-125`}
                aria-hidden
              />
              <span className="mt-2.5 text-[11px] font-semibold leading-4 text-ink/70 transition-colors duration-300 group-hover:text-coral">
                {node.question}
              </span>
              <span className="mt-1 text-[10px] leading-4 text-ink/40">{node.answer}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* 移动端：纵向时间线 */}
      <ol className="flex flex-col md:hidden">
        {GROWTH_LINE.map((node, i) => (
          <li key={node.projectId} className="relative flex gap-4 pb-5 last:pb-0">
            {/* 竖向连接线 */}
            {i !== GROWTH_LINE.length - 1 && (
              <span className="absolute left-[8px] top-5 h-[calc(100%-12px)] w-0.5 bg-ink/15" aria-hidden />
            )}
            <button
              type="button"
              onClick={() => onJump(node.projectId)}
              className="group flex flex-1 items-start gap-4 text-left"
            >
              <span
                className={`relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full ${PHASE_DOT[node.phase]} ring-4 ring-paper transition-transform duration-300 group-hover:scale-125`}
                aria-hidden
              />
              <span className="min-w-0">
                <span className="text-[13px] font-semibold text-ink/75 transition-colors duration-300 group-hover:text-coral">
                  {node.question}
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-ink/40">{node.answer}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------------- 单张可展开项目卡片 ---------------- */

function ProjectCard({
  item,
  open,
  onToggle,
}: {
  item: ProjectCase
  open: boolean
  onToggle: () => void
}) {
  const roleParagraphs = item.role
    ? Array.isArray(item.role)
      ? item.role
      : [item.role]
    : []

  return (
    <article
      id={`card-${item.id}`}
      className={`scroll-mt-24 rounded-3xl border-2 transition-all duration-300 ${
        open
          ? 'border-ink/25 bg-white shadow-card'
          : 'border-ink/10 bg-white/80 shadow-sticker hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-card'
      }`}
    >
      {/* 卡片头部：整块可点击 */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`panel-${item.id}`}
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-5 py-6 text-left sm:gap-7 sm:px-8 sm:py-7"
      >
        {/* 大号彩色序号（贴纸感） */}
        <span className="mt-0.5 font-display text-2xl font-semibold text-sky tabular-nums sm:text-3xl">
          {item.no}
        </span>
        <span className="min-w-0 flex-1">
          {/* 第一行：合作方 + 时间 */}
          <span className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full bg-grape/10 px-3 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-grape">
              {item.org}
            </span>
            <span className="rounded-full bg-ink/[0.05] px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-ink/55">
              {item.date}
            </span>
          </span>
          <span className="mt-2.5 block font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
            {item.title}
          </span>
          {/* 收起态：能力标签 + 时间线数字贴纸 */}
          <span className="mt-3 flex flex-wrap items-center gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent"
              >
                {tag}
              </span>
            ))}
            {item.stat && (
              <span className="ml-auto rounded-full border-2 border-sun/70 bg-sun/20 px-3 py-0.5 font-display text-[11px] font-bold tabular-nums text-ink shadow-sticker">
                {item.stat}
              </span>
            )}
          </span>
        </span>
        {/* 展开 / 收起圆钮：纯 CSS 字符，不引入额外图标库 */}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xl leading-none transition-all duration-300 ${
            open ? 'border-ink bg-ink text-paper' : 'border-ink/25 bg-white text-ink'
          }`}
          aria-hidden
        >
          {open ? '−' : '+'}
        </span>
      </button>

      {/* 展开区域：grid-rows 高度过渡，动效克制 */}
      <div
        id={`panel-${item.id}`}
        className={`grid transition-all duration-500 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-6 px-5 pb-8 sm:px-8">
            {/* 出发前的问题：阳光黄贴纸底 */}
            <section className="rounded-2xl border-2 border-sun/60 bg-sun/[0.12] p-5">
              <h3 className="mb-1.5 flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-ink/60">
                <span aria-hidden>💭</span>
                这个项目之前，我在想
              </h3>
              <p className="font-display text-base font-semibold leading-7 text-ink">{item.question}</p>
            </section>

            {/* 模块化叙事（如宜都足球的 5 个策略模块）；没有 sections 时退回「核心职责」 */}
            {item.sections ? (
              <SectionsList sections={item.sections} />
            ) : (
              roleParagraphs.length > 0 && (
                <Section title="核心职责">
                  <div className="flex flex-col gap-3">
                    {roleParagraphs.map((p) => (
                      <p key={p} className="text-sm leading-7 text-ink/70">
                        {p}
                      </p>
                    ))}
                  </div>
                </Section>
              )
            )}

            {/* 关键数据 / 产出：最高视觉权重，橙色贴纸卡片 */}
            <section className="rounded-2xl border-2 border-accent/30 bg-accent/[0.07] p-5">
              <h3 className="mb-3 inline-block rounded-full bg-accent px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                关键数据 / 产出
              </h3>
              <ul className="flex flex-col gap-2.5">
                {item.results.map((r) => (
                  <li key={r} className="flex gap-3 text-sm font-semibold leading-7 text-ink">
                    <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              {/* 数据口径说明（可选） */}
              {item.note && (
                <p className="mt-3 border-t border-dashed border-accent/30 pt-3 text-[11px] leading-5 text-ink/45">
                  {item.note}
                </p>
              )}
            </section>

            {/* 核心洞察：薄荷绿底，回答「项目之前的问题」（含复盘模块的卡片不再重复展示） */}
            {item.insight && (
              <section className="rounded-2xl border-2 border-mint/30 bg-mint/[0.08] p-5">
                <h3 className="mb-1.5 flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-mint">
                  <span aria-hidden>💡</span>
                  我得到的答案 · 核心洞察
                </h3>
                <p className="text-sm font-semibold leading-7 text-ink/80">{item.insight}</p>
              </section>
            )}

            {/* 状态标记（如橘马「策划中 / 待验证」） */}
            {item.status && (
              <p className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-dashed border-coral/60 bg-coral/[0.07] px-4 py-1.5 text-[12px] font-bold text-coral">
                <span aria-hidden>🚧</span>
                {item.status}
              </p>
            )}

            {/* 媒体报道 / 社会证明（可选） */}
            {item.media && item.media.length > 0 && (
              <section>
                <h3 className="mb-2.5 flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-ink/55">
                  <span className="h-1.5 w-4 rounded-full bg-sun" aria-hidden />
                  媒体报道
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.media.map((m) => (
                    <a
                      key={m.url}
                      href={m.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink/15 bg-white px-4 py-1.5 text-[12px] font-semibold text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/40 hover:text-ink"
                    >
                      {m.name}
                      <span aria-hidden className="text-[10px]">
                        ↗
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* 链接区：外部操作台（实心）+ 站内演示（描边） */}
            {(item.link || item.insideLink) && (
              <div className="flex flex-wrap items-center gap-3">
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-grape px-6 py-3 font-display text-sm font-bold text-white shadow-sticker transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {item.link.label}
                  </a>
                )}
                {item.insideLink && (
                  <a
                    href={item.insideLink.href}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-grape/50 px-5 py-[10px] font-display text-sm font-bold text-grape transition-all duration-300 hover:-translate-y-0.5 hover:bg-grape/5"
                  >
                    {item.insideLink.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

/* ---------------- 模块化叙事：多个 emoji 小模块（如宜都足球的策略五段） ---------------- */

function SectionsList({ sections }: { sections: ProjectSection[] }) {
  return (
    <div className="flex flex-col gap-4">
      {sections.map((s, i) => (
        <section
          key={s.title}
          className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sticker"
        >
          {/* 模块标题：emoji 贴纸 + 序号 + 标题 */}
          <h3 className="mb-3 flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper text-lg shadow-sticker"
              aria-hidden
            >
              {s.icon}
            </span>
            <span className="font-display text-[15px] font-bold leading-snug text-ink">
              <span className="mr-2 align-middle text-[11px] font-semibold tabular-nums text-ink/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.title}
            </span>
          </h3>

          {/* 普通段落 */}
          {s.paragraphs?.map((p) => (
            <p key={p} className="text-sm leading-7 text-ink/70 [&:not(:first-child)]:mt-2.5">
              {p}
            </p>
          ))}

          {/* 带加粗引导词的要点：浅蓝贴纸底 */}
          {s.points && s.points.length > 0 && (
            <ul className="mt-3 flex flex-col gap-2.5">
              {s.points.map((pt) => (
                <li
                  key={pt.lead}
                  className="flex gap-3 rounded-xl bg-paper/70 p-3.5 text-[13px] leading-6"
                >
                  <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-sky" aria-hidden />
                  <span className="text-ink/70">
                    <span className="font-display font-bold text-ink">{pt.lead}：</span>
                    {pt.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}

/* ---------------- 卡片内部小组件 ---------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-ink/55">
        <span className="h-1.5 w-4 rounded-full bg-sun" aria-hidden />
        {title}
      </h3>
      {children}
    </section>
  )
}
