import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, View, Text, TouchableOpacity, Alert } from "react-native";
import Styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import Separator from "~/Component/Separator";
import { UserContext } from "~/Context/User";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fafafa;
`;

const Label = Styled.Text``;

const ListItem = Styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Monthly = ({ data }) => {
  const navigation = useNavigation();
  const { userInfo, logout } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const onPressRecord = (id) => {
    navigation.navigate("Record", { id });
  };

  useEffect(() => {
      setSelectedDate(moment().format('YYYY-MM-DD'))
  }, [])

  useEffect(() => {
    const filtered = data?.filter(record => {
        return moment(record.date).format('YYYY-MM-DD') === selectedDate
    })
    setFilteredData(filtered);
  }, [selectedDate])

  const renderItem = ({ item }) => {
    return (
      <ListItem key={item.id} onPress={() => onPressRecord(item.id)}>
        <View>
          <Text>Doctor Name: {item?.doctorName}</Text>
          <Text>Patient Name: {item?.patientName}</Text>
        </View>
        <View>
          <Text>${item?.consultationFee}</Text>
        </View>
      </ListItem>
    );
  };

  const renderSeparator = () => {
    return <Separator />;
  };

  const renderKeyExtractor = React.useCallback(
    (item) => item?.id?.toString(),
    []
  );

  return (
    <Container>
      <Label>Monthly</Label>
      <Calendar
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelectedDate(day.dateString);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {
          console.log("selected day", day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        // monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={1}
        // Hide day names. Default = false
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable left arrow. Default = false
        // disableArrowLeft={true}
        // Disable right arrow. Default = false
        // disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter.
        // renderHeader={(date) => {
        //   /*Return JSX*/
        // }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={renderKeyExtractor}
        // refreshControl={
        //   <RefreshControl
        //     colors={[theme.colors.text]}
        //     refreshing={isRefreshing}
        //     onRefresh={handleRefresh}
        //     tintColor={theme.colors.text}
        //   />
        // }
      />
    </Container>
  );
};

export default Monthly;
