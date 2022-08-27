import React, { Component } from 'react'


export default function (ComposedComponent) {
    console.log('ComposedComponent', ComposedComponent);
    class RequireAuth extends Component {
        
        state = {
            isAuthenticated: true
        }

        checkAuth = () => {
            const access_token = localStorage.getItem('access_token');
            if (access_token) {
                console.log('Authenticated');
                this.setState({ isAuthenticated: true });
            }
        }

        // Push to login route if not authenticated on mount
        componentWillMount() {
            this.checkAuth();
            if (!this.state.isAuthenticated) {
                console.log('Not authenticated');
                // Use your router to redirect them to login page
            }
        }

        // Otherwise render the original component
        render() {
            console.log('this.state.isAuthenticated', this.state.isAuthenticated);
            return <ComposedComponent {...this.props} />
        }

    }

    return RequireAuth

}