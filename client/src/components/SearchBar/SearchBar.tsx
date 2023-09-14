import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import InputField from "../../base-components/FormElements/InputElement";
import LucideIcon from "../../base-components/LucideIcon";
import { Icons } from "../../constants";
import { Product } from "../Provider";
import "./SearchBar.css";

interface SearchBarProps {
  dataSet: Product[];
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const navigate = useNavigate();
  const [dataForSearchDataset, setDataForSearchDataset] = useState<Product[]>(
    []
  );
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  useEffect(() => {
    setDataForSearchDataset(props.dataSet);
  }, [props.dataSet]);

  const onChangeHandler = (text: string) => {
    let matches: Product[] = [];
    if (text.length > 0) {
      matches = dataForSearchDataset.filter((item) => {
        const regex = new RegExp(`${text}`, "gi");
        return item.name.match(regex);
      });
    }

    setSuggestions(matches);
    setSearchText(text);
  };

  const onSuggestHandler = (text: string) => {
    setSearchText(text);
    setSuggestions([]);

    var selectedItem = dataForSearchDataset.find(
      (item) => item.name.toLowerCase() === text.toLowerCase()
    );
    if (selectedItem != null) {
      navigate(`/product/${selectedItem.name}`);
    }
  };

  const onResultSearchHandler = (text: string) => {
    var selectedItem = dataForSearchDataset.find(
      (item) => item.name.toLowerCase() === text.toLowerCase()
    );
    if (selectedItem != null) {
      navigate(`/product/${selectedItem.name}`);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Sorry, the food item you searched for is not available at the moment.",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <div className="">
        <div className="px-6 pt-5" style={{ zIndex: "100 !important" }}>
          <div
            className="!z-[90] flex w-full justify-center"
            style={{ zIndex: "100 !important" }}
          >
            <div className="z-[3] min-w-[300px]">
              <InputField
                className="mx-auto !max-w-[500px] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                placeholder="WHAT DO YOU WANTS TO EAT TODAY"
                type="search"
                aria-label="Search"
                aria-describedby="search-addon"
                onChange={(e) => onChangeHandler(e.target.value)}
                value={searchText}
                // onBlur={() => {
                //   setTimeout(() => {
                //     setSuggestions([]);
                //   }, 100);
                // }}
              />
            </div>
            <div className="z-[3]">
              {/* <Link to={}> */}
              <button
                className={twMerge([
                  "flex h-9 -translate-x-8 content-center justify-center pt-[4px]",
                  searchText.length === 0
                    ? `cursor-not-allowed`
                    : "cursor-pointer",
                ])}
                id="search-addon"
                style={{ zIndex: "100 !important" }}
                onClick={() => onResultSearchHandler(searchText)}
                disabled={searchText.length === 0}
              >
                <LucideIcon
                  icon={Icons.SEARCH}
                  width={25}
                  height={25}
                  className="text-danger"
                  style={{ color: "#FF9224", margin: "auto", zIndex: "10" }}
                />
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="ml-6 flex justify-center">
          <div className="hide-scrollbar-custom absolute z-[2] max-h-[700px] w-[200px] min-w-[100px] translate-y-4 snap-x snap-proximity divide-y-2 divide-gradient-yellow-900 overflow-y-auto rounded-lg !bg-opacity-60 !bg-gradient-to-t from-[#78350f] to-[#c2790393] xs:w-[300px] sm:w-[400px] md:w-[500px] lg:w-[700px] xl:w-[900px]">
            {suggestions &&
              suggestions.map((suggestion, keyId) => (
                <div
                  key={keyId}
                  className="group cursor-pointer snap-center px-4 py-0 hover:bg-gradient-yellow-900 hover:bg-opacity-60 xs:py-2"
                  onClick={() => onSuggestHandler(suggestion.name)}
                >
                  <div className="py-5 xs:flex">
                    <img
                      src={suggestion.image}
                      className="mx-auto h-12 w-20 rounded-lg xs:mx-0"
                    />
                    <div className="xs:text-le mx-auto my-auto mt-1 overflow-hidden text-center text-sm font-bold text-white group-hover:text-white xs:ml-4 xs:text-left xs:text-base">
                      {suggestion.name}
                      <p className="hidden truncate text-xs xs:block">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {searchText && (
        <div
          className="absolute inset-0 z-[1] h-full w-full bg-black bg-opacity-80"
          onClick={() => {
            setSearchText("");
            setSuggestions([]);
          }}
        ></div>
      )}
    </>
  );
};

export default SearchBar;
