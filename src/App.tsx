import { useState } from "react";
import { AppRouter } from "./AppRouter";
import { SideBar } from "./components/SideBar";
import { TopNav } from "./components/TopNav";

function App() {
  const [loading] = useState(false);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex bg-silver-100 dark:bg-black-300 font-jakarta">
          <SideBar />

          <div className="flex-1 h-screen">
            <TopNav />
            <AppRouter />
          </div>
        </div>
      )}
    </>
  )
}

export default App;
