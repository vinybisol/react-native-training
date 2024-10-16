import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomerListView from './src/components/customers/customer-list-view';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomerListView />
      <StatusBar style="inverted" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
