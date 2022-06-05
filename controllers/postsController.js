const Post = require("../model/Post");

const getAllPosts = async (req, res) => {
  // res.json(data.posts);
  const posts = await Post.find();
  if (!posts) return res.status(204).json({ message: "No posts found." });
  res.json(posts);
};

const createNewPost = async (req, res) => {
  if (!req?.body?.title || !req?.body?.detail) {
    return res
      .status(400)
      .json({ message: "Post Title and Detail are required." });
  }

  try {
    const result = await Post.create({
      title: req.body.title,
      detail: req.body.detail,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
  // const newPost = {
  //   id: data.posts?.length ? data.posts[data.posts.length - 1].id + 1 : 1,
  //   title: req.body.title,
  //   detail: req.body.detail,
  // };

  // if (!newPost.title || !newPost.detail) {
  //   return res
  //     .status(400)
  //     .json({ message: "Post Title and Detail are required." });
  // }

  // data.setPosts([...data.posts, newPost]);
  // res.status(201).json(data.posts);
};

const updatePost = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.body.id}.` });
  }
  if (req.body?.title) post.title = req.body.title;
  if (req.body?.detail) post.detail = req.body.detail;
  const result = await post.save();
  res.json(result);
  // const post = data.posts.find((p) => p.id === parseInt(req.body.id));
  // if (!post) {
  //   return res
  //     .status(400)
  //     .json({ message: `Post ID ${req.body.id} not found` });
  // }
  // if (req.body.title) post.title = req.body.title;
  // if (req.body.detail) post.detail = req.body.detail;
  // const filteredArray = data.posts.filter(
  //   (p) => p.id !== parseInt(req.body.id)
  // );
  // const unsortedArray = [...filteredArray, post];
  // data.setPosts(
  //   unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  // );
  // res.json(data.posts);
};

const deletePost = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Post ID required." });

  const post = await Post.findOne({ _id: req.body.id }).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.body.id}.` });
  }
  const result = await post.deleteOne(); //{ _id: req.body.id }
  res.json(result);

  // const post = data.posts.find((p) => p.id === parseInt(req.body.id));
  // if (!post) {
  //   return res
  //     .status(400)
  //     .json({ message: `Post ID ${req.body.id} not found` });
  // }
  // const filteredArray = data.posts.filter(
  //   (p) => p.id !== parseInt(req.body.id)
  // );
  // data.setPosts([...filteredArray]);
  // res.json(data.posts);
};

const getPost = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Post ID required." });

  const post = await Post.findOne({ _id: req.params.id }).exec();
  if (!post) {
    return res
      .status(204)
      .json({ message: `No post matches ID ${req.params.id}.` });
  }
  res.json(post);
  // const post = data.posts.find((p) => p.id === parseInt(req.params.id));
  // if (!post) {
  //   return res
  //     .status(400)
  //     .json({ message: `Post ID ${req.params.id} not found` });
  // }
  // res.json(post);
};

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost,
  getPost,
};

// .get(postsController.getAllPosts)
// .post(postsController.createNewPost)
// .put(postsController.updatePost)
// .delete(postsController.deletePost);

// router.route("/:id").get(postsController.getPost);
