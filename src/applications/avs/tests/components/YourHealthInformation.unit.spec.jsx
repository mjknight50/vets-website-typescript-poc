import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import { replacementFunctions } from '@department-of-veterans-affairs/platform-utilities';

import YourHealthInformation from '../../components/YourHealthInformation';

import mockAvs from '../fixtures/9A7AF40B2BC2471EA116891839113252.json';

const avsData = mockAvs.data.attributes;

describe('Avs: Your Health Information', () => {
  it('correctly renders all data', async () => {
    const avs = replacementFunctions.cloneDeep(avsData);
    const props = { avs };
    const screen = render(<YourHealthInformation {...props} />);
    expect(screen.getByTestId('primary-care-provider').firstChild).to.have.text(
      'DOCTOR,GREAT B',
    );
    expect(screen.getByTestId('primary-care-team').children[2]).to.have.text(
      'NURSE, GREAT - LICENSED PRACTICAL NURSE (LPN)',
    );
    expect(
      screen.getByTestId('scheduled-appointments').firstChild,
    ).to.have.text(
      'January 1, 2024LOM ACC VVC MH GREEN MD 2 (VETERANS LOCATION VIDEO )Clinic location: LOMA LINDA VA CLINIC',
    );
    expect(screen.getByTestId('recall-appointments').firstChild).to.have.text(
      'March 15, 2024TEST CLINIC (VETERANS LOCATION VIDEO )Clinic location: LOMA LINDA VA CLINIC',
    );
    expect(screen.getByTestId('appointment-notes')).to.have.text(
      'Test appointment notes.',
    );
    expect(screen.getByTestId('smoking-status')).to.have.text('Current smoker');
    expect(screen.getByTestId('immunizations').children[2]).to.contain.text(
      'COVID-19 (PFIZER)',
    );
    expect(
      screen.getByTestId('allergies-reactions').children[2],
    ).to.contain.text('SIMVASTATIN');
    expect(screen.getByTestId('lab-results').children[2]).to.contain.text(
      'RET-HeResult: 35.7',
    );
  });

  it('sections without data are hidden', async () => {
    const avs = replacementFunctions.cloneDeep(avsData);
    delete avs.primaryCareProviders;
    delete avs.primaryCareTeamMembers;
    avs.appointments = [];
    delete avs.comments;
    delete avs.patientInfo;
    delete avs.immunizations;
    delete avs.allergiesReactions;
    delete avs.labResults;
    const props = { avs };
    const screen = render(<YourHealthInformation {...props} />);
    expect(screen.queryByTestId('primary-care-team')).to.not.exist;
    expect(screen.queryByTestId('primary-care-team')).to.not.exist;
    expect(screen.queryByTestId('scheduled-appointments')).to.not.exist;
    expect(screen.queryByTestId('recall-appointments')).to.not.exist;
    expect(screen.queryByTestId('appointment-notes')).to.not.exist;
    expect(screen.queryByTestId('smoking-status')).to.not.exist;
    expect(screen.queryByTestId('immunizations')).to.not.exist;
    expect(screen.queryByTestId('allergies-reactions')).to.not.exist;
    expect(screen.queryByTestId('lab-results')).to.not.exist;
  });
});
