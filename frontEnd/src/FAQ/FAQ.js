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
                    <p className='mb-6 text-base text-stone-800'>Yes. Recording in public areas is legal and consent is not required to appearin a video of a public location.  However, if you would like us to remove your face from a video in oursite,please email privacy@quietavenue.com.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Does QuietAvenue needs access to the property?</h4>
                    <p className='mb-6 text-base text-stone-800'>No. We do not need access to the property to record audo or video. At your request, we will send a courtesy email or  make a phonecall to notify you, as well as any property owners or inhabitants about our technicians' visit.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Does the property need to be uninhabited?</h4>
                    <p className='mb-6 text-base text-stone-800'>No.  Our recording equipment can be installed and disinstalled quickly and no interaction with the property owner or inhabitant is required.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Do I need to provide power or Wi-fi access?</h4>
                    <p className='mb-6 text-base text-stone-800'>No. Our equipment does not require any power or Wi-fi access. It leaves no trace it was ever there.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">Do I need to be a real state professional to request my property to be displayed in QuietAvenue?</h4>
                    <p className='mb-6 text-base text-stone-800'>No. If you are interested in having audio and video of your property on our website, please contact us at homeowners@quietavenue.com</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">What regions do you cover?</h4>
                    <p className='mb-6 text-base text-stone-800'>Currently we are limited to properties in the San Francisco Bay Area.</p>
                    <h4 className="mb-3 text-lg sm:text-xl  text-stone-800">How much does your service cost?</h4>
                    <p className='mb-6 text-base text-stone-800'>With our free trial services, we will generate audio and video recording of your first property, and host it in our website free of charge.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ