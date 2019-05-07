import React from 'react';
import PropTypes from 'prop-types';

import { validateValue } from './validations';

export class Forman extends React.PureComponent {
    static getDerivedStateFromProps(nextProps, prevState) {
        const { value, rules } = nextProps;
        const { fields, previousValue } = prevState;

        const newFields = Object.keys(value).reduce((res, key) => {
            const isNewField = fields[key] === undefined || fields[key] === null;
            const hasChanges = value[key] !== previousValue[key];

            // Define dirty state
            let dirty;
            if (isNewField) dirty = false;
            else dirty = hasChanges;

            // Find errors and validity
            let errors;
            let valid;
            if (isNewField || hasChanges) {
                errors = validateValue(value[key], rules[key]);
                valid = errors === null || errors.length === 0;
            } else {
                ({ errors, valid } = fields[key]);
            }

            // Set key value
            res[key] = { dirty, errors, valid };

            return res;
        }, {});
        
        return {
            fields: newFields,
            previousValue: value,
        };
    }

    constructor(props) {
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

Forman.propTypes = {
    value: PropTypes.instanceOf(Object).isRequired,
    rules: PropTypes.instanceOf(Object),
    render: PropTypes.func.isRequired,
};

Forman.defaultProps = {
    rules: null,
};

export default Forman;
