import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { objectType } from "nexus";
import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import { permissions } from './permissions'
import path = require('path')
import { APP_SECRET } from './utils'
import { sign } from 'jsonwebtoken'

const Query = prismaObjectType({ 
  name: 'Query',
   // Expose all generated `Todo`-queries
  definition: t => t.prismaFields(['*'])
})

// 过滤生成的方法
const Mutation = prismaObjectType({ 
  name: 'Mutation',
  definition(t) {
    t.prismaFields(["createUser", "updateUser", "createArticle", "updateArticle"])
    
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.createUser({
          name,
          email,
          password: hashedPassword,
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.prisma.user({ email })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
  }
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

// 定制字段
const User = prismaObjectType({
  name: "User",
  definition(t) {
    t.prismaFields(["id", "name", "article"]);
  },
});

// 计算字段
const Article = prismaObjectType({
  name: "Article",
  definition(t) {
    t.prismaFields(["*"])
    t.field("pv", {
      type: 'Int',
      nullable: true,
      resolve: () => {
        return +(Math.random() * 1000).toFixed(0)
      }
    })
  },
});




const schema = makePrismaSchema({
  types: [Query, Mutation, User, Article, AuthPayload],

  prisma: {
    client: prisma,
    datamodelInfo
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  }
})

const server = new GraphQLServer({
  
  schema,

  // 中间件鉴权
  middlewares: [permissions],

  //
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))