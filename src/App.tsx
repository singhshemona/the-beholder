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
  let brazilConfidenceInterval = 0;
  let indiaConfidenceInterval = 0;
  let ghanaConfidenceInterval = 0;
  let ancientEgyptConfidenceInterval = 0;
  let koreaConfidenceInterval = 0;

  const preload = () => {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  const setup = (p5: P5, canvasParentRef: any) => {
    ml5.p5Utils.setP5Instance(p5);
    p5.createCanvas(600, 700).parent(canvasParentRef);
    video = p5.createCapture(p5.VIDEO);
    video.size(500, 370);
    video.hide();
    flippedVideo = ml5.flipImage(video);
    classifyVideo();
  }

  const draw = (p5: P5) => {
    p5.background('#F7F7F8');
    p5.image(flippedVideo, 0, 30);

    // white background behind colors
    p5.fill('white');
    p5.noStroke();
    p5.rect(0, 410, 500, 260, 3);

    drawLabel(p5, '#DDB771', 'Ancient Greece', 440);
    drawBackground(p5, '#DDB771', 425, ancientGreeceInterval);

    drawLabel(p5, '#23967F', 'Brazil', 480);
    drawBackground(p5, '#23967F', 465, brazilConfidenceInterval);

    drawLabel(p5, '#3772FF', 'India', 520);
    drawBackground(p5, '#3772FF', 505, indiaConfidenceInterval);

    drawLabel(p5, '#621A74', 'Ghana', 560);
    drawBackground(p5, '#621A74', 545, ghanaConfidenceInterval);

    drawLabel(p5, '#97BC4E', 'Ancient Egypt', 600);
    drawBackground(p5, '#97BC4E', 585, ancientEgyptConfidenceInterval);

    drawLabel(p5, '#CE4B27', 'Korea', 640);
    drawBackground(p5, '#CE4B27', 625, koreaConfidenceInterval);
  }

  const classifyVideo = () => {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, getResult);
  }
  
  const getResult = (error: Error, results: DataModel) => {
    if (error) throw(error);
    
    ancientGreeceInterval = results[0].confidence;
    brazilConfidenceInterval = results[1].confidence;
    indiaConfidenceInterval = results[2].confidence;
    ghanaConfidenceInterval = results[3].confidence;
    ancientEgyptConfidenceInterval = results[4].confidence;
    koreaConfidenceInterval = results[5].confidence;

    classifyVideo();
  }
  
  const drawLabel = (p5: P5, fill: string, label: string, yPos: number) => {
    p5.fill(fill);
    p5.textSize(14);
    p5.textStyle(p5.BOLD);
    p5.text(label, 15, yPos);
  }

  const drawBackground = (p5: P5, fill: string, yPos: number, interval: number) => {
    p5.fill(fill);
    p5.noStroke();
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
