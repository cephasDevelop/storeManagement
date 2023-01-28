import React from 'react';
import "./footer.css";

function Footer() {
  return (
      <div className="footer" style={{position:'sticky',top:'100%'}}>
          <div className="sites">
              <p>company facebook</p>
              <p>company telegram</p>
          </div>
          <div className="address">
              <p>company address</p>
              <p>company telephone</p>
          </div>
    </div>
  )
}

export default Footer;
