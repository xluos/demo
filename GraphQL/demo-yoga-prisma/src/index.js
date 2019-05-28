const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client') 
const path = require('path')



const resolvers = {
  Query: {
    user: (parent, args, ctx, info) => {
      return ctx.prisma.user({
        id: args.id
      })
    },
    users: (parent, args, ctx, info) => {
      return ctx.prisma.users()
    },
    article: (parent, args, ctx, info) => {
      return ctx.prisma.article({
        id: args.id
      })
    },
    articles: (parent, args, ctx, info) => {
      return ctx.prisma.articles()
    },
  },
  User: {
    article: (parent, args, ctx, info) => {      
      return prisma.user({id: parent.id}).article()
    }
  },
  Mutation: {
    createUser: (parent, args, ctx, info) => {
      return ctx.prisma.createUser({
        name: args.name,
      });
    },
    createArticle: (parent, args, ctx, info) => {
      return ctx.prisma.createArticle({
        title: args.data.title,
        content: args.data.content,
        author: {
          connect: {
            id: args.author.id
          }
        }
      })
    },
  },

}

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, './schema.graphql'),
  resolvers,
  context: req => ({
    req,
    prisma
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))