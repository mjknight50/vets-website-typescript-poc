import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';
import { RESPONSES } from '../utilities/question-data-map';
import { ROUTES } from '../constants';

import BurnPit21 from '../containers/questions/burn-pit/BurnPit-2-1';

const mockStoreStandard = {
  getState: () => ({
    pactAct: {
      form: {
        BURN_PIT_2_1_0: null,
        SERVICE_PERIOD: RESPONSES.NINETY_OR_LATER,
      },
      viewedIntroPage: true,
    },
  }),
  subscribe: () => {},
  dispatch: () => {},
};

const mockStoreNoIntroPage = {
  getState: () => ({
    pactAct: {
      form: {
        BURN_PIT_2_1_0: null,
        SERVICE_PERIOD: RESPONSES.NINETY_OR_LATER,
      },
      viewedIntroPage: false,
    },
  }),
  subscribe: () => {},
  dispatch: () => {},
};

const mockStoreDCsNotMet = {
  getState: () => ({
    pactAct: {
      form: {
        BURN_PIT_2_1_0: null,
        SERVICE_PERIOD: null,
      },
      viewedIntroPage: true,
    },
  }),
  subscribe: () => {},
  dispatch: () => {},
};

const setBurnPitStub = sinon.stub();
const pushStub = sinon.stub();

const propsStandard = {
  formResponses: {
    BURN_PIT_2_1_0: null,
    SERVICE_PERIOD: RESPONSES.NINETY_OR_LATER,
  },
  setBurnPit21: setBurnPitStub,
  router: {
    push: pushStub,
  },
  viewedIntroPage: true,
};

const propsNoIntroPage = {
  formResponses: {
    BURN_PIT_2_1_0: null,
    SERVICE_PERIOD: RESPONSES.NINETY_OR_LATER,
  },
  setBurnPit21: setBurnPitStub,
  router: {
    push: pushStub,
  },
  viewedIntroPage: false,
};

const propsDCsNotMet = {
  formResponses: {
    BURN_PIT_2_1_0: null,
    SERVICE_PERIOD: null,
  },
  setBurnPit21: setBurnPitStub,
  router: {
    push: pushStub,
  },
  viewedIntroPage: true,
};

describe('Burn Pit 2.1 Page', () => {
  afterEach(() => {
    setBurnPitStub.resetHistory();
    pushStub.resetHistory();
  });

  it('should correctly load the burn pit page in the standard flow', () => {
    const screen = render(
      <Provider store={mockStoreStandard}>
        <BurnPit21 {...propsStandard} />
      </Provider>,
    );

    expect(screen.getByTestId('paw-burnPit2_1')).to.exist;
  });

  describe('redirects', () => {
    it('should redirect to home when the intro page has not been viewed', () => {
      render(
        <Provider store={mockStoreNoIntroPage}>
          <BurnPit21 {...propsNoIntroPage} />
        </Provider>,
      );

      expect(pushStub.withArgs(ROUTES.HOME).called).to.be.true;
    });

    it('should redirect to home when the display conditions are not met', () => {
      render(
        <Provider store={mockStoreDCsNotMet}>
          <BurnPit21 {...propsDCsNotMet} />
        </Provider>,
      );

      expect(pushStub.withArgs(ROUTES.HOME).called).to.be.true;
    });
  });
});
