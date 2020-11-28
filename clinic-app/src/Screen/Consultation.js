import axios from "axios";
import React, { useCallback, useContext, useEffect, useState, useLayoutEffect } from "react";
import { Alert, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

import { Daily, Weekly, Monthly } from "~/Component/Consultation";
import { Container, Spinner, IconButton } from "~/Component/Common";

import { UserContext } from "~/Context/User";
import { config } from "~/Config";

const VIEWS = ["daily", "weekly", "monthly"];

const Home = ({ navigation }) => {
  const { userInfo, logout } = useContext(UserContext);
  const [consultations, setConsultations] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const routes = VIEWS.map((view, idx) => ({
    key: view,
    title: view,
    index: idx,
  }));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="refresh"
          color="#ffffff"
          onPress={getConsultations}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      getConsultations();
    });
    return unsubscribe;
  }, [userInfo?.id]);

  const getConsultations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(config.host + "/api/consultations", {
        headers: {
          Authorization: "Bearer " + userInfo?.accessToken,
        },
        params: {
          userId: userInfo?.id,
        },
      });
      setLoading(false)

      if (res?.data?.data) {
        setConsultations(res?.data?.data);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      Alert.alert(err?.response?.data?.message, "", [
        {
          text: "OK",
          onPress: () => (err?.response?.status === 401 ? logout() : {}),
          style: "cancel",
        },
      ]);
    }
  }

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
    <>
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
    {loading ? (
      <Spinner />
    ) : null}
    </>
  );
};

export default Home;
