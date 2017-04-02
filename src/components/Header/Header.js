import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';
import Link from '../Link';
import Button from '../Button';
import UserMenu from './UserMenu';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      display: false,
      isHide: false,
      menuItems: {
        products_and_services: 'open',
        our_company: 'open',
        forecasts: 'closed',
        analyses: 'closed',
        sections: 'closed',
      },
    };
    this.hideNavHeader = this.hideNavHeader.bind(this);
  }

  componentDidMount() {
    this.headerElement = document.getElementById('header-wrap');

    this.bodyElement = document.getElementsByTagName('body')[0];
    // Binding scroll event on pageload
    window.addEventListener('scroll', this.hideNavHeader);
  }

  componentWillUnmount() {
    // Unbind scroll event
    const { headerElement, bodyElement } = this;
    // remove overlay class
    headerElement.classList.remove('openNavBar');
    bodyElement.classList.remove('openNav');
    window.removeEventListener('scroll', this.hideNavHeader);
  }

  hideNavHeader() {
    /**
     * Method to auto hide/show header on pageScroll
     */
    const windowTop = window.scrollY;
    if (windowTop > this.prev && windowTop > 110) {
      this.setState({ isHide: true });
    } else {
      this.setState({ isHide: false });
    }
    this.prev = window.scrollY;
  }

  toogleTopNav = (event) => {
    /**
     * Method to Toogle Top Navigation overlay header
     */
    event.preventDefault();
    this.headerElement.classList.toggle('openNavBar');
    this.bodyElement.classList.toggle('openNav');
  }

  toogleNavItem = (event) => {
    event.preventDefault();
    const thisId = event.target.getAttribute('data-id');
    const newMenuItems = _.cloneDeep(this.state.menuItems);
    let menuItemClass = 'closed';
    if (newMenuItems[thisId]) {
      menuItemClass = newMenuItems[thisId] === 'closed' ? 'open' : 'closed';
    }
    newMenuItems[thisId] = menuItemClass;
    this.setState({
      menuItems: newMenuItems,
    });
  }

  render() {
    const headerHideClass = this.state.isHide ? 'hideHeader' : '';

    return (
      <div id="header-wrap">
        <div className="overlayBackDrop">
          {
            // eslint-disable-next-line jsx-a11y/href-no-hash
          }<a href="#" className="clickOverlay" onClick={this.toogleTopNav}>&nbsp;</a>
        </div>
        <div className={cx(headerHideClass, 'reactiveNav')}>
          <Button to="" className="menuIcon" onClick={this.toogleTopNav}>&#9776;</Button>
          <div className={cx(s.scrollMenu, 'globalNav', 'cf')}>
            <Button to="" className="navCloseBtn" onClick={this.toogleTopNav}>&#10005;</Button>
            <div className="controls">
              <div className="highlight">STRATFOR GLOBAL MENU</div>
            </div>
            <div className={s.menuItems}>
              <div className="mobileOnly">
                <div className="mobMenuLogo clearfix">
                  <Link className="lockup" to="/">
                    <img src={'https://cdn2.hubspot.net/hubfs/515194/WVLogos/lockup.white.png'} alt="Stratfor Worldview" />
                  </Link>
                </div>
              </div>
              <div>
                <button
                  className={cx(s.navMenuButtons, s[this.state.menuItems.forecasts],
                    s.navMenuWorldview, s.mobileOnly)}
                  onClick={this.toogleNavItem}
                  data-id="forecasts"
                >Forecasts</button>
                <ul
                  className={cx(s.navMenuSubSection, s[this.state.menuItems.forecasts],
                    s.navMenuWorldview, s.mobileOnly)}
                >
                  <li><Link to="/forecasts">All Forecasts</Link></li>
                  <li><Link to="/forecasts/quarterly">Quarterly Forecasts</Link></li>
                  <li><Link to="/forecasts/annual">Annual Forecasts</Link></li>
                  <li><Link to="/forecasts/decade">Decade Forecasts</Link></li>
                </ul>
                <button
                  className={cx(s.navMenuButtons, s[this.state.menuItems.analyses],
                    s.navMenuWorldview, s.mobileOnly)}
                  onClick={this.toogleNavItem}
                  data-id="analyses"
                >Analyses</button>
                <ul
                  className={cx(s.navMenuSubSection, s[this.state.menuItems.analyses],
                    s.navMenuWorldview, s.mobileOnly)}
                >
                  <li><Link to="/snapshot">Snapshots</Link></li>
                  <li><Link to="/assessments">Assessments</Link></li>
                  <li><Link to="/columns">Columns</Link></li>
                </ul>
                <button
                  className={cx(s.navMenuButtons, s[this.state.menuItems.sections],
                    s.navMenuWorldview, s.mobileOnly)}
                  onClick={this.toogleNavItem}
                  data-id="sections"
                >Sections</button>
                <ul
                  className={cx(s.navMenuSubSection, s[this.state.menuItems.sections],
                    s.navMenuWorldview, s.mobileOnly)}
                >
                  <li><Link to="/global-perspectives">Global Perspectives</Link></li>
                  <li><Link to="/situation-reports">Situation Reports</Link></li>
                  <li><Link to="/media">Media</Link></li>
                  <li><Link to="/themes">Themes</Link></li>
                  <li><Link to="/topic">Topics</Link></li>
                  <li><Link to="/series">Series</Link></li>
                  <li><Link to="/region">Regions</Link></li>
                </ul>
              </div>
              <ul>
                <span className="highlight">
                  <Link
                    to="/"
                    className={s.menuHighlightLinks}
                    alt="Stratfor.com"
                    title="Stratfor.com"
                    linkIsMarcom
                  >STRATFOR.COM</Link>
                </span>
              </ul>
              <button
                className={cx(s.navMenuButtons, s[this.state.menuItems.products_and_services])}
                onClick={this.toogleNavItem}
                data-id="products_and_services"
              >PRODUCTS &amp; SERVICES</button>
              <ul
                className={cx(s.navMenuSubSection,
                  s[this.state.menuItems.products_and_services])}
              >
                <li className={cx(s.productsMenuItems, s.productWorldview)}>
                  <Link
                    to="/products/worldview"
                    linkIsMarcom
                  >Stratfor Worldview</Link>
                </li>
                <li className={cx(s.productsMenuItems, s.productThreatLens)}>
                  <Link
                    to="/products/threatlens"
                    linkIsMarcom
                  >Stratfor Threat Lens</Link>
                </li>
                <li className={cx(s.productsMenuItems, s.productAdvisory)}>
                  <Link
                    to="/products/advisory"
                    linkIsMarcom
                  >Stratfor Advisory Services</Link>
                </li>
              </ul>
              <button
                className={cx(s.navMenuButtons, s[this.state.menuItems.our_company])}
                onClick={this.toogleNavItem}
                data-id="our_company"
              >OUR COMPANY</button>
              <ul className={cx(s.navMenuSubSection, s[this.state.menuItems.our_company])}>
                <li><Link to="/about-stratfor" linkIsMarcom>About Stratfor</Link></li>
                <li><Link to="/our-methodology" linkIsMarcom>Our Methodology</Link></li>
                <li><Link to="/people" linkIsMarcom>Our People </Link></li>
                <li><Link to="/join-our-team" linkIsMarcom>Join Our Team</Link></li>
                <li><Link to="/faqs" linkIsMarcom>FAQs</Link></li>
                <li><Link to="/contact-us" linkIsMarcom>Contact us</Link></li>
              </ul>
              <ul className="ourCommitment">
                <span className="highlight">OUR COMMITMENT</span>
                <p>
                  Stratfor brings global events into valuable perspective, empowering businesses,
                  governments and individuals to more confidently navigate an increasingly complex
                  international environment.
                </p>
                <li>
                  <Link
                    to="/contact-us"
                    className="highlight"
                    linkIsMarcom
                  >CONTACT US</Link>
                </li>
              </ul>
            </div>
          </div>

          <nav className="superGlobalNav container">
            <div className="userHederWrap">
              {/* Begin UserMenu */}
              {<UserMenu />}
              {/* End UserMenu */}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
