import React from "react";
import { useParams } from "react-router-dom";
import FileComponent from "../components/files/singleFile";
import FileAccessTable from "../components/files/file-access-table";
import FileGiveAccess from "../components/files/file-give-access";

const File = () => {
    const { id } = useParams();

    return (
        <React.Fragment>
            <FileComponent id={id} />
            <FileAccessTable id={id} />
            <FileGiveAccess id={id} />
        </React.Fragment>
    );

};

export default File;