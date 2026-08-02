// import Analytics from "./Pages/Analytics"
// import Management from "./Pages/Management"
// import MyCourses from "./Pages/MyCourses"
// import Settings from "./Pages/Settings"
// import Sidebar from "./Pages/Sidebar"

// function App() {

//   return (
//     <>
//      {/* <Analytics/> */}
//      {/* <Management/> */}
//      {/* <MyCourses/> */}
//      <Sidebar/>
//         {/* <Settings/> */}
//     </>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./Pages/Sidebar";

import MyCourses from "./Pages/MyCourses";
import Settings from "./Pages/Settings";
import Management from "./Pages/Management";
import Dashboard from "./Pages/Dashboard";
import AiQuizGenerator from "./Pages/AiQuizGenerator";

function App() {
  return (
    <BrowserRouter>

      <Sidebar />

      <div style={{ marginLeft: "280px", padding: "20px" }}>
        <Routes>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MyCourses" element={<MyCourses />} />
          <Route path="/AiQuizGenerator" element={<AiQuizGenerator />} />
          <Route path="/Management" element={<Management />} />
          <Route path="/Settings" element={<Settings />} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
