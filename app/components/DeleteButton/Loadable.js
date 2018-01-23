/**
 *
 * Asynchronously loads the component for DeleteButton
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
