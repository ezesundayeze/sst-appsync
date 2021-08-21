
import { DynamoDB } from 'aws-sdk';
import Todo from './Todo';

const docClient = new DynamoDB.DocumentClient();

async function updateTodo(todo: Record<string, unknown>): Promise<Todo|null> {
  const params = {
    TableName: process.env.TODOS_TABLE as string,
    Key: {
      id: todo.id
    },
    ExpressionAttributeValues: {} as Record<string, unknown>,
    ExpressionAttributeNames: {} as Record<string, string>,
    UpdateExpression: "",
    ReturnValues: "UPDATED_NEW"
  };
  let prefix = "set ";
  const attributes = Object.keys(todo);
  for (let i=0; i<attributes.length; i++) {
    const attribute = attributes[i];
    if (attribute !== "id") {
      params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
      params["ExpressionAttributeValues"][":" + attribute] = todo[attribute];
      params["ExpressionAttributeNames"]["#" + attribute] = attribute;
      prefix = ", ";
    }
 }

  try {
    await docClient.update(params).promise()
    return todo as Todo;
  } catch (err) {
    console.log('DynamoDB error: ', err)
    return null
  }
}

export default updateTodo;