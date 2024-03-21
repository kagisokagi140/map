import { pipeline } from '@xenova/transformers';
const tweets = [
      {
        "id": 1,
        "text": "Avoid route 101, there's a major accident causing heavy traffic.",
        "category": "accident"
      },
      {
        "id": 2,
        "text": "Protesters have blocked off Main Street. Find an alternate route.",
        "category": "riots"
      },
      {
        "id": 3,
        "text": "Due to roadblocks on Highway 5, expect significant delays.",
        "category": "roadblocks"
      },
      {
        "id": 4,
        "text": "Route 66 is clear and fast today, no issues reported.",
        "category": "none"
      },
      {
        "id": 5,
        "text": "Heavy police presence on Oak Avenue, possibly due to a protest. Take caution.",
        "category": "riots"
      },
      {
        "id": 6,
        "text": "Accident on the intersection of Elm and Maple, traffic backed up for miles.",
        "category": "accident"
      }
    ]
  
  

// Allocate a pipeline for sentiment-analysis
let pipe = await pipeline('sentiment-analysis');

let out = await pipe('I love transformers!');
// [{'label': 'POSITIVE', 'score': 0.999817686}]

console.log(out);