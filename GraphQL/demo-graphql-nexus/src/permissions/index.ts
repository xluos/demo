import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'


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
