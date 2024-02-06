import React, { useState } from "react";
import { Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { create } from "../redux/PageApiCalls";

function CreateNewPage() {
  const [pageName, setPageName] = useState(null);
  const [url, setUrl] = useState(null);
  const [pageNameError, setPageNameError] = useState(false);
  const [pageNameErrorMessage, setPageNameErrorMessage] = useState("");
  const { project } = useSelector((state) => state.project);

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!pageNameError && pageName) {
      let page = await create({ project, pageName , url});
      if (page) {
        navigate(`/frontend/page/edit/${page._id}`)
      }
    } else {
      toast.error("Please enter a valid unique collection name");
    }
  };

  const handlePageNameChange = (e) => {
    let value = e.target.value.trim(); // Remove leading/trailing spaces
    const regex = /^[a-zA-Z][a-zA-Z0-9_-]*$/; // Only allow letters, number, underscore and hyphen

    if (value === "" || regex.test(value)) {
      value = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
      setPageName(value);
      setPageNameErrorMessage("");
      setPageNameError(false); // Update state
    } else {
      setPageNameError(true);
      setPageNameErrorMessage("Page name Must contain only alphabets letters, number, underscore and hyphen \n The first characters must be alphabets");
      setPageName(value);
    }
  };

  const handleChangePageUrl = (e) => {
    let value = e.target.value.trim(); // Remove leading/trailing spaces
    const regex = /^(\/|[a-zA-Z])[a-zA-Z0-9_/-]*$/; // Only allow letters, numbers, underscore, hyphen, and forward slash
  
    if (value === "") {
      setUrl("");
    } else if (regex.test(value)) {
      if (!value.startsWith("/")) {
        value = "/" + value;
      }
      setUrl(value.toLowerCase());
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="page-header-block">
        <h3 className="page-heading">
          New Pages
        </h3>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="collection-form min-w-[600px]">
        <div className="c-page">
          <h3>Create New Page</h3>
          <div className="text-field-box">
            <TextField
              className="text-field"
              id="pageName"
              name="pageName"
              label="Page Name"
              variant="outlined"
              error={pageNameError}
              helperText={pageNameErrorMessage}
              value={pageName ?? ""}
              required
              onChange={(e) => handlePageNameChange(e)}
            />
            <TextField
              className="text-field"
              id="url"
              name="url"
              label="Page End URL"
              variant="outlined"
              value={url ?? ""}
              placeholder="pagename/others... i.e category/apple"
              onChange={(e) => handleChangePageUrl(e)}
            />
          </div>
          <div className="center-buttons">
            <Button type="submit" variant="contained" onClick={() => handleCreate()}
              style={{
                borderRadius: 0,
                backgroundColor: "#1f2937"
              }}
            >
              Create Page
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateNewPage;
