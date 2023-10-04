const express = require("express");
const cors = require("cors");
const posts = require("./routes/posts");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.use(posts);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
