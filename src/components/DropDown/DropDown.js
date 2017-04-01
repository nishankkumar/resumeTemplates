
import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select, { Option } from 'rc-select';
import cx from 'classnames';
import * as actionFilters from '../../actions/filter';
import s from './DropDown.scss';


class DropDown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdownId: props.id,
    };
    this.onChange = this.onChange.bind(this);
  }

  // IF component gets re-rendered
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.id, nextProps.id)) {
      this.setState({
        dropdownId: nextProps.id,
      });
    }
  }

  onChange(value) {
    const { actions, multi } = this.props;
    const id = this.state.dropdownId;
    if (multi && value.indexOf('all') !== -1) {
      actions.setFilter({ name: id, value: [] });
      return;
    }

    if (!multi && value === 'all') {
      actions.setFilter({ name: id, value: '' });
      return;
    }

    actions.setFilter({ name: id, value });
  }

  renderOptions() {
    const options = [];
    const { items, showAll } = this.props;

    if (showAll) {
      options.push(
        <Option key={'all'} value={'all'} title={'all'}>
          Show All
        </Option>
      );
    }

    Object.keys(items).forEach(key => {
      options.push(
        <Option key={key} value={key} title={items[key]}>
          {items[key]}
          <span className={'icon-ok'} />
        </Option>
      );
    });

    return options;
  }

  render() {
    const { title, filter, multi, placeholder, className } = this.props;
    return (
      <div className={cx(s.filterDropdown, className)}>
        <Select
          key={this.state.dropdownId}
          value={filter}
          multiple={multi}
          optionLabelProp={'title'}
          placeholder={placeholder}
          onChange={this.onChange}
          showSearch={false}
        >
          {this.renderOptions()}
        </Select>
        <span className={s.typeDropDown}>{title}</span>
      </div>
    );
  }
}

DropDown.propTypes = {

  className: PropTypes.string, // Optional class Name to overriding styling
  title: PropTypes.string, // Name for DropDown (placeholder)
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired, // An unique filter id.
  items: PropTypes.object.isRequired, // Values for DropDown {key1: value1, key2: value2}.
  multi: PropTypes.bool, // Allow multiple choice.
  showAll: PropTypes.bool, // Allow reset filter and adds Show All options.

  // Private variables.
  filter: PropTypes.any, // Redux variable.
  actions: PropTypes.shape({
    setFilter: PropTypes.func, // action filter variable.
  }).isRequired, // Redux variable.
};

DropDown.defaultProps = {
  placeholder: 'Select...',
  showAll: false,
  path: '',
};

const mapStateToProps = (state, ownProps) => ({
  filter: state.filter[ownProps.id],
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionFilters, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(DropDown));
