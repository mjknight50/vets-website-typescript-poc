import React from 'react';
import PropTypes from 'prop-types';

const SectionGuideButton = props => {
  return (
    <div className="va-btn-sidebarnav-trigger">
      <div className="button-background" />
      <div className="button-wrapper">
        <button
          aria-controls="va-detailpage-sidebar"
          onClick={() => {
            props.onMenuClick();
          }}
          type="button"
        >
          <strong>In the Medical Records section</strong>
          <i className="fas fa-bars" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

SectionGuideButton.propTypes = {
  sectionName: PropTypes.string,
  onMenuClick: PropTypes.func,
};

export default SectionGuideButton;
