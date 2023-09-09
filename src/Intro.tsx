import './styles.css';

const Intro = () => {
  return (
    <div className="intro">
      <h1>The Beholder</h1>
      <p>Sometime back, I saw{' '}
        <a href="https://www.youtube.com/watch?v=_DHaGFyyr00" rel="noreferrer" target="_blank">
          a video on how beauty standards evolve over time.
        </a>
      </p>
      <p>It led me to some other interesting aspects of how what is perceived as beautiful varies
        drastically across cultures and historical eras. So much so, that you can most likely find 
        an era or area of the world that admires what you consider to be a flaw. Inspired, 
        I wanted a mirror that would show women the beauty they possess, rather than our current
        online reflections that attempt to highlight what we are missing from a very narrow 
        viewpoint of beauty
      </p>
      <p>For now, this is a fun exploration to reclaim what so many women have been made
        othered for. Perhaps with more data it may grow into something more alluring.</p>
    </div>
  );
}

export default Intro;
