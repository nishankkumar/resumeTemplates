/**
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Footer.scss';
import Link from '../Link';

function Footer() {
  return (
    <div className="globalFooterWrap">
      <div className="footerTopSection marcomfooter">
        <div className="container clearfix">
          <div className="footerLeftWidget">
            <div className="WVLogoWrap">
              <Link to="/">
                <img src={'https://cdn2.hubspot.net/hubfs/515194/WVLogos/logo_tagline.png'} alt="Stratfor - Your world in context" />
              </Link>
            </div>
            <div className="socialLinksWrap">
              <ul>
                <li className="socialLink">
                  <a className="linkedinLink" href="https://www.linkedin.com/company/resumeTemplates"><i className="icon-in" /></a>
                </li>
                <li className="socialLink">
                  <a className="twitterLink" href="https://twitter.com/resumeTemplates"><i className="icon-twitter" /></a>
                </li>
                <li className="socialLink">
                  <a className="fbLink" href="https://www.facebook.com/resumeTemplates"><i className="icon-fb" /></a>
                </li>
                <li className="socialLink">
                  <a className="googleplusLink" href="https://plus.google.com/+resumeTemplates/posts"><i className="icon-gplus" /></a>
                </li>
                <li className="socialLink">
                  <a className="youtubeLink" href="https://www.youtube.com/user/resumeTemplates"><i className="icon-youtube" /></a>
                </li>
                <li className="socialLink">
                  <a className="podcastLink" href="https://lp.resumeTemplates.com/blog/topic/podcast"><i className="icon-podcast" /></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footerNavWrap">
            <div className="footerNavListWrap">
              <h3 className="footerNavTitle">Our Products</h3>
              <ul>
                <li className="footerNavLink">
                  <Link to="/products">Testing1</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/products">Testing1</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/products">Testing1</Link>
                </li>
                <li className="footerNavLink">
                  <a
                    href="#"
                    title="Stratfor Store"
                    alt="Stratfor Store"
                  >Stratfor Store</a>
                </li>
              </ul>
            </div>
            <div className="footerNavListWrap">
              <h3 className="footerNavTitle">Our Company</h3>
              <ul>
                <li className="footerNavLink">
                  <Link to="/horizons" linkIsMarcom>Horizons</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/about-stratfor" linkIsMarcom>About Resume Templates</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/people" linkIsMarcom>Our People</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/our-methodology" linkIsMarcom>Our Methodology</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/join-our-team" linkIsMarcom>Join Our Team</Link>
                </li>
              </ul>
            </div>
            <div className="footerNavListWrap">
              <h3 className="footerNavTitle">Help &amp; Support</h3>
              <ul>
                <li className="footerNavLink">
                  <Link to="/faqs" linkIsMarcom>FAQs</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/contact-us" linkIsMarcom>Contact Us</Link>
                </li>
                <li className="footerNavLink">
                  <Link to="/contact-us" linkIsMarcom>Live Chat</Link>
                </li>
              </ul>
              <ul>
                <li className="footerNavLink">
                  <a
                    href="tel:+91-9891782404"
                    title="Call Us at +91-9891782404"
                  >Call Us at +91-9891782404</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footerBottomSection">
        <div className="container">
          <div className="twoColumnsWrap">
            <ul className="footerLinkWrap">
              <li className="footerLink">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="footerLink">
                <Link to="/terms-of-use">Terms of Use</Link>
              </li>
              <li className="footerLink">
                Copyright &copy; Stratfor Enterprises, LLC. All rights reserved.
              </li>
            </ul>
            <div className="appLinkWrap">
              <a
                href="#"
                className="icnAppleStoreBadge"
                target="_blank"
                rel="noopener noreferrer"
              >&nbsp;</a>
              <a
                href="#"
                className="icnGooglePlayBadge"
                target="_blank"
                rel="noopener noreferrer"
              >&nbsp;</a>
            </div>
          </div>
          <div className="twoColumnsWrap">
            <div id="footer-newsletter" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Footer);
