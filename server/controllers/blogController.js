import fs  from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';
import { google } from 'googleapis';

export const addBlog = async(req,res)=>{
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse
        (req.body.blog);
        const imageFile = req.file;

        //Check if all r present
        if(!title || !description || !category || !imageFile){
            return res.json({success: false, message:"Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        //upload image to imagekit
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        //optimization throught imgae kit
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]

        });

        const image = optimizedImageUrl;

        await Blog.create({title, subTitle, description, category, image, isPublished})
        res.json({success:true, message:"Blog added succcessfully"})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success:true, blogs})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getBlogById = async (req,res)=>{
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
        res.json({success:false, message:"Blog not found"})

        }
        res.json({success:true, blog})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const deleteBlogById = async (req,res)=>{
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        //Deleting all comments associated with blog
        await Comment.deleteMany({blog: id})
        res.json({success:true, message:"Blog deleted successfully"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const togglePublish = async(req,res)=>{
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success:true, message:"Blog status updated"})

    } catch (error) {
        res.json({success:false, message:error.message})
        
    }
}

export const addComment = async (req,res)=>{
    try {
        const {blog, name, content } = req.body;
        await Comment.create({blog, name, content});
        res.json({success:true, message:'Comment added for review'})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const getBlogComments = async (req,res)=>{
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog:blogId, isApproved:true}).sort
        ({createdAt:-1});
        res.json({success:true, comments})
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const generateContent = async(req,res)=>{
try {
    const {prompt} = req.body;
    const content = await main(prompt + `Generate a blog content for this
         topic in simple text format`)
        res.json({success: true,content})
} catch (error) {
    res.json({success: false, message: error.message})
}
}

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Step 1: Redirect user to Google login
export const getAuthURL = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/blogger'],
  });
  res.redirect(url);
};

// Step 2: Handle callback and post to Blogger
export const handleOAuthCallback = async (req, res) => {
  const code = req.query.code;

  try {
    // 1. Get blog data from cookies
    const getCookie = (name) => {
      const value = `; ${req.headers.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    };

    const blogTitle = getCookie('ai-blog-title');
    const blogContent = getCookie('ai-blog-content');

    if (!blogTitle || !blogContent) {
      return res.status(400).send("Blog data not found. Please try creating the post again.");
    }

    // 2. Exchange auth code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const blogger = google.blogger({
      version: 'v3',
      auth: oauth2Client,
    });

    // 3. Get user's blogs
    const blogsResponse = await blogger.blogs.listByUser({ userId: 'self' });
    if (!blogsResponse.data.items?.length) {
      return res.status(400).send("No blogs found for this user.");
    }

    // 4. Publish to the first blog
    const blogId = blogsResponse.data.items[0].id;
    const postResponse = await blogger.posts.insert({
      blogId,
      requestBody: {
        title: blogTitle,
        content: blogContent,
      },
    });

    // 5. Clear cookies after successful post
    res.setHeader('Set-Cookie', [
      'ai-blog-title=; expires=Thu, 01 Jan 1970 00:00:00 GMT',
      'ai-blog-content=; expires=Thu, 01 Jan 1970 00:00:00 GMT',
    ]);

    res.status(200).json({ success: true, post: postResponse.data });
  } catch (err) {
    console.error("OAuth Callback Error:", err);
    res.status(500).send("Authentication or Blogger post failed.");
  }
};





