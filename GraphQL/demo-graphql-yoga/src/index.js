const { GraphQLServer } = require('graphql-yoga')
const path = require('path')
function getId() {
  return '1' + (Math.random() * 10000).toFixed(0).padStart(5, '0')
}

let Data = {
  users: [
    { id: '100001', name: '江湖路人', article: [] }
  ],
  userToArticle: [
    ['100001', '101001'],
    ['100001', '101002'],
    ['100001', '101003']
  ],
  articles: [
    { id: '101001', title: '测试Title1', content: '这里是内容aaaaa' },
    { id: '101002', title: '测试Title2', content: '这里是内容aaaaa' },
    { id: '101003', title: '测试Title3', content: '这里是内容aaaaa' }
  ]
}

const resolvers = {
  Query: {
    user: (parent, args, ctx, info) => {
      return ctx.Data.users.find(_it => _it.id == args.id)
    },
    users: (parent, args, ctx, info) => {
      return ctx.Data.users
    },
    article: (parent, args, ctx, info) => {
      return ctx.Data.articles.find(_it => _it.id == args.id)
    },
    articles: (parent, args, ctx, info) => {
      return ctx.Data.articles
    },
  },
  Mutation: {
    createUser: (parent, args, ctx, info) => {
      const {name} = args;
      const user = {
        id: getId(),
        name,
        article: []
      }
      ctx.Data.users.push(user)
      return user;
    },
    createArticle: (parent, args, ctx, info) => {
      const {data: {
        title,
        content,
        author,
      }} = args;
      
      const id = getId()
      const article = {
        id,
        title,
        content
      }
      
      ctx.Data.articles.push(article)
      ctx.Data.userToArticle.push([
        author.id, id
      ])
      return article
    },
  },
  User: {
    articles (parent, args, ctx, info) {
      const articlesId = ctx.Data.userToArticle.filter(it => it[0] == parent.id)
      
      return articlesId.map(it => ctx.Data.articles.find(_it => _it.id == it[1]))
    }
  },
  Article: {
    author (parent, args, ctx, info) {
      const userId = ctx.Data.userToArticle.find(it => it[1] == parent.id)[0]
      return ctx.Data.users.find(it => it.id == userId)
    }
  }
}

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, './schema.graphql'),
  resolvers,
  context: req => ({
    req,
    Data
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))