const express = require("express");
const app = express();
const port = 7020;
const friendRoutes = require("./routes/friendRoutes");

app.use(express.json());

app.use("/", express.static("public"));
app.use("/friends", friendRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
