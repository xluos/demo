import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'


const rules = {
  isAuthUser: rule()((parent, args, context) => {
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
    console.log(userId);
    return userId === '10001'
  })
}

export const permissions = shield({
  Query: {
    article: rules.isAuthUser,
    articles: rules.isAuthUser,
    articlesConnection: rules.isAuthUser,
    users: rules.isAuthUser,
    usersConnection: rules.isAuthUser,
    user: rules.isAuthUser,
  },
  Mutation: {
    createUser: rules.isRoot,
    updateUser: rules.isRoot,
    updateArticle: rules.isArticleOwner,
    createArticle: rules.isAuthUser,
  },
})
