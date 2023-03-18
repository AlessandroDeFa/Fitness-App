import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

interface popUpMenuProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  buttonPosition: { x: number; y: number };
  setUpdatePlanModal: (value: boolean) => void;
  showActionSheet: () => void;
}

export const PopUpMenu: React.FC<popUpMenuProps> = ({
  visible,
  setVisible,
  buttonPosition,
  setUpdatePlanModal,
  showActionSheet,
}) => {
  const animationDuration = 150;

  if (!visible) {
    return null;
  }

  const value =
    buttonPosition.x < Dimensions.get("window").width / 2 ? true : false;
  const dynamicStyle = value
    ? { left: buttonPosition.x + 30, top: buttonPosition.y + 3 }
    : { left: buttonPosition.x - 172, top: buttonPosition.y + 3 };
  const dynamicStyleAndroid = value
    ? { left: buttonPosition.x + 30, top: buttonPosition.y + 25 }
    : { left: buttonPosition.x - 172, top: buttonPosition.y + 25 };

  const handleModifyOption = () => {
    setUpdatePlanModal(true);
    setVisible(false);
  };

  return (
    <Animatable.View
      useNativeDriver={false}
      style={[
        styles.popUpContainer,
        Platform.OS === "ios" ? dynamicStyle : dynamicStyleAndroid,
      ]}
      animation="zoomIn"
      duration={animationDuration}
    >
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#323135"
        onPress={handleModifyOption}
        style={styles.firstTouchable}
      >
        <View style={styles.containerOprion}>
          <Text style={{ color: "white", fontSize: 15 }}>Modifica</Text>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={23}
            color="white"
          />
        </View>
      </TouchableHighlight>
      <View style={{}}></View>
      <TouchableHighlight
        activeOpacity={1}
        underlayColor="#323135"
        onPress={showActionSheet}
        style={styles.secondTouchable}
      >
        <View style={styles.containerOprion}>
          <Text style={{ color: "red", fontSize: 15 }}>Elimina</Text>
          <Ionicons name="ios-trash-outline" size={23} color="red" />
        </View>
      </TouchableHighlight>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  popUpContainer: {
    height: 87,
    width: 175,
    position: "absolute",
    justifyContent: "center",
    zIndex: 99,
  },
  firstTouchable: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
    borderBottomWidth: 0.5,
    borderColor: "#3F4040",
  },
  secondTouchable: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    borderBottomRightRadius: 9,
    borderBottomLeftRadius: 9,
  },
  containerOprion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
