import * as validation from './validate';

describe('Validation', () => {
    describe('validateForm', () => {
        it('should return error messages and valid false if value is invalid', () => {
            const value = {
                email: '',
                name: '',
            };

            const rules = {
                email: [() => 'error', () => 'error2'],
                name: [() => 'error3', () => 'error4'],
            };

            const result = validation.validateForm(value, rules);
            expect(result).toEqual({
                valid: false,
                errors: {
                    email: ['error', 'error2'],
                    name: ['error3', 'error4'],
                },
            });
        });
    });

    describe('validateValue', () => {
        it('should return null if rules is not an array', () => {
            const value = '';
            const rules = null;

            const result = validation.validateValue(value, rules);
            expect(result).toEqual(null);
        });

        it('should return null if field is valid', () => {
            const value = '';
            const rules = [() => null, () => null];

            const result = validation.validateValue(value, rules);
            expect(result).toEqual(null);
        });

        it('should return error messages', () => {
            const value = '';
            const rules = [() => 'error', () => 'error2'];

            const result = validation.validateValue(value, rules);
            expect(result).toEqual(['error', 'error2']);
        });
    });
});
