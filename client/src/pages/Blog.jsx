import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();

    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            data.success ? setData(data.blog) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id });
            data.success ? setComments(data.comments) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
            if (data.success) {
                toast.success(data.message);
                setName('');
                setContent('');
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);

    return data ? (
        <div className='relative'>
            <img src={assets.gradientBackground} alt="" className='absolute -top-20 -z-10 opacity-20 w-full h-full object-cover' />

            <Navbar />
            <div className='text-center mt-20 text-gray-700 px-4'>
                <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('Do MMMM, YYYY')}</p>
                <h1 className='text-3xl sm:text-5xl font-bold max-w-2xl mx-auto text-gray-900'>{data.title}</h1>
                <h2 className='my-4 max-w-lg mx-auto text-gray-600 text-lg'>{data.subTitle}</h2>
                <p className='inline-block py-1 px-4 rounded-full border text-sm border-primary/35 bg-primary/10 font-medium text-primary'>Alok Kumar</p>
            </div>

            <div className='mx-5 max-w-5xl md:mx-auto mt-10'>
                <img src={data.image} alt="" className='rounded-3xl mb-8 shadow-xl' />
                <div className='rich-text max-w-3xl mx-auto prose prose-lg text-gray-800' dangerouslySetInnerHTML={{ __html: data.description }}></div>

                {/* Comment Section */}
                <div className='mt-20 max-w-3xl mx-auto px-4'>
                    <p className='text-2xl font-semibold mb-6'>Comments ({comments.length})</p>
                    <div className='flex flex-col gap-6'>
                        {comments.map((item, index) => (
                            <div key={index} className='relative bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <img src={assets.user_icon} alt="user" className='w-8 h-8 rounded-full' />
                                    <div>
                                        <p className='font-semibold text-gray-800'>{item.name}</p>
                                        <p className='text-xs text-gray-400'>{Moment(item.createdAt).fromNow()}</p>
                                    </div>
                                </div>
                                <p className='ml-11 text-gray-700 text-sm'>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Comment Form */}
                <div className='mt-14 max-w-3xl mx-auto px-4'>
                    <p className='text-2xl font-semibold mb-4'>Add your comment</p>
                    <form onSubmit={addComment} className='flex flex-col gap-4'>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder='Your name'
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg outline-none shadow-sm focus:ring-2 focus:ring-primary/30'
                        />

                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder='Your comment'
                            required
                            className='w-full p-3 border border-gray-300 rounded-lg outline-none h-40 shadow-sm focus:ring-2 focus:ring-primary/30'
                        ></textarea>

                        <button type="submit" className='self-start bg-primary text-white font-medium px-6 py-2 rounded-lg hover:shadow-md transition'>Submit</button>
                    </form>
                </div>

                {/* Share Section */}
                <div className='my-24 max-w-3xl mx-auto px-4'>
                    <p className='text-xl font-semibold mb-4'>Share this article</p>
                    <div className='flex gap-4'>
                        <img src={assets.facebook_icon} width={40} alt="Facebook" className='hover:scale-105 transition' />
                        <img src={assets.twitter_icon} width={40} alt="Twitter" className='hover:scale-105 transition' />
                        <img src={assets.googleplus_icon} width={40} alt="Google Plus" className='hover:scale-105 transition' />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    ) : <Loader />
};

export default Blog;
