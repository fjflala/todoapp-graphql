
/**
 *  Real world example
 */

/**
 * Module dependencies
 */
const { graphql } = require('graphql');
const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const { print } = require('graphql/language/printer');
const userService = require('./user.service').default;

/**
 * Schemas
 */
const typeUser = require('./schemas/user.graphql');
const typeTodo = require('./schemas/todo.graphql');
const typeQuery = require('./schemas/query.graphql');
const typeMutation = require('./schemas/mutation.graphql');
const typeTodoInput = require('./schemas/todoinput.graphql');
const typeSchema = require('./schemas/schema.graphql');
const typeStatus = require('./schemas/status.graphql');

/**
 * Set DB, using localstorage
 */
let DB;
if (typeof window !== 'undefined') {
  DB = localStorage;
  if (!DB.getItem('todos')) {
    DB.setItem('todos', JSON.stringify({
      count: 0,
      results: [],
    }));
  }
}

/**
 *  Resolvers
 *  In this object you'll map all the types defined on typeDefs
 *  You can mutate the data here, and make API calls for every type or attribute of the type
 */
const resolvers = {
  Todo: {
    assigned: async (todo) => {
      const user = await userService.getUserById(todo.assigned);
      
      return user.data.getUser;
    },
    reported: async (todo) => {
      const user = await userService.getUserById(todo.reported);
      
      return user.data.getUser;
    }
  },
  Mutation: {
    createTodo: (_, {input}) => {
      const todos = JSON.parse(DB.getItem('todos'));
      const ID = (todos.count || 0) + 1;
      input.ID = ID;
      todos.results.push(input);
      todos.count = todos.results.length;

      DB.setItem('todos', JSON.stringify(todos));

      return input;
    },
    deleteTodo: (_, {id}) => {
      const todos = JSON.parse(DB.getItem('todos'));
      const index = todos.results.findIndex(todo => todo.ID === id);
      todos.results.splice(index, 1);
      
      todos.count = todos.results.length;
      DB.setItem('todos', JSON.stringify(todos));

      return todos.results;
    },
    editTodo: (_, { id, input }) => {
      const todos = JSON.parse(DB.getItem('todos'));
      const index = todos.results.findIndex(todo => todo.ID === id);

      todos.results[index] = input;
      todos.results[index].ID = id;
      
      todos.count = todos.results.length;
      DB.setItem('todos', JSON.stringify(todos));

      return todos.results;
    },
  },
  Query: {
    getTodos: (_, { limit }) => {
      const response = JSON.parse(DB.getItem('todos'));
      return response.results;
    },
    searchTodo: (_, { q }) => {
      const response = JSON.parse(DB.getItem('todos'));
      const search = response.results && response.results.filter(todo => {
        return todo.title.search(q) > -1 || todo.description.search(q) > -1;
      });
      return search;
    },
    getTodo: async (_, { id }) => {
      const response = JSON.parse(DB.getItem('todos'));
      const todo = response.results && response.results.find(todo => {
        return todo.ID === id;
      });
      return todo;
    },
  },
};

/**
 * Merge Schemas & resolvers
 */
const schemaQuery = makeExecutableSchema({ typeDefs: [
  print(typeStatus),
  print(typeUser), 
  print(typeTodo), 
  print(typeTodoInput), 
  print(typeMutation),
  print(typeQuery),
  print(typeSchema),
], resolvers });


/**
 * Queries methods
 */
const getTodos = ({limit, offset}) => {
  return graphql(schemaQuery, `{ 
    getTodos(limit: ${limit}, offset: ${offset}) {
      ID
      title
      status
      assigned {
        user
        email
      }
      reported {
        user
        email
      }
    } 
  }`);
}

const getTodoById = async(id) => {
  return await graphql(schemaQuery, `{ 
    getTodo(id: ${id}) {
      ID
      title
      status
      description
      assigned {
        ID
        user
        email
      }
      reported {
        ID
        user
        email
      }
    } 
  }`);
}

const searchTodo = (q) => {
  return graphql(schemaQuery, `{ 
    searchTodo(q: "${q}") {
      title,
      ID,
      description
    } 
  }`);
}

/**
 * Mutation methods
 */
const createTodo = (body) => {
  return graphql(schemaQuery, `mutation {
    createTodo(input: {
      title: "${body.title}"
      description: "${body.description}"
      status: TODO
      reported: ${body.reported}
      assigned: ${body.assigned}
    }) {
      ID
      title
      status
      assigned {
        ID
        user
        email
      }
      reported {
        ID
        user
        email
      }
    }
  }`);
}

const deleteTodo = (id) => {
  return graphql(schemaQuery, `mutation {
    deleteTodo(id: ${id}) {
      ID,
      title
      status
      assigned {
        ID
        user
        email
      }
      reported {
        ID
        user
        email
      }
    }
  }`);
}

const editTodo = (body) => {
  return graphql(schemaQuery, `mutation {
    editTodo(id: ${body.ID}, input: {
      title: "${body.title}"
      description: "${body.description}"
      status: ${body.status}
      assigned: ${body.assigned}
      reported: ${body.reported}
    }) {
      ID,
      title
      status
      assigned {
        ID
        user
        email
      }
      reported {
        ID
        user
        email
      }
    }
  }`);
}

/**
 * Expose
 */
export default {
  getTodoById,
  getTodos,
  createTodo,
  searchTodo,
  deleteTodo,
  editTodo,
};
