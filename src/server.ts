import express, { Request, Response } from "express";
import orderRoute from "./handlers/order";
import productRoute from "./handlers/product";
import userRoute from "./handlers/user";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
orderRoute(app)
productRoute(app)
userRoute(app)
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;
