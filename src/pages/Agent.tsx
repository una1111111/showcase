import PageHeading from '../components/PageHeading'

/**
 * #agent Agent 页面（建设中）
 * 原有的模拟演示已下线，后续将更新完整的设计思路与工作流。
 */
export default function Agent() {
  return (
    <div className="anim-page mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-10 sm:pt-36">
      <PageHeading kicker="Marketing Agent" title="我的营销小助手" pill="grape" />

      {/* ========== 建设中提示 ========== */}
      <div className="mt-2 flex flex-col items-center gap-6 rounded-3xl border-2 border-dashed border-ink/20 bg-white/75 p-10 text-center shadow-sticker sm:p-16">
        <span className="text-5xl" aria-hidden>
          🚧
        </span>
        <h2 className="font-display text-2xl font-bold text-ink">页面建设中</h2>
        <p className="max-w-md text-sm leading-7 text-ink/55">
          AI Agent 模块正在开发，相关设计思路与工作流后续更新
        </p>
      </div>
    </div>
  )
}
