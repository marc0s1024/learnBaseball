export const dailyTips = [
  {
    title: 'Track the Count',
    description:
      'Work on recognizing the count quickly. Knowing whether the pitcher is ahead or behind helps you anticipate the next pitch.'
  },
  {
    title: 'Ready Position Basics',
    description:
      'Set your feet shoulder-width apart with your glove relaxed and eyes on the ball. This athletic stance keeps you quick on defense.'
  },
  {
    title: 'Smart Base Running',
    description:
      'Watch the third-base coach and read the ball off the bat. Anticipating hits lets you take extra bases safely.'
  },
  {
    title: 'Communicate Loudly',
    description:
      'Call for fly balls early using short phrases like “Mine!” to avoid collisions and boost team confidence.'
  }
];

export const skillDrills = [
  {
    id: 'soft-toss',
    name: 'Soft Toss Warmup',
    focus: 'Batting Rhythm',
    duration: '10 min',
    description:
      'Work with a partner to toss balls from the side. Focus on smooth swings and driving the ball back up the middle.'
  },
  {
    id: 'ladder-feet',
    name: 'Agility Ladder',
    focus: 'Footwork',
    duration: '8 min',
    description:
      'Use an agility ladder or tape boxes on the ground. Quick feet translate to faster jumps on line drives.'
  },
  {
    id: 'bullpen',
    name: 'Bullpen Routine',
    focus: 'Pitch Command',
    duration: '12 min',
    description:
      'Alternate fastballs and changeups to all four quadrants of the plate. Chart results to learn which spots need work.'
  },
  {
    id: 'relay-throws',
    name: 'Relay Throws',
    focus: 'Outfield Arm Strength',
    duration: '15 min',
    description:
      'Set up a cutoff partner halfway to the infield and practice quick transfers. Aim for chest-high throws every time.'
  }
];

export const historyMoments = [
  {
    year: 1846,
    title: 'First Recorded Game',
    blurb:
      'Alexander Cartwright\'s Knickerbocker Club faced the New York Nine in Hoboken, setting the template for the modern game.'
  },
  {
    year: 1947,
    title: 'Barriers Broken',
    blurb:
      'Jackie Robinson debuted for the Brooklyn Dodgers, integrating Major League Baseball and inspiring generations of players.'
  },
  {
    year: 2004,
    title: 'The Comeback',
    blurb:
      'The Boston Red Sox rallied from an 0-3 deficit in the ALCS, the first team to do so, on their way to a historic title.'
  }
];

export const getTipOfDay = (date = new Date()) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return dailyTips[dayOfYear % dailyTips.length];
};

export const getHistoryHighlight = (index) => {
  if (historyMoments.length === 0) {
    return null;
  }
  const safeIndex = ((index % historyMoments.length) + historyMoments.length) % historyMoments.length;
  return historyMoments[safeIndex];
};
