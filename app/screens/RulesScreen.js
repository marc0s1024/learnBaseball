// screens/RulesScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import CountTracker from '../components/CountTracker';

export default function RulesScreen() {
  const [expandedSection, setExpandedSection] = useState('basics');

  const strategyHighlights = [
    {
      id: 'approach',
      icon: 'analytics-outline',
      title: 'Work the Count',
      description: 'Lay off borderline pitches early and force the pitcher to throw a strike you can drive.'
    },
    {
      id: 'defense',
      icon: 'shield-checkmark-outline',
      title: 'Defensive Positioning',
      description: 'Notice the number of outs. With two outs, infielders can play deeper knowing runners go on contact.'
    },
    {
      id: 'baserunning',
      icon: 'walk-outline',
      title: 'Smart Baserunning',
      description: 'Know if the force is on. With fewer than two outs, a ground ball means run hard and slide through the base.'
    }
  ];
  
  const rules = {
    basics: [
      { id: 1, text: "Baseball is played between two teams of 9 players each." },
      { id: 2, text: "The game is divided into 9 innings." },
      { id: 3, text: "Each team gets a turn to bat (offense) and to field (defense) in each inning." },
      { id: 4, text: "The team with the most runs at the end of 9 innings wins." },
      { id: 5, text: "If the game is tied after 9 innings, extra innings are played." },
    ],
    scoring: [
      { id: 1, text: "A run is scored when a player advances around all bases and returns to home plate." },
      { id: 2, text: "A home run is scored when a batter hits the ball out of play in fair territory, allowing them to circle all bases." },
      { id: 3, text: "A grand slam is a home run hit with the bases loaded (runners on first, second, and third base)." },
      { id: 4, text: "If the score is tied at the end of the 9th inning, the game goes into extra innings." },
    ],
    batting: [
      { id: 1, text: "Each team bats in a specific order, known as the batting lineup." },
      { id: 2, text: "A strike is recorded when the batter swings and misses or doesn't swing at a pitch in the strike zone." },
      { id: 3, text: "A ball is recorded when the pitch is outside the strike zone and the batter doesn't swing." },
      { id: 4, text: "Three strikes result in an out." },
      { id: 5, text: "Four balls result in a walk to first base." },
      { id: 6, text: "A foul ball counts as a strike, unless the batter already has two strikes." },
    ],
    fielding: [
      { id: 1, text: "The defense must record three outs to end the offensive team's batting turn." },
      { id: 2, text: "An out can be recorded by striking out a batter, catching a hit ball before it touches the ground, or tagging a base before a forced runner reaches it." },
      { id: 3, text: "A double play is when the defense records two outs in one continuous play." },
      { id: 4, text: "The infield fly rule is called when there are runners on first and second (or bases loaded) with less than two outs, and the batter hits a pop fly that can be caught by an infielder. The batter is automatically out." },
    ],
    pitching: [
      { id: 1, text: "The pitcher must have one foot on the pitcher's rubber when delivering the pitch." },
      { id: 2, text: "A balk is an illegal act by the pitcher with runners on base, resulting in advancement of the runners." },
      { id: 3, text: "Different types of pitches include fastballs, curveballs, sliders, and changeups." },
      { id: 4, text: "The strike zone is the area over home plate between the batter's knees and the midpoint between the shoulders and the top of the pants." },
    ],
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderSection = (title, sectionKey, icon) => {
    const isExpanded = expandedSection === sectionKey;
    
    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity 
          style={[styles.sectionHeader, isExpanded && styles.expandedHeader]} 
          onPress={() => toggleSection(sectionKey)}
        >
          <Ionicons name={icon} size={22} color={isExpanded ? Colors.white : Colors.primary} />
          <Text style={[styles.sectionTitle, isExpanded && styles.expandedTitle]}>{title}</Text>
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={22} 
            color={isExpanded ? Colors.white : Colors.secondary}
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.sectionContent}>
            {rules[sectionKey].map((rule) => (
              <View key={rule.id} style={styles.ruleContainer}>
                <Text style={styles.ruleNumber}>{rule.id}</Text>
                <Text style={styles.ruleText}>{rule.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Baseball Rules</Text>
        <Text style={styles.subtitle}>Tap on a section to learn more</Text>

        <CountTracker />

        <View style={styles.strategyCard}>
          <Text style={styles.strategyTitle}>Situational Strategy</Text>
          <Text style={styles.strategySubtitle}>
            Understanding the game state helps you make winning choices on both sides of the ball.
          </Text>
          {strategyHighlights.map((item) => (
            <View key={item.id} style={styles.strategyRow}>
              <View style={styles.strategyIconCircle}>
                <Ionicons name={item.icon} size={18} color={Colors.white} />
              </View>
              <View style={styles.strategyTextContainer}>
                <Text style={styles.strategyItemTitle}>{item.title}</Text>
                <Text style={styles.strategyItemDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {renderSection("Basic Rules", "basics", "baseball-outline")}
        {renderSection("Scoring", "scoring", "trophy-outline")}
        {renderSection("Batting", "batting", "golf-outline")}
        {renderSection("Fielding", "fielding", "hand-left-outline")}
        {renderSection("Pitching", "pitching", "body-outline")}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Swipe up for more content</Text>
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
  container: { 
    flex: 1,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginVertical: 10,
    marginHorizontal: 20,
    color: Colors.text
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 20,
    marginHorizontal: 20
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  expandedHeader: {
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: Colors.text
  },
  expandedTitle: {
    color: Colors.white
  },
  sectionContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  ruleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start'
  },
  ruleNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    fontSize: 12,
    fontWeight: 'bold'
  },
  ruleText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22
  },
  footer: {
    padding: 20,
    alignItems: 'center'
  },
  footerText: {
    color: Colors.secondary,
    fontSize: 14
  },
  strategyCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  strategyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  strategySubtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  strategyRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  strategyIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  strategyTextContainer: {
    flex: 1,
  },
  strategyItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  strategyItemDescription: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  }
});
