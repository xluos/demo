import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
 
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

var query = '{ hello }';
 
graphql(schema, query).then(result => {

  console.log(result);

});
