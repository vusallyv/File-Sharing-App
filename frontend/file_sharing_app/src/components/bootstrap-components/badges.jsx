import React, { Component } from 'react';

class Badges extends Component {
    state = {
        'badges': {
            'danger': <button type={this.props.type} className="badge badge-danger">{this.props.text}</button>,
            'warning': <button type={this.props.type} className="badge badge-warning">{this.props.text}</button>,
            'success': <button type={this.props.type} className="badge badge-success">{this.props.text}</button>,
            'info': <button type={this.props.type} className="badge badge-info">{this.props.text}</button>,
            'light': <button type={this.props.type} className="badge badge-light">{this.props.text}</button>,
            'dark': <button type={this.props.type} className="badge badge-dark">{this.props.text}</button>,
            'primary': <button type={this.props.type} className="badge badge-primary">{this.props.text}</button>,
        },
    }
    render() {
        return (
            this.state.badges[this.props.badge]
        );
    }
}

export default Badges