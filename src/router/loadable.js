import Loadable from 'react-loadable';
import Loading from '@components/loading/index';

export default (loader, loading = Loading) => Loadable({loader, loading });
