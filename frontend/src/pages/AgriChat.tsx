
import React, { useState, FormEvent, useRef, useEffect, ChangeEvent } from 'react';
import { getChatResponse, fileToBase64 } from '../services/geminiService';
import { ChatMessage } from '../types';
import DashboardCard from '../components/DashboardCard';
import ChatAlt2Icon from '../components/icons/ChatAlt2Icon';
import Loader from '../components/Loader';
import { MOCK_FARMER } from '../constants';
import CameraIcon from '../components/icons/CameraIcon';
import TrashIcon from '../components/icons/TrashIcon';

const AgriChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [image, setImage] = useState<{file: File, preview: string} | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage({file, preview: URL.createObjectURL(file)});
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if ((!input.trim() && !image) || isLoading) return;

        let userMessage: ChatMessage = { role: 'user', text: input };
        let imageBase64: string | undefined;
        let imageMimeType: string | undefined;

        if (image) {
            userMessage.image = image.preview;
            const { base64, mimeType } = await fileToBase64(image.file);
            imageBase64 = base64;
            imageMimeType = mimeType;
        }

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setImage(null);
        setIsLoading(true);

        const response = await getChatResponse(input, imageBase64, imageMimeType);
        const modelMessage: ChatMessage = { role: 'model', text: response };
        setMessages(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Multimodal Agri-Chat AI Advisor</h2>
            <DashboardCard title="Chat with an AI Expert (with Vision)" icon={<ChatAlt2Icon className="w-6 h-6"/>}>
                <div className="flex flex-col h-[65vh]">
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-background rounded-t-lg">
                        {messages.length === 0 && (
                            <div className="text-center text-text-secondary">
                                <p>Upload an image of a plant, pest, or soil and ask a question!</p>
                                <p className="text-sm">For example: "What is this weed and how do I remove it?"</p>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">AI</div>}
                                <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-card shadow-sm'}`}>
                                    {msg.image && <img src={msg.image} alt="user upload" className="rounded-md mb-2 max-h-48" />}
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                {msg.role === 'user' && <img src={`https://i.pravatar.cc/150?u=${MOCK_FARMER.name}`} alt="user" className="w-8 h-8 rounded-full" />}
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">AI</div>
                                <div className="max-w-xs p-3 rounded-lg bg-card shadow-sm">
                                    <Loader text="Thinking..." />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="p-4 border-t bg-card rounded-b-lg">
                         {image && (
                            <div className="relative w-24 h-24 mb-2 p-1 border rounded-md">
                                <img src={image.preview} alt="preview" className="w-full h-full object-cover rounded-md" />
                                <button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><TrashIcon className="h-4 w-4"/></button>
                            </div>
                        )}
                        <div className="flex items-center">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-gray-500 hover:text-primary"
                                aria-label="Attach image"
                            >
                                <CameraIcon className="h-6 w-6"/>
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question here..."
                                className="flex-grow p-2 border rounded-l-md focus:ring-primary focus:border-primary"
                                disabled={isLoading}
                                aria-label="Chat input"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || (!input.trim() && !image)}
                                className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark disabled:bg-gray-400"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardCard>
        </div>
    );
};

export default AgriChat;