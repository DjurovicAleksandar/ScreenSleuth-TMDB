import Section from './Section';
import { NOW_PLAYING } from '../config/data';

function Latest() {
  const fetchUrl = NOW_PLAYING;
  return <Section fetchUrl={fetchUrl} title="Latest" />;
}

export default Latest;
