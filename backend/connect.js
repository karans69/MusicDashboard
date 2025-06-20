const { connect } = require("http2");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

module.exports = {
  connectToServer: async () => {
    try {
      await client.connect();
      database = client.db("pasRecords");
      console.log("✅ MongoDB connected");
    } catch (err) {
      console.error("❌ Failed to connect to MongoDB:", err);
      throw err;
    }
  },
  getDb: () => {
    if (!database) throw new Error("❌ ata base not initallized");
    return database;
  },
};
