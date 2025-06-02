import type { NextRequest } from 'next/server'

declare module 'next/server' {
  interface NextRouteContext {
    params: Record<string, string | string[]>
  }
}