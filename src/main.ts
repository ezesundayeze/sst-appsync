import createTodo from './createTodo';
import deleteTodo from './deleteTodo';
import getTodoById from './getTodoById';
import listTodos from './listTodos';
import updateTodo from './updateTodo';
import Todo from './Todo';

type AppSyncEvent = {
   info: {
     fieldName: string
  },
   arguments: {
     todoId: string,
     todo: Todo
  }
}

exports.handler = async (event:AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "getTodoById":
            return await getTodoById(event.arguments.todoId);
        case "createTodo":
            return await createTodo(event.arguments.todo);
        case "listTodos":
            return await listTodos();
        case "deleteTodo":
            return await deleteTodo(event.arguments.todoId);
        case "updateTodo":
            return await updateTodo(event.arguments.todo);
        default:
            return null;
    }
}