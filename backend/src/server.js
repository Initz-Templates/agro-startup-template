const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");

const bootstrap = async () => {
  await connectDB(env.mongoUri);
  app.listen(env.port, () => {
    console.log(`Backend server running on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
