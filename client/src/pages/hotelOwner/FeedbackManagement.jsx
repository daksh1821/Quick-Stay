import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';

const FeedbackManagement = () => {
    const { axios, getToken, toast } = useAppContext();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'approved'

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/feedback/all', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                setFeedbacks(data.feedbacks);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (feedbackId) => {
        try {
            const { data } = await axios.put(
                `/api/feedback/approve/${feedbackId}`,
                {},
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            );

            if (data.success) {
                toast.success('Feedback approved successfully!');
                fetchFeedback();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (feedbackId) => {
        if (!window.confirm('Are you sure you want to delete this feedback?')) {
            return;
        }

        try {
            const { data } = await axios.delete(`/api/feedback/${feedbackId}`, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                toast.success('Feedback deleted successfully!');
                fetchFeedback();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className='text-yellow-500'>
                {index < rating ? '⭐' : '☆'}
            </span>
        ));
    };

    const filteredFeedbacks = feedbacks.filter(feedback => {
        if (filter === 'pending') return !feedback.isApproved;
        if (filter === 'approved') return feedback.isApproved;
        return true;
    });

    return (
        <div>
            <Title
                align='left'
                font='outfit'
                title='Feedback Management'
                subTitle='Review and manage user feedback. Approve quality reviews to display on your website or remove inappropriate content.'
            />

            <div className='flex gap-3 my-6'>
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        filter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    All ({feedbacks.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        filter === 'pending'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Pending ({feedbacks.filter(f => !f.isApproved).length})
                </button>
                <button
                    onClick={() => setFilter('approved')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        filter === 'approved'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Approved ({feedbacks.filter(f => f.isApproved).length})
                </button>
            </div>

            {loading ? (
                <div className='flex justify-center py-20'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
                </div>
            ) : filteredFeedbacks.length === 0 ? (
                <div className='text-center py-20 text-gray-500'>
                    No feedback to display
                </div>
            ) : (
                <div className='grid gap-4 max-w-4xl'>
                    {filteredFeedbacks.map((feedback) => (
                        <div
                            key={feedback._id}
                            className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
                        >
                            <div className='flex items-start justify-between mb-4'>
                                <div className='flex items-center gap-3'>
                                    <img
                                        className='w-12 h-12 rounded-full object-cover'
                                        src={feedback.userImage || 'https://via.placeholder.com/150'}
                                        alt={feedback.userName}
                                    />
                                    <div>
                                        <p className='font-semibold text-gray-800'>{feedback.userName}</p>
                                        <p className='text-sm text-gray-500'>{feedback.location}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {feedback.isApproved ? (
                                        <span className='px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full'>
                                            Approved
                                        </span>
                                    ) : (
                                        <span className='px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full'>
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className='flex items-center gap-1 mb-3'>
                                {renderStars(feedback.rating)}
                                <span className='text-sm text-gray-600 ml-2'>({feedback.rating}/5)</span>
                            </div>

                            <p className='text-gray-700 mb-4 leading-relaxed'>"{feedback.review}"</p>

                            <div className='text-xs text-gray-400 mb-4'>
                                Submitted on {new Date(feedback.createdAt).toLocaleDateString()} at{' '}
                                {new Date(feedback.createdAt).toLocaleTimeString()}
                            </div>

                            <div className='flex gap-3 pt-4 border-t border-gray-100'>
                                {!feedback.isApproved && (
                                    <button
                                        onClick={() => handleApprove(feedback._id)}
                                        className='px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors'
                                    >
                                        Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(feedback._id)}
                                    className='px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackManagement;
