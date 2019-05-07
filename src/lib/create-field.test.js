import * as cf from './create-field';

describe('create-field', () => {
    describe('getDirtyState', () => {
        it('should return false if it is a new field', () => {
            expect(cf.getDirtyState(null, false)).toBe(false);
        });

        it('should return true if existing field is dirty', () => {
            const dirty = true;
            expect(cf.getDirtyState({ dirty }, false)).toBe(true);
            expect(cf.getDirtyState({ dirty }, true)).toBe(true);
        });

        it('should depend on hasChanges if existing field is false', () => {
            const dirty = false;
            expect(cf.getDirtyState({ dirty }, false)).toBe(false);
            expect(cf.getDirtyState({ dirty }, true)).toBe(true);
        });
    });

    describe('getErrorsAndValidity', () => {
        it('should check for validity if field is new', () => {
            const result = cf.getErrorsAndValidity(null, 'a', [() => 'test'], false);

            expect(result.errors).toEqual(['test']);
            expect(result.valid).toEqual(false);
        });

        it('should check for validity if value is changing', () => {
            const result = cf.getErrorsAndValidity(null, 'a', [], true);

            expect(result.errors).toEqual(null);
            expect(result.valid).toEqual(true);
        });

        it('should check for validity if value is changing', () => {
            const field = { errors: null, valid: true };
            const result = cf.getErrorsAndValidity(field, 'a', [], true);

            expect(result.errors).toEqual(field.errors);
            expect(result.valid).toEqual(field.valid);
        });
    });

    describe('createField', () => {
        it('should handle value changing properly', () => {
            const result = cf.createField('a', { a: {} }, { a: 'a' }, { a: [] }, { a: 'b' });

            expect(result).toEqual({
                dirty: true,
                errors: null,
                valid: true,
            });
        });

        it('should handle if there are any errors', () => {
            const result = cf.createField('a', {}, { a: 'a' }, { a: [() => 'A'] }, {});

            expect(result).toEqual({
                dirty: false,
                errors: ['A'],
                valid: false,
            });
        });

        it('should handle new field', () => {
            const result = cf.createField('a', {}, { a: 'a' }, { a: [] }, {});

            expect(result).toEqual({
                dirty: false,
                errors: null,
                valid: true,
            });
        });
    });
});
