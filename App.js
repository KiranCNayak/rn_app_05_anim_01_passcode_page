import { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { MotiView } from 'moti';

import icon_clear from './assets/clear.png';

const gap = 24;
const flatListTopMargin = 16;

const passCodeLength = 6;

export default function App() {
  const [numArray, setNumArray] = useState([]);

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
          height,
          justifyContent: 'center',
          width: passCodeContainerWidth,
        }}>
        {[...Array(passCodeLength).keys()].map(index => {
          const isNum = typeof numArray[index] === 'number';
          return (
            <MotiView
              key={index}
              style={{
                borderRadius: buttonWidth / 2,
                width: buttonWidth / 2,
                margin: gap / 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              animate={{
                backgroundColor: isNum ? '#fff' : '#aaa',
                height: isNum ? height / 2 : 4,
                marginBottom: isNum ? buttonWidth / 2 : 0,
              }}
              transition={{
                duration: 100,
                type: 'timing',
              }}
            />
          );
        })}
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
            borderColor: '#929292',
            alignItems: 'center',
            justifyContent: 'center',
            ...(item !== '' ? { backgroundColor: '#218120' } : {}),
            borderWidth: typeof item === 'number' ? 3 : 0,
          }}>
          {item !== 'DEL' ? (
            <Text style={{ fontSize, color: 'white' }}>{item}</Text>
          ) : (
            <Image
              source={icon_clear}
              style={{ height: height / 2, width: buttonWidth / 2 }}
              tintColor={'white'}
            />
          )}
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
    backgroundColor: '#116530',
    flex: 1,
    justifyContent: 'center',
  },
});
