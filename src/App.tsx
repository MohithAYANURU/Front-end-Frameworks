import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import { getTheme, setTheme } from "./utils/storage";

function App() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<HomePage initialMovies={SAMPLE_MOVIES} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
