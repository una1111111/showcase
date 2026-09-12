import Header from './components/Header'
import Background from './components/Background'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Agent from './pages/Agent'
import Resume from './pages/Resume'
import Contact from './pages/Contact'
import { useHashRoute } from './hooks/useHashRoute'

/**
 * 应用外壳：
 * - 纯前端 hash 路由（#home / #projects / #agent / #resume / #contact）
 * - Header（含移动端抽屉）在所有页面固定挂载
 * - 首页为 100dvh 全屏门面，子页面为正常滚动的业务内容页
 */
export default function App() {
  const route = useHashRoute()

  return (
    <div className="relative min-h-screen bg-paper font-body text-ink">
      {/* 全站柔光装饰背景（浅蓝活泼风，纯 CSS 无图片） */}
      <Background />

      {/* 入场时序动画仅在首页首屏播放 */}
      <div className="relative z-10">
        <Header route={route} playEntrance={route === 'home'} />

        <main>
          {route === 'home' && <Home />}
          {route === 'projects' && <Projects />}
          {route === 'agent' && <Agent />}
          {route === 'resume' && <Resume />}
          {route === 'contact' && <Contact />}
        </main>
      </div>
    </div>
  )
}
