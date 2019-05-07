/**
 *
 * @param {Function} cb
 * @param {string|Function} message
 */
export function createRule(cb, message) {
    return (value, field = 'Field') => {
        const isValid = cb(value);
        if (!isValid) {
            if (typeof message === 'string') {
                return message;
            } else if (typeof message === 'function') {
                return message(field);
            }

            return `${field} is invalid`;
        }

        return null;
    };
}

export const RULES = {
    required: createRule(
        value => ((value || value === 0) ? true : false),
        'Field is required',
    ),
};
