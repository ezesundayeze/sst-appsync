import { DynamoDB } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient();

async function deleteTodo(todoId: string): Promise<string|null> {
    const params = {
        TableName: process.env.TODOS_TABLE as string,
        Key: { id: todoId }
    }
    try {
        await docClient.delete(params).promise()
        return todoId
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

export default deleteTodo;