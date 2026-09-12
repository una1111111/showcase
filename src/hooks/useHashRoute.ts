import { useEffect, useState } from 'react'

/** 站内 hash 路由表：#home / #projects / #agent / #resume / #contact */
export const ROUTES = ['home', 'projects', 'agent', 'resume', 'contact'] as const
export type Route = (typeof ROUTES)[number]

const DEFAULT_ROUTE: Route = 'home'

function readRouteFromHash(): Route {
  const hash = window.location.hash.replace(/^#/, '') as Route
  return (ROUTES as readonly string[]).includes(hash) ? hash : DEFAULT_ROUTE
}

/**
 * 极简 hash 路由：
 * - 监听 hashchange，切换页面
 * - 非法 hash 回退到 #home
 * - 每次切换自动回到页面顶部
 */
export function useHashRoute() {
  const [route, setRoute] = useState<Route>(readRouteFromHash)

  useEffect(() => {
    const onChange = () => {
      setRoute(readRouteFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
