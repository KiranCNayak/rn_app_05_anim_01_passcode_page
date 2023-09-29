import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

const gap = 24;
const flatListTopMargin = 16;

const passCodeLength = 6;

export default function App() {
  const [numArray, setNumArray] = useState([]);

  console.log(numArray);

  const { width } = useWindowDimensions();
  const buttonWidth = width / 5;
  const height = buttonWidth;
  const fontSize = buttonWidth * 0.4;
  const passCodeContainerWidth = width * 0.6;

  const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'DEL'];

  const numberContainer = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          width: passCodeContainerWidth,
          height: buttonWidth * 0.6,
        }}>
        {[...Array(passCodeLength).keys()].map(index => (
          <View
            key={index}
            style={{
              borderRadius: buttonWidth / 2,
              width: buttonWidth / 2,
              height: typeof numArray[index] === 'number' ? buttonWidth / 2 : 4,
              margin: gap / 4,
              backgroundColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#666', fontSize: 16 }}>
              {numArray[index]}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const onTouchablePress = item => () => {
    if (typeof item === 'string') {
      // Delete button pressed
      if (numArray.length !== 0) {
        setNumArray(numArray.slice(0, numArray.length - 1));
      }
    } else {
      // If all the numbers are filled as passCode
      if (numArray.length === passCodeLength) return;
      setNumArray([...numArray, item]);
    }
  };

  const DialPadComponent = (
    <FlatList
      data={dialPad}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ gap }}
      columnWrapperStyle={{ gap }}
      numColumns={3}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={item === ''}
          onPress={onTouchablePress(item)}
          style={{
            height,
            width: buttonWidth,
            borderRadius: height / 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: typeof item === 'number' ? 3 : 0,
          }}>
          <Text style={{ fontSize }}>{item}</Text>
        </TouchableOpacity>
      )}
      style={{ flexGrow: 0, marginTop: flatListTopMargin }}
    />
  );

  return (
    <View style={styles.container}>
      <View>{numberContainer()}</View>
      <View>{DialPadComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    marginTop: 36,
  },
});
