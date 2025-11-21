import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';

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
            const { data } = await axios.get('/api/bookings/hotel', { headers: { Authorization: `Bearer ${await getToken()}` } })
            if (data.success) {
                setDashboardData(data.dashboardData)
                setHasHotel(true)
            } else {
                if (data.message === "No Hotel found") {
                    setHasHotel(false)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <div>
            <Title align='left' font='outfit' title='Dashboard' subTitle='Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations.' />

            {!hasHotel ? (
                <div className='flex flex-col items-center justify-center py-20'>
                    <div className='bg-blue-50 border-2 border-blue-200 rounded-lg p-8 max-w-md text-center'>
                        <svg className='w-16 h-16 mx-auto mb-4 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                        </svg>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Hotel Registered</h3>
                        <p className='text-gray-600 mb-6'>
                            You need to register at least one hotel before you can add rooms and start receiving bookings.
                        </p>
                        <button
                            onClick={() => setShowHotelReg(true)}
                            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
                        >
                            Register Your Hotel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className='flex gap-4 my-8'>
                        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                            <img className='max-sm:hidden h-10' src={assets.totalBookingIcon} alt="" />
                            <div className='flex flex-col sm:ml-4 font-medium'>
                                <p className='text-blue-500 text-lg'>Total Bookings</p>
                                <p className='text-neutral-400 text-base'>{ dashboardData.totalBookings }</p>
                            </div>
                        </div>
                        <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                            <img className='max-sm:hidden h-10' src={assets.totalRevenueIcon} alt="" />
                            <div className='flex flex-col sm:ml-4 font-medium'>
                                <p className='text-blue-500 text-lg'>Total Revenue</p>
                                <p className='text-neutral-400 text-base'>{currency} { dashboardData.totalRevenue }</p>
                            </div>
                        </div>
                    </div>

                    <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
                    {/* Table with heads User Name, Room Name, Amount Paid, Payment Status */}
                    <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
                        <table className='w-full' >
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
                                    <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
                                    <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
                                    <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
                                </tr>
                            </thead>
                            <tbody className='text-sm'>
                                {
                                    dashboardData.bookings.map((item, index) => (
                                        <tr key={index}>
                                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.user.username}</td>
                                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300 max-sm:hidden'>{item.room.roomType}</td>
                                            <td className='py-3 px-4 text-gray-400 border-t border-gray-300 text-center'>{currency} {item.totalPrice}</td>
                                            <td className='py-3 px-4  border-t border-gray-300 flex'>
                                                <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}>
                                                    {item.isPaid ? "Completed" : "Pending"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            )}

        </div>
    )
}

export default Dashboard
