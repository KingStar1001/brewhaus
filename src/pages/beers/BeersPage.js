import React, { useState } from "react";

import BeersTable from "../../components/BeersTable";

export default function BeersPage() {
  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="dashboard">
      <input
        className="search"
        type="text"
        value={search}
        placeholder="Enter search text"
        onChange={onSearchChange}
      />
      <BeersTable search={search} />
    </div>
  );
}
