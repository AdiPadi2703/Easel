"use client";
import React from "react";
import "./Searchbar.css";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export default function Searchbar() {
  const inputRef = React.useRef(null);
  const [isSearching, startTransition] = React.useTransition();
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [search_results, setSearchResults] = React.useState([]);
  const [style, setStyle] = React.useState(["", ""]);

  async function search() {
    const result = await fetch(`/api/search-usernames?query=${query}`, {
      method: "GET",
    });
    const result_json = await result.json();
    setStyle(["5px 0px 0px 0px", "0px 5px 0px 0px"]);
    setSearchResults(result_json.usernames.rows);
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
          <IoSearch style={{ fontSize: "20px" }} />
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
