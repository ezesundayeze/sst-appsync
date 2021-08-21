import * as cdk from "@aws-cdk/core";
import * as appsync from '@aws-cdk/aws-appsync';
import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-todos-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))
          }
        },
      },
      xrayEnabled: true,
    });

    const todosTable = new sst.Table(this, "Todos", {
      fields: {
        id: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "id" },
    });

    const todosLambda = new sst.Function(this, "AppSyncTodosHandler", {
      handler: "src/main.handler",
      environment: {
        TODOS_TABLE: todosTable.dynamodbTable.tableName
      },
    });

    const lambdaDs = api.
      addLambdaDataSource(
        'lambdaDatasource',
        todosLambda
      );

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getTodoById"
    });

    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "listTodos"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "createTodo"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo"
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo"
    });

    todosLambda.attachPermissions([todosTable]);

    new cdk.CfnOutput(this, "GraphQLAPIURL", {
      value: api.graphqlUrl
    });


    new cdk.CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });


    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    });
  }
}