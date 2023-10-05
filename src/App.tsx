import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { TopNav } from "./components/TopNav";
import { Home } from "./pages/Home";
import { useFetchBoards } from "./hooks/useFetchBoards";
import { Loader } from "./components/common/Loader";

function App() {
  const [sideBarVisible, setSidebarVisible] = useState(true);
  const { loading } = useFetchBoards()

  return (
    <BrowserRouter>
      <div className="grid grid-cols-10 font-jakarta">
        {loading ? (
          <Loader color="#828FA3" />
        ) : (
          <>
            <SideBar
              sideBarVisible={sideBarVisible}
              setSidebarVisible={setSidebarVisible}
            />
            <div className={`
              sm-mobile:col-span-10
              ${sideBarVisible ? 'tablet:col-span-7' : 'col-span-10'}
              ${sideBarVisible ? 'laptop:col-span-8' : 'col-span-10'}
              relative`}
            >
              <TopNav sideBarVisible={sideBarVisible}/>

              <Routes>
                <Route path="/" element={ <Navigate to="/boards" /> }/>
                <Route path="/boards" element={<Home />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App;
