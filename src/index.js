import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/styles/index.css";
import App from "./components/App";
import ArticlePage from "./components/ArticlePage";
import MainPage from "./components/MainPage";
import ErrorComponent from "./components/ErrorComponent";
import AuthPage from "./components/AuthPage";
import AuthContextProvider from "./context/AuthContextProvider";

import reportWebVitals from "./reportWebVitals";
import PostArticle from "./components/PostArticle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/article/new-post",
        element: <PostArticle />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/article/:id/edit",
        element: <PostArticle update={true} />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/article/:id",
        element: <ArticlePage />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/admin",
        element: <AuthPage />,
        errorElement: <ErrorComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
