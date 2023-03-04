import Section from '../Section';
import { useLocation } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const fetchUrl = location.state.url;

  return <Section fetchUrl={fetchUrl} />;
}

export default Search;
