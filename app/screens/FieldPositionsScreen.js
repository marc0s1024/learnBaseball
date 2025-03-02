// screens/FieldPositionsScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

export default function FieldPositionsScreen() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  
  const positions = [
    {
      id: 1, 
      number: 1,
      title: "Pitcher",
      description: "The pitcher stands at the center of the infield on a mound and is responsible for throwing the ball to the batter. Their goal is to get the batter out either by strikeout or by forcing them to hit the ball to a fielder who then makes an out.",
      skills: ["Accurate throwing", "Variable pitch types", "Quick reflexes", "Mental toughness"],
      location: "Center of the diamond on the pitcher's mound"
    },
    {
      id: 2, 
      number: 2,
      title: "Catcher",
      description: "The catcher plays behind home plate and catches pitches thrown by the pitcher. They are responsible for calling pitches, directing the defense, and preventing stolen bases.",
      skills: ["Quick reflexes", "Strong arm", "Baseball IQ", "Leadership", "Ability to block wild pitches"],
      location: "Behind home plate"
    },
    {
      id: 3, 
      number: 3,
      title: "First Baseman",
      description: "The first baseman is positioned near first base and is primarily responsible for catching throws from infielders to record outs, fielding ground balls near first base, and holding runners at first base.",
      skills: ["Good catching ability", "Flexibility", "Quick reflexes", "Good footwork around the base"],
      location: "On or near first base"
    },
    {
      id: 4, 
      number: 4,
      title: "Second Baseman",
      description: "The second baseman covers the area between first and second base. They are responsible for fielding ground balls in their area, turning double plays with the shortstop, and covering second base when needed.",
      skills: ["Quick lateral movement", "Strong arm", "Fast hands for double plays", "Good range"],
      location: "Between first and second base"
    },
    {
      id: 5, 
      number: 6,
      title: "Shortstop",
      description: "The shortstop covers the area between second and third base. This is often considered the most demanding defensive position due to the quick reactions and strong arm required.",
      skills: ["Strong arm", "Quick reactions", "Good range", "Accurate throwing"],
      location: "Between second and third base"
    },
    {
      id: 6, 
      number: 5,
      title: "Third Baseman",
      description: "The third baseman covers the area near third base and is responsible for fielding ground balls and line drives. This position is sometimes called the 'hot corner' due to the quick reactions required.",
      skills: ["Strong arm", "Quick reactions", "Good reflexes", "Ability to field bunts"],
      location: "Near third base"
    },
    {
      id: 7, 
      number: 7,
      title: "Left Fielder",
      description: "The left fielder plays in the outfield on the left side of the field. They are responsible for catching fly balls and fielding ground balls that make it through the infield.",
      skills: ["Good speed", "Strong arm", "Ability to judge fly balls", "Accurate throwing"],
      location: "Left side of the outfield"
    },
    {
      id: 8, 
      number: 8,
      title: "Center Fielder",
      description: "The center fielder plays in the middle of the outfield and typically covers the most ground. They are often the fastest outfielder and serve as the captain of the outfield.",
      skills: ["Excellent speed", "Good arm strength", "Great defensive range", "Leadership"],
      location: "Center of the outfield"
    },
    {
      id: 9, 
      number: 9,
      title: "Right Fielder",
      description: "The right fielder plays in the outfield on the right side. They typically have the strongest arm among outfielders since they often need to make long throws to third base.",
      skills: ["Strong arm", "Good speed", "Ability to judge fly balls", "Power hitting (traditionally)"],
      location: "Right side of the outfield"
    },
  ];

  const handlePositionPress = (position) => {
    setSelectedPosition(position);
  };

  const closeModal = () => {
    setSelectedPosition(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Field Positions</Text>
        <Text style={styles.description}>
          Learn about the different positions on a baseball field. Tap on a position to learn more.
        </Text>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Baseball_field_overview.svg/800px-Baseball_field_overview.svg.png' }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.positionsContainer}>
          {positions.map((position) => (
            <TouchableOpacity 
              key={position.id} 
              style={styles.positionCard}
              onPress={() => handlePositionPress(position)}
            >
              <View style={styles.positionNumber}>
                <Text style={styles.numberText}>{position.number}</Text>
              </View>
              <View style={styles.positionInfo}>
                <Text style={styles.positionTitle}>{position.title}</Text>
                <Text style={styles.positionLocation}>{position.location}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <Modal
        visible={selectedPosition !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        {selectedPosition && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={[styles.positionNumber, styles.modalNumber]}>
                  <Text style={styles.numberText}>{selectedPosition.number}</Text>
                </View>
                <Text style={styles.modalTitle}>{selectedPosition.title}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.modalScrollContent}>
                <Text style={styles.modalSubtitle}>Description</Text>
                <Text style={styles.modalDescription}>{selectedPosition.description}</Text>
                
                <Text style={styles.modalSubtitle}>Skills Required</Text>
                {selectedPosition.skills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
                
                <Text style={styles.modalSubtitle}>Field Location</Text>
                <Text style={styles.modalDescription}>{selectedPosition.location}</Text>
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>
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
    color: Colors.text
  },
  description: { 
    fontSize: 16, 
    marginBottom: 20,
    color: Colors.secondary
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  image: { 
    width: '100%', 
    height: 200, 
  },
  positionsContainer: {
    marginBottom: 20
  },
  positionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  positionNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  numberText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  positionInfo: {
    flex: 1
  },
  positionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4
  },
  positionLocation: {
    fontSize: 14,
    color: Colors.secondary
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    padding: 20
  },
  modalNumber: {
    marginRight: 15
  },
  modalTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text
  },
  closeButton: {
    padding: 5
  },
  modalScrollContent: {
    padding: 20
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
    color: Colors.primary
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
    marginBottom: 15
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  skillText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.text
  }
});
