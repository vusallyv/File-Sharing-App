import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/NoPage";
import Files from "./pages/Files";
import File from "./pages/File";
import CreateFile from "./pages/CreateFile";
import React from "react";
import Logout from "./pages/Logout";
import 'bootstrap/dist/css/bootstrap.css';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route path="files" element={<Files />} />
          <Route path="files/:id" element={<File />} />
          <Route path="files/new" element={<CreateFile />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);