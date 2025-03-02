import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { quizzes, getQuizById } from '../data/QuizData';
import Colors from '../constants/Colors';

export default function QuizzesScreen() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizComplete(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({...selectedAnswers, [questionId]: answerId});
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      let totalCorrect = 0;
      selectedQuiz.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctOptionId) {
          totalCorrect += 1;
        }
      });
      
      setScore(totalCorrect);
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizComplete(false);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.quizCard} 
      onPress={() => handleQuizSelect(item)}>
      <Text style={styles.quizTitle}>{item.title}</Text>
      <Text style={styles.quizDescription}>{item.description}</Text>
      <Text style={styles.questionCount}>{item.questions.length} questions</Text>
    </TouchableOpacity>
  );

  const renderCurrentQuestion = () => {
    if (!selectedQuiz) return null;
    
    const question = selectedQuiz.questions[currentQuestionIndex];
    
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionProgress}>Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</Text>
        <Text style={styles.question}>{question.question}</Text>
        
        {question.options.map((option) => (
          <TouchableOpacity 
            key={option.id} 
            style={[
              styles.optionButton, 
              selectedAnswers[question.id] === option.id && styles.selectedOption
            ]}
            onPress={() => handleAnswerSelect(question.id, option.id)}
          >
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity 
          style={[
            styles.nextButton, 
            !selectedAnswers[question.id] && styles.disabledButton
          ]}
          disabled={!selectedAnswers[question.id]}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderQuizResults = () => {
    if (!quizComplete) return null;
    
    const percentage = (score / selectedQuiz.questions.length) * 100;
    let resultMessage = '';
    
    if (percentage === 100) {
      resultMessage = 'Perfect! You\'re a baseball expert!';
    } else if (percentage >= 70) {
      resultMessage = 'Great job! You know your baseball!';
    } else if (percentage >= 50) {
      resultMessage = 'Not bad! Keep learning!';
    } else {
      resultMessage = 'Keep practicing! You\'ll get better!';
    }
    
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quiz Complete!</Text>
        <Text style={styles.resultsScore}>You scored {score} out of {selectedQuiz.questions.length}</Text>
        <Text style={styles.resultsPercentage}>{percentage}%</Text>
        <Text style={styles.resultsMessage}>{resultMessage}</Text>
        
        <TouchableOpacity style={styles.restartButton} onPress={handleRestartQuiz}>
          <Text style={styles.restartButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={handleBackToQuizzes}>
          <Text style={styles.backButtonText}>Back to Quizzes</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!selectedQuiz ? (
          <>
            <Text style={styles.title}>Baseball Quizzes</Text>
            <Text style={styles.subtitle}>Test your knowledge of baseball</Text>
            <FlatList
              data={quizzes}
              renderItem={renderQuizItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.quizList}
            />
          </>
        ) : quizComplete ? (
          renderQuizResults()
        ) : (
          renderCurrentQuestion()
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: { 
    flex: 1,
    padding: 20
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    marginTop: 10,
    color: Colors.text
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 20
  },
  quizList: {
    paddingBottom: 20
  },
  quizCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5
  },
  quizDescription: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 10
  },
  questionCount: {
    fontSize: 14,
    color: Colors.secondary
  },
  questionContainer: {
    flex: 1
  },
  questionProgress: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 10
  },
  question: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: Colors.text
  },
  optionButton: { 
    width: '100%', 
    padding: 15, 
    backgroundColor: Colors.white, 
    marginVertical: 8, 
    borderRadius: 8, 
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: { 
    backgroundColor: '#e6f2ff',
    borderColor: Colors.primary
  },
  optionText: { 
    fontSize: 16,
    color: Colors.text
  },
  nextButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  disabledButton: {
    opacity: 0.5
  },
  nextButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  resultsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text
  },
  resultsScore: {
    fontSize: 20,
    marginBottom: 10,
    color: Colors.text
  },
  resultsPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary
  },
  resultsMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.secondary
  },
  restartButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10
  },
  restartButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  },
  backButton: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%'
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  }
});
