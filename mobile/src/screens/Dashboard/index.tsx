import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TouchableOpacity onPress={signOut}>
        <Text>Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
