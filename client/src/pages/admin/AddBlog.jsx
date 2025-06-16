import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error('Please enter a title');
    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt: title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished
      };
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);
      const { data } = await axios.post(`/api/blog/add`, formData);
      if (data.success) {
        toast.success(data.message);
        setImage(false);
        setTitle('');
        quillRef.current.root.innerHTML = '';
        setCategory('Startup');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 text-gray-700 h-full overflow-auto bg-gradient-to-br from-white to-gray-50 py-10 px-4 md:px-20"
    >
      <div className="bg-white w-full max-w-4xl mx-auto p-8 shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create a New Blog Post</h2>

        <label className="block text-sm text-gray-600 font-medium mb-1">Thumbnail</label>
        <label htmlFor="image" className="block cursor-pointer mb-4">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="upload"
            className="mt-2 h-20 w-40 object-cover rounded border border-dashed border-gray-300"
          />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <label className="block text-sm text-gray-600 font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Blog Title"
          required
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label className="block text-sm text-gray-600 font-medium mt-6 mb-1">Sub Title</label>
        <input
          type="text"
          placeholder="Sub Title"
          required
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
          onChange={(e) => setSubtitle(e.target.value)}
          value={subTitle}
        />

        <label className="block text-sm text-gray-600 font-medium mt-6 mb-1">Blog Description</label>
        <div className="relative mb-6">
          <div ref={editorRef} className="bg-white border border-gray-300 rounded-lg min-h-[200px]" />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
              <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-2 right-2 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700"
          >
            Generate with AI
          </button>
        </div>

        <label className="block text-sm text-gray-600 font-medium mb-1">Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
        >
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="flex items-center mt-6 gap-3">
          <input
            type="checkbox"
            checked={isPublished}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label className="text-gray-600">Publish Now</label>
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-full md:w-48 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg"
        >
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
