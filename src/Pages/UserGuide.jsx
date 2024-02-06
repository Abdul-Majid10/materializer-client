import React from "react";
import Header from "../Components/Header";
import FooterBar from "../Components/FooterBar";
import "../Styles/userGuide.css";

function UserGuide() {
    return (
        <>
            <Header activePage="user-guide" />
            <div className="body-fheader page-header-block">
                <h1 className="ml sm:ml-[20px]">User Guide</h1>
            </div>
            <div className="ug-container">
                <div className="inner-container">
                    <div>
                        <div className="ug-list-box">
                            <div className="ug-list-num"><div>1</div></div>
                            <h2 className="text-2xl md:text-3xl leading-tight font-bold">Login or Signup</h2>
                        </div>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            The first step to get started on our website is to create your own profile. If you already have an account, simply click on the "Login" button. Enter your credentials, including your unique username and password, and proceed to login. Once your credentials are verified, you will be successfully logged in to your account, gaining access to all the features and functionalities our website offers.
                        </p>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            If you don't have an account yet, no worries! Click on the "Signup" button to begin the registration process. Fill in the required details, such as your chosen unique username, email address, and a strong password for added security. Make sure to choose a password that includes a combination of uppercase and lowercase letters, numbers, and special characters to enhance the strength of your account.
                        </p>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            After providing the necessary information, click on the "Signup" button to complete the process. You will then receive a verification email to the provided email address. Follow the instructions in the email to verify your account and activate it.
                        </p>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            Once your account is successfully created and verified, you can proceed to log in by entering your credentials in the designated fields. Upon successful login, you will gain access to all the features and benefits our website has to offer.
                        </p>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            Remember to keep your login credentials secure and refrain from sharing them with anyone else. In case you encounter any issues during the login or signup process, don't hesitate to reach out to our support team for assistance. We're here to help you have the best user experience on our website.
                        </p>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>1</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Profile Updation (OPTIONAL)</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    On the Profile page, you have the option to update your profile information. If you would like to make changes to your profile, such as your profile picture, first name, last name, email address, or address, follow these simple steps:
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>Go to the Profile page after logging into your account</li>
                                    <li>Look for the relevant sections, such as Profile Picture, Personal Information, or Contact Details.</li>
                                    <li>Make the desired changes to your profile data.</li>
                                    <li>Review the changes to ensure accuracy.</li>
                                    <li>Click on the "Update" button to save your updated profile information.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>2</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Delete Account (OPTIONAL)</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    To delete your account and remove all user data, follow these simple steps:
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>Visit the Profile page after logging into your account.</li>
                                    <li>Locate the "Delete Account" button.</li>
                                    <li>Click on the "Delete Account" button.</li>
                                    <li>Confirm your decision when prompted.</li>
                                    <li>Wait for the account deletion process to complete.</li>
                                    <li>Receive a confirmation message stating that your account has been successfully deleted, </li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>3</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Password Recovery (OPTIONAL)</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you forget your password, follow these simple steps to recover it:
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the login page, Enter your username or email and locate the "Forgot Password" link</li>
                                    <li>Click on the "Forgot Password" link.</li>
                                    <li>Check your email inbox associated with your account. You will receive an email containing a One-Time Password (OTP).</li>
                                    <li>Access your email and find the email with the OTP. Note that it may take a few moments for the email to arrive, so please be patient.</li>
                                    <li>On the password recovery page, enter the OTP you received in the designated field.</li>
                                    <li>After entering the OTP, click on the "Verify" or "Submit" button.</li>
                                    <li>If the OTP verification is successful, you will be directed to a page where you can reset your password.</li>
                                    <li>Create a new password for your account. Make sure to choose a strong and secure password, combining uppercase and lowercase letters, numbers, and special characters.</li>
                                    <li>Once you have set your new password, click on the "Reset" or "Save" button to confirm the password reset.</li>
                                    <li>You will receive a confirmation message indicating that your password has been successfully reset.</li>
                                    <li>Now, you can use your newly reset password to log in to your account again.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="inner-container">
                    <div>
                        <div className="ug-list-box">
                            <div className="ug-list-num"><div>2</div></div>
                            <h2 className="text-2xl md:text-3xl leading-tight font-bold">Create Project</h2>
                        </div>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            Click on create project button then enter unique name of that project then just click on creat button.
                            For use that project just click on activate button.
                        </p>
                    </div>
                </div>
                <div className="inner-container">
                    <div>
                        <div className="ug-list-box">
                            <div className="ug-list-num"><div>3</div></div>
                            <h2 className="text-2xl md:text-3xl leading-tight font-bold">Design Backend Apis</h2>
                        </div>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            You can create multiple collections for your project and adjust the Apis routes of that collections..
                        </p>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>1</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Create Collections</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to Create New Collection.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the backend designer page, Click on create new button.</li>
                                    <li>Enter Unique Collection name and click next.</li>
                                    <li>Add Multiple attribute (name, types)</li>
                                    <li>Click on create button.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>2</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Preview Collection</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to preview your collection.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the backend designer page, Click on projects tab..</li>
                                    <li>Click on preview button right next to your collection lable.</li>
                                    <li>Colection details will open in next page</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>3</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Adjust Apis Routes</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    You can design Rest full Apis Routes and there protection.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>Click on Apis tab.</li>
                                    <li>From Select option , please select your collection.</li>
                                    <li>Chnage Api Routes accordngly and click on update button.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner-container">
                    <div>
                        <div className="ug-list-box">
                            <div className="ug-list-num"><div>4</div></div>
                            <h2 className="text-2xl md:text-3xl leading-tight font-bold">Design Frontend Server</h2>
                        </div>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            You Design Multiple page and style then using tailwind classes and also change the Link of Buttons and ancherLink and Src of Images. 
                        </p>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>1</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Create New Page</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to Create New Page.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the frontend designer page, Click on create new button.</li>
                                    <li>Enter Unique Page name and and his end url.</li>
                                    <li>Click on create button.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>2</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Design The page</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    By using components you can esily design pages.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On designer page. Drag Component from component column to Designer column.</li>
                                    <li>Click on save button.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>3</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Preview Page</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to see the preview of your designed page..
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the page listing page, click on Preview button just next to page lable.</li>
                                    <li>Page will open on next tab.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>4</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Edit Page</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to Edit your designed page.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the page listing page, click on Edit button just next to page lable.</li>
                                    <li>Page will open on Designer page.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner-container">
                    <div>
                        <div className="ug-list-box">
                            <div className="ug-list-num"><div>5</div></div>
                            <h2 className="text-2xl md:text-3xl leading-tight font-bold">Export Project</h2>
                        </div>
                        <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            You can Export project with 3 options.
                        </p>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>1</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Only Export Frontend</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to only export frontend project.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the project page, Click on download icon.</li>
                                    <li>Just check the frontend option.</li>
                                    <li>Click on download button.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>2</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Only Export Backend</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to only export backend project.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the project page, Click on download icon.</li>
                                    <li>Just check the backend option.</li>
                                    <li>Click on download button.</li>
                                </ol>
                            </div>
                        </div>
                        <div className="inner-container md:text-lg leading-loose col-gary ml-[40px] text-justify">
                            <div>
                                <div className="ug-list-box">
                                    <div className="ug-list-num"><div>3</div></div>
                                    <h2 className="text-2xl md:text-3xl leading-tight font-bold">Only Export full Stack Project(client + server)</h2>
                                </div>
                                <p className="mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    If you want to only export full stack project.
                                </p>
                                <ol className="list-decimal list-inside mb-6 md:text-lg leading-loose col-gary ml-[40px] text-justify">
                                    <li>On the project page, Click on download icon.</li>
                                    <li>Check both the options client and server.</li>
                                    <li>Click on download button.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <FooterBar />
        </>
    );
}

export default UserGuide;