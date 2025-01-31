import React from 'react';

const hintText =
  'You can only add an issue that you’ve received a VA decision notice for.';

export const content = {
  title: {
    add: 'Add an issue',
    edit: 'Edit an issue',
  },
  description: (
    <div>
      If you’re filing a Supplemental Claim within 1 year of receiving a
      decision from 1 of these courts, provide the date listed on your decision
      notice and upload a copy of your decision notice as evidence:
      <ul>
        <li>The United States Court of Appeals for Veterans Claims</li>
        <li>The United States Court of Appeals for the Federal Circuit</li>
        <li>The Supreme Court of the United States</li>
      </ul>
    </div>
  ),
  button: {
    cancel: 'Cancel',
    add: 'Add issue',
    edit: 'Update issue',
  },
  name: {
    label: 'Name of issue',
    hintText,
    hint: (
      <p className="vads-u-font-weight--normal label-description">{hintText}</p>
    ),
  },
  date: {
    label: 'Date of decision',
    hint:
      'Enter the date on your decision notice (the letter you received in the mail from us).',
  },
};
