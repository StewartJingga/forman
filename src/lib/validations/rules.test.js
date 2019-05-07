import { RULES, createRule } from './rules';

describe('validation RULES', () => {
    describe('createRule', () => {
        it('should return default message if message is not a string or a function', () => {
            const rules = [null, undefined];

            rules.forEach((m) => {
                expect(createRule(() => false, m)()).toEqual(expect.any(String));
            });
        });

        it('should returns a function which returns null or a string', () => {
            const errorMessage = 'Error1';
            const rule = createRule(
                val => val > 2,
                errorMessage,
            );

            expect(rule).toBeInstanceOf(Function);
            expect(rule(3)).toBe(null);
            expect(rule(1)).toBe(errorMessage);
        });
    });

    describe('RULES', () => {
        describe('required', () => {
            it('invalid values', () => {
                const values = ['', null];

                values.forEach((value) => {
                    expect(RULES.required(value)).toEqual(expect.any(String));
                });
            });

            it('valid values', () => {
                const values = ['asdasd', 0, ' '];

                values.forEach((value) => {
                    expect(RULES.required(value)).toBe(null);
                });
            });
        });
    });
});
