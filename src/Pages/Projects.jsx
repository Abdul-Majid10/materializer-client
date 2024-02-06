import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import FooterBar from "../Components/FooterBar";
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ProjectConfigs from "../Components/ProjectConfigs";
import ProjectTab from "./ProjectTab";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import "../Styles/backendAndFrontendDesigner.css";

function Projects(props) {
    const [activePage, setActivePage] = useState(props.page ?? "projects");
    const [menuHolder, setMenuHolder] = useState("");
    const [projectClass, setProjectClass] = useState("");

    const pages = {
        projects: <ProjectTab/>,
        configs: <ProjectConfigs />,
    };

    useEffect(() => {

        let newactivePage = activePage;
        const element = document.querySelectorAll(`.project-menu .side-menu#${newactivePage}-page`);
        if (element.length) element[0].classList.add("active");

        return () => {

            const element = document.querySelectorAll(
                `.project-menu .side-menu#${newactivePage}-page`
            );
            if (element.length) element[0].classList.remove("active");
        };
    }, [activePage]);

    useEffect(() => {
        setActivePage(props.page ?? "projects");
    }, [props.page]);

    const handleClassChange = () => {
        setMenuHolder( menuHolder === "menu-holder-slide" ? "" : "menu-holder-slide");
        setProjectClass( projectClass === "project-menu-sc" ? "" : "project-menu-sc");
    }
    return (
        <>
            <Header activePage="projects"></Header>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className={"project-menu " + projectClass}>
                <div className="p-3 w-[100px] mid:w-[100%] bg-[#1f2937] shadow-lg">
                    <ul className="space-y-2">
                        <li>
                            <Link to={"/projects"}>
                                <div
                                    className="side-menu"
                                    id="projects-page"
                                    title="projects">
                                    <FolderZipIcon />
                                    <div className="icons-title">Projects</div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/project/configs"}>
                                <div
                                    className="side-menu "
                                    id="configs-page"
                                    title="configs">
                                    <ToggleOnIcon />
                                    <div className="icons-title">Configs</div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={"menu-holder " + menuHolder}>
                    <div onClick={handleClassChange}>
                        <KeyboardArrowRightRoundedIcon className="text-white"/>
                    </div>
                </div>
            </div>
            <div className="backend-body body-fheader-fsidebar">
                <div className="flex flex-col min-h-[85.7vh]">{pages[activePage]}</div>
            </div>
            <FooterBar />
        </>
    );
}

export default Projects;
