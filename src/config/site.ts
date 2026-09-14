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

/* 社交链接：已按要求移除 Github；如需恢复，往数组里加 { name, href } 即可 */
export const SOCIAL_LINKS: { name: string; href: string }[] = []

/* 联系方式（手机号与微信同号） */
export const CONTACT_INFO = {
  name: '丁一 Ding Yi',
  phone: '15311232005',
  email: '15311232005@163.com',
}
