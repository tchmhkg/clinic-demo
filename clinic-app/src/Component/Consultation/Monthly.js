import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import Styled from "styled-components/native";

import MonthPicker from "~/Component/MonthPicker";
import List from "~/Component/Consultation/List";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  background-color: #fafafa;
`;

const Monthly = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM"));

  const onPressPrev = useCallback(() => {
    const monthDate = moment(date).subtract(1, "months").format("YYYY-MM");
    setDate(monthDate);
  }, [moment, date]);

  const onPressNext = useCallback(() => {
    const monthDate = moment(date).add(1, "months").format("YYYY-MM");
    setDate(monthDate);
  }, [moment, date]);

  useEffect(() => {
    const filtered = data?.filter((record) => {
      return moment(record.date).isBetween(
        moment(date + "-01"),
        moment(date + "-" + moment(date).daysInMonth()),
        "days",
        true
      );
    });
    setFilteredData(filtered);
  }, [data, date]);

  return (
    <Container>
      <MonthPicker
        date={date}
        onPressPrev={onPressPrev}
        onPressNext={onPressNext}
      />
      <List data={filteredData} />
    </Container>
  );
};

export default Monthly;
