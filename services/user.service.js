
/**
 *  Real world example
 */

/**
 * Module dependencies
 */
const { graphql } = require('graphql');
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const { print } = require('graphql/language/printer');

/**
 * Schemas
 */
const typeUser = require('./schemas/user.graphql');
const typeQueryUser = require('./schemas/query.user.graphql');

let DB;
if (typeof window !== 'undefined') {
  DB = localStorage;
  if (!DB.getItem('users')) {
    DB.setItem('users', JSON.stringify({
      count: 0,
      results: [{
        ID: 0,
        user: 'Admin',
        pass: '123456',
        email: 'admin@root.com',
      },
      {
        ID: 1,
        user: 'Francisco',
        pass: '123456',
        email: 'francisco@root.com',
      }],
    }));
  }
}

/**
 *  Resolvers
 *  In this object you'll map all the types defined on typeDefs
 *  You can mutate the data here, and make API calls for every type or attribute of the type
 */
const resolvers = {
  Query: {
    getUsers: (_, { limit }) => {
      const response = JSON.parse(DB.getItem('users'));
      return response.results;
    },
    searchUser: (_, { q }) => {
      const response = JSON.parse(DB.getItem('users'));
      const search = response.results && response.results.filter(User => {
        return User.name.search(q) > -1 || User.email.search(q) > -1;
      });
      return search;
    },
    getUser: async (_, { id }) => {
      const DBParsed = JSON.parse(DB.getItem('users'));
      const response = DBParsed.results && DBParsed.results.find(user => user.ID === id);

      return response;
    },
  },
};

/**
 * Merge Schemas & resolvers
 */
const schemaQuery = makeExecutableSchema({ typeDefs: [
  print(typeUser),
  print(typeQueryUser),
], resolvers });


/**
 * Queries methods
 */
const getUsers = ({limit, offset}) => {
  return graphql(schemaQuery, `{ 
    getUsers(limit: ${limit}, offset: ${offset}) {
      ID
      user
      email
    } 
  }`);
};

const getUserById = async(id) => {
  return await graphql(schemaQuery, `{ 
    getUser(id: ${id}) {
      ID
      user
      email
    } 
  }`);
};

const searchUser = (q) => {
  return graphql(schemaQuery, `{ 
    searchUser(q: "${q}") {
      title,
      ID,
      description
    } 
  }`);
};

/**
 * Expose
 */
export default {
  getUserById,
  getUsers,
  searchUser,
};
