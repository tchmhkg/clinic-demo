import React, { useCallback } from "react";
import { FlatList } from "react-native";

import { Separator } from "~/Component/Common";
import { EmptyData } from "~/Component";
import Item from "~/Component/Consultation/Item";

const List = ({ data }) => {
  const renderItem = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  const renderSeparator = useCallback(() => {
    return <Separator />;
  }, []);

  const renderEmptyComponent = useCallback(() => {
    return <EmptyData />;
  }, []);

  const renderKeyExtractor = useCallback((item) => item?.id?.toString(), []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      keyExtractor={renderKeyExtractor}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

export default List;
