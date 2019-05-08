// @flow

import * as React from 'react';

import { createField } from './create-field';

type Props = {
    value: Object,
    rules: Object,
    render: Function,
};

type State = {
    fields: Object,
    previousValue: Object,
    form: Object,
};

export class Forman extends React.PureComponent<Props, State> {
    static defaultProps = {
        rules: null,
    };

    static getDerivedStateFromProps(nextProps: Props, prevState: any) {
        const { value, rules } = nextProps;
        const { fields, previousValue } = prevState;

        let formIsValid = true;
        const newFields = Object.keys(value).reduce((res, key) => {
            const field = createField(key, fields, value, rules, previousValue);

            if (formIsValid && !field.valid) {
                formIsValid = false;
            }

            res[key] = field;

            return res;
        }, {});
        
        return {
            fields: newFields,
            previousValue: value,
            form: { valid: formIsValid },
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            fields: {},
            previousValue: {},
            form: {},
        };
    }

    render() {
        const { fields, form } = this.state;
        return this.props.render(fields, form);
    }
}

export default Forman;
