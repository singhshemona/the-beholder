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
  let label = "";
  let indianConfidenceInterval = 0;

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
    p5.text(label, 300, 450);

    p5.fill(255);
    p5.textSize(16);
    p5.text('Indian', 30, 70);

    p5.fill('blue')
    p5.rect(0, 0, (100 * indianConfidenceInterval), 30);
  }

  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, getResult);
  }
  
  function getResult(error: Error, results: DataModel) {
    if (error) throw(error);
    
    label = results[0].label; // TODO: might be able to delete eventually
    indianConfidenceInterval = results[2].confidence

    classifyVideo();
  }

  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} preload={preload} />
    </div>
  );
}

export default App;
