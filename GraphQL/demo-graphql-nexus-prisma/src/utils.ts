import { verify } from 'jsonwebtoken'
import { Prisma } from './generated/prisma-client'

export const APP_SECRET = 'appsecret321'

interface Context {
  prisma: Prisma
  request: any
}

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
  return ''
}