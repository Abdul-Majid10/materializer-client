import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import all pages */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import PageNotFound from "./Pages/PageNotFound";
import Recovery from "./Pages/Recovery";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Reset from "./Pages/Reset";
import Media from "./Pages/Media";
import Projects from "./Pages/Projects";
import UserGuide from "./Pages/UserGuide";
import FrontendDesigner from "./Pages/FrontendDesigner";
import PreviewPage from "./Pages/PreviewPage";
import NewComponentForm from "./Pages/NewComponentForm";
import BackendDesigner from "./Pages/BackendDesigner";


/** auth middleware */
import { AuthorizeUser, NonAuthorizeUser, ProtectRoute } from "./middleware/auth";

/** root routes */
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/user-guide",
        element: <UserGuide />,
    },
    {
        path: "/register",
        element: (
            <NonAuthorizeUser>
                <SignUp />
            </NonAuthorizeUser>
        ),
    },
    {
        path: "/login",
        element: (
            <NonAuthorizeUser>
                <Login />
            </NonAuthorizeUser>
        ),
    },
    {
        path: "/profile",
        element: (
            <AuthorizeUser>
                <Profile />
            </AuthorizeUser>
        ),
    },
    {
        path: "/projects",
        element: (
            <AuthorizeUser>
                <Projects page="projects" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/project/configs",
        element: (
            <AuthorizeUser>
                <Projects page="configs" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/project/export",
        element: (
            <AuthorizeUser>
                <Projects page="export" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/backend",
        element: (
            <AuthorizeUser>
                <BackendDesigner />
            </AuthorizeUser>
        ),
    },
    {
        path: "/backend/database",
        element: (
            <AuthorizeUser>
                <BackendDesigner page="database" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/backend/collection/new",
        element: (
            <AuthorizeUser>
                <BackendDesigner page="newcollection" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/backend/collections",
        element: (
            <AuthorizeUser>
                <BackendDesigner page="collections" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/backend/collection/:collectionId",
        element: (
            <AuthorizeUser>
                <BackendDesigner page="collectionDetails" />
            </AuthorizeUser>
        ),
    },
    {
        path: "backend/apis",
        element: (
            <AuthorizeUser>
                <BackendDesigner page="apis" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/frontend",
        element: (
            <AuthorizeUser>
                <FrontendDesigner />
            </AuthorizeUser>
        ),
    },
    {
        path: "/frontend/pages",
        element: (
            <AuthorizeUser>
                <FrontendDesigner page="pages" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/frontend/page/new",
        element: (
            <AuthorizeUser>
                <FrontendDesigner page="newpage" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/frontend/page/edit/:pageId",
        element: (
            <AuthorizeUser>
                <FrontendDesigner page="editpage" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/frontend/page/preview/:pageId",
        element: (
            <AuthorizeUser>
                <PreviewPage />
            </AuthorizeUser>
        ),
    },
    {
        path: "/frontend/components",
        element: (
            <AuthorizeUser>
                <FrontendDesigner page="components" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/frontend/component/new",
        element: (
            <AuthorizeUser>
                <FrontendDesigner page="newcomponent" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/media",
        element: (
            <AuthorizeUser>
                <Media />
            </AuthorizeUser>
        ),
    },
    {
        path: "/media/gallery",
        element: (
            <AuthorizeUser>
                <Media page="gallery" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/media/uploader",
        element: (
            <AuthorizeUser>
                <Media page="uploader" />
            </AuthorizeUser>
        ),
    },
    {
        path: "/recovery",
        element: (
            <NonAuthorizeUser>
                <Recovery />
            </NonAuthorizeUser>
        ),
    },
    {
        path: "/reset",
        element: (
            <ProtectRoute>
                <Reset />
            </ProtectRoute>
        ),
    },
    {
        path: "/component/new/3s6sv76sd$svdyt",
        element: <NewComponentForm />,
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    );
}

export default App;
