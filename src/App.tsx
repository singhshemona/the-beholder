import './App.css';
import Sketch from 'react-p5';
import P5 from 'p5';
import { DataModel } from './model';

const ml5 = require('ml5');

function App() {
  let classifier: { classify: (arg0: any, arg1: (error: Error, results: DataModel) => void) => void; };
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/wZm28bHVl/';
  let video: P5.Element;
  let flippedVideo: P5.Element;
  
  let ancientGreeceInterval = 0;
  let brazilianConfidenceInterval = 0;
  let indianConfidenceInterval = 0;
  let ghanaConfidenceInterval = 0;
  let ancientEgyptConfidenceInterval = 0;
  let koreanConfidenceInterval = 0;

  const preload = () => {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  const setup = (p5: P5, canvasParentRef: any) => {
    ml5.p5Utils.setP5Instance(p5);
    p5.createCanvas(1000, 1000).parent(canvasParentRef);
    video = p5.createCapture(p5.VIDEO);
    video.size(700, 525);
    video.hide();
    flippedVideo = ml5.flipImage(video)
    classifyVideo();
  }

  const draw = (p5: P5) => {
    p5.background(0);
    p5.image(flippedVideo, 0, 0);

    p5.fill(255);
    p5.textSize(16);
    p5.text('Ancient Greece', 0, 0);

    p5.fill('blue')
    p5.rect(0, 10, (100 * ancientGreeceInterval), 30);

    p5.fill(255);
    p5.textSize(16);
    p5.text('Brazilian', 0, 20);

    p5.fill('yellow')
    p5.rect(0, 30, (100 * brazilianConfidenceInterval), 30);

    p5.fill(255);
    p5.textSize(16);
    p5.text('Indian', 0, 40);

    p5.fill('green')
    p5.rect(0, 50, (100 * indianConfidenceInterval), 30);

    p5.fill(255);
    p5.textSize(16);
    p5.text('Ghana', 0, 60);

    p5.fill('pink')
    p5.rect(0, 70, (100 * ghanaConfidenceInterval), 30);

    p5.fill(255);
    p5.textSize(16);
    p5.text('Ancient Egypt', 0, 80);

    p5.fill('orange')
    p5.rect(0, 90, (100 * ancientEgyptConfidenceInterval), 30);

    p5.fill(255);
    p5.textSize(16);
    p5.text('Korean', 0, 100);

    p5.fill('purple')
    p5.rect(0, 110, (100 * koreanConfidenceInterval), 30);
  }

  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, getResult);
  }
  
  function getResult(error: Error, results: DataModel) {
    if (error) throw(error);
    
    ancientGreeceInterval = results[0].confidence
    brazilianConfidenceInterval = results[1].confidence
    indianConfidenceInterval = results[2].confidence
    ghanaConfidenceInterval = results[3].confidence
    ancientEgyptConfidenceInterval = results[4].confidence
    koreanConfidenceInterval = results[5].confidence

    classifyVideo();
  }

  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} preload={preload} />
    </div>
  );
}

export default App;
