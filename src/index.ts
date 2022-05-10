import express, { Express, Request, Response } from "express";
import routes from "./api/routes";
import OTU from "./lib/OTU";

// Parse environment variables
import "dotenv/config";
const { PORT, NODE_ENV } = process.env;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy route
app.get("/", (req: Request, res: Response) => {
  const otu = new OTU("Sup");
  const message = "Server is up and running.";

  res.status(200).json({
    status: "success",
    message,
    encrypted_message: otu.encrypt(message),
    decrypted_message: otu.decrypt(otu.encrypt(message)),
  });
});

app.use("/api/v1/otu", routes);

app
  .listen(PORT)
  .on("listening", () => console.log(`${NODE_ENV} server has been liftoff.`))
  .on("error", (e) => console.error(e));
