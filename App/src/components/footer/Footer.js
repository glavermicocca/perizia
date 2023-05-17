import React from "react";

import "./footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p className="text-xs-center text-muted">
        Visita anche il mio sito...{" "}
        <a
          href="https://www.numismaticadelpup.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.NumismaticaDelPup.com
        </a>{" "}
        oppure scrivimi ad{" "}
        <a href="mailto:andreadelpup@libero.it">andreadelpup@libero.it</a>
      </p>
    </div>
  </footer>
);

export default Footer;
