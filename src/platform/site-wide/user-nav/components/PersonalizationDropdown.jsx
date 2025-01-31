import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  isAuthenticatedWithSSOe,
  signInServiceName,
} from 'platform/user/authentication/selectors';
import { logoutUrl } from 'platform/user/authentication/utilities';
import { useFeatureToggle } from 'platform/utilities/feature-toggles';
import { logoutUrlSiS, logoutEvent } from 'platform/utilities/oauth/utilities';
import recordEvent from 'platform/monitoring/record-event';

import MyHealthLink from './MyHealthLink';

const recordNavUserEvent = section => () => {
  recordEvent({ event: 'nav-user', 'nav-user-section': section });
};

const recordMyVaEvent = recordNavUserEvent('my-va');
const recordMyHealthEvent = recordNavUserEvent('my-health');
const recordProfileEvent = recordNavUserEvent('profile');
const recordDependentsEvent = recordNavUserEvent('dependents');
const recordLettersEvent = recordNavUserEvent('letters');

const LinksForEnhancedMenu = () => {
  return (
    <>
      <li>
        <a href="/view-change-dependents/view" onClick={recordDependentsEvent}>
          Dependents
        </a>
      </li>
      <li className="vads-u-border-bottom--1px vads-u-border-color--gray-lighter vads-u-padding-bottom--1">
        <a
          href="/records/download-va-letters/letters"
          onClick={recordLettersEvent}
        >
          Letters
        </a>
      </li>
    </>
  );
};

export function PersonalizationDropdown(props) {
  const { isSSOe, csp } = props;

  const { useToggleValue, TOGGLE_NAMES } = useFeatureToggle();
  const showAuthenticatedMenuEnhancements = useToggleValue(
    TOGGLE_NAMES.showAuthenticatedMenuEnhancements,
  );

  const createSignout = useCallback(
    () => (
      <a
        href={isSSOe ? logoutUrl() : logoutUrlSiS()}
        onClick={() => logoutEvent(csp, { shouldWait: !isSSOe, duration: 350 })}
      >
        Sign Out
      </a>
    ),
    [isSSOe, csp],
  );

  return (
    <ul>
      <li>
        <a href="/my-va/" onClick={recordMyVaEvent}>
          My VA
        </a>
      </li>
      <MyHealthLink
        onClick={recordMyHealthEvent}
        isSSOe={isSSOe}
        showEnhancements={showAuthenticatedMenuEnhancements}
      />
      <li>
        <a href="/profile" onClick={recordProfileEvent}>
          Profile
        </a>
      </li>
      {showAuthenticatedMenuEnhancements && <LinksForEnhancedMenu />}
      <li>{createSignout()}</li>
    </ul>
  );
}

PersonalizationDropdown.propTypes = {
  csp: PropTypes.oneOf(['idme', 'logingov', 'dslogon', 'mhv']),
  isSSOe: PropTypes.bool,
};

const mapStateToProps = state => ({
  isSSOe: isAuthenticatedWithSSOe(state),
  csp: signInServiceName(state),
});

export default connect(mapStateToProps)(PersonalizationDropdown);
