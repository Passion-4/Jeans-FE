import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HelpOverlay from './HelpOverlay';

export default function HelpButton() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setShowHelp(true)} style={{ marginRight: 150 , marginTop: 20, paddingHorizontal: 5,}}>
        <Ionicons name="book-outline" size={35} color="black" />
      </TouchableOpacity>

      {showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}
    </View>
  );
}
