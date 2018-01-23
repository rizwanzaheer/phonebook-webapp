/**
 *
 * Asynchronously loads the component for EditContactPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
