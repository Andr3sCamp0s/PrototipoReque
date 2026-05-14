import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./caso1-login-registro/Login";
import Register from "./caso1-login-registro/Register";
import ReservarCita from "./caso2-reservar-cita/ReservarCita";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservar-cita" element={<ReservarCita />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;