import React from "react";
import { useGlobalContext } from "./Context";

const Stories = () => {
    const { isLoading } = useGlobalContext();
    if (isLoading) {
        return (
            <>
                <h1>Loading......</h1>
            </>
        );
    }
    return (
        <>
            <h2>ululuu</h2>
        </>
    )
};

export default Stories;

