import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import WebStoriesIcon from '@mui/icons-material/WebStories';
import FooterBar from "../Components/FooterBar";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import PreviewPage from "./PreviewPage";
import PageDesigner from "./PageDesigner";
import PageList from "../Components/PageList";
import CreateNewPage from "./CreateNewPage";
import "../Styles/backendAndFrontendDesigner.css";

function FrontendDesigner(props) {
    const [activePage, setActivePage] = useState(props.page ?? "pages");
    const [menuHolder, setMenuHolder] = useState("");
    const [frontendClass, setFrontendClass] = useState("");

    const pages = {
        pages: <PageList />,
        newpage: <CreateNewPage />,
        previewpage: <PreviewPage />,
        editpage: <PageDesigner />,
    };

    useEffect(() => {
        let newactivePage = activePage === "previewpage" || activePage === "editpage" ? "newpage" : activePage;
        const element = document.querySelectorAll(`.frontend-menu .side-menu#${newactivePage}-page`);
        if (element.length) element[0].classList.add("active");

        return () => {
            const element = document.querySelectorAll(
                `.frontend-menu .side-menu#${newactivePage}-page`
            );
            if (element.length) element[0].classList.remove("active");
        };
    }, [activePage]);

    useEffect(() => {
        setActivePage(props.page ?? "pages");
    }, [props.page]);

    const handleClassChange = () => {
        setMenuHolder( menuHolder === "menu-holder-slide" ? "" : "menu-holder-slide");
        setFrontendClass( frontendClass === "frontend-menu-sc" ? "" : "frontend-menu-sc");
    }

    return (
        <>
            <Header activePage="frontend"></Header>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className={"frontend-menu "+ frontendClass}>
                <div className="p-3 w-[100px] mid:w-[100%] bg-[#1f2937] shadow-lg">
                    <ul className="space-y-2">
                        <li>
                            <Link to={"/frontend/pages"}>
                                <div
                                    className="side-menu"
                                    id="pages-page"
                                    title="pages">
                                    <WebStoriesIcon />
                                    <div className="icons-title">Pages</div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/frontend/page/new"}>
                                <div
                                    className="side-menu"
                                    id="newpage-page"
                                    title="newpage">
                                    <ViewQuiltIcon />
                                    <div className="icons-title">Design New Page</div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={"menu-holder "+ menuHolder}>
                    <div onClick={handleClassChange}>
                        <KeyboardArrowRightRoundedIcon className="text-white"/>
                    </div>
                </div>
            </div>
            <div className="frontend-body body-fheader-fsidebar">
                <div>{pages[activePage]}</div>
            </div>
            <FooterBar />
        </>
    );
}

export default FrontendDesigner;
