import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function CollectionListHeading(props) {
    const navigate = useNavigate();
    return (
        <>
            <div className="page-header-block">
                <h3 className="page-heading">
                    Collections of Project <span className="text-grey-800">{props?.project}</span>
                </h3>
                <Button variant="contained" onClick={() => navigate("/backend/collection/new")} 
                style={{
                    borderRadius: 0,
                    backgroundColor: "#1f2937"
                }}
                >
                    Create New Collection
                </Button>
            </div>
        </>
    )
}

export default CollectionListHeading