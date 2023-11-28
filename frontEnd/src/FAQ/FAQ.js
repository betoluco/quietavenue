import React from 'react';

const FAQ = (props) =>{
    return(
         <div className="">
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center mb-12 text-stone-800 font-semibold">
                Frequently asked <span className="text-green-600" >questions</span>
            </h2>
            <div className="w-full flex flex-col items-center mb-8 py-12 bg-stone-200">
                <div className="px-3 max-w-screen-md">
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Is it legal to record audio and video outside the property?</h4>
                    <p className='mb-6 text-base text-stone-800'>Yes. Since the recording is made outside and the lenses are pointing to the 
                    street the expectation of privacy is meet. But if you clearly appear on any part of the video and you do not consent
                    on that, inform us the minute and second where you appear and you will be blurred out or deleted from the video.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Do I need to allow access to the building to do the recordings?</h4>
                    <p className='mb-6 text-base text-stone-800'>No, the recording is made outside the building. But in order to place the 
                    camera we will need access to the premises.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Does the house need to be uninhabited to do the recordings?</h4>
                    <p className='mb-6 text-base text-stone-800'>No, as long as all the involved parts agree on doing the recordings.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Do I need to provide you with energy or wifi?</h4>
                    <p className='mb-6 text-base text-stone-800'>No, we only need the permission to place the recording devices.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">How many houses can you do at the same time?</h4>
                    <p className='mb-6 text-base text-stone-800'>There is no limit on the number of houses that can be done at the same time</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Do I need to be a real state professional to solicit the service?</h4>
                    <p className='mb-6 text-base text-stone-800'>No, but you need to have the legal permission to allow us to the premises of the property</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">What regions do you cover?</h4>
                    <p className='mb-6 text-base text-stone-800'>Currently we are limited to San Mateo County (CA), and the surrounding counties</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">How much does the service cost?</h4>
                    <p className='mb-6 text-base text-stone-800'>We are currently offering the first house free, after that the cost will be </p>
                </div>
            </div>
        </div>
    );
};

export default FAQ