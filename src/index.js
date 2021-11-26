require('dotenv').config({ path: './src/.env' });
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const app = express();
app.use(helmet());
app.use(cors());

const port = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;

const db = require('./db');
const models = require('./models');
db.connect(DB_HOST);

const {ApolloServer} = require("apollo-server-express");
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {models};
    }
});
server.applyMiddleware({app, path: '/api'});

app.get('/', (req, res) => res.send('Hello world!!!'));
let dateNow = new Date();
app.listen({port}, () => console.log(`[${dateNow}] GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));