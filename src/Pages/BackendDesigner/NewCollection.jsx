import React from "react";
import CollectionDynamicForm from "../../Components/CollectionDynamicForm";

function NewCollection() {
    return (
        <>
            <div className="page-header-block">
                <h1 className="page-heading">New Collections</h1>
            </div>
            <div className="mb-20">
                <CollectionDynamicForm />
            </div>    
        </>
    );
}

export default NewCollection;
