import Sketch from 'react-p5';
import P5 from 'p5';
import { DataModel } from './model';
import Intro from './Intro';

const ml5 = require('ml5');

const App = () => {
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
    p5.createCanvas(600, 650).parent(canvasParentRef);
    video = p5.createCapture(p5.VIDEO);
    video.size(500, 370);
    video.hide();
    flippedVideo = ml5.flipImage(video)
    classifyVideo();
  }

  const draw = (p5: P5) => {
    p5.background('white');
    p5.image(flippedVideo, 0, 0);

    drawLabel(p5, 'Ancient Greece', 410);
    drawBackground(p5, 'blue', 395, ancientGreeceInterval);

    drawLabel(p5, 'Brazilian', 450);
    drawBackground(p5, 'yellow', 435, brazilianConfidenceInterval);

    drawLabel(p5, 'Indian', 490);
    drawBackground(p5, 'green', 475, indianConfidenceInterval);

    drawLabel(p5, 'Ghana', 530);
    drawBackground(p5, 'pink', 515, ghanaConfidenceInterval);

    drawLabel(p5, 'Ancient Egypt', 570);
    drawBackground(p5, 'orange', 555, ancientEgyptConfidenceInterval);

    drawLabel(p5, 'Korean', 610);
    drawBackground(p5, 'purple', 595, koreanConfidenceInterval);
  }

  const classifyVideo = () => {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, getResult);
  }
  
  const getResult = (error: Error, results: DataModel) => {
    if (error) throw(error);
    
    ancientGreeceInterval = results[0].confidence
    brazilianConfidenceInterval = results[1].confidence
    indianConfidenceInterval = results[2].confidence
    ghanaConfidenceInterval = results[3].confidence
    ancientEgyptConfidenceInterval = results[4].confidence
    koreanConfidenceInterval = results[5].confidence

    classifyVideo();
  }
  
  const drawLabel = (p5: P5, label: string, yPos: number) => {
    p5.fill('black');
    p5.textSize(14);
    p5.text(label, 15, yPos);
  }

  const drawBackground = (p5: P5, fill: string, yPos: number, interval: number) => {
    p5.fill(fill)
    p5.rect(125, yPos, (100 * interval), 20, 3);
  }

  return (
    <div className="all-content">
      <Intro />
      <Sketch setup={setup} draw={draw} preload={preload} />
    </div>
  );
}

export default App;
