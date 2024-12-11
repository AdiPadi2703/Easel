// "use client";
import React from "react";
import "./Searchbar.css";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export default function Searchbar() {
  //   const inputRef = React.useRef(null);
  //   const [isSearching, startTransition] = React.useTransition();
  //   const router = useRouter();
  //   const [query, setQuery] = React.useState("");

  //   const search = () => {
  //     startTransition(() => {
  //       router.push(`/search?query=${query}`);
  //     });
  //   };

  return (
    <div className="searchbar">
      <input
      // disabled={isSearching}
      // value={query}
      // onChange={(event) => setQuery(event.target.value)}
      // onKeyDown={(event) => {
      //   if (event.key === "Escape") {
      //     inputRef?.current?.blur();
      //   } else if (event.key === "Enter") {
      //     search();
      //   }
      // }}
      // ref={inputRef}
      />

      <button
        /* onClick={search} disabled={isSearching} */ className="search-button"
      >
        <IoSearch />
      </button>
    </div>
  );
}
