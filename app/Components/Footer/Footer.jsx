import React from "react";
import "./Footer.css";

export default function Footer() {
  var year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h3>Copyright © {year} Adithya Ubaradka</h3>
    </footer>
  );
}
