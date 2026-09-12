import { useState } from 'react'
import { PROJECTS, type ProjectCase } from '../data/projects'
import PageHeading from '../components/PageHeading'

/**
 * #projects 项目成长叙事页（全站最高权重页面）
 * 4 张默认收起的白色贴纸卡片，点击展开完整详情：
 * 业务背景 → 个人全链路动作 → 量化成果 → ✅亮点 → ❌复盘 → 🔁迭代
 * 文案 / 数据全部来自 src/data/projects.ts，改内容不用动本组件。
 */
export default function Projects() {
  return (
    <div className="anim-page mx-auto w-full max-w-5xl px-5 pb-28 pt-28 sm:px-10 sm:pt-36">
      <PageHeading kicker="Selected Work" title="快来看看我的成长经历" pill="coral" />

      {/* 开篇导语：鲜活有互动感，不堆岗位术语，不贴 JD */}
      <div className="mt-2 max-w-3xl rounded-3xl border-2 border-ink/10 bg-white/75 p-6 shadow-sticker sm:p-8">
        <p className="text-base leading-8 text-ink/80 sm:text-lg sm:leading-9">
          嘿，先别急着划走！👀 这里装着我从校园一路走到品牌现场的几段真实经历——
          一场活动怎么从一句「我们搞点事情吧」长成几百上千人到场的大场面，
          我在里面<span className="font-bold text-coral">统筹了什么、玩出了什么、踩过哪些坑、又攒下了什么</span>，
          全都摊开给你看。
        </p>
        <p className="mt-3 text-sm leading-7 text-ink/55">
          翻完这六张卡片，你会看到一个活动运营新人，是怎么把全链路策划、玩法创新、跨部门推动和复盘沉淀一点点练熟的。
        </p>
      </div>

      {/* 项目卡片列表：留白充足 */}
      <div className="mt-12 flex flex-col gap-5">
        {PROJECTS.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

/* ---------------- 单张可展开项目卡片 ---------------- */

function ProjectCard({ item }: { item: ProjectCase }) {
  const [open, setOpen] = useState(false)

  return (
    <article
      className={`rounded-3xl border-2 transition-all duration-300 ${
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
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start gap-4 px-5 py-6 text-left sm:gap-7 sm:px-8 sm:py-7"
      >
        {/* 大号彩色序号（贴纸感） */}
        <span className="mt-0.5 font-display text-2xl font-semibold text-sky tabular-nums sm:text-3xl">
          {item.no}
        </span>
        <span className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-grape/10 px-3 py-0.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-grape">
            {item.org}
          </span>
          <span className="mt-2.5 block font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
            {item.title}
          </span>
          {/* 收起态：能力标签（彩色小面积点缀） */}
          <span className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent"
              >
                {tag}
              </span>
            ))}
          </span>
        </span>
        {/* 展开 / 收起圆钮：纯 CSS 字符，不引入额外图标库 */}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xl leading-none transition-all duration-300 ${
            open
              ? 'rotate-0 border-ink bg-ink text-paper'
              : 'border-ink/25 bg-white text-ink group-hover:border-ink'
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
          <div className="flex flex-col gap-7 px-5 pb-8 sm:px-8">
            <Section title="项目背景">
              <p className="text-sm leading-7 text-ink/70">{item.background}</p>
            </Section>

            <Section title="我的角色与全链路动作">
              <p className="text-sm leading-7 text-ink/70">{item.role}</p>
            </Section>

            {/* 量化成果：最高视觉权重，橙色贴纸卡片 */}
            <section className="rounded-2xl border-2 border-accent/30 bg-accent/[0.07] p-5">
              <h3 className="mb-3 inline-block rounded-full bg-accent px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                量化业务成果
              </h3>
              <ul className="flex flex-col gap-2.5">
                {item.results.map((r) => (
                  <li key={r} className="flex gap-3 text-sm font-semibold leading-7 text-ink">
                    <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* ✅ / ❌ / 🔁 复盘三件套：薄荷绿 / 珊瑚粉 / 天空蓝 淡彩底 */}
            <div className="grid gap-4 sm:grid-cols-3">
              <ReviewBlock emoji="✅" title="亮点总结" tint="bg-mint/[0.08] border-mint/25" lines={item.highlights} />
              <ReviewBlock emoji="❌" title="局限 & 复盘" tint="bg-coral/[0.07] border-coral/25" lines={item.limitations} />
              <ReviewBlock emoji="🔁" title="迭代优化思路" tint="bg-sky/[0.08] border-sky/25" lines={item.iterations} />
            </div>

            {/* 可选外链：如新闻官 Agent 在线操作台（新标签页打开） */}
            {item.link && (
              <a
                href={item.link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-grape px-6 py-3 font-display text-sm font-bold text-white shadow-sticker transition-transform duration-300 hover:-translate-y-0.5"
              >
                {item.link.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
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

function ReviewBlock({
  emoji,
  title,
  tint,
  lines,
}: {
  emoji: string
  title: string
  tint: string
  lines: string[]
}) {
  return (
    <section className={`rounded-2xl border p-4 ${tint}`}>
      <h4 className="mb-3 flex items-center gap-2 font-display text-[13px] font-bold text-ink">
        <span aria-hidden>{emoji}</span>
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {lines.map((line) => (
          <li key={line} className="text-[13px] leading-6 text-ink/70">
            {line}
          </li>
        ))}
      </ul>
    </section>
  )
}
