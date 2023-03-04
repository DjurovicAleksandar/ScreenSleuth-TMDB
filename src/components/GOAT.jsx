import Section from './Section';
import { TOP } from '../config/data';

function GOAT() {
  const fetchUrl = TOP;
  return <Section fetchUrl={fetchUrl} title="Greatest of all time" />;
}

export default GOAT;
