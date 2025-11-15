import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const initialMessage = 'Tap the buttons to simulate what happens to the count during an at-bat.';

const CountTracker = () => {
  const [counts, setCounts] = useState({ balls: 0, strikes: 0, outs: 0 });
  const [message, setMessage] = useState(initialMessage);

  const handleBall = () => {
    setCounts((prev) => {
      let { balls, strikes, outs } = prev;
      let nextMessage = '';

      balls += 1;
      if (balls >= 4) {
        nextMessage = 'Ball four! The batter earns a walk and runners advance.';
        balls = 0;
        strikes = 0;
      } else {
        nextMessage = `Ball ${balls}. ${4 - balls} more for a walk.`;
      }

      setMessage(nextMessage);
      return { balls, strikes, outs };
    });
  };

  const handleStrike = () => {
    setCounts((prev) => {
      let { balls, strikes, outs } = prev;
      let nextMessage = '';

      strikes += 1;
      if (strikes >= 3) {
        outs += 1;
        nextMessage = 'Strike three! That\'s an out. Resetting the count.';
        balls = 0;
        strikes = 0;

        if (outs >= 3) {
          nextMessage = 'Strike three! That\'s the third out — inning over!';
          balls = 0;
          strikes = 0;
          outs = 0;
        }
      } else if (strikes === 2) {
        nextMessage = 'Two strikes — the batter must protect the plate!';
      } else {
        nextMessage = 'Strike one. The pitcher jumps ahead in the count.';
      }

      setMessage(nextMessage);
      return { balls, strikes, outs };
    });
  };

  const handleOut = () => {
    setCounts((prev) => {
      let { balls, strikes, outs } = prev;
      let nextMessage = '';

      outs += 1;
      if (outs >= 3) {
        nextMessage = 'Three outs recorded! The teams switch sides.';
        balls = 0;
        strikes = 0;
        outs = 0;
      } else {
        nextMessage = `Out number ${outs}. One step closer to ending the inning.`;
        balls = 0;
        strikes = 0;
      }

      setMessage(nextMessage);
      return { balls, strikes, outs };
    });
  };

  const handleReset = () => {
    setCounts({ balls: 0, strikes: 0, outs: 0 });
    setMessage(initialMessage);
  };

  const renderCountBox = (label, value, icon) => (
    <View style={styles.countBox}>
      <Ionicons name={icon} size={24} color={Colors.primary} />
      <Text style={styles.countLabel}>{label}</Text>
      <Text style={styles.countValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interactive Count Tracker</Text>
      <Text style={styles.subtitle}>Learn how counts reset during real gameplay.</Text>

      <View style={styles.countRow}>
        {renderCountBox('Balls', counts.balls, 'baseball-outline')}
        {renderCountBox('Strikes', counts.strikes, 'flash-outline')}
        {renderCountBox('Outs', counts.outs, 'exit-outline')}
      </View>

      <Text style={styles.message}>{message}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleBall}>
          <Ionicons name="water-outline" size={18} color={Colors.white} />
          <Text style={styles.buttonText}>Add Ball</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleStrike}>
          <Ionicons name="bonfire-outline" size={18} color={Colors.white} />
          <Text style={styles.buttonText}>Add Strike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleOut}>
          <Ionicons name="flag-outline" size={18} color={Colors.white} />
          <Text style={styles.buttonText}>Add Out</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Ionicons name="refresh" size={18} color={Colors.primary} />
        <Text style={styles.resetText}>Reset Count</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CountTracker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 16,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  countBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: Colors.background,
  },
  countLabel: {
    fontSize: 14,
    color: Colors.secondary,
    marginTop: 6,
  },
  countValue: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 2,
  },
  message: {
    fontSize: 15,
    color: Colors.text,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  resetButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  resetText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
