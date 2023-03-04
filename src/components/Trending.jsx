import { TRENDING } from '../config/data';
import Section from './Section';

function Trending() {
  const fetchUrl = TRENDING;
  return <Section fetchUrl={fetchUrl} title="Trending" />;
}

export default Trending;
