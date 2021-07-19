import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create the AppSync GraphQL API
    const api = new sst.AppSyncApi(this, "AppSyncApi", {
      graphqlApi: {
        schema: "src/schema.graphql",
      },

      dataSources: {
        notes: "src/main.handler",
      },
      resolvers: {
        "Query    listNotes": "notes",
        "Query    getNoteById": "notes",
        "Mutation createNote": "notes",
        "Mutation updateNote": "notes",
        "Mutation deleteNote": "notes",
      },
    });

    // Show the AppSync API Id in the output
    this.addOutputs({
      ApiId: api.graphqlApi.apiId,
    });
  }
}