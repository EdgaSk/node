const express = require("express");
const router = express.Router();

let posts = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

router.get("/posts", (req, res) => {
  const { title } = req.query;
  let resultPosts = posts;

  if (title) {
    resultPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  res.json(resultPosts);
});

router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const foundPost = posts.find((post) => post.id === +id);

  if (foundPost) {
    res.json(foundPost);
  } else {
    res.status(404).json([]);
  }
});

router.post("/posts", (req, res) => {
  const { title, body } = req.body;
  const newPost = { id: Date.now(), title, body };
  posts.push(newPost);

  res.json(newPost);
});

router.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const foundIndex = posts.findIndex((post) => post.id === +id);

  if (foundIndex !== -1) {
    posts[foundIndex] = { ...posts[foundIndex], title, body };
    res.json(posts[foundIndex]);
  } else {
    res.status(404).json({ error: "Failed to update post" });
  }
});

router.delete("/posts/:id", (req, res) => {
  const id = +req.params.id;

  const foundIndex = posts.findIndex((post) => post.id === id);
  if (foundIndex !== -1) {
    const deletingPost = posts[foundIndex];
    posts.splice(foundIndex, 1);
    res.json(deletingPost);
  } else {
    res.status(404).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
