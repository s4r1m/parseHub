import Express from "express";
import cors from "cors";
import root from "./modules/directory.js";

const app = Express();
app.use(Express.json());
app.use(cors());
const port = 3001;

// app.get("/path", (req, res) => {
//   res.send(Object.keys(root.children));
// });

app.get("/path/:myPath(*)", (req, res) => {
  console.log(req.params.myPath);
  try {
    res.send(
      Object.keys(
        eval(
          req.params.myPath
            .split("/")
            .map((dir) => {
              return dir + ".children";
            })
            .join(".")
        )
      )
    );
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
