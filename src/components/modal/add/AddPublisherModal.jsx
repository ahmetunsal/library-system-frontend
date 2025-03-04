'use client'

import { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { context } from '../../../_context/GlobalContext';

export default function AddPublisherModal({ open, setOpen, deneme, setDeneme }) {

    const { postAddPublisher } = useContext(context);

    const [publisherName, setPublisherName] = useState();
    const [publisherAddress, setPublisherAddress] = useState();
    const [publisherWebsite, setPublisherWebsite] = useState();

    const handleNameInputChange = (e) => {
        setPublisherName(e.target.value);
    };

    const handleAddressInputChange = (e) => {
        setPublisherAddress(e.target.value);
    };

    const handleWebsiteInputChange = (e) => {
        setPublisherWebsite(e.target.value);
    };

    const handleAddPublisher = () => {
        postAddPublisher(publisherName, publisherAddress, publisherWebsite);
        setOpen(false);
        setDeneme(!deneme);
    }

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-6xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-xl font-semibold text-gray-900">
                    Yayınevi Ekle
                  </DialogTitle>
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="">Yayınevi İsmi</label>
                        <input onChange={handleNameInputChange} type="text" className='w-3/6 outline px-3 py-2' />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="">Yayınevi Web Adresi</label>
                        <input onChange={handleWebsiteInputChange} type="text" className='w-3/6 outline px-3 py-2' />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="">Yayınevi Adresi</label>
                        <textarea name="" id="" onChange={handleAddressInputChange} rows={3} className='w-1/2 border'></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleAddPublisher}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Yayınevi Ekle
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                İptal
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
