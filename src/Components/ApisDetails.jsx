import React, { useEffect, useState } from 'react'
import { useFetch } from "../Hooks/useFetch.hook";
import { CircularProgress } from '@mui/material';
import ApiUpdateForm from './ApiUpdateForm';

function ApisDetails(props) {

    const [collectionId, setCollectionId] = useState(props.collectionId)

    const { response, loading, error } = useFetch(
        'user',
        `/collection/get/${collectionId}`,
        "get"
    );

    useEffect(() => {
        setCollectionId(props.collectionId)
    }, [props.collectionId])


    if (loading)
        return (
            <h1 className="text-2xl font-bold flex min-h-[60vh] justify-center items-center">
                <CircularProgress />
            </h1>
        );
    if (error)
        return (
            <h1 className="flex min-h-[60vh] justify-center items-center text-xl text-red-500">
                {error}
            </h1>
        );
    return (
        <>
        <div className='api-form-wrapper'>
            <div className="project-form min-w-[800px]">
                <div className="c-project gap-0">
                    <h3>
                        RestFul API routes for <span>{response?.collectionName}</span>
                    </h3>
                    <div className='api-collection-forms'>
                        {response ? response?.apis.map((api, index) => (
                            <ApiUpdateForm key={api.apiId} apiId={api.apiId} collectionName={response?.collectionName} />
                        )) : null}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ApisDetails