import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "../views/Intro";
import Home from "../views/Home";
import FileDetail from '../views/FileDetail';
import Workbench from '../views/Workbench';
import Cockpit from '../views/Workbench/Cockpit';
import FileManage from '../views/Workbench/FileManage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/search" element={<Home />} />
        <Route path="/fileDetail/:docId" element={<FileDetail />} />
        <Route path="/workbench" element={<Workbench />}>
          <Route path="cockpit" element={<Cockpit />} />
          <Route path="file" element={<FileManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;