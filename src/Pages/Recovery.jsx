import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOTP, generateOTP } from "../redux/RegistrationApiCalls";

export default function Recovery() {
    const { state } = useLocation();
    const { username } = state;
    const [OTP, setOTP] = useState("");
    const navigate = useNavigate();

    const handleOtpChange = (newValue) => {
        setOTP(newValue);
    };

    useEffect(() => {
        generateOTP(username).then((OTP) => {
            if (OTP) return toast.success("OTP has been send to your email!");
            return toast.error("Problem while generating OTP!");
        });
    }, [username]);

    async function handleVerify(e) {
        e.preventDefault();
        try {
            let { status } = await verifyOTP({ username, code: OTP });
            if (status === 201) {
                toast.success("Verify Successfully!");
                navigate("/reset", { state: { username } });
            }
        } catch (error) {
            return toast.error("Wront OTP! Check email again!");
        }
    }

    // handler of resend OTP
    function resendOTP() {
        let sentPromise = generateOTP(username);

        toast.promise(sentPromise, {
            loading: "Sending...",
            success: <b>OTP has been send to your email!</b>,
            error: <b>Could not Send it!</b>,
        });

        sentPromise.then((OTP) => {
        });
    }

    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>

            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email.</p>
                            </div>
                        </div>

                        <div>
                            <form action="" method="post">
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                        <MuiOtpInput
                                            value={OTP}
                                            length={4}
                                            onChange={handleOtpChange}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-5">
                                        <div>
                                            <button
                                                type="button"
                                                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#1f2937] border-none text-white text-sm shadow-sm cursor-pointer"
                                                onClick={handleVerify}
                                                disabled={
                                                    OTP.toString().length === 4 ? false : true
                                                }>
                                                Verify Account
                                            </button>
                                        </div>

                                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't recieve code?</p>{" "}
                                            <span
                                                className="flex flex-row items-center text-blue-600 cursor-pointer"
                                                onClick={resendOTP}>
                                                Resend
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
