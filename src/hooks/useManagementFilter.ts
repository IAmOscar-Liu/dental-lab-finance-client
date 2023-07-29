import { useRef, useState } from "react";

function useManagementFilter<FilterType, DataType>({
  data,
  filterBy,
}: {
  data: DataType[] | undefined;
  filterBy: (value: DataType) => any;
}) {
  const [filter, setFilter] = useState<FilterType | "ALL">("ALL");
  const filterHistory = useRef<Map<any, DataType[]>>();

  const getFilteredData = (_filter: FilterType | "ALL") => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: DataType[] = [];
    if (_filter === "ALL") results = data;
    else results = data.filter((d) => filterBy(d) === _filter);

    filterHistory.current?.set(_filter, results);
    return results;
  };

  return { filter, setFilter, getFilteredData };
}

export default useManagementFilter;
