import React from 'react';
import { shallow } from 'enzyme';

import { Forman } from './Forman';

function factory(props = null) {
    return <Forman
        value={{}}
        rules={{}}
        render={jest.fn()}
        {...props}
    />;
}

describe('Forman', () => {
    it('should call render function from props with state', () => {
        const getDerivedStateFromProps = jest.spyOn(Forman, 'getDerivedStateFromProps')
            .mockImplementation(() => null);
        const render = jest.fn();
        const wrapper = shallow(factory({ render }));

        const fields = {};
        const form = {};
        wrapper.setState({ fields, form });

        expect(render).toHaveBeenCalledWith(fields, form);
        getDerivedStateFromProps.mockRestore();
    });

    describe('getDerivedStateFromProps', () => {
        const rules = { b: [() => 'B'], d: [() => null] };
        const previousValue = { a: 'a', c: 'Z' };

        it('should create new field', () => {
            const value = { d: 'a' };
            const nextProps = { value, rules };
            const prevState = { fields: {}, previousValue };

            const results = Forman.getDerivedStateFromProps(nextProps, prevState);
            expect(results).toHaveProperty('fields', {
                d: { dirty: false, errors: null, valid: true },
            });
        });

        it('should check fields validity', () => {
            const value = { b: 'b', d: 'a' };
            const nextProps = { value, rules };
            const prevState = { fields: {}, previousValue };

            const results = Forman.getDerivedStateFromProps(nextProps, prevState);
            expect(results).toHaveProperty('fields', {
                b: { dirty: false, errors: ['B'], valid: false },
                d: { dirty: false, errors: null, valid: true },
            });
        });

        it('should mark dirty properly', () => {
            const value = { a: 'a', c: 'a', d: 'd' };
            const fields = { a: { dirty: false }, c: { dirty: false }, d: { dirty: true }};

            const nextProps = { value, rules };
            const prevState = { fields, previousValue };

            const results = Forman.getDerivedStateFromProps(nextProps, prevState);
            
            expect(results.fields.a).toHaveProperty('dirty', false);
            expect(results.fields.c).toHaveProperty('dirty', true);
            expect(results.fields.d).toHaveProperty('dirty', true);
        });

        it('should check form validity', () => {
            const prevState = { fields: { }, previousValue };

            // All valid
            expect(
                Forman.getDerivedStateFromProps({ value: {
                    a: 'a', c: 'c'
                }, rules }, prevState)
            ).toHaveProperty('form', {
                valid: true,
            });

            // At least on invalid
            expect(
                Forman.getDerivedStateFromProps({ value: {
                    a: 'a', b: 'b', c: 'c',
                }, rules }, prevState)
            ).toHaveProperty('form', {
                valid: false,
            });
        });

        it('should loop through value keys and returns new state', () => {
            const value = { a: 'a', b: 'b', c: 'c' };
            const fieldA = { dirty: true, errors: ['A'], valid: false };
            const fields = { a: fieldA };

            const nextProps = { value, rules };
            const prevState = { fields, previousValue };

            const results = Forman.getDerivedStateFromProps(nextProps, prevState);
            expect(results).toEqual({
                fields: {
                    a: { dirty: true, errors: ['A'], valid: false },
                    b: { dirty: false, errors: ['B'], valid: false },
                    c: { dirty: false, errors: null, valid: true },
                },
                previousValue: value,
                form: {
                    valid: false,
                },
            });
        });
    });
});
