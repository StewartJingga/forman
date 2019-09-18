# Forman

Forman is a Javascript library for client-side validation with React app.

## Installation

```bash
npm install @stewartjingga/forman
```

## Usage

```jsx
import React from 'react';
import Forman, { RULES } from '@stewartjingga/forman';

const FORM_RULES = {
    email: [RULES.required],
    password: [RULES.required],
};

export class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }
    
    render() {
        const { email, password } = this.state;

        return (
            <Forman
                value={this.state}
                rules={FORM_RULES}
                render={(fields, form) => (
                    <form>
                        <div>
                            <label>Email</label>
                            <input
                                type="string"
                                value={email}
                                onChange={({ target }) => this.setState({ email: target.value })}
                            />
                            <br />
                            {
                                fields.email.dirty && fields.email.errors && (
                                    <span>{fields.email.errors[0]}</span>
                                )
                            }
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={({ target }) => this.setState({ password: target.value })}
                            />
                            <br />
                            {
                                fields.password.dirty && fields.password.errors && (
                                    <span>{fields.password.errors[0]}</span>
                                )
                            }
                        </div>
                        <button disabled={!form.valid}>Login</button>
                    </form>
                )}
            />
        );
    }
}

export default LoginForm;
```

## Custom Rules
```jsx
import { RULES, createRule } from '@stewartjingga/forman';

const startsWithExcalamationMark = createRule(
    value => value[0] === '!', // Return true if value is valid
    'Field has to start with exclamation mark', // Error message
)

const FORM_RULES = {
    email: [RULES.required],
    password: [RULES.required, startsWithExcalamationMark],
};
```


## License
[MIT](https://choosealicense.com/licenses/mit/)