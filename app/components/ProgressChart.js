import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from '../constants/Colors';

// ✅ Create component using react-native-svg for progress charts
const ProgressCircle = ({ progress, size, strokeWidth, color, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <View style={[styles.progressContainer, { width: size, height: size }]}>
      <View style={styles.textContainer}>
        <Text style={styles.progressText}>{progress}%</Text>
        <Text style={styles.progressLabel}>{label}</Text>
      </View>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
    </View>
  );
};

export default function ProgressChart({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Learning Progress</Text>
      
      <View style={styles.chartsContainer}>
        {data.map((item, index) => (
          <ProgressCircle
            key={index}
            progress={item.progress}
            size={120}
            strokeWidth={10}
            color={item.color}
            label={item.label}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text,
    textAlign: 'center'
  },
  chartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginVertical: 10
  },
  progressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text
  },
  progressLabel: {
    fontSize: 12,
    color: Colors.secondary
  }
});
