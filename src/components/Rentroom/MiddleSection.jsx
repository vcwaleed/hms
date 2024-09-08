import React from 'react'

function MiddleSection() {
  return (
    <>
    <div className='flex flex-row justify-center mt-7 '>
    <div>
    <div class="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
  <div
    class="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
    <img
      src="d1.jpg"
      alt="card-image" class="object-cover w-80 h-full" />
  </div>
  <div class="p-6">
    <h6
      class="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
      startups
    </h6>
    <h4 class="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      Welcome to NC Hotel
    </h4>
    <p class="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
    Nestled amidst lush greenery, our hotel offers a serene escape 
    from the bustling city. Our spacious rooms are thoughtfully designed 
    to provide maximum comfort, featuring plush bedding, modern amenities,
     and breathtaking views of the surrounding landscape. Enjoy a delicious meal 
     at our onsite restaurant, where our talented chefs prepare delectable dishes
      using fresh, local ingredients. Relax by our sparkling pool or take a leisurely 
      stroll through our beautifully manicured gardens. Whether you're seeking a romantic
       getaway or a family vacation, our hotel is the perfect destination for unforgettable
        memories
    </p>
    <a href="/booking" class="inline-block"><button
        class="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
        type="button">
        Book Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg></button></a>
  </div>
</div>  
    </div>
    <div >
        <img src='h1.jpg'  className='h-32rem w-32rem '/>
    </div>
    </div>
      
    </>
  )
}

export default MiddleSection
