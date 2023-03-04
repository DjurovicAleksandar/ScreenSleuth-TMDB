import Section from './Section';

function Favourites() {
  const fetchUrl = TRENDING;
  return <Section fetchUrl={fetchUrl} title="Trending" />;
}

export default Favourites;
