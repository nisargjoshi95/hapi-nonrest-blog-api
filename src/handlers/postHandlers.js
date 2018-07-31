const createPost = (req, reply) => {
  const payload = req.payload.data;
  const posts = req.app.db.getCollection('posts');
  if(payload) {
    const newPost = posts.insert(payload);
    return newPost;
  } else {
    return `POST DATA EMPTY`;
  }
};

const getAllPosts = (req, reply) => {
  const posts = req.app.db.getCollection('posts');
  return posts.chain().simplesort('createdAt').data();
};

const getPost = (req, reply) => {
  const {postId} = req.payload.data;
  return req.app.db.getCollection('posts').findOne({'$loki': postId});
}

// TODO: TEST THIS
const updatePost = (req, reply) => {
  const {postId, updatedPost} = req.payload.data;
  const posts = req.app.db.getCollection('posts');
  let post = posts.findOne({'$loki': postId});
  if(post) {
    // See if there is a way to destructure and set all updated post fields
    // for now we go through each property one by one
    //({...post} = {...updatedPost}); this unfortunately doesn't work
    const {title, author, content, tags, comments} = updatedPost;
    post.title = title ? title: post.title;
    post.author = author ? author: post.author;
    post.content = content ? content: post.content;
    post.tags = tags ? tags: post.tags;
    post.comments = comments ? comments: post.comments;
    console.log(post);
    return posts.update(post);
  }
};

const deletePost = (req, reply) => {
  const {postId} = req.payload.data;
  return req.app.db.getCollection('posts').findAndRemove({'$loki': postId});
}

const createComment = (req, reply) => {
  const {postId, comment} = req.payload.data;
  const posts = req.app.db.getCollection('posts');
  let post = posts.findOne({'$loki': postId});
  if(!comment) {
    return 'ERROR: No comment';
  } else if(post) {
    post.comments.push(comment);
    return posts.update(post);
  }
}

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost, createComment };