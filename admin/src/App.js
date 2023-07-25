import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Routes from './Routes'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import PageLoader from './components/utils/Loader/PageLoader'

function App() {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-grow sm:p-7 p-5">
                <NavBar />
                <Routes />
            </div>
            <ToastContainer
                transition={Zoom}
                autoClose={3000}
                closeButton={true}
                hideProgressBar={true}
                pauseOnHover={true}
                position="bottom-center"
            />
        </div>
    )
}

export default withAuthenticationRequired(App, {
    onRedirecting: () => <PageLoader />,
})
