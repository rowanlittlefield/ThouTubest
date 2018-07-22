import React from 'react';

export default () => {
  return(
    <div className="index-banner">
      <iframe width="425" height="240" src="https://www.youtube.com/embed/ARe9FupzuOA" frameBorder="0"></iframe>
      <div className="index-banner-info">
        <img className="index-banner-image" width="110" height="110" src={window.appAcademyLogo} />
        <div className="index-banner-subinfo">
          <div className="ad-name">App Academy coding bootcamp</div>
          <div className="advertiser"><strong className="ad-tag">Ad</strong> App Academy</div>
           <a className="index-banner-subinfo-button" href="https://www.appacademy.io/immersive/application/full-time">Apply Now</a>
        </div>
      </div>
    </div>
  );
}
