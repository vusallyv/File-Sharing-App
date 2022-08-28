import React from "react";
import { useParams } from "react-router-dom";
import FileComponent from "../components/file";
import FileAccessTable from "../components/file-access-table";
import FileGiveAccess from "../components/file-give-access";

const Files = () => {
    const { id } = useParams();
    return (
        <React.Fragment>
            <FileComponent id={id} />
            <FileAccessTable id={id} />
            <FileGiveAccess id={id} />
        </React.Fragment>
    );

};

export default Files;