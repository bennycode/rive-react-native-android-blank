import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Platform } from "react-native";
import { useAssets } from "expo-asset";
import Rive from "rive-react-native";

export default function App() {
  const riveRef = useRef(null);
  const [assets, error] = useAssets([
    require("./assets/riv/download_animation.riv"),
  ]);
  const isIos = Platform.OS === "ios";
  const url = isIos ? assets?.[0]?.localUri : undefined;
  console.log({ url });
  const handleStop = () => {
    riveRef.current?.stop();
  };
  const handlePlay = () => {
    riveRef.current?.play();
  };
  const handleDownloaded = () => {
    riveRef.current?.fireState("downloadAnimation", "downloaded");
  };

  return (
    <View style={styles.container}>
      {url !== "" && url ? (
        <Rive
          style={{ backgroundColor: "red", flex: 1, margin: 20 }}
          ref={riveRef}
          url={url}
          autoplay={false}
          stateMachineName="downloadAnimation"
          onStateChanged={(stateMachineName, stateName) => {
            console.log(
              "onStateChanged: ",
              "stateMachineName: ",
              stateMachineName,
              "stateName: ",
              stateName
            );
          }}
        />
      ) : (
        <Rive
          style={{ backgroundColor: "red", flex: 1, margin: 20 }}
          ref={riveRef}
          resourceName="download_animation"
          autoplay={false}
          stateMachineName="downloadAnimation"
          onStateChanged={(stateMachineName, stateName) => {
            console.log(
              "onStateChanged: ",
              "stateMachineName: ",
              stateMachineName,
              "stateName: ",
              stateName
            );
          }}
        />
      )}
      <Button onPress={handleStop} title="Stop" />
      <Button onPress={handlePlay} title="Play" />
      <Button onPress={handleDownloaded} title="Downloaded" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
