import React, { Component } from 'react';


class Badges extends Component {
    state = {
        'badges': {
            'danger': '<span class="badge badge-danger">Danger</span>',
            'warning': '<span class="badge badge-warning">Warning</span>',
            'success': '<span class="badge badge-success">Success</span>',
            'info': '<span class="badge badge-info">Info</span>',
            'light': '<span class="badge badge-light">Light</span>',
            'dark': '<span class="badge badge-dark">Dark</span>',
        },
    }
    render(badge) {
        return (
            this.state.badges[badge]
        );
    }
}

export default Badges