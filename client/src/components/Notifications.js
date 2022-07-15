import {Toast, ToastContainer} from 'react-bootstrap'

export default function Notifications({toasts, handleNotification}) {
  return (
    <ToastContainer className="p-3" position="top-end">
      {toasts.map((toast, index) => {
        return (
          <Toast
            className="d-inline-block m-1"
            bg={toast.variant}
            key={index}
            delay={5000}
            onClose={() => {
              const storage = toasts.slice()
              storage.splice(index, 1)
              handleNotification(storage)
            }}
            animation
            autohide
          >
            <Toast.Header className={`bg-${toast.variant} text-white`}>
              <img
                src={process.env.PUBLIC_URL + 'logo.png'}
                className="me-2"
                alt="toast-logo"
                style={{width: '20px', height: '20px'}}
              />
              <strong className="me-auto">{toast.header}</strong>
            </Toast.Header>
            <Toast.Body
              className={
                (toast.variant === 'success' || toast.variant === 'danger') &&
                'text-white'
              }
            >
              {toast.body}
            </Toast.Body>
          </Toast>
        )
      })}
    </ToastContainer>
  )
}
