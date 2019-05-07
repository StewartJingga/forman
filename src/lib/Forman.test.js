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
        const render = jest.fn();
        const wrapper = shallow(factory({ render }));

        const state = {};
        wrapper.setState(state);

        expect(render).toHaveBeenCalledWith(state);
    });

    describe('getDerivedStateFromProps', () => {
        it('should loop through value keys and returns new state', () => {
            const fieldA = { dirty: true, errors: ['A'], valid: false };
            const value = { a: 'a', b: 'b', c: 'c' };
            const rules = { b: [() => 'B'] };
            const fields = { a: fieldA };
            const previousValue = { a: 'a', c: 'Z' };

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
            });
        });
    });
});
