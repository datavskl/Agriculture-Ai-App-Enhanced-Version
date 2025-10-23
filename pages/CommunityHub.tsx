
import React, { useState, useEffect, FormEvent } from 'react';
import { CommunityPost } from '../types';
import DashboardCard from '../components/DashboardCard';
import UsersIcon from '../components/icons/UsersIcon';
import { MOCK_FARMER } from '../constants';
import TrashIcon from '../components/icons/TrashIcon';
import PencilIcon from '../components/icons/PencilIcon';
import Modal from '../components/Modal';

const CommunityHub: React.FC = () => {
    const [posts, setPosts] = useState<CommunityPost[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    // State for editing
    const [isEditing, setIsEditing] = useState<CommunityPost | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const storedPosts = localStorage.getItem('agriSmartPosts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('agriSmartPosts', JSON.stringify(posts));
    }, [posts]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('Please provide a title and content for your post.');
            return;
        }
        const newPost: CommunityPost = {
            id: Date.now().toString(),
            title: title.trim(),
            content: content.trim(),
            author: MOCK_FARMER.name,
            timestamp: Date.now()
        };
        setPosts(prev => [newPost, ...prev]);
        setTitle('');
        setContent('');
    };
    
    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(p => p.id !== id));
        }
    }

    const handleEditClick = (post: CommunityPost) => {
        setIsEditing(post);
        setEditedTitle(post.title);
        setEditedContent(post.content);
    };

    const handleUpdateSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!isEditing || !editedTitle.trim() || !editedContent.trim()) return;

        setPosts(posts.map(p => 
            p.id === isEditing.id ? { ...p, title: editedTitle.trim(), content: editedContent.trim() } : p
        ));
        setIsEditing(null);
    };

    return (
         <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Community Knowledge Hub</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DashboardCard title="Create a New Post" icon={<UsersIcon className="w-6 h-6"/>}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post Title" className="input-field" required/>
                        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share your question or tip..." className="input-field h-32" required/>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Submit Post</button>
                    </form>
                </DashboardCard>
                <div className="lg:col-span-2">
                     <DashboardCard title="Recent Discussions" icon={<UsersIcon className="w-6 h-6"/>}>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                            {posts.length > 0 ? posts.map(post => (
                                <div key={post.id} className="p-4 bg-gray-50 rounded-lg relative group">
                                    <h4 className="font-bold text-text-primary">{post.title}</h4>
                                    <p className="text-xs text-text-secondary mb-2">By {post.author} on {new Date(post.timestamp).toLocaleDateString()}</p>
                                    <p className="text-sm text-text-secondary whitespace-pre-wrap">{post.content}</p>
                                     <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEditClick(post)}
                                            className="p-1 text-gray-400 hover:text-primary bg-gray-100 rounded-full"
                                            aria-label="Edit post"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(post.id)}
                                            className="p-1 text-gray-400 hover:text-red-500 bg-gray-100 rounded-full"
                                            aria-label="Delete post"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                     </div>
                                </div>
                            )) : <p className="text-center text-text-secondary py-4">No discussions yet. Start one!</p>}
                        </div>
                    </DashboardCard>
                </div>
            </div>
            <style>{`.input-field { display: block; width: 100%; border-radius: 0.375rem; border: 1px solid #d1d5db; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); padding: 0.5rem 0.75rem; } .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #0ea5e9; box-shadow: 0 0 0 2px #0ea5e9; }`}</style>
        
            <Modal
                isOpen={isEditing !== null}
                onClose={() => setIsEditing(null)}
                title="Edit Post"
            >
                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="editTitle" className="block text-sm font-medium text-text-secondary">Title</label>
                        <input
                            id="editTitle"
                            type="text"
                            value={editedTitle}
                            onChange={e => setEditedTitle(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="editContent" className="block text-sm font-medium text-text-secondary">Content</label>
                        <textarea
                            id="editContent"
                            value={editedContent}
                            onChange={e => setEditedContent(e.target.value)}
                            className="input-field h-32"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(null)}
                            className="px-4 py-2 rounded-md bg-gray-200 text-text-secondary hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CommunityHub;
