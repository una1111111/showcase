import { RESUME_SRC } from '../config/site'
import PageHeading from '../components/PageHeading'

/**
 * #resume 简历下载页
 * 简短鲜活的自我介绍 + 两段教育背景插槽 + 醒目的亮橙色简历下载按钮。
 */
export default function Resume() {
  return (
    <div className="anim-page mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-10 sm:pt-36">
      <PageHeading kicker="Resume" title="关于我" pill="mint" />

      {/* ========== 简短个人介绍（活泼但保持求职专业度） ========== */}
      <div className="mt-2 flex flex-col gap-4 rounded-3xl border-2 border-ink/10 bg-white/75 p-6 text-[15px] leading-8 text-ink/75 shadow-sticker sm:p-8 sm:leading-9">
        {/* 【个人简介文案修改位置】按简历「个人简介 / 自我评价」调整 */}
        <p>
          你好呀，我是丁一 <span className="font-display font-semibold text-ink">Ding Yi</span> 👋
          一个把「办活动」当成本能的活动运营求职者。
        </p>
        <p>
          从几百组家庭一起撒欢的青少年定向赛，到 Nike、NCAA 的品牌现场，再到一座城市夏天的足球联赛和省级文化活动，
          我完整走过一场活动从策划、统筹到复盘的每一步——最上头的时刻，就是看着自己排的时间表，
          变成眼前真的在发生的热闹。
        </p>
        <p>
          我习惯把每场活动当成一次产品迭代：先盘清目标和人群，再拉齐资源和排期，结束后一定留下可复用的
          SOP 与模板。日常也是 AIGC 工具的重度玩家，相信
          <span className="font-bold text-mint">「业务 sense + 工具杠杆」</span>
          能让一个小团队跑出大团队的产出。
        </p>
      </div>

      {/* ========== 教育背景：两段真实经历 ==========
          第 1 段：首都体育学院（本校本科，在读）；第 2 段：纽黑文大学（1+2+1 公费联合培养）。
          如需调整信息，直接改下面两张卡片即可。 */}
      <h2 className="mt-12 mb-5 flex items-center gap-2.5 font-display text-xl font-bold text-ink">
        <span className="h-2.5 w-2.5 rounded-full bg-mint" aria-hidden />
        Education
      </h2>

      <div className="flex flex-col gap-4">
        {/* ---------- 教育经历 第 1 段：首都体育学院（本校本科 · 在读） ---------- */}
        <article className="rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-sticker">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-ink">
              首都体育学院
              <span className="ml-2 text-sm font-medium text-ink/45">
                Capital University of Physical Education and Sports
              </span>
            </h3>
            <span className="rounded-full bg-mint/10 px-3 py-0.5 text-[12px] font-semibold text-mint">
              2023.08 – 2027.05 · 在读
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/55">本科 · 体育经济管理</p>
          <ul className="mt-4 flex flex-col gap-2">
            {[
              'GPA 3.47/4.0 · 获校级一等奖学金',
            ].map((point) => (
              <li key={point} className="flex gap-3 text-[13px] leading-6 text-ink/70">
                <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-mint" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </article>

        {/* ---------- 教育经历 第 2 段：纽黑文大学（1+2+1 公费联合培养） ---------- */}
        <article className="rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-sticker">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-ink">
              纽黑文大学
              <span className="ml-2 text-sm font-medium text-ink/45">University of New Haven</span>
            </h3>
            <span className="rounded-full bg-sky/10 px-3 py-0.5 text-[12px] font-semibold text-sky">
              2025.02 – 2026.05
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/55">体育管理 · 1+2+1 公费联合培养项目</p>
          <ul className="mt-4 flex flex-col gap-2">
            {[
              '公费联合培养，赴美学习一年',
              "GPA 3.58/4.0 · 入选 Dean's List（院长荣誉名单）",
            ].map((point) => (
              <li key={point} className="flex gap-3 text-[13px] leading-6 text-ink/70">
                <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-sky" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* ========== 简历下载按钮 ==========
          简历文件位于 public/resume.pdf，更换文件时直接覆盖即可；
          如需改文件名 / 路径，改 src/config/site.ts 中的 RESUME_SRC。 */}
      <div className="mt-12">
        <a
          href={RESUME_SRC}
          target="_blank"
          rel="noreferrer"
          download="丁一-简历A0914.pdf"
          className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-base font-bold tracking-wide text-white shadow-sticker transition-transform duration-300 hover:-translate-y-0.5"
        >
          下载我的简历 PDF
          <span aria-hidden className="text-lg leading-none">
            ↓
          </span>
        </a>
        <p className="mt-3 text-[12px] text-ink/40">
          点击在新标签页打开预览，或右键另存为下载
        </p>
      </div>
    </div>
  )
}
