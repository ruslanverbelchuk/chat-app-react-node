import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';


import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer whiteColor">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>

  </div>
);

export default InfoBar;