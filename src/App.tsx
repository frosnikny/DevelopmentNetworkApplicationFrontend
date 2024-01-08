import {Routes, Route} from 'react-router-dom';
import NavigationBar from './components/NavBar';
import DevelopmentList from "./components/DevelopmentPages/DevelopmentList/DevelopmentList.tsx";
import DevelopmentDetail from "./components/DevelopmentPages/DevelopmentDetail/DevelopmentDetail.tsx";
import CustomerRequestsTable from "./components/RequestPages/CustomerRequestsTable/CustomerRequestsTable.tsx";
import ModerateDevsTable from "./components/ModerateDevs/ModerateDevsTable/ModerateDevsTable.tsx";
import LoginPage from "./components/AuthPages/LoginPage/LoginPage.tsx";
import RegisterPage from "./components/AuthPages/RegisterPage/RegisterPage.tsx";
import {useAppSelector} from "./hooks/redux.ts";
import LoadAnimation from "./components/Helpers/Popup/LoadAnimation.tsx";
import MyComponent from "./components/Helpers/Popup/Popover.tsx";
import RequestDetails from "./components/RequestPages/RequestDetails/RequestDetails.tsx";

function App() {
    const {isLoading, successText, errorText} = useAppSelector(state => state.animationReducer)

    return (
        <>
            {/* Поповеры */}
            {errorText != "" && <MyComponent isError={true} message={errorText}/>}
            {successText != "" && <MyComponent isError={false} message={successText}/>}

            {/* Навигация */}
            <NavigationBar/>

            {/* Спиннер загрузки */}
            {isLoading && <LoadAnimation/>}

            {/* Остальные экраны */}
            <div className='container-xl px-2 px-sm-3'>
                <Routes>
                    <Route path="/" element={<DevelopmentList/>}/>
                    <Route path="/devs" element={<DevelopmentList/>}/>
                    <Route path="/devs/:dev_id" element={<DevelopmentDetail/>}/>
                    <Route path="/requests" element={<CustomerRequestsTable/>}/>
                    <Route path="/requests/:request_id" element={<RequestDetails/>}/>
                    <Route path="/moderate-devs" element={<ModerateDevsTable/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
