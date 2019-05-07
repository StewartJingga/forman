import { validateValue } from './validations';

/**
 * 
 * @param {boolean} isNewField
 * @param {boolean} hasChanges
 * @param {{ dirty: boolean }} field
 * 
 * @returns {boolean}
 */
export function getDirtyState(field, hasChanges) {
    const isNewField = !(field !== null && typeof field === 'object');

    let dirty;
    if (isNewField) dirty = false;
    else dirty = field.dirty || hasChanges;

    return dirty;
}

/**
 * 
 * @param {{ errors: string[], valid: boolean }} field
 * @param {Array<Function} rules
 * @param {boolean} hasChanges
 * 
 * @returns {{ errors: string[], valid: boolean }}
 */
export function getErrorsAndValidity(field, value, rules, hasChanges) {
    let errors;
    let valid;
    if (!field || hasChanges) {
        errors = validateValue(value, rules);
        valid = errors === null || errors.length === 0;
    } else {
        ({ errors, valid } = field);
    }

    return { errors, valid };
}

/**
 * 
 * @param {string} key
 * @param {object} fields
 * @param {object} value
 * @param {object} rules
 * @param {object} previousValue
 * 
 * @returns { dirty: boolean, errors: string[], valid: boolean }
 */
export function createField(key, fields, value, rules, previousValue) {
    const hasChanges = value[key] !== previousValue[key];

    // Define dirty state
    const dirty = getDirtyState(fields[key], hasChanges);

    // Find errors and validity
    const { errors, valid } = getErrorsAndValidity(fields[key], value[key], rules[key], hasChanges);
    
    return { dirty, errors, valid };
};
