/* eslint-env mocha */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { createStore } from 'redux';
import App from '../App';
import Header from '../Header';
import Footer from '../Footer';
import Layout from './Layout';
import rootReducer from '../../reducers';

describe('Layout', () => {
  let store;
  let prop;
  let wrapper;

  beforeEach(() => {
    store = createStore(rootReducer);
    prop = {
      children: <div />,
    };

    wrapper = shallow(
      <Layout {...prop} />,
      { context: { insertCss: () => {}, store } })
      .shallow();
  });

  it('renders children correctly', () => {
    wrapper = shallow(
      <App context={{ insertCss: () => {}, store }}>
        <Layout>
          <div className="child" />
        </Layout>
      </App>
    );

    expect(wrapper.contains(<div className="child" />)).to.be.true;
  });

  it('should contain <Header />', () => {
    expect(wrapper.find(Header)).to.have.length.of(1);
  });

  it('should contain <Footer />', () => {
    expect(wrapper.find(Footer)).to.have.length.of(1);
  });
});
