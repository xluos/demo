import { rule, shield } from 'graphql-shield'
import { verify } from 'jsonwebtoken'
import { Prisma } from '../generated/prisma-client'

const APP_SECRET = 'appsecret321'

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


const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isArticleOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context)
    const author = await context.prisma.article({ id }).author()
    return userId === author.id
  }),
  isRoot: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return userId === '10001'
  })
}

export const permissions = shield({
  Query: {
    article: rules.isAuthenticatedUser,
    articles: rules.isAuthenticatedUser,
    articlesConnection: rules.isAuthenticatedUser,
    users: rules.isAuthenticatedUser,
    usersConnection: rules.isAuthenticatedUser,
    user: rules.isAuthenticatedUser,
  },
  Mutation: {
    createUser: rules.isRoot,
    updateUser: rules.isRoot,
    updateArticle: rules.isArticleOwner,
    createArticle: rules.isArticleOwner,
  },
})
