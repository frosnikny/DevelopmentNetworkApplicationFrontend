import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import DevelopmentList from "./components/DevelopmentList/DevelopmentList.tsx";
import DevelopmentDetail from "./components/DevelopmentDetail/DevelopmentDetail.tsx";

function App() {

  return (
    <>
      <NavigationBar />
      <div className='container-xl px-2 px-sm-3'>
        <Routes>
          <Route path="/" element={<DevelopmentList />} />
          <Route path="/courses" element={<DevelopmentList />} />
          <Route path="/courses/:dev_id" element={<DevelopmentDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
