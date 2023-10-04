import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { TopNav } from "./components/TopNav";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-silver-100 dark:bg-black-300 font-jakarta">
        <SideBar />

        <div className="flex-1 h-screen">
          <TopNav />

          <Routes>
            <Route path="/" element={ <Navigate to="/boards" /> }/>
            <Route path="/boards" element={<Home />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
