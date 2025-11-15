// screens/HomeScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import {
  dailyTips,
  skillDrills,
  getTipOfDay,
  getHistoryHighlight,
} from '../data/TipsData';

const renderDrillItem = ({ item }) => (
  <View style={styles.drillCard}>
    <View style={styles.drillHeader}>
      <Ionicons name="baseball-outline" size={18} color={Colors.primary} />
      <Text style={styles.drillFocus}>{item.focus}</Text>
      <View style={styles.drillDurationChip}>
        <Ionicons name="time-outline" size={14} color={Colors.primary} />
        <Text style={styles.drillDuration}>{item.duration}</Text>
      </View>
    </View>
    <Text style={styles.drillTitle}>{item.name}</Text>
    <Text style={styles.drillDescription}>{item.description}</Text>
  </View>
);

export default function HomeScreen() {
  const navigation = useNavigation();

  const [tipIndex, setTipIndex] = useState(() => {
    const tipOfDay = getTipOfDay();
    const foundIndex = dailyTips.findIndex((tip) => tip.title === tipOfDay.title);
    return foundIndex >= 0 ? foundIndex : 0;
  });
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentTip = dailyTips[tipIndex] ?? dailyTips[0];
  const historyHighlight = getHistoryHighlight(historyIndex);

  const handleShuffleTip = () => {
    if (dailyTips.length <= 1) {
      return;
    }
    let nextIndex = tipIndex;
    while (nextIndex === tipIndex) {
      nextIndex = Math.floor(Math.random() * dailyTips.length);
    }
    setTipIndex(nextIndex);
  };

  const handleAdvanceHistory = (direction) => {
    setHistoryIndex((prev) => prev + direction);
  };

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
          
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIconContainer}>
                <Ionicons name="bulb-outline" size={26} color={Colors.white} />
              </View>
              <View style={styles.tipTextContainer}>
                <Text style={styles.tipTitle}>Daily Diamond Tip</Text>
                <Text style={styles.tipSubtitle}>Fresh advice every time you open the app</Text>
              </View>
            </View>
            <Text style={styles.tipHeadline}>{currentTip.title}</Text>
            <Text style={styles.tipBody}>{currentTip.description}</Text>
            <TouchableOpacity style={styles.tipButton} onPress={handleShuffleTip}>
              <Ionicons name="shuffle-outline" size={18} color={Colors.primary} />
              <Text style={styles.tipButtonText}>Show another tip</Text>
            </TouchableOpacity>
          </View>

          {historyHighlight && (
            <View style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Ionicons name="time" size={20} color={Colors.primary} />
                <Text style={styles.historyTitle}>History Spotlight</Text>
              </View>
              <Text style={styles.historyYear}>{historyHighlight.year}</Text>
              <Text style={styles.historyHeadline}>{historyHighlight.title}</Text>
              <Text style={styles.historyBody}>{historyHighlight.blurb}</Text>
              <View style={styles.historyActions}>
                <TouchableOpacity style={styles.historyButton} onPress={() => handleAdvanceHistory(-1)}>
                  <Ionicons name="chevron-back" size={18} color={Colors.primary} />
                  <Text style={styles.historyButtonText}>Earlier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.historyButton} onPress={() => handleAdvanceHistory(1)}>
                  <Text style={styles.historyButtonText}>Later</Text>
                  <Ionicons name="chevron-forward" size={18} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          )}

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

          <View>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Practice Drills</Text>
                <View style={styles.sectionBadge}>
                  <Ionicons name="star-outline" size={14} color={Colors.white} />
                  <Text style={styles.sectionBadgeText}>New</Text>
                </View>
              </View>
            <FlatList
              data={skillDrills}
              renderItem={renderDrillItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.drillList}
            />
          </View>

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
  tipCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  tipSubtitle: {
    fontSize: 12,
    color: Colors.secondary,
  },
  tipHeadline: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  tipBody: {
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tipButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  historyCard: {
    backgroundColor: '#fff4e6',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  historyYear: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  historyHeadline: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: Colors.text,
  },
  historyBody: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  historyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  historyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginHorizontal: 4,
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 16,
  },
  sectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sectionBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  drillList: {
    paddingBottom: 4,
  },
  drillCard: {
    width: 250,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  drillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  drillFocus: {
    fontSize: 12,
    color: Colors.secondary,
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  drillDurationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  drillDuration: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: 4,
  },
  drillTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  drillDescription: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
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
