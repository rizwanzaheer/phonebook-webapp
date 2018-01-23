/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import Table from 'components/Table';
import Styles from './HomePage.scss';

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  constructor(props) {
    super(props);
    this.tableHeadings = [
      'F Name',
      'L Name',
      'Date Of Birth',
      'Phone #',
      'Actions',
    ];
  }

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
      <article className={`container-fluid ${Styles.HomePageWrapper}`}>
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
                <form className="form-inline pull-right">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
                <br />
                <br />
                <Table
                  tableHeadings={this.tableHeadings}
                  // this data getting from props
                  tableData={contacts}
                  editRecord={editRecord}
                  deleteRecord={deleteRecord}
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
