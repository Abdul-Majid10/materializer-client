import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import { useMediaQuery } from '@mui/material';
import ImageListItem from "@mui/material/ImageListItem";
import { useFetch } from "../Hooks/useFetch.hook";
import { CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import { deleteMediaById } from "../redux/MediaApiCalls";
import { useSelector } from "react-redux";
import MediaGalleryHeading from "./MediaGalleryHeading";


function MediaGallery() {
    const { project } = useSelector((state) => state.project);
    const [isMobile, setIsMobile] = useState(false);
    const { response, loading, error, fetchData } = useFetch('user', `/media/all`, "get", {
        project,
    });
    const [deleted, setDeleted] = useState("");
    const matchesMin = useMediaQuery('(max-width: 600px)');
    const matchesMid = useMediaQuery('(min-width: 601px) and (max-width: 900px)');
    const matchesLg = useMediaQuery('(min-width: 901px) and (max-width: 1200px)');
    const matchesXlg = useMediaQuery('(min-width: 1201px)');

    function getCols() {
        let cols = 4;
        if (matchesMin) cols = 1
        if (matchesMid) cols = 2
        if (matchesLg) cols = 3
        if (matchesXlg) cols = 4

        return cols;
    }

    const handleCopy = (e) => {
        navigator.clipboard.writeText(e.currentTarget.dataset.secure_url);
        toast.success("Image url copied!");
    };

    const handleDelete = (e) => {
        let monogo_id = e.currentTarget.dataset.id;
        let res = deleteMediaById(monogo_id);
        res.then(() => setDeleted(monogo_id));
    };

    useEffect(() => {
        if (deleted) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [deleted, project]);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    if (loading)
        return (
            <>
                <MediaGalleryHeading />
                <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                    <CircularProgress />
                </h1>
            </>
        );
    if (error)
        return (
            <>
                <MediaGalleryHeading />
                <h1 className="flex min-h-[60vh] justify-center items-center text-xl text-red-500">
                    {error}
                </h1>
            </>
        );
    return response.length ? (
        <>
            <MediaGalleryHeading />
            <div className="ml-img-data">
                <ImageList variant="masonry" cols={getCols()} gap={8}>
                    {response.map((item) => (
                        <ImageListItem key={item._id}>
                            <div className={`ml-img-info ${isMobile ? ' always' : ''}`}>
                                <div className="imgbox">
                                    <img
                                        className="shadow-md"
                                        src={`${item.image.publicId}`}
                                        srcSet={`${item.image.secureUrl}`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="btn">
                                    <span
                                        data-secure_url={item.image.secureUrl}
                                        onClick={handleCopy}
                                        className="bg-white rounded-full p-2 drop-shadow-lg">
                                        <ContentCopyIcon className="copy-icon" />
                                    </span>
                                    <span
                                        data-id={item._id}
                                        onClick={handleDelete}
                                        className="bg-white rounded-full p-2 drop-shadow-lg">
                                        <DeleteIcon color="error" />
                                    </span>
                                </div>
                                <div className="title">{item.title}</div>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>{" "}
        </>
    ) : (
        <div className="h-[84vh]">
           <MediaGalleryHeading />
            <p className="ml-error h-[84vh] flex justify-center items-center">
                <i>User have no Image Data</i> {".·´¯`(>▂<)´¯`·."}
            </p>
        </div>
    );
}

export default MediaGallery;
