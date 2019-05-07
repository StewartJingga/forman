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
};

export class Forman extends React.PureComponent<Props, State> {
    static defaultProps = {
        rules: null,
    };

    static getDerivedStateFromProps(nextProps: Props, prevState: any) {
        const { value, rules } = nextProps;
        const { fields, previousValue } = prevState;

        const newFields = Object.keys(value).reduce((res, key) => {
            res[key] = createField(key, fields, value, rules, previousValue);

            return res;
        }, {});
        
        return {
            fields: newFields,
            previousValue: value,
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            fields: {},
            previousValue: {},
        };
    }

    render() {
        return this.props.render(this.state.fields);
    }
}

export default Forman;
