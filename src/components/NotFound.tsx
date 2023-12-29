// components/NotFound.tsx

import { A } from '@solidjs/router'

const NotFound = () => {
  return (
    <div class='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
      <A href='/' class='-m-1.5 p-1.5'>
        <span class='sr-only'>Sweetr</span>
        <img class='h-16 w-16 ' src='/logo.svg' alt='' />
      </A>{' '}
      <h1 class='text-9xl font-extrabold text-white tracking-widest'>
        4<span class='text-froly'>0</span>4
      </h1>
      <div class='bg-froly px-2 text-sm rounded rotate-12 absolute text-white'>
        Page Not Found
      </div>
      <button class='mt-5'>
        <a class='relative inline-block text-sm font-medium text-froly group active:text-orange-500 focus:outline-none focus:ring'>
          <span class='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-froly group-hover:translate-y-0 group-hover:translate-x-0'></span>

          <span class='relative block px-8 py-3 bg-[#1A2238] border border-current'>
            <A href='/'>Go back home</A>
          </span>
        </a>
      </button>
    </div>
  )
}

export default NotFound
