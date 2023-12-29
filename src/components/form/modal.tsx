import { FaRegularImage } from 'solid-icons/fa'
import type { JSX } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from 'terracotta'
import Avatar from '../Avatar'

import { Show } from 'solid-js'
import { useAuth } from '../../context/authContext'
import { useSweet } from '../../context/sweetContext'
import useForm from '../../hooks/useForm'

export default function Modal(props: { isOpen: any }): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(props.isOpen)
  const { user } = useAuth() as any
  const { sweets, createSweet, fetchSweets } = useSweet() as any
  const { values, errors, isValid, handleChange, handleSubmit } = useForm({
    content: '',
  })

  const handleCreateSweet = () => {
    createSweet({ content: values().content, user_id: user().id })
    //empty the textarea
    handleChange('content', '')
  }

  createEffect(() => {
    setIsOpen(props.isOpen)
  }, [props.isOpen])

  function closeModal(): void {
    setIsOpen(false)
  }

  return (
    <div style={{ 'z-index': '2147483647' }}>
      <Transition appear show={isOpen()}>
        <Dialog
          isOpen
          class='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div class='min-h-screen px-4 flex items-center justify-center'>
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <DialogOverlay class='fixed inset-0 bg-gray-900 bg-opacity-50' />
            </TransitionChild>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span class='inline-block h-screen align-middle' aria-hidden='true'>
              &#8203;
            </span>
            <TransitionChild
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel class='inline-block  p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 text-white shadow-xl rounded-2xl mx-auto max-w-7xl sm:px-6 lg:px-8 w-screen m-10'>
                <DialogTitle
                  as='h3'
                  class='text-lg font-medium leading-6 text-white'
                >
                  Sweet Now
                </DialogTitle>
                <div class='flex-it py-1 px-4 flex-row'>
                  {/* HOME PAGE START */}
                  <div class='flex-it py-1  flex-row  w-full px-20'>
                    <div class='flex-it mr-4'>
                      <Show when={user()}>
                        <div class='w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80'>
                          <Avatar
                            username={user().data.name}
                            size={140}
                            userId={user().data.id}
                          />
                        </div>
                      </Show>
                    </div>
                    {/* MESSENGER START */}
                    <div class='flex-it flex-grow w-full'>
                      <div class='flex-it'>
                        <textarea
                          value={values().content}
                          onInput={(e: { target: { value: any } }) =>
                            handleChange('content', e.target.value)
                          }
                          name='content'
                          rows='1'
                          id='sweet'
                          class='bg-transparent resize-none overflow-hidden block !outline-none !border-none border-transparent focus:border-transparent focus:ring-0 text-gray-100 text-xl w-full p-0'
                          placeholder={"What's new?"}
                        />
                      </div>
                      <div class='flex-it mb-1 flex-row xs:justify-between items-center w-full'>
                        <div class='flex-it mt-3 mr-3 cursor-pointer text-white hover:text-froly-400 transition'>
                          <div class='upload-btn-wrapper cursor-pointer'>
                            <FaRegularImage
                              size={18}
                              style={{ cursor: 'pointer' }}
                            />
                            <input
                              style={{ cursor: 'pointer' }}
                              type='file'
                              name='myfile'
                            />
                          </div>
                        </div>
                        <div class='flex-it  mt-3 cursor-pointer'>
                          <button
                            onClick={handleCreateSweet}
                            type='button'
                            class='
                  disabled:cursor-not-allowed disabled:bg-gray-400
                  bg-froly-400 hover:bg-froly-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200'
                          >
                            <div class='flex-it flex-row text-sm font-bold text-white items-start justify-center'>
                              <span>Sweet It</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* MESSENGER END */}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
