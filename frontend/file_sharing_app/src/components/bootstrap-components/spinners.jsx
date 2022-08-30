import React, { Component } from 'react';

class Spinners extends Component {
    state = {
        'spinners': {
            'danger': <div className="spinner-grow text-danger"></div>,
            'warning': <div className="spinner-grow text-warning"></div>,
            'success': <div className="spinner-grow text-success"></div>,
            'info': <div className="spinner-grow text-info"></div>,
            'dark': <div className="spinner-grow text-dark"></div>,
            'light': <div className="spinner-grow text-light"></div>,
            'primary': <div className="spinner-grow text-primary"></div>,
            'secondary': <div className="spinner-grow text-secondary"></div>,
            'muted': <div className="spinner-grow text-muted"></div>
        },
    }
    render() {
        return (
            this.state.spinners[this.props.spinner]
        );
    }
}

export default Spinners