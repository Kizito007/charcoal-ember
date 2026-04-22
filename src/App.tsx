import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FindEateries from "./pages/FindEateries";
import RecipeChat from "./pages/RecipeChat";
import Explore from "./pages/Explore";
import CuisinePage from "./pages/CuisinePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background text-foreground font-body">
        <div className="atmosphere" aria-hidden />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<FindEateries />} />
          <Route path="/recipes" element={<RecipeChat />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/cuisine/:name" element={<CuisinePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
