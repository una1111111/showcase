import { useEffect, useRef, useState } from 'react'
import { SKILLS, DEMO_OUTPUTS } from '../data/agentSkills'
import PageHeading from '../components/PageHeading'

/**
 * #agent 营销 Agent 演示页（加分模块，不是主菜）
 * ------------------------------------------------------------
 * 当前只实现「可交互体验外壳」：
 * - 7 个 Skill 复选卡片 + 任务输入框
 * - 提交后仅播放前端模拟 loading，不请求任何网络接口 / 不调用真实 AI 大模型
 * - 输出区域按用户勾选顺序，逐个渲染预设模拟占位文本（见 src/data/agentSkills.ts）
 * 页面叙事只围绕：业务痛点 → 工作流框架 → 团队提效收益。
 */
export default function Agent() {
  const [task, setTask] = useState('')
  /** 已勾选 Skill 的 id，数组顺序 = 用户勾选顺序 = 最终输出顺序 */
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  /** 提交后用于渲染的 Skill id 顺序（提交瞬间锁定，避免 loading 中改勾选造成跳动） */
  const [outputs, setOutputs] = useState<string[]>([])
  const [hint, setHint] = useState('')
  const timerRef = useRef<number | undefined>(undefined)

  /* 卸载时清掉模拟定时器，避免泄漏 */
  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  /* 勾选 / 取消勾选：保持「勾选先后顺序」 */
  const toggleSkill = (id: string) => {
    setHint('')
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }

  /* 提交任务：纯前端模拟 loading，1.4s 后渲染预设占位输出 */
  const handleSubmit = () => {
    if (loading) return
    if (selected.length === 0) {
      setHint('先点选至少一项 Skill，再让小助手开工哦～')
      return
    }
    setHint('')
    setOutputs([])
    setLoading(true)
    timerRef.current = window.setTimeout(() => {
      setLoading(false)
      setOutputs(selected)
    }, 1400)
  }

  /* 清空重置：输入框 / 勾选 / 输出 / 提示全部复位 */
  const handleReset = () => {
    window.clearTimeout(timerRef.current)
    setLoading(false)
    setTask('')
    setSelected([])
    setOutputs([])
    setHint('')
  }

  return (
    <div className="anim-page mx-auto w-full max-w-4xl px-5 pb-28 pt-28 sm:px-10 sm:pt-36">
      <PageHeading kicker="Marketing Agent" title="我的营销小助手" pill="grape" />

      {/* ========== 业务定位导语（优先讲业务价值，语言鲜活） ========== */}
      <div className="mt-2 max-w-3xl rounded-3xl border-2 border-ink/10 bg-white/75 p-6 shadow-sticker sm:p-8">
        <p className="text-base leading-8 text-ink/80 sm:text-lg sm:leading-9">
          这是我给自己造的一个「营销小助手」🤖——
          把多场大型线下活动里反复干的活儿，沉淀成 7 项可复用的核心能力，
          交给一套 Agent 工作流来承接：活动调研策划、UGC 六维度评估、素材归档……
          <span className="font-bold text-grape">把时间还给真正需要创意和判断的部分</span>，让小团队也能跑出大团队的产出。
        </p>
        {/* 演示版本提示：阳光黄贴纸 */}
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border-2 border-sun/60 bg-sun/15 px-4 py-3">
          <span aria-hidden>⚠️</span>
          <p className="text-[13px] font-semibold leading-6 text-ink/80">
            当前为演示体验版本：Skill 业务逻辑正在迭代中，下面的输出均为模拟示例结果。
          </p>
        </div>
      </div>

      {/* ========== 7 个 Skill 复选卡片 ==========
          卡片描述留空占位；业务描述补充位置见 src/data/agentSkills.ts */}
      <h2 className="mt-12 mb-4 flex items-center gap-2.5 font-display text-base font-bold text-ink/70">
        <span className="h-2 w-2 rounded-full bg-grape" aria-hidden />
        7 Skills · 点选本次任务要调用的能力（按点选顺序输出）
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {SKILLS.map((skill) => {
          const checked = selected.includes(skill.id)
          return (
            <button
              key={skill.id}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => toggleSkill(skill.id)}
              className={`flex min-h-[118px] flex-col items-start rounded-3xl border-2 p-4 text-left transition-all duration-300 ${
                checked
                  ? 'border-grape/60 bg-grape/[0.08] opacity-100 shadow-sticker'
                  : 'border-ink/10 bg-white/70 opacity-50 hover:-translate-y-1 hover:opacity-90'
              }`}
            >
              {/* 勾选框视觉（纯 CSS，不使用图标库） */}
              <span
                className={`mb-3 flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors ${
                  checked ? 'border-grape bg-grape' : 'border-ink/30 bg-white'
                }`}
                aria-hidden
              >
                <span
                  className={`h-[7px] w-[10px] -translate-y-px rotate-[-45deg] border-b-2 border-l-2 border-white transition-opacity ${
                    checked ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </span>
              <span className="font-display text-[10px] font-semibold tracking-[0.25em] text-ink/40">
                {skill.no}
              </span>
              <span className="mt-1 font-display text-lg font-semibold text-ink">{skill.title}</span>
              {/*
                【此处后续补充 Skill 业务描述与实习来源】
                description 留空时展示虚线占位条；
                在 src/data/agentSkills.ts 对应项填写 description 后会自动渲染真实描述。
              */}
              {skill.description ? (
                <span className="mt-2 text-[12px] leading-5 text-ink/60">{skill.description}</span>
              ) : (
                <span className="mt-2 border-b border-dashed border-ink/25 pb-0.5 text-[11px] text-ink/35">
                  Skill 描述待补充
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ========== 任务输入区 ========== */}
      <h2 className="mt-11 mb-4 flex items-center gap-2.5 font-display text-base font-bold text-ink/70">
        <span className="h-2 w-2 rounded-full bg-sky" aria-hidden />
        Task · 描述本次活动运营任务
      </h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="例如：策划一场城市路跑品牌营销活动"
        className="w-full rounded-2xl border-2 border-ink/15 bg-white px-5 py-4 font-body text-sm text-ink placeholder:text-ink/30 outline-none transition-colors focus:border-grape/50"
      />

      {/* 操作按钮：亮橙主按钮 + 白底描边重置按钮 */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full bg-accent px-7 py-3 font-display text-sm font-bold tracking-wide text-white shadow-sticker transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? '小助手开工中…' : '提交任务 ✦'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full border-2 border-ink/20 bg-white px-7 py-3 font-display text-sm font-bold tracking-wide text-ink transition-colors duration-300 hover:border-ink"
        >
          清空重置
        </button>
        {hint && <span className="text-[13px] font-semibold text-coral">{hint}</span>}
      </div>

      {/* ========== 输出区域 ========== */}
      <h2 className="mt-12 mb-4 flex items-center gap-2.5 font-display text-base font-bold text-ink/70">
        <span className="h-2 w-2 rounded-full bg-mint" aria-hidden />
        Output · 各 Skill 独立产出
      </h2>

      {/* 模拟 loading（纯前端，无任何网络请求） */}
      {loading && (
        <div className="flex items-center gap-3 rounded-3xl border-2 border-ink/10 bg-white/80 px-5 py-6 shadow-sticker">
          <span
            className="h-5 w-5 animate-spin-slow rounded-full border-2 border-ink/15 border-t-grape"
            aria-hidden
          />
          <span className="text-sm font-semibold text-ink/70">
            正在按点选顺序调度 {selected.length} 项 Skill 工作流…
          </span>
        </div>
      )}

      {/* 空状态提示 */}
      {!loading && outputs.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-ink/15 bg-white/50 px-5 py-10 text-center">
          <p className="text-sm text-ink/45">
            点选 Skill 并提交任务后，这里会按顺序展示每个 Skill 的模拟产出 ✨
          </p>
        </div>
      )}

      {/* 结果列表：每个选中 Skill 一个独立输出框，顺序锁定为勾选顺序 */}
      {!loading && outputs.length > 0 && (
        <div className="flex flex-col gap-4">
          {outputs.map((id, index) => {
            const skill = SKILLS.find((s) => s.id === id)!
            return (
              <section
                key={id}
                className="rounded-3xl border-2 border-ink/10 bg-white p-5 shadow-sticker sm:p-6"
              >
                <header className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-3 font-display text-lg font-bold text-ink">
                    <span className="font-display text-[12px] font-semibold tracking-[0.2em] text-ink/35">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {skill.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-grape/40 bg-grape/10 px-2.5 py-0.5 text-[11px] font-semibold text-grape">
                    模拟输出
                  </span>
                </header>
                {/*
                  【此处修改 Agent 模拟输出模板】
                  文本内容在 src/data/agentSkills.ts 的 DEMO_OUTPUTS 中维护。
                */}
                <p className="whitespace-pre-line text-[13px] leading-7 text-ink/70">
                  {DEMO_OUTPUTS[id]}
                </p>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
