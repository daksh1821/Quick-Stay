import { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { currency, user, getToken, toast, axios, setShowHotelReg } = useAppContext();

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    });
    const [hasHotel, setHasHotel] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel', { headers: { Authorization: `Bearer ${await getToken()}` } });
            if (data.success) {
                setDashboardData(data.dashboardData);
                setHasHotel(true);
            } else {
                if (data.message === "No Hotel found") {
                    setHasHotel(false);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const completedBookings = dashboardData.bookings.filter(b => b.isPaid).length;
    const pendingBookings = dashboardData.bookings.filter(b => !b.isPaid).length;

    return (
        <div className='pb-10'>
            <Title
                align='left'
                font='outfit'
                title='Dashboard'
                subTitle='Monitor bookings, track revenue, and manage your properties in real-time'
            />

            {!hasHotel ? (
                <div className='flex flex-col items-center justify-center py-20'>
                    <div className='bg-blue-50 border-2 border-blue-200 rounded-xl p-10 max-w-md text-center'>
                        <svg className='w-20 h-20 mx-auto mb-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                        </svg>
                        <h3 className='text-2xl font-bold text-gray-800 mb-2'>No Hotel Registered</h3>
                        <p className='text-gray-600 mb-6'>
                            Register your hotel to start adding rooms and receiving bookings.
                        </p>
                        <button
                            onClick={() => setShowHotelReg(true)}
                            className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md'
                        >
                            Register Your Hotel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Stats Grid - Modern Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6'>
                        <motion.div
                            className='bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-lg'
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <div className='flex items-center justify-between mb-3'>
                                <div className='bg-white/20 p-3 rounded-lg'>
                                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
                                        <path fillRule='evenodd' d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z' clipRule='evenodd' />
                                    </svg>
                                </div>
                            </div>
                            <div className='text-3xl font-bold mb-1'>{dashboardData.totalBookings}</div>
                            <div className='text-sm text-blue-100'>Total Bookings</div>
                        </motion.div>

                        <motion.div
                            className='bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-5 shadow-lg'
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <div className='flex items-center justify-between mb-3'>
                                <div className='bg-white/20 p-3 rounded-lg'>
                                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                    </svg>
                                </div>
                            </div>
                            <div className='text-3xl font-bold mb-1'>{completedBookings}</div>
                            <div className='text-sm text-green-100'>Completed</div>
                        </motion.div>

                        <motion.div
                            className='bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-5 shadow-lg'
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <div className='flex items-center justify-between mb-3'>
                                <div className='bg-white/20 p-3 rounded-lg'>
                                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                                    </svg>
                                </div>
                            </div>
                            <div className='text-3xl font-bold mb-1'>{pendingBookings}</div>
                            <div className='text-sm text-yellow-100'>Pending</div>
                        </motion.div>

                        <motion.div
                            className='bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 shadow-lg'
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <div className='flex items-center justify-between mb-3'>
                                <div className='bg-white/20 p-3 rounded-lg'>
                                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z' clipRule='evenodd' />
                                    </svg>
                                </div>
                            </div>
                            <div className='text-3xl font-bold mb-1'>{currency} {dashboardData.totalRevenue.toLocaleString()}</div>
                            <div className='text-sm text-purple-100'>Total Revenue</div>
                        </motion.div>
                    </div>

                    {/* Recent Bookings Table */}
                    <div className='mt-8'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-xl font-bold text-gray-800'>Recent Bookings</h2>
                            <span className='text-sm text-gray-500'>{dashboardData.bookings.length} total</span>
                        </div>

                        <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm'>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-gray-50 border-b border-gray-200'>
                                        <tr>
                                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>Guest</th>
                                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase max-sm:hidden'>Room</th>
                                            <th className='px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase'>Amount</th>
                                            <th className='px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100'>
                                        {dashboardData.bookings.length === 0 ? (
                                            <tr>
                                                <td colSpan='4' className='px-4 py-12 text-center text-gray-500'>
                                                    <svg className='w-12 h-12 mx-auto mb-2 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                                                    </svg>
                                                    No bookings yet
                                                </td>
                                            </tr>
                                        ) : (
                                            dashboardData.bookings.map((item, index) => (
                                                <motion.tr
                                                    key={index}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className='hover:bg-gray-50 transition-colors'
                                                >
                                                    <td className='px-4 py-3'>
                                                        <div className='flex items-center gap-3'>
                                                            <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                                                                <span className='text-sm font-semibold text-blue-600'>
                                                                    {item.user.username.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <span className='text-sm font-medium text-gray-800'>{item.user.username}</span>
                                                        </div>
                                                    </td>
                                                    <td className='px-4 py-3 max-sm:hidden'>
                                                        <span className='text-sm text-gray-600'>{item.room.roomType}</span>
                                                    </td>
                                                    <td className='px-4 py-3'>
                                                        <span className='text-sm font-semibold text-gray-800'>{currency} {item.totalPrice.toLocaleString()}</span>
                                                    </td>
                                                    <td className='px-4 py-3 text-center'>
                                                        <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
                                                            item.isPaid
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                            {item.isPaid ? (
                                                                <>
                                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                                                                    </svg>
                                                                    Completed
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                                                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                                                                    </svg>
                                                                    Pending
                                                                </>
                                                            )}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
