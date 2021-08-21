import { DynamoDB } from 'aws-sdk';
import Todo from './Todo';

const docClient = new DynamoDB.DocumentClient();

async function getTodoById(todoId: string): Promise<Todo|null> {
    const params = {
        TableName: process.env.TODOS_TABLE as string,
        Key: { id: todoId }
    }
    try {
        const { Item } = await docClient.get(params).promise()
        return Item as Todo;
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null;
    }
}

export default getTodoById;