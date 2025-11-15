import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import WriteArticle from "./Pages/AI Tasks/WriteArticle";
import GenerateImages from "./Pages/AI Tasks/GenerateImages";
import RemoveBackground from "./Pages/AI Tasks/RemoveBackground";
import RemoveObject from "./Pages/AI Tasks/RemoveObject";
import ReviewResume from "./Pages/AI Tasks/ReviewResume";
import BlogTitles from "./Pages/AI Tasks/BlogTitles";
import Community from "./Pages/AI Tasks/Community";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
