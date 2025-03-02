// screens/HomeScreen.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

export default function HomeScreen() {
  const navigation = useNavigation();

  const menuItems = [
    {
      title: 'Learn the Rules',
      description: 'Basic rules of baseball explained',
      icon: <Ionicons name="book" size={32} color={Colors.primary} />,
      screen: 'Rules'
    },
    {
      title: 'Field Positions',
      description: 'Learn about different positions in baseball',
      icon: <MaterialCommunityIcons name="baseball" size={32} color={Colors.primary} />,
      screen: 'Field/Positions'
    },
    {
      title: 'Test Your Knowledge',
      description: 'Take quizzes and improve your baseball knowledge',
      icon: <Ionicons name="help-circle" size={32} color={Colors.primary} />,
      screen: 'Quizzes'
    },
    {
      title: 'Your Progress',
      description: 'Track your learning journey',
      icon: <Ionicons name="person" size={32} color={Colors.primary} />,
      screen: 'Profile'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1508344928928-7165b0c40e87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }} 
            style={styles.bannerImage}
          />
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Baseball Rules 101</Text>
            <Text style={styles.subtitle}>Master America's Favorite Pastime</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Get Started</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  {item.icon}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
              </View>
            </TouchableOpacity>
          ))}
          
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Swipe through the tabs below to explore</Text>
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
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16
  },
  headerContainer: {
    marginBottom: 24
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: Colors.secondary,
    textAlign: 'center',
    marginTop: 8
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.text
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.secondary
  },
  footerContainer: {
    marginTop: 8,
    marginBottom: 30,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: 'center'
  }
});
