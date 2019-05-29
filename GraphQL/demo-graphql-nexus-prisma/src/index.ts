import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { stringArg, mutationType } from 'nexus'
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

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

const TestObj = objectType({
  name: 'TestObj',
  definition(t) {
    t.string('tets')
  },
})

const TestObj2 = objectType({
  name: 'TestObj2',
  definition(t) {
    t.string('tets2')
  },
})

const Mutation = prismaObjectType({ 
  name: 'Mutation',
  definition(t) {
    t.prismaFields(["createUser", "updateUser", "createArticle", "updateArticle"])
    t.field("login", {
      type: "AuthPayload",
      resolve: async () => {
        return {
          token: "",
          user: ""
        }
      }
    })
    t.field("test", {
      type: "TestObj",
      resolve: () => {

      }
    })
    t.field("test2", {
      type: 't',
      resolve: () => {

      }
    })
  }
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
  types: [Query, Mutation, User, Article, AuthPayload, TestObj, TestObj2],

  prisma: {
    client: prisma,
    datamodelInfo
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
  
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './generated/prisma-client/index.ts'),
        alias: 'prisma',
      },
    ],
  },
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