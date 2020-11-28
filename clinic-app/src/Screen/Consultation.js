import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Daily from "~/Component/Consultation/Daily";
import Weekly from "~/Component/Consultation/Weekly";
import Monthly from "~/Component/Consultation/Monthly";
import Container from "~/Component/Common/Container";
import { UserContext } from "~/Context/User";
import { config } from "~/Config";

const VIEWS = ["daily", "weekly", "monthly"];

const Home = ({ navigation }) => {
  const { userInfo, logout } = useContext(UserContext);
  const [consultations, setConsultations] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const routes = VIEWS.map((view, idx) => ({
    key: view,
    title: view,
    index: idx,
  }));

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        const res = await axios.get(config.host + "/api/consultations", {
          headers: {
            Authorization: "Bearer " + userInfo?.accessToken,
          },
          params: {
            userId: userInfo?.id,
          },
        });
        console.log(res?.data?.data);
        if (res?.data?.data) {
          setConsultations(res?.data?.data);
        }
      } catch (err) {
        console.log(err);
        Alert.alert(err?.response?.data?.message, "", [
          {
            text: "OK",
            onPress: () => (err?.response?.status === 401 ? logout() : {}),
            style: "cancel",
          },
        ]);
      }
    });
    return unsubscribe;
  }, [userInfo?.id]);

  const _handleIndexChange = useCallback((index) => setTabIndex(index), []);

  const renderScene = useCallback(({ route }) => {
    switch (route.key) {
      case "daily":
        return <Daily data={consultations} />;
      case "weekly":
        return <Weekly data={consultations} />;
      case "monthly":
        return <Monthly data={consultations} />;
    }
  }, [consultations]);

  const renderTabBar = useCallback((props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: '#0ECD9D'}}
      labelStyle={{color: '#0ECD9D'}}
      style={{backgroundColor: '#ffffff'}}
    />
  ), []);

  return (
    <Container>
      <TabView
        lazy
        swipeEnabled={false}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={_handleIndexChange}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    </Container>
  );
};

export default Home;
