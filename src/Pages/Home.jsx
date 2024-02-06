import React, { useEffect, useRef } from "react";
import Header from "../Components/Header";
import FooterBar from "../Components/FooterBar";
import "../Styles/home.css";
import CodeOffSharpIcon from "@mui/icons-material/CodeOffSharp";
import NewspaperSharpIcon from "@mui/icons-material/NewspaperSharp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
    const { currentUser } = useSelector((state) => state.user);
    const videoRefs = useRef([]);
    const navigate = useNavigate()

    useEffect(() => {
        const playVideos = () => {
            videoRefs.current.forEach((video) => {
              video.playbackRate = 1.25; // Set playback speed to 1.25x
              video?.play(); // Start playing the video
            });
          };
        
          const handleInteraction = () => {
            document.removeEventListener('click', handleInteraction);
            playVideos();
          };
        
          document.addEventListener('click', handleInteraction);
        
          return () => {
            document.removeEventListener('click', handleInteraction);
          };
    }, []);

    return (
        <>
            <Header activePage="home" />
            <div className="body-fheader home-body">
                <div className="hp-cr-temp">
                    <div className="hp-hading">
                        <h1>Create Low Code MERN Apps in minutes</h1>
                        <h2>
                            Materializer gives you 200+ fully responsive UI components and allows you to create apis visually to get you
                            started. You don't have to be a designer to create attractive templates!
                        </h2>
                    </div>
                    <div className="check-btn">
                        {currentUser?.token ? <button className="demo-btn bg-[#1f2937]" onClick={() => navigate('/projects')}>Get Started</button> : null}
                        {currentUser?.token ? null : <button className="sign-btn" onClick={() => navigate('/register')} >Sign Up</button>}
                    </div>
                    <div className="sp-fream">Supported frameworks</div>
                    <div className="fream">
                        <div className="fream-name">
                            <div>
                                <img
                                    className="h-3"
                                    src="https://shuffle.dev/vendor/shuffle/img/logos/tailwind-css.svg?v=1"
                                    alt=""
                                />
                            </div>
                            Tailwind CSS
                        </div>
                        <img
                            className="hidden md:block h-2 mb-4 mr-6"
                            src="https://shuffle.dev/vendor/shuffle/img/icons/icon-x.svg"
                            alt=""
                        />
                        <div className="fream-name">
                            <div>
                                <img
                                    className="h-3"
                                    src="https://shuffle.dev/vendor/shuffle/img/logos/material-ui.svg?v=1"
                                    alt=""
                                />
                            </div>
                            Material-UI (In future)
                        </div>
                    </div>
                </div>

                <div className="video-temp">
                    <div className="hidden lg:block absolute h-20 w-20 top-0 left-0 -ml-48 mt-12 rounded-xl bg-green-400"></div>
                    <div className="hidden lg:block absolute h-32 w-20 top-0 left-0 -ml-20 mt-24 rounded-xl bg-red-400"></div>
                    <div className="hidden lg:block absolute h-12 w-12 top-0 left-0 -ml-40 mt-40 rounded-bl-[3rem] bg-[#1f2937]"></div>
                    <div className="hidden lg:block absolute h-24 w-20 bottom-[8rem] left-0 -ml-20 mb-31 rounded-xl bg-green-50"></div>
                    <div className="hidden lg:block absolute h-24 w-20 bottom-0 left-0 -ml-20 mb-2 rounded-bl-[6rem] rounded-tr-3xl bg-yellow-400"></div>
                    <div className="hidden lg:block absolute h-12 w-12 top-0 right-0 -mr-40 mt-10 rounded-xl bg-[#1f2937]"></div>
                    <div className="hidden lg:block absolute h-40 w-20 top-0 right-0 -mr-20 mt-10 rounded-xl bg-green-400"></div>
                    <div className="hidden lg:block absolute h-12 w-20 top-0 right-0 -mr-20 mt-56 rounded-b-[3rem] bg-yellow-400"></div>
                    <div className="hidden lg:block absolute h-24 w-20 bottom-[8rem] right-0 -mr-20 mb-31 rounded-bl-xl rounded-tr-[6rem] bg-red-400"></div>
                    <div className="hidden lg:block absolute h-24 w-20 bottom-0 right-0 -mr-20 mb-2 rounded-xl bg-green-50"></div>

                    <div className="sm:px-8 pt-4 sm:pt-9 w-full relative h-[500px]">
                        <video
                            ref={(ref) => (videoRefs.current[0] = ref)}
                            loop
                            autoPlay
                            controls
                            src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684431804/de_v4imq9.mov"
                            className="rounded-xl w-full h-full"></video>
                    </div>
                </div>

                <section className="pb-20 overflow-hidden">
                    <div className="container px-4 mx-auto">
                        <div className=" mb-12 md:mb-20 xl:mb-40 text-center">
                            <h2 className="max-w-3xl mx-auto mb-4 text-5xl md:text-6xl font-bold leading-tight">
                                Build stunning layouts quickly
                            </h2>
                            <p className="max-w-2xl mx-auto md:text-lg text-center leading-loose col-gary">
                                Speed up your workflow in&nbsp;a few simple&nbsp;steps.
                            </p>
                        </div>
                    </div>

                    <div className=" flex flex-wrap items-center mb-16 md:mb-24 xl:mb-64 max-w-3xl xl:max-w-none mx-auto xl:-mx-4">
                        <div className="w-full xl:w-1/2 px-4 flex items-center mb-16 md:mb-24 xl:mb-0">
                            <div className="xl:pr-24">
                                <span className="text-sm font-semibold">Step 1 of 7</span>
                                <h2 className="text-3xl md:text-5xl leading-tight font-bold mt-2 mb-4">
                                    Create Project
                                </h2>
                                <p className="mb-6 md:text-lg leading-loose col-gary">
                                    You can create multiple project with unique with ease and switching between project just require a sigle click to activate project.
                                </p>
                                <ul>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Unlimited Project Creation</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Easy Switching between Projects</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Delete Project</p>
                                    </li>
                                </ul>
                                {currentUser?.token ? <a
                                    className="block md:inline-block py-3 px-6 bg-[#1f2937] hover:bg-blue-700 text-sm text-white text-center font-semibold leading-none rounded-3xl"
                                    href="/projects">
                                    Try Demo
                                </a> : null}
                            </div>
                        </div>
                        <div className="relative flex items-center w-full xl:w-1/2 px-4">
                            <div className="md:hidden xl:block absolute left-0 top-0 -mt-6 md:-mt-12 xl:-mt-20 ml-3 md:ml-4 xl:-ml-12 h-16 w-12 md:h-24 md:w-24 xl:h-48 xl:w-40 bg-green-300 rounded-tl-[3.75rem] rounded-bl-lg rounded-tr-lg"></div>
                            <img
                                className="md:hidden xl:block absolute right-0 xl:left-0 bottom-0 mr-2 md:mr-4 xl:-ml-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-red.svg"
                                alt=""
                            />

                            <div className="hidden md:block xl:hidden absolute right-0 top-0 -mt-4 md:-mt-12 xl:-mt-20 md:mr-6 xl:-mr-12 h-12 w-12 md:h-32 md:w-24 xl:h-48 xl:w-40 bg-brand-green rounded-tr-5xl rounded-br-lg rounded-tl-lg"></div>
                            <img
                                className="hidden md:block xl:hidden transform rotate-90 absolute left-0 xl:left-auto xl:right-0 bottom-0 ml-2 md:ml-4 xl:-mr-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-red.svg"
                                alt=""
                            />

                            <div className="relative px-4 md:px-12 xl:px-0 w-full">
                                <video
                                    ref={(ref) => (videoRefs.current[1] = ref)}
                                    autoPlay
                                    loop
                                    controls
                                    src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684426589/System/1_rrnxd3.mov"
                                    className="rounded-xl w-full">
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-wrap items-center mb-16 md:mb-24 xl:mb-64 max-w-3xl xl:max-w-none mx-auto xl:-mx-4">
                        <div className="w-full xl:w-1/2 px-4 flex items-center mb-16 md:mb-24 xl:mb-0 xl:order-1">
                            <div className="xl:pl-24">
                                <span className="text-sm font-semibold">Step 2 of 7</span>
                                <h2 className="text-3xl md:text-5xl leading-tight font-bold mt-2 mb-4">
                                    Add Env <span className="text-lg">(Config)</span> veriables
                                </h2>
                                <p className="mb-6 md:text-lg leading-loose col-gary">
                                    You can add multiple config variable which you can user in your backend project.
                                    Some Variable names are resoerved. like JWT_SECRET, MONGO_ATLAS_URI, PORT which you can set after export.
                                </p>
                                {currentUser?.token ? <a
                                    className="block md:inline-block py-3 px-6 bg-[#1f2937] hover:bg-blue-700 text-sm text-white text-center font-semibold leading-none rounded-3xl"
                                    href="/project/configs">
                                    Try Demo
                                </a> : null}
                            </div>
                        </div>
                        <div className="relative flex items-center w-full xl:w-1/2 px-4">
                            <div className="absolute right-0 top-0 -mt-6 md:-mt-12 xl:-mt-20 mr-3 md:mr-6 xl:-mr-12 h-16 w-12 md:h-32 md:w-24 xl:h-48 xl:w-40 bg-blue-600 rounded-tr-[3.75rem] rounded-br-lg rounded-tl-lg"></div>
                            <img
                                className="absolute left-0 xl:left-auto xl:right-0 bottom-0 ml-2 md:ml-4 xl:-mr-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-orange.svg"
                                alt=""
                            />
                            <div className="relative px-4 md:px-12 xl:px-0 w-full">
                                <video
                                    ref={(ref) => (videoRefs.current[2] = ref)}
                                    autoPlay
                                    loop
                                    controls
                                    src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684432435/2.2_y8ns6v.mov"
                                    className="rounded-xl w-full">
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-wrap items-center mb-16 md:mb-24 xl:mb-64 max-w-3xl xl:max-w-none mx-auto xl:-mx-4">
                        <div className="w-full xl:w-1/2 px-4 flex items-center mb-16 md:mb-24 xl:mb-0">
                            <div className="xl:pr-24">
                                <span className="text-sm font-semibold">Step 3 of 7</span>
                                <h2 className="text-3xl md:text-5xl leading-tight font-bold mt-2 mb-4">
                                    Create Collection
                                </h2>
                                <p className="mb-6 md:text-lg  leading-loose col-gary">
                                    You can create collection with minutes, Buy just adding collection name its attributes names and select there properties.
                                </p>
                                <ul>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Create Ulimited Collection with unique names</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>View Collection Details</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Delete Collections</p>
                                    </li>
                                </ul>
                                {currentUser?.token ? <a
                                    className="block md:inline-block py-3 px-6 bg-[#1f2937] hover:bg-blue-700 text-sm text-white text-center font-semibold leading-none rounded-3xl"
                                    href="/backend">
                                    Try Demo
                                </a> : null}
                            </div>
                        </div>
                        <div className="relative flex items-center w-full xl:w-1/2 px-4 xl:order-0">
                            <div className="md:hidden xl:block absolute left-0 top-0 -mt-6 md:-mt-12 xl:-mt-20 ml-3 md:ml-4 xl:-ml-12 h-16 w-12 md:h-24 md:w-24 xl:h-48 xl:w-40 bg-red-400 rounded-tl-[3.75rem] rounded-bl-lg rounded-tr-lg"></div>
                            <img
                                className="md:hidden xl:block absolute right-0 xl:left-0 bottom-0 mr-2 md:mr-4 xl:-ml-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-green.svg?v=2"
                                alt=""
                            />

                            <div className="hidden md:block xl:hidden absolute right-0 top-0 -mt-4 md:-mt-12 xl:-mt-20 md:mr-6 xl:-mr-12 h-12 w-12 md:h-32 md:w-24 xl:h-48 xl:w-40 rounded-tr-5xl rounded-br-lg rounded-tl-lg"></div>
                            <img
                                className="hidden md:block xl:hidden transform rotate-90 absolute left-0 xl:left-auto xl:right-0 bottom-0 ml-2 md:ml-4 xl:-mr-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-green.svg?v=2"
                                alt=""
                            />

                            <div className="relative px-4 md:px-12 xl:px-0 w-full">
                                <video
                                    ref={(ref) => (videoRefs.current[3] = ref)}
                                    autoPlay
                                    loop
                                    controls
                                    src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684432402/3.2_hjpoy3.mov"
                                    className="rounded-xl w-full">
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-wrap items-center mb-16 md:mb-24 xl:mb-64 max-w-3xl xl:max-w-none mx-auto xl:-mx-4">
                        <div className="w-full xl:w-1/2 px-4 flex items-center mb-16 md:mb-24 xl:mb-0 xl:order-1">
                            <div className="xl:pl-24">
                                <span className="text-sm font-semibold">Step 4 of 7</span>
                                <h2 className="text-3xl md:text-5xl leading-tight font-bold  mt-2 mb-4">
                                    Restful Apis routes
                                </h2>
                                <p className="mb-6 md:text-lg  leading-loose col-gary">
                                    After collection creation restful apis created, You can modify its routes according to your requirement and also you can exclude it from export
                                </p>
                                <ul>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Change Routes end urls</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Change Routes Method GET,POST, ...</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Change Routes types Private/Public</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Exclude Routes from export</p>
                                    </li>
                                </ul>
                                {currentUser?.token ?
                                    <a
                                        className="block md:inline-block py-3 px-6 bg-[#1f2937] hover:bg-blue-700 text-sm text-white text-center font-semibold leading-none rounded-3xl"
                                        href="/backend/apis">
                                        Try Demo
                                    </a> : null}
                            </div>
                        </div>
                        <div className="relative flex items-center w-full xl:w-1/2 px-4 xl:order-0">
                            <div className="absolute right-0 top-0 -mt-6 md:-mt-12 xl:-mt-20 mr-3 md:mr-6 xl:-mr-12 h-16 w-12 md:h-32 md:w-24 xl:h-48 xl:w-40 bg-yellow-400 rounded-tr-[3.75rem] rounded-br-lg rounded-tl-lg"></div>
                            <img
                                className="absolute left-0 xl:left-auto xl:right-0 bottom-0 ml-2 md:ml-4 xl:-mr-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-blue.svg"
                                alt=""
                            />
                            <div className="relative px-4 md:px-12 xl:px-0 w-full">
                                <video
                                    ref={(ref) => (videoRefs.current[4] = ref)}
                                    autoPlay
                                    loop
                                    controls
                                    src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684432671/4.2_rjqxhx.mov"
                                    className="rounded-xl w-full">
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-wrap items-center mb-16 md:mb-24 xl:mb-64 max-w-3xl xl:max-w-none mx-auto xl:-mx-4">
                        <div className="w-full xl:w-1/2 px-4 flex items-center mb-16 md:mb-24 xl:mb-0">
                            <div className="xl:pr-24">
                                <span className="text-sm font-semibold">Step 5 of 7</span>
                                <h2 className="text-3xl md:text-5xl leading-tight font-bold mt-2 mb-4">
                                    Media Uploader
                                </h2>
                                <p className="mb-6 md:text-lg  leading-loose col-gary">
                                    User can Upload multiple image Image, and View in Grid mode and after that used that images on page designing.
                                </p>
                                <ul>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Upload Multiples</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Copy Live URL</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Delete Images</p>
                                    </li>

                                </ul>
                                {currentUser?.token ?
                                    <a
                                        className="block md:inline-block py-3 px-6 bg-[#1f2937] hover:bg-blue-700 text-sm text-white text-center font-semibold leading-none rounded-3xl"
                                        href="/media">
                                        Try Demo
                                    </a> : null}
                            </div>
                        </div>
                        <div className="relative flex items-center w-full xl:w-1/2 px-4 xl:order-0">
                            <div className="md:hidden xl:block absolute left-0 top-0 -mt-6 md:-mt-12 xl:-mt-20 ml-3 md:ml-4 xl:-ml-12 h-16 w-12 md:h-24 md:w-24 xl:h-48 xl:w-40 bg-red-400 rounded-tl-[3.75rem] rounded-bl-lg rounded-tr-lg"></div>
                            <img
                                className="md:hidden xl:block absolute right-0 xl:left-0 bottom-0 mr-2 md:mr-4 xl:-ml-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-green.svg?v=2"
                                alt=""
                            />

                            <div className="hidden md:block xl:hidden absolute right-0 top-0 -mt-4 md:-mt-12 xl:-mt-20 md:mr-6 xl:-mr-12 h-12 w-12 md:h-32 md:w-24 xl:h-48 xl:w-40 rounded-tr-5xl rounded-br-lg rounded-tl-lg"></div>
                            <img
                                className="hidden md:block xl:hidden transform rotate-90 absolute left-0 xl:left-auto xl:right-0 bottom-0 ml-2 md:ml-4 xl:-mr-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-green.svg?v=2"
                                alt=""
                            />

                            <div className="relative px-4 md:px-12 xl:px-0 w-full">
                                <video
                                    ref={(ref) => (videoRefs.current[5] = ref)}
                                    autoPlay
                                    loop
                                    controls
                                    src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684432930/5.2_atjnyy.mov"
                                    className="rounded-xl w-full">
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center mb-16 md:mb-24 xl:mb-64 max-w-3xl xl:max-w-none mx-auto xl:-mx-4">
                        <div className="w-full xl:w-1/2 px-4 flex items-center mb-16 md:mb-24 xl:mb-0 xl:order-1">
                            <div className="xl:pl-24">
                                <span className="text-sm font-semibold">Step 6 of 7</span>
                                <h2 className="text-3xl md:text-5xl leading-tight font-bold  mt-2 mb-4">
                                    Page Designer
                                </h2>
                                <p className="mb-6 md:text-lg  leading-loose col-gary">
                                    Create and Design pages with ui components with easily drag and drop functionality.
                                </p>
                                <ul>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Drag & Drop Compoemnts</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Apply or Remove Styling</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Change Image and Ancher links</p>
                                    </li>

                                </ul>
                                {currentUser?.token ?
                                    <a
                                        className="block md:inline-block py-3 px-6 bg-[#1f2937] hover:bg-blue-700 text-sm text-white text-center font-semibold leading-none rounded-3xl"
                                        href="/frontend/page/new">
                                        Try Demo
                                    </a> : null}
                            </div>
                        </div>
                        <div className="relative flex items-center w-full xl:w-1/2 px-4 xl:order-0">
                            <div className="absolute right-0 top-0 -mt-6 md:-mt-12 xl:-mt-20 mr-3 md:mr-6 xl:-mr-12 h-16 w-12 md:h-32 md:w-24 xl:h-48 xl:w-40 bg-yellow-400 rounded-tr-[3.75rem] rounded-br-lg rounded-tl-lg"></div>
                            <img
                                className="absolute left-0 xl:left-auto xl:right-0 bottom-0 ml-2 md:ml-4 xl:-mr-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-blue.svg"
                                alt=""
                            />
                            <div className="relative px-4 md:px-12 xl:px-0 w-full">
                                <video
                                    ref={(ref) => (videoRefs.current[6] = ref)}
                                    autoPlay
                                    loop
                                    controls
                                    src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684431804/de_v4imq9.mov"
                                    className="rounded-xl w-full">
                                </video>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center md:mb-8 xl:mb-24 max-w-3xl xl:max-w-none mx-auto xl:-mx-4">
                        <div className="w-full xl:w-1/2 px-4 flex items-center mb-16 md:mb-24 xl:mb-0">
                            <div className="xl:pr-24">
                                <span className="text-sm font-semibold">Step 7 of 7</span>
                                <h2 className="text-3xl md:text-5xl leading-tight font-bold mt-2 mb-4">
                                    Download source code
                                </h2>
                                <p className="mb-6 md:text-lg leading-loose col-gary">
                                    User can Download MERN Project with all codebase files and project is in working state.
                                </p>
                                <ul>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Download only Backend Project</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Download only Frontend Project</p>
                                    </li>
                                    <li className="flex mb-3">
                                        <div className="mr-2">
                                            <div className="w-6 h-6 flex items-center justify-center rounded-full text-[#1f2937] border-2 border-[#1f2937]">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <p>Download full MERN project <span className="text-lg">(client + server)</span></p>
                                    </li>
                                </ul>
                                {currentUser?.token ? <a
                                    className="block md:inline-block py-3 px-6 bg-[#1f2937] hover:bg-blue-700 text-sm text-white text-center font-semibold leading-none rounded-3xl"
                                    href="/projects">
                                    Try Demo
                                </a> : null}
                            </div>
                        </div>
                        <div className="relative flex items-center w-full xl:w-1/2 px-4">
                            <div className="md:hidden xl:block absolute left-0 top-0 -mt-6 md:-mt-12 xl:-mt-20 ml-3 md:ml-4 xl:-ml-12 h-16 w-12 md:h-24 md:w-24 xl:h-48 xl:w-40 bg-green-300 rounded-tl-[3.75rem] rounded-bl-lg rounded-tr-lg"></div>
                            <img
                                className="md:hidden xl:block absolute right-0 xl:left-0 bottom-0 mr-2 md:mr-4 xl:-ml-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-red.svg"
                                alt=""
                            />

                            <div className="hidden md:block xl:hidden absolute right-0 top-0 -mt-4 md:-mt-12 xl:-mt-20 md:mr-6 xl:-mr-12 h-12 w-12 md:h-32 md:w-24 xl:h-48 xl:w-40 bg-brand-green rounded-tr-5xl rounded-br-lg rounded-tl-lg"></div>
                            <img
                                className="hidden md:block xl:hidden transform rotate-90 absolute left-0 xl:left-auto xl:right-0 bottom-0 ml-2 md:ml-4 xl:-mr-12 -mb-4 md:-mb-8 xl:-mb-20 w-12 h-12 md:w-24 md:h-24 xl:w-56 xl:h-56"
                                src="https://shuffle.dev/vendor/shuffle/img/elements/dots-full-red.svg"
                                alt=""
                            />

                            <div className="relative px-4 md:px-12 xl:px-0 w-full">
                                <video
                                    ref={(ref) => (videoRefs.current[7] = ref)}
                                    autoPlay
                                    loop
                                    controls
                                    src="https://res.cloudinary.com/dzagwkseq/video/upload/v1684433074/6.3_xsmh4p.mov"
                                    className="rounded-xl w-full">
                                </video>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="build-app-temp">
                    <div className="bg-white px-10 py-8 rounded-md">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="mb-[20px]">TOP FEATURES</div>
                            <h1 className="text-5xl md:text-6xl text-center mb-9 font-bold  leading-tight">
                                Build websites fast.
                            </h1>
                            <h2 className="max-w-prose mx-auto mb-10 md:text-lg text-center  leading-loose col-gary">
                                Building customizable, and performant content API has never been
                                easier.
                            </h2>
                        </div>
                        <div className="open-section">
                            <div className="sections">
                                <div>
                                    <NewspaperSharpIcon fontSize="large" />
                                </div>
                                <div>
                                    <h2>Frontend Designer <span className="text-lg">(React)</span></h2>
                                    <p className="max-w-prose mx-auto mb-10 md:text-lg leading-loose col-gary">
                                        Design Stunning templated using compoments and Consumen in you projects
                                    </p>
                                </div>
                            </div>
                            <div className="sections">
                                <div>
                                    <CodeOffSharpIcon fontSize="large" />
                                </div>
                                <div>
                                    <h2>backend Designer <span className="text-lg">(RESTful Apis)</span></h2>
                                    <p className="max-w-prose mx-auto mb-10 md:text-lg leading-loose col-gary">
                                        Consume the API from any client (React, Vue, Angular),
                                        mobile apps or even IoT devices, using REST.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container px-4 mx-auto mb-20">
                    <div className="max-w-3xl mx-auto">
                        <h2 className=" text-5xl md:text-6xl text-center mb-6 font-bold  leading-tight">
                            200+ of excellent UI&nbsp;Components And Api Desiner
                        </h2>
                        <p className="max-w-prose mx-auto mb-10 md:text-lg text-center  leading-loose col-gary">
                            Drag-and-drop UI components into the Desiner and modify it by using tailwind classes and also you can change some editable attributes like href or src
                        </p>
                    </div>
                </section>
            </div>
            <section className="relative">
                <div className="w-full top-0 left-0 bg-[#1f2937]  py-[5rem]">
                    <div className="relative container px-4 mx-auto">
                        <div className=" max-w-4xl mx-auto mb-12 lg:mb-10 text-center">
                            <h2 className="text-5xl md:text-6xl mb-5 text-white font-bold leading-tight">
                                The easiest way to create beautiful templates and apis
                            </h2>
                        </div>
                    </div>
                    <div className="hp-sub">FREE</div>
                </div>
            </section>
            <FooterBar />
        </>
    );
}

export default Home;
