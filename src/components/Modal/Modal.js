/**
 * @File Modal window component.
 * @todo
   1) Add id to support more than one modal window on same page.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactModal from 'react-modal';
import s from './Modal.scss';
import * as actionCreator from '../../actions/modal';

/**
 * React component.
 * @see Modal.propTypes
 */
function Modal({ children, header, footer, className,
  headerClass, footerClass, bodyClass, closeBtnClass, overlayClassName,
  isOpen, hideModal, contentLabel = 'Modal', modalKey, contentClass }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => hideModal(modalKey)}
      className={cx(s.root, className)}
      overlayClassName={cx(s.overlay, overlayClassName)}
      contentLabel={contentLabel}
    >
      <button
        className={cx(s.close, closeBtnClass)}
        onClick={() => hideModal(modalKey)}
      >Close</button>
      <div className={cx(s.body, bodyClass)}>
        <header
          className={cx(s.header, headerClass)}
          dangerouslySetInnerHTML={{ __html: header }}
        />
        <div className={cx(s.wrap, contentClass)}>{children}</div>
      </div>
      <footer className={cx(s.footer, footerClass)} dangerouslySetInnerHTML={{ __html: footer }} />
    </ReactModal>
  );
}

Modal.defaultProps = {
  contentLabel: 'modal',
};

Modal.propTypes = {
  // Modal body element.
  children: PropTypes.element.isRequired,

  // Modal window class.
  className: PropTypes.string,
  // Modal header class.
  headerClass: PropTypes.string,
  // Modal body class.
  bodyClass: PropTypes.string,
  // Modal content class.
  contentClass: PropTypes.string,
  // Modal footer class.
  footerClass: PropTypes.string,
  // Modal close button class.
  closeBtnClass: PropTypes.string,
  // Overlay class.
  overlayClassName: PropTypes.string,

  header: PropTypes.string,
  footer: PropTypes.string,

  // Redux state.
  isOpen: PropTypes.bool,
  // Redux actions.
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  // required property for react-modal returns warning otherwise
  contentLabel: PropTypes.string,
  modalKey: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  isOpen: state.modal[props.modalKey],
});

export default connect(mapStateToProps, actionCreator)(withStyles(s)(Modal));
