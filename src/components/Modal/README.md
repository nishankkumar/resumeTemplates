# Modal component

## Example usage:

```JavaScript
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
// Import Modal component and actions.
import Modal from '../../components/Modal';
import { showModal } from '../../actions/modal';

// Pass action as property.
function Forecasts({ show }) {
  return (
    <Layout>
      <div className={'contentWrap clearfix'}>
        <h1>Forecasts</h1>
        // Call redux action.
        <button onClick={show}>open modal</button>
        <Modal>
          <div>
            <h1>Test Modal</h1>
            test
            test
          </div>
        </Modal>
      </div>
    </Layout>
    );
}

// Deafine property.
Forecasts.propTypes = {
  show: PropTypes.func,
};

// Add redux support with `mapDispatchToProps`.
export default connect(null, { show: showModal })(Forecasts);
```