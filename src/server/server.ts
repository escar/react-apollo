import { ApolloServer, gql } from 'apollo-server';

// require('./list_suggestions-v7.0.0.json').data

const typeDefs = gql`
    type Query {
      listOfSuggestions(filter:String): [String]
    }
    type Mutation {
      getSuggestionWithDate(items: [String]): [String]
    }
  `;

const resolvers = {
    Query: {
        listOfSuggestions: (parent: undefined, args: Record<string, any>) => {
            const suggestions = require('./list_suggestions-v7.0.0.json').data;
            return suggestions.filter((suggestion: string) => suggestion.includes(args.filter)).slice(0, 10);
        },
    },
    Mutation: {
        getSuggestionWithDate: (parent: undefined, args: Record<string, any>) => args.items.map((x: string) => x + ' - ' + new Date().toISOString()),
    },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.listen().then(({ url }) => console.log(`🚀  Apollo server ready at ${url}`));
