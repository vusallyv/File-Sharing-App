import React from "react";
import { withRouter } from "react-router";

class File extends React.Component {
    componentDidMount() {
        console.log(this.props);
        const id = this.props.match.params.id;
        this.fetchData(id);
    }

    fetchData = id => {
        // ...
    };

    render() {
        return <div>Yo</div>;
    }
}

export default File;