import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from 'uuid';
import classes from '../assets/Tailwind/classes';
import { Autocomplete, Button, Chip, CircularProgress, TextField } from '@mui/material';
import { renderToString } from 'react-dom/server'
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useFetch } from "../Hooks/useFetch.hook";
import { update } from "../redux/PageApiCalls";
import { useSelector } from "react-redux";
import { getProjectByQueryParam } from "../redux/ComponentApiCalls";

import "../Styles/PageDesigner.css";

function PageDesigner() {
  const { pageId } = useParams();
  const [url, setUrl] = useState(null);
  const { project } = useSelector((state) => state.project);

  const { response, loading, error } = useFetch(
    'user',
    `/pages/get/${pageId}`,
    "get"
  );

  const { response: mediares } = useFetch('user', `/media/all`, "get", {
    project,
  });

  const { response: componentResponse } = useFetch('public', `/admin/component/all`, "get");


  const navigate = useNavigate();

  const columnsFromBackend = {
    components: {
      name: "Components",
      items: []
    },
    'designer': {
      name: "Designer",
      items: []
    },
    delete: {
      name: "Delete",
      items: []
    }
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  const [selectedItem, setSelectedItem] = useState([]);
  const [ancherLink, setAncherLink] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [editMode, setEditMode] = useState(false)

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      if (sourceColumn.name === 'Designer' && destColumn.name === "Delete") {
        sourceItems.splice(source.index, 1);
      } else if (destColumn.name === "Designer") {
        const removed = Object.assign({}, sourceItems[source.index]);
        console.log(removed);
        removed.id = uuidv4();
        destItems.splice(destination.index, 0, removed);
      }
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };


  useEffect(() => {
    setSelectedItem(selectedItem);
  }, [selectedItem, setSelectedItem]);

  useEffect(() => {

    if (response?.pageContent) {
      const convertedArray = response?.pageContent.map(obj => {
        return {
          id: obj._id,
          name: obj.componentName,
          content: parse(obj.componentContent)
        };
      });

      setColumns(prevColumns => ({
        ...prevColumns,
        designer: {
          ...prevColumns.designer,
          items: convertedArray
        }
      }));
    }

    if (response?.url) {
      setUrl(response.url);
    }

  }, [response]);

  const updateComponentColumn = (componentResponse) => {
    if(componentResponse){
      const convertedComponentArray = componentResponse?.map(obj => {
        return {
          id: obj._id,
          name: obj.name,
          content: parse(obj.content),
          section: obj.section
        };
      });
  
      setColumns(prevColumns => ({
        ...prevColumns,
        components: {
          ...prevColumns.components,
          items: convertedComponentArray
        }
      }));
    }else if(componentResponse === []){
      setColumns(prevColumns => ({
        ...prevColumns,
        components: {
          items: []
        }
      }));
    }
  }

  useEffect(() => {

    if (componentResponse) {
      updateComponentColumn(componentResponse)
    }

  }, [componentResponse])


  function handleDelete(e, item) {
    const newSelectedItem = selectedItem.filter(selected => selected !== item);
    setSelectedItem(newSelectedItem);
    e.target.classList.remove(item);
  }

  const handleEdit = (event) => {
    if (!editMode) return;

    const element = document.querySelector('[materializer-hl-focus="highlight-border-focus"]');
    element?.removeAttribute('materializer-hl-focus');

    const divElement = event.currentTarget;
    divElement.contentEditable = true;
    divElement.focus();

    const elementBlock = event.target;

    if (elementBlock?.nodeName === 'A') {
      setAncherLink(elementBlock.getAttribute('href'));
    } else {
      setAncherLink(null);
    }

    if (elementBlock?.nodeName === 'IMG') {
      setImageSource(elementBlock.getAttribute('src'));
    } else {
      setImageSource(null);
    }
    event.target.setAttribute("materializer-hl-focus", 'highlight-border-focus');

    const classList = Array.from(elementBlock.classList);
    setSelectedItem(classList)
  };



  const handleSave = async () => {
    const element = document.querySelector('[materializer-hl-focus="highlight-border-focus"]');
    element?.removeAttribute('materializer-hl-focus');
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
      element.contentEditable = false;
    });

    let updatedContent = [];

    const elements = document.querySelectorAll('[columnname="Designer"] #editableContent');

    elements.forEach((data, index) => {
      columns.designer.items[index].content = parse(data.innerHTML)
    })

    columns.designer.items.forEach((data) => {
      updatedContent.push({
        componentName: data.name,
        componentContent: renderToString(data.content)
      });
    });


    if (pageId && updatedContent) {
      let updated = await update(pageId, { url, pageContent: updatedContent })
      if (updated) {
        return true;
      }
    }
  };

  async function handleSaveAndContinue(isContinue = true) {
    let isSaved = await handleSave();

    if (isSaved && !isContinue) {
      navigate('/frontend/pages');
    }
  }

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
  const handleSearch = async(e) => {
    let value = e.target.value;
    if(value){
      let res = await getProjectByQueryParam(value);
      updateComponentColumn(res);
    }else{
      updateComponentColumn(componentResponse);
    }
  };

  if (loading)
    return (
      <>
        <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
          <CircularProgress />
        </h1>
      </>
    );
  if (error)
    return (
      <>
        <div className="flex  min-h-[60vh] justify-center items-center text-xl text-red-500">
          <p className="ml-error h-[84vh] flex justify-center items-center">
            <i>Network Error - No Page Found against Id : {pageId}   . </i>
          </p>
        </div>
      </>
    );
  return response ? (
    <div className="mx-5">
      <div className="page-header-block">
        <h3 className="page-heading">
          Page: {response?.pageName}
        </h3>
        <div>
          <TextField
            className="text-field"
            id="url"
            size="small"
            name="url"
            label="Page End URL"
            variant="standard"
            value={url ?? ""}
            sx={{ width: 400 }}
            placeholder="pagename/others... i.e category/apple"
            onChange={(e) => handleChangePageUrl(e)}
          />
        </div>
        <div>
          <Button variant="contained" onClick={handleSaveAndContinue}
            style={{
              borderRadius: 0,
              backgroundColor: "#1f2937"
            }}
          >
            Save and Continue
          </Button>
          <Button variant="contained" onClick={() => handleSaveAndContinue(false)}
            style={{
              borderRadius: 0,
              marginLeft: 5,
              backgroundColor: "#1f2937"
            }}
          >
            Save and Exist
          </Button>
        </div>
      </div>
      <div className="mb-2">
        <TextField
          className="text-field"
          id="componentQuery"
          size="small"
          name="url"
          label="Search Component"
          sx={{ width: "18%" }}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="flex justify-center gap-4" style={{ height: "100%" }}>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                columnname={column.name}
                className={column.name === 'Components' ? "overflow-scroll  h-[80vh] basis-[18%]" : column.name === 'Designer' ? "overflow-scroll  h-[80vh] basis-[60%]" : "h-[80vh]"}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div className={column.name === 'Delete' ? "m-2" : "w-full m-2"}>
                  <Droppable isDropDisabled={column.name === 'Components' ? true : false} droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          // className={column.name === 'Components' ? 'w-[250]' : 'w-full'}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: column.name === 'Components' ? "100%" : column.name === 'Delete' ? 25 : "100%",
                            minHeight: column.name === 'Delete' ? "77vh" : "81vh"
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: column.name === 'Components' ? 3 : 0,
                                        margin: column.name === 'Components' ? "0 0 8px 0" : 0,
                                        minHeight: "30px",
                                        // backgroundColor: snapshot.isDragging
                                        //   ? "#263B4A"
                                        //   : "#456C86",
                                        backgroundColor: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <div className={column.name === 'Components' ? "dropable-preview" : ""} >
                                        <div className="dropable-desiner"
                                          id="editableContent"
                                          contentEditable={column.name === 'Designer' && editMode ? 'true' : 'false'}
                                          suppressContentEditableWarning={true}
                                          onClick={column.name === 'Designer' ? handleEdit : () => { }}
                                        >{item.content} </div>
                                      </div>
                                      <div className="preview-lable">{column.name === 'Components' ? item.section : ""}</div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
        <div className="basis-[15%]">
          <Button variant="contained" onClick={() => {
            // const element = document.getElementById('highlight-border-focus');
            const element = document.querySelector('[materializer-hl-focus="highlight-border-focus"]');
            element?.removeAttribute('materializer-hl-focus');
            setEditMode(!editMode)
            setSelectedItem([]);
          }
          }
            style={{
              borderRadius: 0,
              marginTop: 25,
              marginBottom: 5,
              backgroundColor: editMode ? '#2ECC71' : "#1f2937"
            }}
          >
            {editMode ? "Stop Edit Mode" : "Start Edit Mode"}
          </Button>
          <Autocomplete
            className="my-5"
            multiple
            freeSolo
            options={classes}
            value={selectedItem}
            onChange={(event, newValue) => {
              setSelectedItem(newValue);
              let e = document.querySelector('[materializer-hl-focus="highlight-border-focus"]');;
              e.classList = '';
              newValue.forEach(className => {
                e.classList.add(className);
              });
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  onDelete={(e) => handleDelete(e, option)}
                  className={classes.chip}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={params => (
              <TextField
                {...params}
                label="Classes"
                sx={{ width: 200 }}
                variant="outlined"
                size="small"
                placeholder="Enter classes"
              />
            )}
          />

          {imageSource !== null && mediares ?
            <Autocomplete
              id="img_src"
              freeSolo
              options={mediares}
              size="small"
              renderOption={(props, option) => (<div {...props}>
                <img src={option.image.secureUrl} alt={option.title} style={{ height: '30px', marginRight: '10px' }} />
                {option.title}
              </div>)
              }
              getOptionLabel={(option) => option.title ? option.title : option}
              onChange={(e, value) => {
                if (typeof (value) === 'string') {
                  setImageSource(value)
                  let event = document.querySelector('[materializer-hl-focus="highlight-border-focus"]');
                  event.setAttribute('src', value)
                } else {
                  setImageSource(value?.image?.secureUrl)
                  let event = document.querySelector('[materializer-hl-focus="highlight-border-focus"]');
                  event.setAttribute('src', value?.image.secureUrl)
                }
              }}
              renderInput={(params) => <TextField helperText="please wait 5 to 10 sec after change the option. it may tale more time to load image due to large image size." {...params} label="Image Source (src)" />}
            /> : null}
          {ancherLink !== null ? <TextField
            className="my-5"
            label="Ancher Link (href)"
            id="link_href"
            value={ancherLink}
            size="small"
            type="text"
            onChange={(e) => {
              setAncherLink(e.target.value)
              let event = document.querySelector('[materializer-hl-focus="highlight-border-focus"]');
              event.setAttribute('href', e.target.value)
            }}
          /> : null}
        </div>
      </div>
    </div>
  ) : (null)
}

export default PageDesigner;
