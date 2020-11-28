import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";

import List from "~/Component/Consultation/List";
import { Container } from "~/Component/Common";

const CALENDAR_THEME = {
  arrowColor: "#000000",
  selectedDayBackgroundColor: "#0ECD9D",
  todayTextColor: "#0ECD9D",
  textMonthFontWeight: "bold",
  monthTextColor: "#000000",
};

const Daily = ({ data }) => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setSelectedDate(moment().format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    const filtered = data?.filter((record) => {
      return moment(record.date).format("YYYY-MM-DD") === selectedDate;
    });
    setFilteredData(filtered);
  }, [data, selectedDate, moment]);

  return (
    <Container>
      <Calendar
        markedDates={{
          [selectedDate]: {
            selected: true,
          },
        }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        hideExtraDays
        theme={CALENDAR_THEME}
      />

      <List data={filteredData} />
    </Container>
  );
};

export default Daily;
