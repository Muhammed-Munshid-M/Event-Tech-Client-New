import React, { useState } from 'react';
import { userUrl } from '../../../API/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

function CheckoutPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [company, setCompany] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [count, setCount] = useState('')
  const [type, setType] = useState('')
  const [pin, setPin] = useState('')
  const [place, setPlace] = useState('')
  const userData = { name, email, mobile, company, date, time, count, type, pin, place }
  const navigate = useNavigate()
  let {user} = useSelector((state) => state.user)

  const addEvent = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${userUrl}add-event`,userData,{
        headers :{
          Authorization : `Bearer ${token}`,
        },
      })
      .then((response) => {
          console.log('Hi');
          if (response.data.success) {
            toast.success(response.data.message)
          } else if (response.data.noAcc){
            toast.error(response.data.message)
            navigate('/login')
          } else {
            toast.error('something error')
            navigate('/add-event')
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log(error)
      toast.error('something error')
    }
  }
  return (
    <div>
      <Navbar />
      <div className='w-full h-full mt-10 bg-orange-500'>
        <div className='z-50 w-full h-full top-0'>
          <form onSubmit={addEvent}>
            <div>
              <div className="container mx-auto px-4">
                <div className="flex content-center">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 mt-20 ">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="ml-8 mb-3">
                          <h6 className="text-blueGray-500 text-xl font-bold">
                            Checkout Page
                          </h6>
                        </div>
                        {/* <hr className="mt-6 border-b-1 border-black" /> */}
                      </div>
                      <div className="px-4 lg:px-10 py-10 pt-0 flex flex-row">
                        <div className='w-1/2 px-4'>
                          {/* <form onSubmit={sendOtp}> */}
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Name
                            </label>
                            <input
                              type="name"
                              value={name}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Name"
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Mobile
                            </label>
                            <input
                              type="number"
                              value={mobile}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Mobile"
                              onChange={(e) => setMobile(e.target.value)}
                            />
                          </div>


                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                              Event Date
                            </label>
                            <input
                              type="date"
                              value={date}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Date"
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                              Count of people
                            </label>
                            <input
                              type="number"
                              value={count}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Count of people"
                              onChange={(e) => setCount(e.target.value)}
                            />

                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Pin code
                            </label>
                            <input
                              type="number"
                              value={pin}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Pin Code"
                              onChange={(e) => setPin(e.target.value)}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              District
                            </label>
                            <select name="" className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' id="">
                              <option value="Kerala">Kasargod</option>
                              <option value="Kerala">Kannur</option>
                              <option value="Kerala">Wayanad</option>
                              <option value="Kerala">Kozhikode</option>
                              <option value="Kerala">Malappuram</option>
                              <option value="Kerala">Thrissur</option>
                              <option value="Kerala">Palakkad</option>
                              <option value="Kerala">Ernakulam</option>
                              <option value="Kerala">Idukki</option>
                              <option value="Kerala">Kottayam</option>
                              <option value="Kerala">Alappuzha</option>
                              <option value="Kerala">Pathanamthitta</option>
                              <option value="Kerala">Kollam</option>
                              <option value="Kerala">Thiruvananthapuram</option>
                            </select>
                          </div>
                        </div>
                        <div className='w-1/2 px-4'>
                          {/* <form onSubmit={sendOtp}> */}
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              value={company}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Address"
                              onChange={(e) => setCompany(e.target.value)}
                            />
                          </div>


                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Event Time
                            </label>
                            <input
                              type="time"
                              value={time}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Time"
                              onChange={(e) => setTime(e.target.value)}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            >
                              Event Type
                            </label>
                            <input
                              type="text"
                              value={type}
                              required
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Wedding/Nikah"
                              onChange={(e) => setType(e.target.value)}
                            />

                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              State
                            </label>
                            <select name="" className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150' id="">
                              <option value="Kerala">Kerala</option>
                              <option value="Kerala">Tamilnadu</option>
                              <option value="Kerala">Karnataka</option>
                            </select>
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              place
                            </label>
                            <input
                              type="text"
                              value={place}
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              placeholder="Place"
                              onChange={(e) => setPlace(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="text-center flex-auto px-4 lg:px-10 py-8 pt-0">
                        <button
                          className="bg-black text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Pay Now
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage