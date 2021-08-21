import { DynamoDB } from 'aws-sdk';
import Todo from './Todo';

const docClient = new DynamoDB.DocumentClient();

async function createTodo(todo: Todo): Promise<Todo|null> {
    const params = {
        TableName: process.env.TODOS_TABLE as string,
        Item: todo as Record<string, unknown>
    }
    try {
        await docClient.put(params).promise();
        return todo;
    } catch (err) {
        console.log('DynamoDB error: ', err);
        return null;
    }
}

export default createTodo;