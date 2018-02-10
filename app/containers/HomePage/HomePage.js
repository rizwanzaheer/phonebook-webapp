/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import {
  Table,
  Modal,
  Form,
  Icon,
  Input,
  Button,
  Radio,
  DatePicker,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import 'antd/lib/button/style/css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/radio/style/css';
import 'antd/lib/table/style/css';
// import { RECORDS } from './constants';
import css from './HomePage.scss';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const config = {
  format: 'DD/MM/YYYY',
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

const regax = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

const CollectionCreateForm = Form.create()((props) => {
  const { visible, onCancel, title, btnText, onCreate, form } = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title={title}
      okText={btnText}
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <FormItem label="First Name">
          {getFieldDecorator('fName', {
            // initialValue: 'Rizwan Zaheer',
            rules: [
              {
                required: true,
                message: 'Please Enter the First Name!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Last Name">
          {getFieldDecorator('lName', {
            rules: [
              {
                required: true,
                message: 'Please Enter the Last Name!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="DatePicker">
          {getFieldDecorator('datepicker', config)(
            <DatePicker
              // defaultValue={moment('2015-06-06', 'YYYY-MM-DD')}
              format="DD/MM/YYYY"
            />
          )}
        </FormItem>
        <FormItem label="Phone Number e.g (555-555-5555)">
          {getFieldDecorator('phone', {
            // initialValue: '(555)-555-5555',
            rules: [
              {
                required: true,
                pattern: regax,
                message: 'Please Enter the Phone Number!',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
});

export class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyArray: {
        fname: false,
        lname: false,
        dob: false,
        phone: false,
        CollectionCreateFormVisible: false,
        Visible: false,
        editBtnClick: false,
      },
      searchText: '',
      contacts: this.props.contacts,
    };
  }
  componentWillMount() {
    // dispatching the action to get
    // record's from db
    this.props.getContacts();
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      contacts: nextprops.contacts,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate prevstate: ', prevState);
    console.log('componentDidUpdate this.state: ', this.state);
  }

  // Search handler
  onSearch = (key, searchText) => {
    const Key = key;

    if (searchText) {
      this.setState(
        {
          contacts: this.props.contacts,
        },
        () => {
          const newContacts = this.state.contacts.filter(
            (word) => word[Key].toLowerCase() === searchText.toLowerCase()
          );
          this.setState({ contacts: newContacts });
        }
      );
    } else {
      this.setState({
        contacts: this.props.contacts,
      });
    }
  };

  showModal = () => {
    this.setState({
      CollectionCreateFormVisible: true,
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      editBtnClick: false,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      editBtnClick: false,
      CollectionCreateFormVisible: false,
    });
  };
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      try {
        axios
          .post('http://localhost:3001/api/search/createnew', {
            fname: values.fName,
            lname: values.lName,
            dob: values.datepicker._d,
            phone: values.phone,
          })
          .then(() => {
            // dispatching the action to get
            // new record's from db
            this.props.getContacts();
          });
      } catch (error) {
        console.log(error);
      }

      console.log('Received values of form: ', values.datepicker);
      form.resetFields();
      this.setState({ visible: false });
    });
  };
  saveFormRef = (form) => {
    console.log('saveFormRef is calling!!!!');
    this.form = form;
  };
  // rendring the search dropdown
  // when click on sarch icon
  renderSearchDropdown(key, value) {
    return (
      <div className={css.searchDropdown}>
        <Input
          placeholder={`Search by ${value}`}
          // ref={ele => this.searchInput = ele}
          // value={this.state.searchText}
          onChange={(e) => this.setState({ searchText: e.target.value })}
          // onBlur={(e) => this.onSearch(key, e.target.value)}
          onPressEnter={(e) => this.onSearch(key, e.target.value)}
        />
        <Button
          onClick={(e) => this.onSearch(key, this.state.searchText)}
          type="primary"
        >
          Search
        </Button>
      </div>
    );
  }

  renderColumn() {
    const column = [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (text, record) => (
          <div>
            <Icon
              onClick={() => {
                this.props.editRecord(record._id);
                this.setState({
                  editBtnClick: true,
                });
                this.showModal();
              }}
              className={css.tableActionIcon}
              type="edit"
            />
            <Icon
              onClick={() => {
                this.props.deleteRecord(record._id);
              }}
              className={css.tableActionIcon}
              type="delete"
            />
          </div>
        ),
      },
    ];
    return column;
  }
  renderColumn = this.renderColumn.bind(this);

  render() {
    const { contacts } = this.state;
    const column = this.renderColumn();

    return (
      <article className={`container-fluid ${css.HomePageWrapper}`}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <Button type="primary" onClick={this.showModal}>
                  <Icon type="plus" />New Contact
                </Button>
                <br />
                <br />
                <Table dataSource={contacts} columns={column} />
                <CollectionCreateForm
                  ref={this.saveFormRef}
                  btnText={this.state.editBtnClick ? 'Update' : 'Add'}
                  title={
                    this.state.editBtnClick ? (
                      'Update Contact'
                    ) : (
                      'Add new Contact'
                    )
                  }
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
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
