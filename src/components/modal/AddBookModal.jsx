"use client";

import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { bookObj, STATUS_CHOICES } from "../../utils/config";
import { context } from "../../_context/GlobalContext";

export default function AddBookModal({ open, setOpen, deneme, setDeneme }) {
  const [allCategories, setAllCategories] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allPublishers, setAllPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { postAddBook, getAllCategories, getAllAuthors, getAllPublishers, book, setBook } = useContext(context);

  const handleAddBook = () => {
    postAddBook(book);
    setOpen(false);
    setDeneme(!deneme)
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const categories = await getAllCategories();
        const authors = await getAllAuthors();
        const publishers = await getAllPublishers();

        setTimeout(() => {
          setAllCategories(categories.data);
          setAllAuthors(authors.data);
          setAllPublishers(publishers.data);
        }, 2000);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAll();
  }, []);

  useEffect(() => {
    console.log("ALL_AUTHORS_GUNCEL",allAuthors);
  }, [allAuthors]);

  if (loading) return <>Loading!!</>;

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
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-xl font-semibold text-gray-900"
                  >
                    Kitap Ekle
                  </DialogTitle>
                  <div className="flex flex-col gap-4 mt-2">
                    
                    {Object.keys(bookObj).map((book,i) => {
                      return (
                        <div key={i} className="grid grid-cols-12 gap-2">
                          <div className="col-span-6">
                            <label htmlFor="">{book}</label>
                          </div>
                          <div className="col-span-6">
                            {book == "cover_image" ? (
                              <input
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.files[0] ? e.target.files[0] : null }))}
                                className="border border-black outline-none"
                                type="file"
                              />
                            ) : book == "pages" ? (
                              <input
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))}
                                className="border border-black outline-none"
                                type="number"
                              />
                            ) : book == "status" ? (
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
                            ) : book == "description" ? (
                              <textarea
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))}
                                className="border border-black outline-none"
                                type="number"
                              />
                            ) : book == "publication_date" ? (
                              <input
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))}
                                className="border border-black outline-none"
                                type="date"
                              />
                            ) : book == "author" ? (
                              <select
                                onChange={(e) => {
                                  const selectedValues = Array.from(e.target.selectedOptions, option => Number(option.value));
                                  setBook((prev) => ({
                                    ...prev,
                                    author: selectedValues, // Seçilen yazarları güncelliyoruz
                                  }));
                                }}
                                className="w-full p-2 border rounded shadow"
                                multiple
                              >
                                <option value="" disabled selected>
                                  Bir yazar seçin...
                                </option>
                                {Array.isArray(allAuthors) && allAuthors.map((author) => (
                                  <option key={author.id} value={author.id}>
                                    {author.first_name} {author.last_name}
                                  </option>
                                ))}
                              </select>
                            ) : book == "publisher" ? (
                              <select
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: Number(e.target.value) }))}
                                className="w-full p-2 border rounded shadow"
                              >
                                <option value="" disabled selected>
                                  Bir yayınevi seçin...
                                </option>
                                {Array.isArray(allPublishers) && allPublishers.map((author) => (
                                  <option key={author.id} value={author.id}>
                                    {author.name}
                                  </option>
                                ))}
                              </select>
                          ) : book == "category" ? (
                              <select
                                onChange={(e) => setBook((prev) => ({ ...prev, [book]: Number(e.target.value) }))}
                                className="w-full p-2 border rounded shadow"
                              >
                                <option value="" disabled selected>
                                  Bir kategori seçin...
                                </option>
                                {Array.isArray(allCategories) && allCategories.map((author) => (
                                  <option key={author.id} value={author.id}>
                                    {author.name}
                                  </option>
                                ))}
                              </select>
                          ) : <input type="text" className="border" onChange={(e) => setBook((prev) => ({ ...prev, [book]: e.target.value }))} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleAddBook}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Kitap Ekle
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
  );
}
