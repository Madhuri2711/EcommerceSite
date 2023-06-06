import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import logoimg from "../../assets/img/logo/logo.svg"; 

const Logo = ({ footerLogo, logoClass }) => {
  return (
    <>
  
 <div className={`${logoClass ? logoClass : ""}`} style={{position:"relative",top:'10px',}}>
 <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt=" logo madhuri" src={logoimg} />
        </Link>
    </div>
    
    

     </>
   
  );
};

Logo.propTypes = {
  footerLogo: PropTypes.string,
  logoClass: PropTypes.string
};

export default Logo;
