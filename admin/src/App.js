import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'

function App(props) {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-grow p-7">
                <NavBar />
                {props.children}
            </div>
        </div>
    )
}

export default App
