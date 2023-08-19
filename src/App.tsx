import './App.css';
import Sketch from 'react-p5';

const ml5 = require('ml5');

function App() {
  let classifier: any;
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/wZm28bHVl/';
  let video: any;
  let flippedVideo: any;
  let label = "";

  const preload = () => {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  const setup = (p5: any, canvasParentRef: any) => {
    ml5.p5Utils.setP5Instance(p5);
    p5.createCanvas(320, 260).parent(canvasParentRef);
    video = p5.createCapture(p5.VIDEO);
    video.size(320, 240);
    video.hide();
    flippedVideo = ml5.flipImage(video)
    classifyVideo();
  }

  const draw = (p5: any) => {
    p5.background(0);
    p5.image(flippedVideo, 0, 0);

    p5.fill(255);
    p5.textSize(16);
    p5.textAlign('CENTER');
    p5.text(label, 100, 100);
  }

  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }
  
  function gotResult(error: any, results: any) {
    if (error) {
      console.error(error);
      return;
    }

    console.log(results);
    label = results[0].label;
    classifyVideo();
  }

  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} preload={preload}/>
    </div>
  );
}

export default App;
