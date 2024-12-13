"use client";
import React from "react";
import "./Searchbar.css";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { search_fetch } from "./search_fetch";

export default function Searchbar() {
  const inputRef = React.useRef(null);
  const [isSearching, startTransition] = React.useTransition();
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [search_results, setSearchResults] = React.useState([]);
  const [style, setStyle] = React.useState(["", ""]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function search() {
    setIsLoading(true);
    const result_json = await search_fetch(query);
    setStyle(["5px 0px 0px 0px", "0px 5px 0px 0px"]);
    setSearchResults(result_json.usernames.rows);
    setIsLoading(false);
  }

  function redirectHandler(query) {
    startTransition(() => {
      router.push(`/Gallery/search?query=${query}`);
    });
  }

  return (
    <div className="search-container">
      <div className="searchbar">
        <input
          placeholder="Search username..."
          style={{ borderRadius: `${style[0]}` }}
          disabled={isSearching}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              inputRef?.current?.blur();
            } else if (event.key === "Enter") {
              if (!Array.isArray(query) && query) {
                search();
              } else {
                setSearchResults([]);
                setStyle(["", ""]);
              }
            }
          }}
          ref={inputRef}
        />

        <button
          style={{ borderRadius: `${style[1]}` }}
          onClick={() => {
            if (!Array.isArray(query) && query) {
              search();
            } else {
              setSearchResults([]);
              setStyle(["", ""]);
            }
          }}
          disabled={isSearching}
          className="search-button"
        >
          {isLoading ? (
            <FaCircle className="search-loading-circle" />
          ) : (
            <IoSearch style={{ fontSize: "20px" }} />
          )}
        </button>
      </div>

      {search_results?.length ? (
        <div className="drop-down">
          <ul>
            {search_results.map((username, index) => {
              return (
                <li
                  onClick={() => redirectHandler(username.username)}
                  style={{ color: "black" }}
                  key={index}
                >
                  {username.username}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
