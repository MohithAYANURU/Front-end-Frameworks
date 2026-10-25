import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import WatchlistPage from "./pages/WatchlistPage";
import HeaderComponent from "./components/HeaderComp";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import { AppProvider } from "./context/AppContext";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-layout">
          <HeaderComponent
            searchQuery={searchQuery}
            onChange={setSearchQuery}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  initialMovies={SAMPLE_MOVIES}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
