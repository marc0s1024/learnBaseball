// screens/ProfileScreen.js
import React, { useState } from 'react';
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
    backgroundColor: '#007bff', 
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
  }
});
