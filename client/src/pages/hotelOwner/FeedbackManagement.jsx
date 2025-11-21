import { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';

const FeedbackManagement = () => {
    const { axios, getToken, toast } = useAppContext();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

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
                // Update the state immediately with the approved feedback
                setFeedbacks(prevFeedbacks =>
                    prevFeedbacks.map(feedback =>
                        feedback._id === feedbackId
                            ? { ...feedback, isApproved: true }
                            : feedback
                    )
                );
                toast.success('Feedback approved successfully!');
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
                // Remove the feedback from state immediately
                setFeedbacks(prevFeedbacks =>
                    prevFeedbacks.filter(feedback => feedback._id !== feedbackId)
                );
                toast.success('Feedback deleted successfully!');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <span key={index} className='text-xl text-yellow-400'>
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
        <div className='pb-10'>
            <Title
                align='left'
                font='outfit'
                title='Feedback Management'
                subTitle='Review and manage user feedback. Approve quality reviews to display on your website or remove inappropriate content.'
            />

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-8'>
                <div className='bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg'>
                    <div className='text-4xl font-bold mb-2'>{feedbacks.length}</div>
                    <div className='text-blue-100'>Total Feedback</div>
                </div>
                <div className='bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg'>
                    <div className='text-4xl font-bold mb-2'>{feedbacks.filter(f => !f.isApproved).length}</div>
                    <div className='text-yellow-100'>Pending Review</div>
                </div>
                <div className='bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg'>
                    <div className='text-4xl font-bold mb-2'>{feedbacks.filter(f => f.isApproved).length}</div>
                    <div className='text-green-100'>Approved</div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className='flex flex-wrap gap-3 mb-8'>
                <button
                    onClick={() => setFilter('all')}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                        filter === 'all'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    All ({feedbacks.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                        filter === 'pending'
                            ? 'bg-yellow-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Pending ({feedbacks.filter(f => !f.isApproved).length})
                </button>
                <button
                    onClick={() => setFilter('approved')}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                        filter === 'approved'
                            ? 'bg-green-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Approved ({feedbacks.filter(f => f.isApproved).length})
                </button>
            </div>

            {/* Feedback List */}
            {loading ? (
                <div className='flex justify-center items-center py-20'>
                    <div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent'></div>
                </div>
            ) : filteredFeedbacks.length === 0 ? (
                <div className='text-center py-20'>
                    <div className='text-6xl mb-4'>📭</div>
                    <p className='text-xl text-gray-500 font-medium'>No feedback to display</p>
                    <p className='text-gray-400 mt-2'>Check back later for new submissions</p>
                </div>
            ) : (
                <div className='space-y-6'>
                    {filteredFeedbacks.map((feedback) => (
                        <div
                            key={feedback._id}
                            className='bg-white border-2 border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300'
                        >
                            {/* Header */}
                            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>
                                <div className='flex items-center gap-4'>
                                    <img
                                        className='w-16 h-16 rounded-full object-cover border-4 border-gray-100'
                                        src={feedback.userImage || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(feedback.userName)}
                                        alt={feedback.userName}
                                    />
                                    <div>
                                        <h3 className='text-lg font-bold text-gray-800'>{feedback.userName}</h3>
                                        <p className='text-sm text-gray-500 flex items-center gap-1.5 mt-1'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                                            </svg>
                                            {feedback.location || 'Unknown'}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {feedback.isApproved ? (
                                        <span className='inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                            </svg>
                                            Approved
                                        </span>
                                    ) : (
                                        <span className='inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                                            </svg>
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Rating */}
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='flex items-center gap-0.5'>
                                    {renderStars(feedback.rating)}
                                </div>
                                <span className='text-base font-semibold text-gray-700'>({feedback.rating}/5)</span>
                            </div>

                            {/* Review Text */}
                            <div className='bg-gray-50 rounded-xl p-5 mb-4'>
                                <p className='text-gray-700 text-base leading-relaxed italic'>"{feedback.review}"</p>
                            </div>

                            {/* Timestamp */}
                            <div className='flex items-center gap-2 text-xs text-gray-400 mb-6'>
                                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                Submitted on {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>

                            {/* Action Buttons */}
                            <div className='flex flex-wrap gap-3 pt-6 border-t-2 border-gray-100'>
                                {!feedback.isApproved && (
                                    <button
                                        onClick={() => handleApprove(feedback._id)}
                                        className='flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg'
                                    >
                                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                        </svg>
                                        Approve
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(feedback._id)}
                                    className='flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg'
                                >
                                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z' clipRule='evenodd' />
                                    </svg>
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
