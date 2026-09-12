/**
 * 子页面统一的大标题组件（解决「目录标题不够显眼」）：
 * 上方彩色胶囊小标签 + 大号童趣标题 + 手绘波浪下划线
 */

type PillColor = 'coral' | 'sky' | 'mint' | 'grape'

const PILL_CLASS: Record<PillColor, string> = {
  coral: 'bg-coral/15 text-coral border-coral/30',
  sky: 'bg-sky/15 text-sky border-sky/30',
  mint: 'bg-mint/15 text-mint border-mint/30',
  grape: 'bg-grape/15 text-grape border-grape/30',
}

interface PageHeadingProps {
  /** 顶部小标签，如 Selected Work */
  kicker: string
  /** 大号中文标题 */
  title: string
  pill?: PillColor
}

export default function PageHeading({ kicker, title, pill = 'coral' }: PageHeadingProps) {
  return (
    <div className="mb-8">
      <span
        className={`inline-block rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.22em] ${PILL_CLASS[pill]}`}
      >
        {kicker}
      </span>
      <h1 className="relative mt-4 inline-block font-display text-4xl leading-tight text-ink sm:text-5xl">
        {title}
        {/* 手绘风黄色波浪下划线 */}
        <svg
          viewBox="0 0 220 12"
          preserveAspectRatio="none"
          className="absolute -bottom-2 left-0 h-3 w-full"
          aria-hidden
        >
          <path
            d="M3 9 C 55 2, 120 2, 217 7"
            fill="none"
            stroke="#ffc53d"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </h1>
    </div>
  )
}
