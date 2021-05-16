import { toast } from 'react-toastify'

export const arrayBufferToBase64 = (buffer) => {
    let binary = ''
    let bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b) => (binary += String.fromCharCode(b)))
    return 'data:image/jpeg;base64,' + window.btoa(binary)
}

export const resError = (error) => {
    return toast.error(error.response.data.error.message)
}
