var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const DB = {
  getDockerList: function (count) {
    const dockerList = [...Array(count)].map((it,i) => ({
      name: `doctor${i}`,
      id: '1' + `${i}`.padStart(4, '0'),
      dept: []
    }))
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve(dockerList)
      }, 2000);
    })
  }
}

var schema = buildSchema(`
  type Query {
    hello: String
    world: String
    hw (helloText: String): HW
    doctors (count: Int): [Doctor]
  }
  type HW {
    hello: String
    world: String
  }
  type Doctor {
    name: String
    id: String
    dept: [String]
  }
`);

var root = { 
  hello: () => 'Hello world!', 
  world: () => 'Hello world!', 
  hw: (arg, ctx) => {
    return {hello: arg.helloText || 'hello', world: 'world'}
  },
  doctors: (arg, ctx, info) => {
    console.log(ctx.request.headers)    
    return DB.getDockerList(arg.count || 5)
  }
};

var app = express();
app.use('/graphql', graphqlHTTP(request => {
  return {
    schema: schema,
    rootValue: root,
    context: {
      db: DB,
      request
    },
    graphiql: true,
  };
}));

app.listen(4000, () => console.log('Now browse to http://localhost:4000/graphql'));