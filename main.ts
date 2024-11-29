import { MongoClient } from 'mongodb'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { VuelosModel } from "./types.ts";
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";

const urlMongo = Deno.env.get("MONGO_URL")

if(!urlMongo) Deno.exit(1)

const client = new MongoClient(urlMongo);
await client.connect();
console.log("Conectado correctamente a la base de datos");

const db = client.db("avion");
const VuelosCollection = db.collection<VuelosModel>("vuelos");

const server = new ApolloServer({
  typeDefs,
  resolvers
});


const { url } = await startStandaloneServer(server, {
  context: async () => ({ VuelosCollection }),
});
console.log(`🚀  Server ready at: ${url}`);