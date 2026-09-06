import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

let sharedRef: { show?: (msg: string) => void } = {};
export function showTopToast(message: string) {
  sharedRef.show && sharedRef.show(message);
}

export default function TopToast() {
  const [msg, setMsg] = React.useState<string | null>(null);
  const translateY = React.useRef(new Animated.Value(-80)).current;

  React.useEffect(() => {
    sharedRef.show = (m: string) => {
      setMsg(m);
      Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }).start();
      setTimeout(() => {
        Animated.timing(translateY, { toValue: -80, duration: 200, useNativeDriver: true }).start(() => setMsg(null));
      }, 2500);
    };
    return () => { sharedRef.show = undefined; };
  }, []);

  if (!msg) return null;
  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}> 
      <Text style={styles.text}>{msg}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 12,
    right: 12,
    padding: 12,
    backgroundColor: '#111827',
    borderRadius: 8,
    zIndex: 999,
    elevation: 6,
  },
  text: { color: 'white', textAlign: 'center', fontWeight: '600' },
});
