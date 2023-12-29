// ToastProvider.tsx
import { JSX, createContext, useContext } from 'solid-js'
import toast, { Toaster } from 'solid-toast' // Import solid-toast library

interface ToastOptions {
  duration?: number
  // ... other options
}

interface Toast {
  id: string
  message: string
  options: ToastOptions
  timeoutId: number | undefined
}

interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void
  dismissToast: (toastId: string) => void
  dismissAllToasts: () => void
}

const ToastContext = createContext<ToastContextValue>()

export const ToastProvider = (props: {
  children:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | (string & {})
    | null
    | undefined
}) => {
  const showToast = (message: string, options: ToastOptions = {}): void => {
    const optionsData = {
      ...options,
      duration: options.duration || 5000,
      icon: '🧁',
      className: 'border-2 border-gray-600 rounded-md',
      style: {
        background: '#1f2937',
        color: '#f3f4f6',
      },
      iconTheme: {
        primary: '#38bdf8',
        secondary: '#1f2937',
      },
    }
    const id = toast(message, optionsData) // Use solid-toast library to show a toast
    const duration = options.duration || 5000

    // Automatically dismiss toast after the specified duration
    setTimeout(() => dismissToast(id), duration)
  }

  const dismissToast = (toastId: string): void => {
    toast.dismiss(toastId) // Use solid-toast library to dismiss a specific toast
  }

  const dismissAllToasts = (): void => {
    toast.dismiss() // Use solid-toast library to dismiss all toasts
  }

  const contextValue: ToastContextValue = {
    showToast,
    dismissToast,
    dismissAllToasts,
  }

  return (
    <>
      <Toaster position='top-center' gutter={8} />{' '}
      {/* Render the Toaster component from solid-toast */}
      <ToastContext.Provider value={contextValue}>
        {props.children}
      </ToastContext.Provider>
    </>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
}
