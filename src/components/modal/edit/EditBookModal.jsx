'use client'

import { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { context } from '../../../_context/GlobalContext';
import { STATUS_CHOICES } from '../../../utils/config';

export default function EditBookModal({ open, setOpen, bookObject, deneme, setDeneme }) {
    const { allAuthors, allPublishers, allCategories, bookObj, putEditBook, book, setBook } = useContext(context)

    useEffect(() => {
        setBook(bookObject);
    }, [bookObject]);

    const handleSubmitCategory = () => {
        putEditBook(book, bookObject.id);
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
                    Kitap Düzenle
                  </DialogTitle>
                  <div className="grid grid-cols-2 gap-2">
                    {bookObject && Object.keys(bookObject).map((book) => {
                        if (["id", "created_at", "updated_at", "author_name", "publisher_name", "category_name"].includes(book)) return;
                        let title = <label>{book.toUpperCase()}</label>
                        let element = <input onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))} defaultValue={bookObject[book]} type='text' className='border' />
                        if (book == "author") element = (
                            <select
                                onChange={(e) => {
                                    const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));
                                    bookObject.authors.map(author => selectedValues.push(author))
                                    setBook((prev) => ({
                                    ...prev,
                                    author: selectedValues, // Seçilen yazarları güncelliyoruz
                                    }));
                                }}
                                className="w-full p-2 border rounded shadow"
                                multiple
                                >
                                {Array.isArray(allAuthors) && allAuthors.map((author) => {
                                    const isSelected = Array.from(bookObject[book]).findIndex(a => a == author.id) !== -1; 
                                    return (
                                        <option selected={isSelected} key={author.id} value={author.id}>
                                            {isSelected}
                                            {author.first_name} {author.last_name}
                                        </option>
                                    )
                                })}
                                </select>
                        );
                        if (book == "publisher") element = (
                            <select
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: Number(e.target.value) }))}
                                className="w-full p-2 border rounded shadow"
                              >
                                {Array.isArray(allPublishers) && allPublishers.map((p) => {
                                    const isSelected = bookObject[book] === p.id;
                                    console.log(isSelected); 
                                    return (
                                        <option selected={isSelected} key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    )
                                })}
                              </select>
                        );
                        if (book == "category") element = (
                            <select
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: Number(e.target.value) }))}
                                className="w-full p-2 border rounded shadow"
                              >
                                {Array.isArray(allCategories) && allCategories.map((c) => {
                                    const isSelected = bookObject[book] === c.id;
                                    return (
                                        <option selected={isSelected} key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    )
                                })}
                              </select>
                        );
                        if (book == "publication_date") element = (
                            <input
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))}
                                className="border border-black outline-none"
                                type="date"
                                defaultValue={bookObject.publication_date}
                              />
                        );
                        if (book == "description") element = (
                            <textarea
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))}
                                className="border border-black outline-none"
                                type="number"
                                defaultValue={bookObject[book]}
                              />
                        )
                        if (book == "status") element = (
                            <select 
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))}
                                name="" 
                                id="" 
                                className="border">
                                {STATUS_CHOICES.map(([value, label]) => (
                                    <option key={value} value={value}>
                                    {label}
                                    </option>
                                ))} 
                            </select>
                        )
                        if (book == "pages") element = (
                            <input
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))}
                                className="border border-black outline-none"
                                type="number"
                                defaultValue={bookObject[book]}
                            />
                        )
                        if (book == "cover_image") element = (
                            <input
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.files[0] ? e.target.files[0] : null }))}
                                className="border border-black outline-none"
                                type="file"
                            />
                        )
                        return (
                            <div className="flex flex-col">
                                {title}
                                {element}
                            </div>
                        )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmitCategory}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Yayınevi Düzenle
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
