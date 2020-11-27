import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import Styled from "styled-components/native";
import CalendarStrip from "react-native-calendar-strip";
import List from "~/Component/Consultation/List";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fafafa;
`;

const Weekly = ({ data }) => {
  const [dateRange, setDateRange] = useState({});
  const [filteredData, setFilteredData] = useState({
    start: moment().startOf("week"),
    end: moment().endOf("week"),
  });

  useEffect(() => {
    const filtered = data?.filter((record) => {
      return moment(record.date).isBetween(
        dateRange.start,
        dateRange.end,
        "days",
        true
      );
    });
    setFilteredData(filtered);
  }, [data, dateRange, moment]);

  const onWeekChanged = useCallback((start, end) => {
    setDateRange({ start, end });
  }, []);

  return (
    <Container>
      <CalendarStrip
        style={styles.calendar}
        useIsoWeekday={false}
        startingDate={moment().startOf("week")}
        onWeekChanged={onWeekChanged}
      />

      <List data={filteredData} />
    </Container>
  );
};

const styles = StyleSheet.create({
  calendar: {
    height: 100,
    padding: 10,
  },
});

export default Weekly;
