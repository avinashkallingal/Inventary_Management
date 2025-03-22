import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AdminRoute from "./Router/admin/AdminRoute"
import UserRoute from "./Router/User/UserRoute"



import './App.css'



function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/admin/*" element={<AdminRoute />}/> */}
          <Route path="/*" element={<UserRoute />} />
          
          
          
       
        </Routes>
      </Router>
    </>
  )
}


export default App

