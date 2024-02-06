import React from 'react'
import parse from "html-react-parser";
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../Hooks/useFetch.hook';
import { CircularProgress } from '@mui/material';

function PreviewPage() {
	const { pageId } = useParams();
	const { response, loading, error } = useFetch(
		'user',
		`/pages/get/${pageId}`,
		"get"
	);
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
						<i>Network Error - No Page Found against Id : {pageId}   . </i> <Link className='text-blue-500' to={'/frontend/pages'}>Go Back</Link>
					</p>
				</div>
			</>
		);
	return response ? (
		<>
			{response?.pageContent.length === 0 ? (<div className="flex  min-h-[60vh] justify-center items-center text-xl text-red-500">
				<p className="ml-error h-[84vh] flex justify-center items-center">
					You have no content added on this Page : {response?.pageName}
				</p>
			</div>) : null}
			{response?.pageContent.map((component) => (<>{parse(component?.componentContent)}</>))}
		</>
	) : (
		<div className="h-[84vh]">
			<p className="ml-error h-[84vh] flex justify-center items-center">
				<i>No Page Found against Id : {pageId}</i> {".·´¯`(>▂<)´¯`·."} <Link to={'/frontend/pages'}>Go Back</Link>
			</p>
		</div>
	);
}

export default PreviewPage
