/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Styles from './HomePage.scss';

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  editClickHandler = (e) => {
    console.log('editClickHandler', e.target.id);
  };
  render() {
    console.log(this.props.testuser);
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
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Date of Birth</th>
                      <th scope="col">Phone #</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rizwan</td>
                      <td>Zaheer</td>
                      <td>30/09/1993</td>
                      <td>03135561765</td>
                      <td>
                        <i
                          className={`fa fa-pencil-square-o ${Styles.customStyle}`}
                          onClick={this.editClickHandler}
                          aria-hidden="true"
                          id="121"
                        />
                        <i
                          className={`fa fa-trash-o ${Styles.customStyle}`}
                          aria-hidden="true"
                          onClick={this.editClickHandler}
                          id="1212"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {};
export default HomePage;

