import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='w-full h-72 !bg-blue-800 m-auto'>
            <div className='max-w-[1400px] flex justify-around text-white m-auto'>
                <div>
                    <div className='flex items-center gap-2.5 mt-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" viewBox="0 0 25 29" fill="none">
                            <path
                                d="M3.56348 22.9H24.5V0.5H3.5057C1.57228 0.506417 0.00635613 2.08725 0 4.03908V24.6646H0.00057783C0.00057783 24.6733 0 24.6821 0 24.6908C0 26.7558 1.60521 28.5 3.5057 28.5H24.5V26.6333H3.5057C2.63895 26.6333 1.84906 25.7076 1.84906 24.6908C1.84906 23.7202 2.63433 22.9 3.56348 22.9ZM5.54717 2.38592H11.0943V12.4671L8.29764 9.9885L5.54717 12.4525V2.38592ZM1.84906 4.05367C1.84617 3.12617 2.58695 2.37192 3.5057 2.36667H3.69811H5.54717H3.69811V14.9667H5.52637L8.30458 12.4782L11.1117 14.9667H12.9434V2.36667H22.6509V21.0333H5.55179H3.70274H3.56348C2.96196 21.0333 2.37141 21.192 1.84963 21.493V4.05367H1.84906Z"
                                fill="#FFCA42" />
                        </svg>
                        <p className='text-2xl' style={{ color: "#FFCA42" }}>FUTURER BOOK</p>
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl mt-10 text-white'>Explore</h2><br />
                    <Link to="/home"><p>Home</p></Link>
                    <Link to='/product'><p>Product</p></Link>
                    <p>About</p>
                    <p>Contact</p>
                </div>
                <div>
                    <h2 className='text-2xl mt-10 text-white'>Utility Pages</h2><br />
                    <p>Start here</p>
                    <p>Style guide</p>
                    <p>Password protected</p>
                    <p>Changelog</p>
                </div>
                <div>
                    <h2 className='text-2xl mt-10 text-white'>Keep in Touch</h2><br />
                    <p>Address : 24A Kingston St, Los Vegas NC 28202, USA.</p>
                    <p>Mail : support@doctors.com</p>
                    <p>Phone : (+22) 123 - 4567 - 900</p>
                </div>
            </div><br />
            <hr className='max-w-[1220px] m-auto mt-[50px] opacity-50 text-white' /><br />
            <p className='text-white text-center'>© Drafted by ProductBook - Powered by babyHao</p>
        </div>
    )
}

export default Footer
