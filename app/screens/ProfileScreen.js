// screens/ProfileScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import ProgressChart from '../components/ProgressChart';

export default function ProfileScreen() {
  // Dummy profile data
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/150", // Replace with your own image or URL
  });

  // Mock progress data
  const progressData = [
    { label: 'Rules', progress: 75, color: Colors.primary },
    { label: 'Positions', progress: 60, color: '#ff9800' },
    { label: 'Quizzes', progress: 40, color: '#4caf50' },
  ];

  // Mock recent activities
  const recentActivities = [
    { type: 'quiz', title: 'Baseball Basics Quiz', result: '3/5 correct', date: '2 days ago' },
    { type: 'rule', title: 'Learned about Innings', date: '3 days ago' },
    { type: 'position', title: 'Explored Pitcher Role', date: '5 days ago' },
  ];

  const averageProgress = useMemo(() => {
    if (progressData.length === 0) return 0;
    const total = progressData.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(total / progressData.length);
  }, [progressData]);

  const achievements = [
    {
      id: 'rules',
      title: 'Rule Rookie',
      description: 'Score 70% or better understanding the rulebook.',
      unlocked: progressData.find((item) => item.label === 'Rules')?.progress >= 70,
    },
    {
      id: 'positions',
      title: 'Diamond Navigator',
      description: 'Master where every player lines up on the field.',
      unlocked: progressData.find((item) => item.label === 'Positions')?.progress >= 60,
    },
    {
      id: 'quizzes',
      title: 'Clutch Performer',
      description: 'Finish a quiz with at least 80% correct answers.',
      unlocked: progressData.find((item) => item.label === 'Quizzes')?.progress >= 80,
    },
  ];

  const renderActivityIcon = (type) => {
    switch(type) {
      case 'quiz':
        return <Ionicons name="help-circle" size={20} color={Colors.primary} />;
      case 'rule':
        return <Ionicons name="book" size={20} color="#ff9800" />;
      case 'position':
        return <Ionicons name="baseball" size={20} color="#4caf50" />;
      default:
        return <Ionicons name="ellipse" size={20} color={Colors.secondary} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          <ProgressChart data={progressData} />

          <View style={styles.highlightsCard}>
            <View style={styles.highlightsHeader}>
              <Ionicons name="speedometer-outline" size={22} color={Colors.primary} />
              <Text style={styles.highlightsTitle}>Momentum Tracker</Text>
            </View>
            <Text style={styles.highlightsValue}>{averageProgress}% complete</Text>
            <Text style={styles.highlightsSubtitle}>
              Keep pushing! Completing quizzes and reading rule summaries fills the progress wheel faster.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivities.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={styles.activityIconContainer}>
                  {renderActivityIcon(activity.type)}
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  {activity.result && <Text style={styles.activityResult}>{activity.result}</Text>}
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="notifications-outline" size={20} color={Colors.text} />
              <Text style={styles.settingsButtonText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="globe-outline" size={20} color={Colors.text} />
              <Text style={styles.settingsButtonText}>Language</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="help-circle-outline" size={20} color={Colors.text} />
              <Text style={styles.settingsButtonText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[styles.achievementItem, achievement.unlocked ? styles.achievementUnlocked : styles.achievementLocked]}
              >
                <Ionicons
                  name={achievement.unlocked ? 'trophy' : 'trophy-outline'}
                  size={22}
                  color={achievement.unlocked ? Colors.success : Colors.secondary}
                />
                <View style={styles.achievementTextContainer}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
                <Ionicons
                  name={achievement.unlocked ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={achievement.unlocked ? Colors.success : Colors.secondary}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  container: { 
    flex: 1,
    padding: 20 
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20
  },
  avatar: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    marginBottom: 20 
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  email: { 
    fontSize: 16, 
    marginBottom: 20 
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16 
  },
  section: {
    marginVertical: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  activityIconContainer: {
    marginRight: 10
  },
  activityContent: {
    flex: 1
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  activityResult: {
    fontSize: 14,
    color: Colors.secondary
  },
  activityDate: {
    fontSize: 12,
    color: Colors.text
  },
  highlightsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  highlightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  highlightsValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 6,
  },
  highlightsSubtitle: {
    fontSize: 14,
    color: Colors.secondary,
    lineHeight: 20,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border
  },
  settingsButtonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  achievementUnlocked: {
    backgroundColor: '#e9f8ef',
  },
  achievementLocked: {
    backgroundColor: Colors.background,
  },
  achievementTextContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: Colors.secondary,
  }
});
