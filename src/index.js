// index.js
// This is the main entry point of our application
require('dotenv').load();
const express = require("express");
const app = express();

console.log(process.env);

const port = process.env.PORT || 5000;

const {ApolloServer, gql} = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        hello: String!
        notes: [Note!]!
        note(id: ID!): Note
    }
    type Note {
        id: ID!
        content: String!
        author: String!
    }
    type Mutation {
        newNote(content: String!): Note!
    }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        notes: () => notes,
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },
    Mutation: {
        newNote: (parent, args) => {
            let noteValue = {
                id: String(notes.length + 1),
                content: args.content,
                author: 'Михалков'
            }
            notes.push(noteValue);
            return noteValue;
        }
    }
};

let notes = [
    {id: '1', content: 'Однажды в студёную, зимнюю пору...', author: 'Тургенев'},
    {id: '2', content: 'Скажи-ка, дядя, ведь не даром...', author: 'Лермонтов'},
    {id: '3', content: 'Мороз и солнце. День чудесный!', author: 'Пушкин'}
];

const server = new ApolloServer({typeDefs, resolvers});
server.applyMiddleware({app, path: '/api'});

app.get('/', (req, res) => res.send('Hello world!!!'));
app.listen({port}, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));