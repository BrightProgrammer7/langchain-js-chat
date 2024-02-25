import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import IcsEvent from "./pages/IcsEvent";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/event" element={<IcsEvent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export function Home() {
  const navigate = useNavigate();

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <div className="flex max-w-full flex-1 flex-col">
        <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
          <div className="flex-1 overflow-hidden dark:bg-gray-800">
            <div className="flex  justify-center items-center">
              <a rel="noopener" href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a rel="noopener" href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <div className="bg-blue-700 flex-box h-24 w-full lg:px-8 text-center z-100">
              <div className="fixed-top flex-box justify-between w-full lg:px-48 px-10 py-2 text-slate-500 text-center">
                <div className="lg:flex-box">
                  <div className="flex flex-col h-fit items-center">
                    <div
                      onClick={() => navigate("/")}
                      className="
                         text-white font-semibold
                    "
                    >
                      Home
                    </div>

                    <div
                      onClick={() => navigate("/chat")}
                      className=" text-white font-semibold"
                    >
                      Chat                    </div>
                    <div
                      onClick={() => navigate("/event")}
                      className=" text-white font-semibold"
                    >
                      Event
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
