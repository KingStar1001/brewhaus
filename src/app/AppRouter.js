import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BeersPage from "../pages/beers/BeersPage";
import BeerDetail from "../pages/beers/BeerDetail";
import ErrorPage from "../pages/ErrorPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/beers" />} />
        <Route exact path="/beers" element={<BeersPage />} />
        <Route exact path="/beers/:id" element={<BeerDetail />} />
        <Route exact path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/beers" />} />
      </Routes>
    </BrowserRouter>
  );
}
