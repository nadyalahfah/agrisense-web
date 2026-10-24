import * as tf from "@tensorflow/tfjs";
import { CLASS_NAMES } from "./classes";

export async function predictImage(model, imageElement) {
  const input = tf.tidy(() => {
    return tf.browser
      .fromPixels(imageElement)
      .resizeBilinear([224, 224])
      .toFloat()
      .div(255)
      .expandDims(0);
  });

  const predictions = await model.predict(input).data();
  
  input.dispose(); 

  let maxIdx = 0;
  for (let i = 1; i < predictions.length; i++) {
    if (predictions[i] > predictions[maxIdx]) maxIdx = i;
  }

  return {
    label: CLASS_NAMES[maxIdx] || `Class ${maxIdx}`,
    confidence: predictions[maxIdx],
    allScores: Array.from(predictions).map((score, idx) => ({
      label: CLASS_NAMES[idx] || `Class ${idx}`,
      score,
    })),
  };
}