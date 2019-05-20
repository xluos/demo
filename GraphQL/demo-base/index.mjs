import { graphql, buildSchema } from 'graphql';

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
  doctors: (arg, ctx) => {

    // let list = await 
    // console.log(list);
    
    return ctx.db.getDockerList(arg.count || 5)
  }
};

graphql(schema, 
  `{ 
      hello, 
      world, 
      hw(helloText: "aa") { 
        hello
      }
      doctors {
        id
        name
      }
    }`, root, {
      db: DB
    }).then((response) => {
  console.log(JSON.stringify(response, null, 2));
});