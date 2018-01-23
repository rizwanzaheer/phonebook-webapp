/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Table, Icon, Input, Button } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/input/style/css';
import { RECORDS } from './constants';

import css from './HomePage.scss';

export class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      searchKeyArray: {
        fname: false,
        lname: false,
        dob: false,
        phone: false,
      },
    };
  }
  componentWillMount() {
    // this.props.getContacts();
  }

  renderSearchDropdown(key, value) {
    return (
      <div className={css.searchDropdown}>
        <Input
          placeholder={`Search by ${value}`}
        // ref={ele => this.searchInput = ele}
        // value={this.state.searchText}
        // onChange={this.onInputChange}
        // onPressEnter={this.onSearch}
        />
        <Button type="primary">Search</Button>
      </div>
    );
  }

  renderColumn() {
    const column = [{
      title: 'First Name',
      dataIndex: 'fname',
      key: 'fname',
      filterIcon: <Icon type="search" />,
      filterDropdown: this.renderSearchDropdown('fname', 'First Name'),
      filterDropdownVisible: this.state.searchKeyArray.fname,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          searchKeyArray: {
            ...this.state.searchKeyArray,
            fname: visible,
          },
        });
      },
    }, {
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'lname',
      filterIcon: <Icon type="search" />,
      filterDropdown: this.renderSearchDropdown('lname', 'Last Name'),
      filterDropdownVisible: this.state.searchKeyArray.lname,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          searchKeyArray: {
            ...this.state.searchKeyArray,
            lname: visible,
          },
        });
      },
    }, {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      filterIcon: <Icon type="search" />,
      filterDropdown: this.renderSearchDropdown('dob', 'DOB'),
      filterDropdownVisible: this.state.searchKeyArray.dob,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          searchKeyArray: {
            ...this.state.searchKeyArray,
            dob: visible,
          },
        });
      },
    }, {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      filterIcon: <Icon type="search" />,
      filterDropdown: this.renderSearchDropdown('phone', 'Phone'),
      filterDropdownVisible: this.state.searchKeyArray.phone,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          searchKeyArray: {
            ...this.state.searchKeyArray,
            phone: visible,
          },
        });
      },
    }, {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div>
          <Icon onClick={() => console.log(record._id)} className={css.tableActionIcon} type="edit" />
          <Icon onClick={() => console.log(record._id)} className={css.tableActionIcon} type="delete" />
        </div>
      ),
    }];
    return column;
  }
  renderColumn = this.renderColumn.bind(this);

  render() {
    // const { contacts } = this.props;
    const column = this.renderColumn();
    return (
      <article className={`container-fluid ${css.HomePageWrapper}`}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <Table dataSource={RECORDS} columns={column} />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  editRecord: PropTypes.func,
  deleteRecord: PropTypes.func,
  getContacts: PropTypes.func,
  contacts: PropTypes.array,
};
export default HomePage;
