import express from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getAuthURL, getBlogById, getBlogComments, handleOAuthCallback, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import Blog from '../models/Blog.js';

const blogRouter = express.Router();

blogRouter.get("/blogger-auth", getAuthURL);
blogRouter.get("/oauth2callback", handleOAuthCallback);
blogRouter.post("/post-to-blogger", auth, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }

  try {
    const blog = await Blog.create({ title, description: content, isPublished: false });
    res.json({ success: true, blogId: blog._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get("/all",getAllBlogs);
blogRouter.get("/:blogId",getBlogById);
blogRouter.post("/delete",auth,deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublish);

blogRouter.post("/add-comment",addComment);
blogRouter.post("/comments", getBlogComments);
blogRouter.post("/generate", auth, generateContent);





export default blogRouter;
