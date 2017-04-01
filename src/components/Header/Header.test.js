/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import Header from '../Header';
import Link from '../Link';
import rootReducer from '../../reducers';

describe('Header', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = createStore(rootReducer);

    wrapper = shallow(<Header />, {
      context: { insertCss: () => {}, store },
    });
  });

  it('should contain <Link />', () => {
    expect(wrapper.find(Link)).to.have.length.of(28);
  });

  it('should contain logo img', () => {
    expect(wrapper.containsMatchingElement(<img src="/images/lockup.png" alt="Stratfor Worldview" />)).to.be.true;
  });

  it('should contain item menu Forecasts', () => {
    expect(wrapper.containsMatchingElement(<Link to="/forecasts">Forecasts</Link>)).to.be.true;
  });

  it('should contain item menu Analysis', () => {
    expect(wrapper.containsMatchingElement(<Link to="/analysis">Analysis</Link>)).to.be.true;
  });

  it('should contain item menu Columns', () => {
    expect(wrapper.containsMatchingElement(<Link to="/columns">Columns</Link>)).to.be.true;
  });

  it('should contain item menu Themes', () => {
    expect(wrapper.containsMatchingElement(<Link to="/themes">Themes</Link>)).to.be.true;
  });

});
