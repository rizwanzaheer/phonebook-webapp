/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Table, Icon, Input } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/input/style/css';
import css from './HomePage.scss';

const columns = [{
  title: 'First Name',
  dataIndex: 'fname',
  key: 'fname',
  filterDropdown: (
    <div className="custom-filter-dropdown">
      <Input
        ref={ele => this.searchInput = ele}
        placeholder="Search name"
        // value={this.state.searchText}
        // onChange={this.onInputChange}
        // onPressEnter={this.onSearch}
      />
      <Button type="primary">Search</Button>
    </div>
  ),
  filterIcon: <Icon type="search" />,
  filterDropdownVisible: false,
}, {
  title: 'Last Name',
  dataIndex: 'lname',
  key: 'lname',
}, {
  title: 'Date of Birth',
  dataIndex: 'dob',
  key: 'dob',
}, {
  title: 'Phone',
  dataIndex: 'phone',
  key: 'phone',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  render: () => {
    return (
      <div>
        <Icon className={css.tableActionIcon} type="edit" />
        <Icon className={css.tableActionIcon} type="delete" />
      </div>
    );
  }
}];

export class HomePage extends React.PureComponent {
  componentWillMount() {
    console.log('component will mount!!');
  }
  componentDidMount() {
    console.log('component did mount!!');
    this.props.getContacts();
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps is: ', nextProps);
  }
  editClickHandler = (e) => {
    console.log('editClickHandler', e.target.id);
  };
  render() {
    console.log('homepage props', this.props);
    console.log('contacts', this.props.contacts);
    const { contacts, editRecord, deleteRecord } = this.props;
    return (
      <article className={`container-fluid ${css.HomePageWrapper}`}>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A Phonebook application homepage" />
        </Helmet>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <h3>Phonebook App</h3>
                <br />
                <br />
                <Table dataSource={contacts} columns={columns} />
                {/* <Table
                  tableHeadings={this.tableHeadings}
                  // this data getting from props
                  tableData={contacts}
                  editRecord={editRecord}
                  deleteRecord={deleteRecord}
                /> */}
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
