const {gql} = require("apollo-server-express");

module.exports = gql`
    scalar DateTime
    enum Resource {
        pb
        sv
        ws
        hs
    }
    type Option {
        id: ID!
        resource: Resource!
        name: String!
        methodName: String!
        destination: String!
        baseURL: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Query {
        read(id: ID!, resource: Resource, destination: String, name: String, methodName: String): Option!
        readAll(resource: Resource, name: String, destination: String, baseURL: String, author: String): [Option!]!
    }
    input Options {
        resource: Resource!
        name: String!
        methodName: String!
        destination: String!
        baseURL: String!
        author: String!
    }
    type Mutation {
        save(id: ID, resource: Resource!, destination: String!, name: String!, methodName: String, baseURL: String!, author: String!): Option!
        saveAll(options: [Options!]!): Boolean!
        remove(id: ID!): Boolean!
        removeAll: Boolean!
    }
`;