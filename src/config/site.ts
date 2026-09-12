/* ============================================================
 * 全站常量配置
 * 后续更新个人信息时，优先改本文件即可。
 * ============================================================ */

/**
 * 资源路径说明：
 * public/ 目录下的文件原样发布；base 配置为 './'，全部为相对路径，
 * 部署在根域名或子目录下都能正确加载。
 */
export const WITH_BASE = (file: string) => `${import.meta.env.BASE_URL}${file}`

/* 【卡通头像替换位置】把你的卡通人物形象命名为 portrait.png 放到 public/ 即可自动生效 */
export const PORTRAIT_SRC = WITH_BASE('portrait.png')

/* 【简历PDF链接位置】简历文件放到 public/resume.pdf（Resume 页面下载按钮使用） */
export const RESUME_SRC = WITH_BASE('resume.pdf')

/** 顶部导航（顺序即展示顺序） */
export const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'agent', label: 'Agent' },
  { id: 'contact', label: 'Contact' },
] as const

/* 社交链接：按要求仅保留 Github（LinkedIn / Notion 已移除）
   【替换为你的真实 Github 地址】 */
export const SOCIAL_LINKS = [{ name: 'Github', href: 'https://github.com/your-username' }]

/* 联系方式：【替换为你的真实手机号 / 邮箱】 */
export const CONTACT_INFO = {
  name: '丁一 Ding Yi',
  phone: '138-0000-0000',
  email: 'your.email@example.com',
}
