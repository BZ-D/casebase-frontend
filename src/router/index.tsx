import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "../views/Intro";
import Home from "../views/Home";
import FileDetail from '../views/FileDetail';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/search" element={<Home />} />
        <Route path="/fileDetail/:docId" element={<FileDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;