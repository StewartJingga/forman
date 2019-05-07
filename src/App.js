import React, { PureComponent } from 'react';

import Forman, { RULES } from './lib';

const FORM_RULES = {
    first_name: [RULES.required],
    last_name: null,
    email: [RULES.required],
};

export class App extends PureComponent {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
        };
    }

    onInputChange(key) {
        return (e) => {
            this.setState({ [key]: e.target.value });
        };
    }

    renderErrors(errors) {
        if (errors && errors.length > 0) {
            return errors.map((d, i) => (
                <div key={i}>{d}</div>
            ))
        }

        return null;
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Forman render={({ first_name, last_name, email }) =>
                    <React.Fragment>
                        <input type="text"
                            value={this.state.first_name}
                            onChange={this.onInputChange('first_name')}
                        />
                        {this.renderErrors(first_name.errors)}
                        <br />

                        <input type="text"
                            value={this.state.last_name}
                            onChange={this.onInputChange('last_name')}
                        />
                        {this.renderErrors(last_name.errors)}
                        <br />

                        <input type="text"
                            value={this.state.email}
                            onChange={this.onInputChange('email')}
                        />
                        {this.renderErrors(email.errors)}
                    </React.Fragment>
                    }
                    value={this.state}
                    rules={FORM_RULES}
                />
            </form>
        );
    }
}

export default App;
