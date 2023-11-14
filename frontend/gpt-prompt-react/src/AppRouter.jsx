import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import DynamicTemplateList from "./components/template_storage/TopLevelComponent";
import TemplateEditor from "./components/template_edit/TemplateEditor"

// <Route path="/" element={<Home />} />

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DynamicTemplateList />} />
        <Route path="/about" element={<About />} />
        <Route path="/editor" element={<TemplateEditor />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default AppRouter;
