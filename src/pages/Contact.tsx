import { CONTACT_INFO, SOCIAL_LINKS } from '../config/site'
import PageHeading from '../components/PageHeading'

/**
 * #contact 联系我页面
 * 姓名 / 手机 / 邮箱 + 社交入口（按要求仅保留 Github）。
 * 个人信息统一在 src/config/site.ts 修改。
 */
export default function Contact() {
  const rows = [
    { label: 'Name', value: CONTACT_INFO.name, dot: 'bg-coral' },
    {
      label: 'Phone',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/-/g, '')}`,
      dot: 'bg-sky',
    },
    {
      label: 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`,
      dot: 'bg-mint',
    },
  ]

  return (
    <div className="anim-page mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-10 sm:pt-36">
      <PageHeading kicker="Contact" title="来撩我一下～" pill="sky" />

      {/* 鲜活的一句话引导 */}
      <p className="mt-2 max-w-2xl text-base leading-8 text-ink/70">
        活动合作、实习机会，甚至只是想聊聊一场活动可以怎么玩，都欢迎随时戳我 🙌
      </p>

      {/* 联系方式列表（白色贴纸卡片） */}
      {/* 【手机号 / 邮箱替换位置】src/config/site.ts → CONTACT_INFO */}
      <dl className="mt-10 overflow-hidden rounded-3xl border-2 border-ink/10 bg-white/80 shadow-sticker">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`flex flex-col gap-1.5 px-6 py-5 sm:flex-row sm:items-center sm:gap-10 ${
              i !== rows.length - 1 ? 'border-b border-ink/8' : ''
            }`}
          >
            <dt className="flex w-24 shrink-0 items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-ink/40">
              <span className={`h-2 w-2 rounded-full ${row.dot}`} aria-hidden />
              {row.label}
            </dt>
            <dd className="font-display text-lg text-ink sm:text-xl">
              {row.href ? (
                <a href={row.href} className="transition-opacity duration-300 hover:opacity-60">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      {/* 社交入口：仅 Github */}
      <h2 className="mt-10 mb-4 flex items-center gap-2.5 font-display text-base font-bold text-ink/60">
        <span className="h-2 w-2 rounded-full bg-grape" aria-hidden />
        Find Me Online
      </h2>
      <div className="flex flex-wrap gap-3">
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border-2 border-ink bg-ink px-7 py-2.5 font-display text-sm font-bold text-paper transition-transform duration-300 hover:-translate-y-0.5"
          >
            {s.name} ↗
          </a>
        ))}
      </div>
    </div>
  )
}
