const express = require("express");
const router = require("./router/approuter");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use("/api/creators", router);

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
