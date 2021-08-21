import { DynamoDB } from 'aws-sdk';

const docClient = new DynamoDB.DocumentClient();

async function listTodos(): Promise<Record<string, unknown>[]|null|undefined> {
    const params = {
        TableName: process.env.TODOS as string,
    }
    try {
        const data = await docClient.scan(params).promise()
        return data.Items
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return null
    }
}

export default listTodos;