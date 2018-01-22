/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import CustomRoutes from 'config/routes';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  height: 100vh;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="Phonebook Web App"
        defaultTitle="Phonebook Web App"
      >
        <meta name="description" content="A Phonebook Web application" />
      </Helmet>
      <CustomRoutes />
    </AppWrapper>
  );
}
