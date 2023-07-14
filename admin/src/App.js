import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Routes from './Routes'

function App(props) {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-grow p-7">
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

export default App
