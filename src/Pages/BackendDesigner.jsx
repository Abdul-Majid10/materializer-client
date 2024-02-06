import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import LinkIcon from "@mui/icons-material/Link";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import NewCollection from "./BackendDesigner/NewCollection";
import Apis from "./BackendDesigner/Apis";
import FooterBar from "../Components/FooterBar";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CollectionList from "../Components/CollectionList";
import CollectionDetails from "../Components/CollectionDetails";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import "../Styles/backendAndFrontendDesigner.css";

function BackendDesigner(props) {
    const [activePage, setActivePage] = useState(props.page ?? "collections");
    const [menuHolder, setMenuHolder] = useState("");
    const [backendClass, setBackendClass] = useState("");

    const pages = {
        collections: <CollectionList />,
        newcollection: <NewCollection />,
        collectionDetails: <CollectionDetails />,
        apis: <Apis />,
    };

    useEffect(() => {
        let newactivePage = activePage === "collectionDetails" ? "collections" : activePage;
        const element = document.querySelectorAll(`.backend-menu .side-menu#${newactivePage}-page`);
        if (element.length) element[0].classList.add("active");

        return () => {
            const element = document.querySelectorAll(
                `.backend-menu .side-menu#${newactivePage}-page`
            );
            if (element.length) element[0].classList.remove("active");
        };
    }, [activePage]);

    useEffect(() => {
        setActivePage(props.page ?? "collections");
    }, [props.page]);

    const handleClassChange = () => {
        setMenuHolder( menuHolder === "menu-holder-slide" ? "" : "menu-holder-slide");
        setBackendClass( backendClass === "backend-menu-sc" ? "" : "backend-menu-sc");
    }

    return (
        <>
            <Header activePage="backend"></Header>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className={"backend-menu "+ backendClass}>
                <div className="p-3 w-[100px] mid:w-[100%] bg-[#1f2937] shadow-lg">
                    <ul className="space-y-2">
                        <li>
                            <Link to={"/backend/collections"}>
                                <div
                                    className="side-menu"
                                    id="collections-page"
                                    title="collections">
                                    <LinkIcon />
                                    <div className="icons-title">Collections</div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/backend/collection/new"}>
                                <div
                                    className="side-menu"
                                    id="newcollection-page"
                                    title="newcollection">
                                    <AddLinkIcon />
                                    <div className="icons-title">Add collection</div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/backend/apis"}>
                                <div className="side-menu" id="apis-page" title="apis">
                                    <ApiRoundedIcon />
                                    <div className="icons-title">APIs</div>
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
            <div className="backend-body body-fheader-fsidebar">
                <div>{pages[activePage]}</div>
            </div>
            <FooterBar />
        </>
    );
}

export default BackendDesigner;
