import { objectType, queryType, makeSchema } from "nexus";
import { GraphQLServer } from 'graphql-yoga'
import path = require('path')

const Query = queryType({ 
   // Expose all generated `Todo`-queries
  definition: t => {
    t.field("hello", {
      type: "String",
      resolve: () => {
        return "hello world!"
      }
    })
    t.field("hw", {
      type: "HW",
      resolve: () => {
        return {
          hello: "hello",
          world: "world"
        }
      }
    })
    t.list.field("users", {
      type: 'User',
      resolve: () => {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve([
              {
                id: 1,
                name: "江湖路人"
              },
              {
                id: 2,
                name: "路人甲"
              }
            ])
          }, 1000);
        })
      }
    })
  }
})

const HW = objectType({
  name: 'HW',
  definition(t) {
    t.string('hello')
    t.string('world')
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
  },
})

const schema = makeSchema({
  types: [Query, HW, User ],

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new GraphQLServer({
  
  schema,

  //
  context: request => {
    return {
      request,
    }
  },
})
server.start(() => console.log('Server is running on http://localhost:4000'))