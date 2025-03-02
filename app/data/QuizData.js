// ✅ Add quiz data with questions, options, and correct answers
export const quizzes = [
  {
    id: 1,
    title: 'Baseball Basics',
    description: 'Test your knowledge of basic baseball rules',
    questions: [
      {
        id: 1,
        question: "How many innings are in a regulation baseball game?",
        options: [
          { id: 1, text: "7 innings" },
          { id: 2, text: "9 innings" },
          { id: 3, text: "11 innings" },
          { id: 4, text: "5 innings" },
        ],
        correctOptionId: 2,
      },
      {
        id: 2,
        question: "How many outs are needed to end an inning?",
        options: [
          { id: 1, text: "1 out" },
          { id: 2, text: "2 outs" },
          { id: 3, text: "3 outs" },
          { id: 4, text: "4 outs" },
        ],
        correctOptionId: 3,
      },
      {
        id: 3,
        question: "How many strikes make an out?",
        options: [
          { id: 1, text: "1 strike" },
          { id: 2, text: "2 strikes" },
          { id: 3, text: "3 strikes" },
          { id: 4, text: "4 strikes" },
        ],
        correctOptionId: 3,
      }
    ]
  },
  {
    id: 2,
    title: 'Field Positions',
    description: 'Test your knowledge of baseball positions',
    questions: [
      {
        id: 1,
        question: "Which position is responsible for throwing the ball to the batter?",
        options: [
          { id: 1, text: "Catcher" },
          { id: 2, text: "Pitcher" },
          { id: 3, text: "Shortstop" },
          { id: 4, text: "First Baseman" },
        ],
        correctOptionId: 2,
      },
      {
        id: 2,
        question: "How many outfielders are there in a standard baseball team?",
        options: [
          { id: 1, text: "2 outfielders" },
          { id: 2, text: "3 outfielders" },
          { id: 3, text: "4 outfielders" },
          { id: 4, text: "5 outfielders" },
        ],
        correctOptionId: 2,
      },
      {
        id: 3,
        question: "Which position is located between second and third base?",
        options: [
          { id: 1, text: "Left Fielder" },
          { id: 2, text: "First Baseman" },
          { id: 3, text: "Shortstop" },
          { id: 4, text: "Second Baseman" },
        ],
        correctOptionId: 3,
      }
    ]
  },
  {
    id: 3,
    title: 'Scoring & Gameplay',
    description: 'Test your knowledge of how scoring works in baseball',
    questions: [
      {
        id: 1,
        question: "What is it called when a batter hits the ball over the outfield fence in fair territory?",
        options: [
          { id: 1, text: "Triple" },
          { id: 2, text: "Home run" },
          { id: 3, text: "Grand slam" },
          { id: 4, text: "Foul ball" },
        ],
        correctOptionId: 2,
      },
      {
        id: 2,
        question: "What is a 'walk' in baseball?",
        options: [
          { id: 1, text: "When a batter misses all three strikes" },
          { id: 2, text: "When a batter gets four balls and advances to first base" },
          { id: 3, text: "When a player runs slowly to the base" },
          { id: 4, text: "When a pitcher is replaced" },
        ],
        correctOptionId: 2,
      }
    ]
  }
];

export const getQuizById = (id) => {
  return quizzes.find(quiz => quiz.id === id);
};
