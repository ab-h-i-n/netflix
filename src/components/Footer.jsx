import React from 'react'

function Footer() {
  return (
    <div className=' bg-zinc-900 grid place-items-center pt-20 pb-10 gap-y-10 '>

      {/* img  */}

      <img src="/assets/main_logo.svg" className='w-48' alt="logo" />

      {/* paragraph  */}

      <p className='text-lg font-medium text-zinc-600'>Entertain Your loved ones in home</p>

      {/* links  */}

      <ul className='grid grid-cols-2 gap-x-10 gap-y-3 text-zinc-300 md:grid-cols-7'>
        {/* eslint-disable-next-line */}
        <li><p className='hover:underline underline-offset-4'>About</p></li>
        <li><p className='hover:underline underline-offset-4'>Premium</p></li>
        <li><p className='hover:underline underline-offset-4'>Campaigns</p></li>
        <li><p className='hover:underline underline-offset-4'>Blog</p></li>
        <li><p className='hover:underline underline-offset-4'>Affiliate Program</p></li>
        <li><p className='hover:underline underline-offset-4'>FAQs</p></li>
        <li><p className='hover:underline underline-offset-4'>Contact</p></li>
      </ul>

      {/* copy right  */}

      <p className='text-sm font-medium text-zinc-600'>© 2021-2022 Netflix™. All Rights Reserved.</p>
    </div>
  )
}

export default Footer