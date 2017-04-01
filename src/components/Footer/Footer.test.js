/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import Footer from '../Footer';
import rootReducer from '../../reducers';

describe('Footer', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(rootReducer);

    wrapper = shallow(<Footer />, {
      context: { insertCss: () => {}, store },
    });
  });

  it('should contain <div />', () => {
    expect(wrapper.containsMatchingElement(<div />)).to.be.true;
  });
});
