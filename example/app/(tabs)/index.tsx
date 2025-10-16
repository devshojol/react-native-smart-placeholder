import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "react-native-smart-placeholder";

const Home = () => {
  return (
    <SafeAreaView>
      <MyButton title="Press Me" onPress={() => console.log("Pressed!")} />
    </SafeAreaView>
  );
};

export default Home;
