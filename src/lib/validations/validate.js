/**
 *
 * @param {any} value
 * @param {Function[]} rules
 *
 * @returns {string[]|null}
 */
export function validateValue(value, rules) {
    if (rules === null || typeof rules !== 'object' || !(rules instanceof Array)) {
        return null;
    }

    const errorMessages = rules.reduce((err, rule) => {
        const error = rule(value);
        if (typeof error === 'string') {
            err.push(error);
        }

        return err;
    }, []);

    return errorMessages.length > 0 ? errorMessages : null;
}

/**
 *
 * @param {object} value
 * @param {object} rules
 *
 * @returns {{ valid: boolean, errors: object }}
 */
export function validateForm(value, rules) {
    let valid = true;

    const errors = Object.keys(rules).reduce((err, key) => {
        const errorMessages = validateValue(value[key], rules[key]);
        if (errorMessages && errorMessages.length > 0) {
            err[key] = errorMessages;
            valid = false;
        }

        return err;
    }, {});

    return { valid, errors };
}
