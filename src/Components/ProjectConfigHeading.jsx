import React from 'react'
import { Link } from 'react-router-dom'

function ProjectConfigHeading(props) {
    return (<>
        <div className="page-header-block">
            <h1 className="page-heading">ENV Configs of Project {props?.project} </h1>
        </div>
        <p className="text-[12px] ml-[22px] col-gary -mt-3 mb-10">
            If you want to change configs of other project then activate other project first.{" "}
            <Link to={"/projects"}><span className="font-semibold underline hover:no-underline">click here</span></Link>{" "}
        </p></>
    )
}

export default ProjectConfigHeading
