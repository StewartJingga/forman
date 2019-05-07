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
});
