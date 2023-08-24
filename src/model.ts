export type DataModel = {
  label: string,
  confidence: number
}[]

    // TODO - delete when not needed
    // console.log(results) in getResult() gives me the following for each type:
    //   [
    //     {
    //         "label": "ancient greece",
    //         "confidence": 0.7369839549064636
    //     },
    //     {
    //         "label": "brazilian",
    //         "confidence": 0.12226172536611557
    //     },
    //     {
    //         "label": "indian",
    //         "confidence": 0.04230986163020134
    //     },
    //     {
    //         "label": "ghana",
    //         "confidence": 0.0380224883556366
    //     },
    //     {
    //         "label": "ancient egypt",
    //         "confidence": 0.03510032966732979
    //     },
    //     {
    //         "label": "korean",
    //         "confidence": 0.025321567431092262
    //     }
    // ]