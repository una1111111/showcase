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
          从校园里人气最旺的大型活动日，到 Nike、Burberry 的品牌现场，再到几百组家庭一起撒欢的户外探索日，
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

      {/* ========== 教育背景：两段经历插槽 ==========
          ⚠️ 工作区内暂未找到简历文件，以下两段均为「待填写占位」。
          【教育背景修改位置 —— 第 1 段 / 第 2 段】请把简历里的两段教育经历发我，
          或直接在下面两个 EDU_* 卡片中替换学校 / 学历专业 / 时间 / 要点即可。 */}
      <h2 className="mt-12 mb-5 flex items-center gap-2.5 font-display text-xl font-bold text-ink">
        <span className="h-2.5 w-2.5 rounded-full bg-mint" aria-hidden />
        Education
      </h2>

      <div className="flex flex-col gap-4">
        {/* ---------- 教育经历 第 1 段（请替换为简历中的信息） ---------- */}
        <article className="rounded-3xl border-2 border-ink/10 bg-white p-6 shadow-sticker">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-ink">耶鲁大学 Yale University</h3>
            <span className="rounded-full bg-mint/10 px-3 py-0.5 text-[12px] font-semibold text-mint">
              在读时间 · 请替换
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/55">
            学历 / 专业 · 请按简历替换（示例方向：市场营销 / 传播学）
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {[
              '核心课程方向：品牌传播、消费者洞察、活动策划（请按真实课程替换）',
              '在校期间参与校园大型活动日的传播与赞助商权益落地，把课堂方法跑通成实战经验',
            ].map((point) => (
              <li key={point} className="flex gap-3 text-[13px] leading-6 text-ink/70">
                <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-mint" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </article>

        {/* ---------- 教育经历 第 2 段（请替换为简历中的信息） ---------- */}
        <article className="rounded-3xl border-2 border-dashed border-ink/20 bg-white/60 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-ink/60">
              本科院校名称 · 请替换
            </h3>
            <span className="rounded-full bg-sky/10 px-3 py-0.5 text-[12px] font-semibold text-sky">
              在读时间 · 请替换
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/55">学历 / 专业 · 请按简历替换</p>
          <ul className="mt-4 flex flex-col gap-2">
            {[
              '在校亮点 1 · 请按简历替换（如：社团活动组织者 / 校园市场项目）',
              '在校亮点 2 · 请按简历替换（如：奖学金 / 相关课程 / 实践经历）',
            ].map((point) => (
              <li key={point} className="flex gap-3 text-[13px] leading-6 text-ink/60">
                <span className="mt-[8px] h-2 w-2 shrink-0 rounded-full bg-sky" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* ========== 简历下载按钮 ==========
          【简历PDF链接位置】把文件命名为 resume.pdf 放到 public/ 目录即可；
          如需更换文件名 / 路径，改 src/config/site.ts 中的 RESUME_SRC。 */}
      <div className="mt-12">
        <a
          href={RESUME_SRC}
          download="Ding-Yi-Activity-Marketing-Resume.pdf"
          className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-base font-bold tracking-wide text-white shadow-sticker transition-transform duration-300 hover:-translate-y-0.5"
        >
          下载我的简历 PDF
          <span aria-hidden className="text-lg leading-none">
            ↓
          </span>
        </a>
        <p className="mt-3 text-[12px] text-ink/40">
          （部署前记得把简历放入 public/resume.pdf，当前为替换位置标记）
        </p>
      </div>
    </div>
  )
}
