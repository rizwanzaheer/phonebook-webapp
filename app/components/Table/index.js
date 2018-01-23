/**
*
* Table
*
*/

import PropTypes from 'prop-types';
import React from 'react';
// import styled from 'styled-components';
import DeleteButton from 'components/DeleteButton';
import EditButton from 'components/EditButton';

class Table extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      contacts: nextProps.tableData,
    });
  }
  render() {
    const { editRecord, deleteRecord, tableHeadings } = this.props;
    const { contacts } = this.state;
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {tableHeadings.map((value) => (
              <th key={value} scope="col">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contacts.map((value) => {
            return (
              <tr key={value._id}>
                <td>{value.fname}</td>
                <td>{value.lname}</td>
                <td>{value.dob}</td>
                <td>{value.phone}</td>
                <td>
                  <EditButton
                    id={value._id}
                    onClick={() => editRecord(value._id)}
                  />
                  <DeleteButton
                    id={value._id}
                    onClick={() => deleteRecord(value._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  editRecord: PropTypes.func,
  deleteRecord: PropTypes.func,
  tableHeadings: PropTypes.array,
};

export default Table;
