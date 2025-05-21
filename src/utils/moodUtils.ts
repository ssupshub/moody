export const MoodColors = {
  happy: 'mood-joy',
  sad: 'mood-sad',
  angry: 'mood-angry',
  fearful: 'mood-fear',
  surprised: 'mood-joy',
  neutral: 'mood-neutral'
};

export const getMoodDescription = (mood: string): string => {
  switch(mood.toLowerCase()) {
    case 'happy':
      return 'You seem to be in a great mood! We\'ll suggest upbeat, energetic music to keep your positive vibes going.';
    case 'sad':
      return 'We detect that you might be feeling down. We\'ll suggest some comforting music that can help express or lift your mood.';
    case 'angry':
      return 'You seem to have some intense energy! We\'ll suggest music that can help you process or channel those feelings.';
    case 'fearful':
      return 'We sense some anxiety or worry. We\'ll suggest calming music that might help reduce stress and promote relaxation.';
    case 'surprised':
      return 'You seem surprised or excited! We\'ll suggest some dynamic and interesting tracks to match your energy.';
    case 'neutral':
    default:
      return 'Your mood seems balanced. We\'ll suggest a mix of music styles that might resonate with you right now.';
  }
};