import { UPCOMING } from '../config/data';
import Section from './Section';

export default function Upcoming() {
  const fetchUrl = UPCOMING;
  return <Section fetchUrl={fetchUrl} title="Upcoming" />;
}
