import * as React from "react";
import { useAtom } from "jotai";

import SearchIcon from "@/assets/icons/SearchIcon";
import { selectedSearchFilter, typedSearchValue } from "@/store/home";

type Props = {
  placeholder?: string;
};

const HomeSearch = ({ placeholder }: Props) => {
  const [selectedFilters, setSelectedFilters] = useAtom(selectedSearchFilter);
  const [searchText, setSearchText] = useAtom(typedSearchValue);

  const handleChangeFilterValue = React.useCallback(
    (value: string) => {
      setSelectedFilters((prev) => {
        let newItems = [...prev];

        if (newItems.includes(value)) {
          newItems = newItems.filter((element) => element !== value);
        } else {
          if (value === "all") {
            newItems = ["all"];
          } else {
            newItems = [...newItems.filter((val) => val !== "all"), value];
          }
        }

        return newItems;
      });
    },
    [selectedFilters, setSelectedFilters],
  );

  return (
    <div className="dropdown w-full">
      <div
        className={`w-full flex items-center bg-[#38465880] border-[#FFFFFF30] border-[1px] rounded-full p-1 pr-4`}
        role="button"
        tabIndex={0}
      >
        <div className="p-4 bg-[#5A00FF] rounded-full mr-4">
          <SearchIcon />
        </div>
        <input
          placeholder={placeholder || "Search"}
          className="ml-1 w-full bg-transparent outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div
        tabIndex={0}
        className="w-full dropdown-content mt-2 menu bg-[#01062373] border-[1px] border-[#C2C2C229] rounded-xl rounded-box z-[1] w-52 p-2 shadow"
      >
        <div className="flex flex-wrap pb-2 px-2">
          <div className="flex items-center mx-2 mt-2">
            <input
              id="checkbox1"
              type="checkbox"
              className="checkbox checked:border-[#F4F4F4] [--chkbg:theme(#645EBE)]"
              checked={selectedFilters.includes("all")}
              onChange={(_) => {
                handleChangeFilterValue("all");
              }}
            />

            <p className="text-sm text-white ml-1">All</p>
          </div>

          <div className="flex items-center mx-2 mt-2">
            <input
              id="checkbox1"
              type="checkbox"
              className="checkbox checked:border-[#F4F4F4] [--chkbg:theme(#645EBE)]"
              checked={selectedFilters.includes("communities")}
              onChange={(_) => {
                handleChangeFilterValue("communities");
              }}
            />

            <p className="text-sm text-white ml-1">Communities</p>
          </div>

          <div className="flex items-center mx-2 mt-2">
            <input
              id="checkbox1"
              type="checkbox"
              className="checkbox checked:border-[#F4F4F4] [--chkbg:theme(#645EBE)]"
              checked={selectedFilters.includes("coins")}
              onChange={(_) => {
                handleChangeFilterValue("coins");
              }}
            />

            <p className="text-sm text-white ml-1">Coins</p>
          </div>

          <div className="flex items-center mx-2 mt-2">
            <input
              id="checkbox1"
              type="checkbox"
              className="checkbox checked:border-[#F4F4F4] [--chkbg:theme(#645EBE)]"
              checked={selectedFilters.includes("members")}
              onChange={(_) => {
                handleChangeFilterValue("members");
              }}
            />

            <p className="text-sm text-white ml-1">Members</p>
          </div>

          <div className="flex items-center mx-2 mt-2">
            <input
              id="checkbox1"
              type="checkbox"
              className="checkbox checked:border-[#F4F4F4] [--chkbg:theme(#645EBE)]"
              checked={selectedFilters.includes("project")}
              onChange={(_) => {
                handleChangeFilterValue("project");
              }}
            />

            <p className="text-sm text-white ml-1">Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
