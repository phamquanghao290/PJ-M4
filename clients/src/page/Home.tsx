import React, { useEffect } from 'react'
import Dark from '../Images/book1.png'
import Atomic from '../Images/book2.png'
import trusted from '../Images/trusted.png'
import { Link } from 'react-router-dom'
type Props = {}

const Home = (props: Props) => {
    useEffect(() => {
        document.title = 'Home'
    }, [])
  return (
    <>
          <div className='h-[850px] !bg-blue-800  w-full '>
              <div className='flex justify-evenly items-center text-white m-auto max-w-8xl' >
                  <div className='mt-14'>
                      <p className='italic text-3xl'>Wellcome to Pages</p><br /><br />
                      <h1 className='text-6xl font-bold !text-white'>
                          Books are uniquely<br />
                          portable magic
                      </h1><br /><br />
                      <p className='text-1xl opacity-80'>
                          There are many variations of passages of Lorem Ipsum available,<br />
                          but the majority have suffered alteration in some form.
                      </p><br /><br />
                      <div className='flex items-center'>
                          <Link to='/product'><button className='w-40 h-12 rounded bg-yellow-500 text-[20px]'>Order Today</button></Link>
                          <p className='cursor-pointer ml-10 text-[20px]'>Read Free Demo</p>
                      </div><br /><br />
                      <div className='flex justify-between '>
                          <div>
                              <h2 className='text-2xl font-bold text-white'>Pages:</h2>
                              <p>586 pages</p>
                          </div>
                          <div>
                              <h2 className='text-2xl font-bold text-white'>Length:</h2>
                              <p>10 Hours</p>
                          </div>
                          <div>
                              <h2 className='text-2xl font-bold text-white'>Ratings:</h2>
                              <p>4.5/5 (305 ratings)</p>
                          </div>

                      </div>
                  </div>
                  <img src={Dark} alt="" className='mt-14' />
              </div>
          </div>
          <div className='w-full h-[700px]'>
              <p className='text-center text-3xl font-bold font-sans mt-11 text-blue-900' >Author's Book Includes</p><br />
              <div className='w-12 h-1 bg-yellow-500 rounded m-auto'></div><br /><br /><br /><br />
              <div className='flex items-center justify-evenly max-w-7xl max-h-[400px] m-auto'>
                  <img src={Atomic} alt="" className='w-[300px] shadow-xl shadow-black-500/100' />
                  <div>
                      <h2 className='text-blue-900 font-bold text-2xl'>Atomic One's</h2><br /><br />
                      <p>Many variations of passages<br />of Lorem Ipsum willing
                          araise<br />alteration in some form.</p><br /><br />
                      <div className='flex justify-between'>
                          <div>
                              <h2 className='text-2xl font-bold text-blue-800'>Pages:</h2>
                              <p>586 pages</p>
                          </div>
                          <div>
                              <h2 className='text-2xl font-bold text-blue-800'>Length:</h2>
                              <p>10 Hours</p>
                          </div>
                      </div><br /><br />
                      <button className='w-40 h-14 rounded-xl bg-yellow-500 text-[20px] text-white'>Order Today</button>
                  </div>
                  <img src={Dark} alt="" className='w-[300px] shadow-xl shadow-black-500/100' />
                  <div>
                      <h2 className='text-blue-900 font-bold text-2xl'>The Dark Light</h2><br /><br />
                      <p>Many variations of passages<br />of Lorem Ipsum willing
                          araise<br />alteration in some form.</p><br /><br />
                      <div className='flex justify-between'>
                          <div>
                              <h2 className='text-2xl font-bold text-blue-800'>Pages:</h2>
                              <p>586 pages</p>
                          </div>
                          <div>
                              <h2 className='text-2xl font-bold text-blue-800'>Length:</h2>
                              <p>10 Hours</p>
                          </div>
                      </div><br /><br />
                      <button className='w-40 h-14 rounded-xl bg-yellow-500 text-[20px] text-white'>Order Today</button>
                  </div>
              </div>
          </div>
          <hr className='m-auto max-w-[1300px]' />
          <div className='w-full h-[500px]'>
              <h2 className='text-2xl font-bold text-blue-800 text-center'><br /><br />
                  Trusted by the Best
              </h2><br />
              <div className='w-12 h-1 bg-yellow-500 rounded m-auto'></div><br /><br /><br />
              <img src={trusted} alt="" className='m-auto' />
          </div>
    </>
  )
}

export default Home