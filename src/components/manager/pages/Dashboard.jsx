import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { managerUrl } from '../../../API/Api';
import { toast } from 'react-hot-toast';

function Dashboard() {
    const [totalUsers,setTotalUsers] = useState(0)
    const [totalBookings,setTotalBookings] = useState(0)
    const managerData = async () => {
        try {
            const token = localStorage.getItem('manager-token')
            await axios.post(`${managerUrl}manager-data`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }).then((response) => {
                    if (response.data.success) {
                        toast.success(response.data.message)
                    } else if (response.data.noManager) {
                        toast.error(response.data.message)
                    } else {
                        toast.error('Something error')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        managerData()
    },[])

    useEffect(() => {
        const dashboard = async() => {
            try {
                const token = localStorage.getItem('manager-token')
                await axios.get(`${managerUrl}dashboard`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    })
                    .then((response) => {
                        const total = response.data
                        setTotalUsers(total.userLength)
                        setTotalBookings(total.formLength)
                    })
            } catch (error) {
                console.log(error);
            }
        }
        dashboard()
    },[])

    return (
        <div>
            <Layout>
                <div className=" p-6 sm:p-16 h-screen border-gray-200  pb-7 mt-10">
                    <h1 className="font-semibold text-center sm:text-left mb-2 pb-3 sm:pb-9 font-serif text-2xl">
                        {" "}
                        Dashboard
                    </h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-4 p-4 mb-10">
                        <div className="flex flex-col w-60 h-20 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
                            {/* <img className=" ml-4 h-14" src={clientIcon} alt="logo" /> */}
                            <div>
                                <h1 className="pl-5 text-black font-bold">Total Users</h1>
                                <span className="flex justify-center text-black font-bold">
                                    {totalUsers}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-60 h-20 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
                            {/* <img className=" ml-4 h-14" src={doctrsImg} alt="logo" /> */}
                            <div>
                                <h1 className="pl-3 text-black font-bold">Total Bookings</h1>
                                <span className="flex justify-center text-black font-bold">
                                    {totalBookings}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-60 h-20 shadow-xl items-center bg-white opacity-60 border border-gray-200 rounded-lg  md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
                            {/* <img className=" ml-4 h-14" src={totalAppointment} alt="logo" /> */}
                            <div>
                                <h1 className="pl-4 pr-2 text-black font-bold">
                                    Total Success Payments
                                </h1>

                                <span className="flex justify-center text-black font-bold">
                                    {/* {totalmanagers} */}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* {salesReport.length !== 0 && ( */}
                    <div className="overflow-auto rounded-lg shadow">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                        Month
                                    </th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                        Year
                                    </th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                                        Total Sales
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" bg-white divide-y divide-gray-200">
                                {/* {salesReport.map((salesReport) => ( */}
                                <tr className="">
                                    <td className=" p-3 text-sm text-gray-700 text-center">
                                        {/* {salesReport.month} */}
                                    </td>
                                    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                        {/* {salesReport.year} */}
                                    </td>
                                    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                        {/* {salesReport.totalSales} */}
                                    </td>
                                </tr>
                                {/* // ))} */}
                            </tbody>
                        </table>
                    </div>
                    {/*  )} */}
                </div>
            </Layout>
        </div>
    )
}

export default Dashboard