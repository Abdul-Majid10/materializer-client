import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import ImageUploader from "../Components/ImageUploader";
import MediaGallery from "../Components/MediaGallery";
import Header from "../Components/Header";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import "../Styles/media.css";
import FooterBar from "../Components/FooterBar";
import { Link } from "react-router-dom";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

function Media(props) {
    const [activePage, setActivePage] = useState(props.page ?? "gallery");
    const [menuHolder, setMenuHolder] = useState("");
    const [mediaClass, setMeidaClass] = useState("");

    const pages = {
        gallery: <MediaGallery />,
        uploader: <ImageUploader />,
    };

    useEffect(() => {
        const element = document.querySelectorAll(`.media-menu .side-menu#${activePage}-page`);
        if (element.length) element[0].classList.add("active");

        return () => {
            const element = document.querySelectorAll(`.media-menu .side-menu#${activePage}-page`);
            if (element.length) element[0].classList.remove("active");
        };
    }, [activePage]);

    useEffect(() => {
        setActivePage(props.page ?? "gallery");
    }, [props.page]);

    const handleClassChange = () => {
        setMenuHolder( menuHolder === "menu-holder-slide" ? "" : "menu-holder-slide");
        setMeidaClass( mediaClass === "media-menu-sc" ? "" : "media-menu-sc");
    }

    return (
        <>
            <Header activePage="media"></Header>
            <div className={"media-menu " + mediaClass}>
                <div className="p-3 w-[100px] mid:w-[100%] bg-[#1f2937] shadow-lg">
                    <ul className="space-y-2">
                        <li>
                            <Link to={"/media"}>
                                <div className="side-menu" id="gallery-page" title="Media Gallery">
                                    <CollectionsRoundedIcon />
                                    <div className="icons-title">Gallery</div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/media/uploader"}>
                                <div
                                    className="side-menu"
                                    id="uploader-page"
                                    title="Image Uploader">
                                    <CloudUploadRoundedIcon />
                                    <div className="icons-title">Uploader</div>
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
            <div className="media-body body-fheader-fsidebar">
                <Toaster position="top-center" reverseOrder={false}></Toaster>
                <div>{pages[activePage]}</div>
            </div>
            <FooterBar />
        </>
    );
}

export default Media;
