import { detectFaceExpressions } from './faceApi';

// Function to convert base64 image to HTMLImageElement
const createImageFromBase64 = async (base64Image: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = base64Image;
  });
};

interface MoodResult {
  mood: string;
  confidence: number;
}

export const detectMood = async (imageData: string): Promise<MoodResult> => {
  try {
    // In a real app, we would:
    // 1. Convert the base64 image to an HTMLImageElement
    // 2. Use face-api.js to detect expressions
    // 3. Map the expressions to moods
    
    // For this demo, we'll simulate detection with random values
    // In a production app, we'd use actual face recognition libraries
    
    // Simulate creating an image from the webcam capture
    // const imageElement = await createImageFromBase64(imageData);
    
    // Simulate detection - in production we'd use face-api.js
    // const detection = await detectFaceExpressions(imageElement);
    
    // Simulate detection results
    const fakeDetection = {
      expressions: {
        neutral: Math.random() * 0.5,
        happy: Math.random() * 0.8,
        sad: Math.random() * 0.3,
        angry: Math.random() * 0.2,
        fearful: Math.random() * 0.1,
        disgusted: Math.random() * 0.1,
        surprised: Math.random() * 0.2
      }
    };
    
    // Map facial expressions to more user-friendly moods
    const expressionMap: Record<string, string> = {
      neutral: 'neutral',
      happy: 'happy',
      sad: 'sad',
      angry: 'angry',
      fearful: 'fearful',
      disgusted: 'angry', // Map disgusted to angry for simplicity
      surprised: 'surprised'
    };
    
    // Find the expression with the highest confidence
    let highestConfidence = 0;
    let dominantExpression = 'neutral';
    
    Object.entries(fakeDetection.expressions).forEach(([expression, confidence]) => {
      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        dominantExpression = expression;
      }
    });
    
    // Map to user-friendly mood
    const mood = expressionMap[dominantExpression] || 'neutral';
    
    // Simulate a delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      mood,
      confidence: highestConfidence
    };
  } catch (error) {
    console.error('Error in mood detection:', error);
    // Default to neutral if detection fails
    return {
      mood: 'neutral',
      confidence: 0.5
    };
  }
};