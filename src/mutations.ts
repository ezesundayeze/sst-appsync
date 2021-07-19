const Todo = require("./Todos");

module.exports = {
   Query: {
       todos: ()=> Todo.find() ,
       todo: (_, {id})=>{Todo.findById(id)}
   },
   Mutation: {
       createTodo: (_, { description})=>{
           const todo = Todo.create({ description, checked: false});
           return todo;
       },
       checkedTodo: (_, { id, checked})=>Todo.findByIdAndUpdate(id, {checked: checked}),
       updateTodo: (_, { id, description})=>Todo.findByIdAndUpdate(id, {description}),
       deleteTodo: (_, { id })=>Todo.findByIdAndDelete(id)
   }
}
