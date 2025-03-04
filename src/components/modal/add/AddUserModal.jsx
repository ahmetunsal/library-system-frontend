'use client'

import { useContext, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { context } from '../../../_context/GlobalContext';

export default function AddUserModal({ open, setOpen, deneme, setDeneme }) {
    const { newUserObj, postRegisterUser, USER_ROLES, generatePassword } = useContext(context);
    const [newUser, setNewUser] = useState(newUserObj);

    useEffect(() => {
      const setNewPass = async () => {
        const pass = await generatePassword();
        setNewUser((prev) => ({ ...prev, password: pass }));
      }

      setNewPass();
    }, []);

    useEffect(() => {
      console.log("NEW_USER", newUser);
    }, [newUser]);
    
    const handleTextInputChange = (e, param) => {
        setNewUser((prev) => ({ ...prev, [param]: e.target.value }));
    };
    
    const handleFileInputChange = (e, param) => {
        setNewUser((prev) => ({ ...prev, [param]: e.target.files[0] ? e.target.files[0] : null }));
    };

    const handleAddUser = () => {
        postRegisterUser(newUser);
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
                  <DialogTitle as="h3" className="text-2xl font-semibold text-gray-900">
                    Yeni üye kaydı
                  </DialogTitle>
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    {
                        Object.keys(newUserObj).map(u => {
                            let element;
                            if(["is_staff"].includes(u)) return;
                            element = <input type="text" className='border' onChange={(e) => handleTextInputChange(e, u)} />
                            if(u == "password") element = <input type='text' disabled className='border text-black' defaultValue={newUserObj[u].length != 0 ? newUserObj[u] : "Otomatik Ayarlanıyor."} />
                            if(u == "address") element = <textarea className='border' onChange={(e) => handleTextInputChange(e, u)} />
                            if(u == "tckn") element = <input type="number" className='border' onChange={(e) => handleTextInputChange(e, u)} />
                            if(u == "email") element = <input type="email" className='border' onChange={(e) => handleTextInputChange(e, u)} />
                            if(u == "profile_picture") element = <input type="file" className='border' onChange={(e) => handleFileInputChange(e, u)} />
                            if(u == "is_active") return <div className='flex items-center gap-2'><input type="checkbox" className='p-1' onChange={(e) => handleTextInputChange(e, u)} /><label htmlFor="">{u.toUpperCase()}</label></div>
                            if(u == "role") element = (
                                <select onChange={(e) => handleTextInputChange(e, u)} className='border'>
                                    <option value="0" disabled selected>Bir rol seçiniz..</option>
                                    {
                                        USER_ROLES.map(([value, label]) => {
                                            return (
                                                <option value={value}>{label}</option>
                                            )
                                        })
                                    }
                                </select>
                            )
                            return (
                                <div className="flex flex-col">
                                    <label htmlFor="">{u.toUpperCase()}</label>
                                    {element}
                                </div>
                            )
                        })
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleAddUser}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Üye Ekle
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
