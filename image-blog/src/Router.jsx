import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";

/**
 * Application router
 */
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
