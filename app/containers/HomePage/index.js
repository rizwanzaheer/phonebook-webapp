/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Styles from './HomePage.scss';
import Input from './Input';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import Section from './Section';
import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  render() {
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

HomePage.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = createStructuredSelector({

});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(withReducer, withSaga, withConnect)(HomePage);