import Fastify from "fastify";

import jwtPlugin from "./plugins/jwt.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./modules/auth/auth.routes.js";
import sequelizePlugin from "./plugins/sequelize.js";
import userRoutes from "./modules/users/user.routes.js";


const app = Fastify({ logger: true });

await app.register(jwtPlugin);
await app.register(sequelizePlugin);
await app.register(authPlugin);
await app.register(authRoutes, { prefix: "/auth" });
await app.register(userRoutes, { prefix: "/users" });


app.get("/health", async () => ({ status: "OK" }));

export default app;
