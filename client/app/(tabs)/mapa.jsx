import { WebView } from 'react-native-webview';
//import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import { View, Platform } from "react-native";

export default function Mapa() {
  const mapaUrl = 'http://localhost:5173/mapaprueba';

  return Platform.OS === "web" ? (
    <iframe src={mapaUrl} height={'100%'} width={'100%'} />
  ) : (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: mapaUrl }}
        style={styles.container}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: Constants.statusBarHeight,
  },
});
