import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHoteles from "./pages/AdminHoteles";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/hoteles" element={<AdminHoteles />} />
      </Routes>
    </BrowserRouter>
  );
}
