// import fullSchema from 'vets-json-schema/dist/PRACTICE-614-schema.json';
import {
  addressUI,
  addressSchema,
  fullNameSchema,
  fullNameUI,
  dateOfBirthSchema,
  dateOfBirthUI,
  emailUI,
  emailSchema,
  phoneUI,
  phoneSchema,
  relationshipToVeteranUI,
  relationshipToVeteranSchema,
  ssnUI,
  ssnSchema,
  titleUI,
  yesNoUI,
  yesNoSchema,
  // @ts-ignore
} from 'platform/forms-system/src/js/web-component-patterns';

// @ts-ignore
import manifest from '../manifest.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// const { } = fullSchema.properties;

// const { } = fullSchema.definitions;

const formConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  // submitUrl: '/v0/api',
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '123123123' } }),
  trackingPrefix: 'practice-form',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: 'PRACTICE-614',
  saveInProgress: {
    // messages: {
    //   inProgress: 'Your practice fo4 with form s library configuration application (PRACTICE-614) is in progress.',
    //   expired: 'Your saved practice fo4 with form s library configuration application (PRACTICE-614) has expired. If you want to apply for practice fo4 with form s library configuration, please start a new application.',
    //   saved: 'Your practice fo4 with form s library configuration application has been saved.',
    // },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound:
      'Please start over to apply for practice fo4 with form s library configuration.',
    noAuth:
      'Please sign in again to continue your application for practice fo4 with form s library configuration.',
  },
  title: 'practice-form',
  defaultDefinitions: {},
  chapters: {
    chapter1: {
      title: 'Personal Information',
      pages: {
        page1: {
          path: 'personal-information-1',
          title: 'Personal Information - Page 1',
          uiSchema: {
            ...titleUI('Name and date of birth'),
            fullName: fullNameUI(),
            dateOfBirth: dateOfBirthUI(),
          },
          schema: {
            type: 'object',
            properties: {
              fullName: fullNameSchema,
              dateOfBirth: dateOfBirthSchema,
            },
          },
        },
        page2: {
          path: 'personal-information-2',
          title: 'Personal Information - Page 2',
          uiSchema: {
            ...titleUI('Social Security Number'),
            ssn: ssnUI(),
            hasFiledClaim: yesNoUI({
              title: 'Have you ever filed a VA claim?',
              labels: {
                Y: 'Yes, I have filed a VA claim before',
                N: 'No, I have never filed a VA claim',
              },
            }),
          },
          schema: {
            type: 'object',
            properties: {
              ssn: ssnSchema,
              hasFiledClaim: yesNoSchema,
            },
          },
        },
        page3: {
          path: 'personal-information-3',
          title: 'Personal Information - Page 3',
          uiSchema: {
            ...titleUI('Phone and email address'),
            homePhone: phoneUI('Home phone number'),
            mobilePhone: phoneUI('Mobile phone number'),
            emailAddress: emailUI(),
          },
          schema: {
            type: 'object',
            properties: {
              homePhone: phoneSchema,
              mobilePhone: phoneSchema,
              emailAddress: emailSchema,
            },
            required: ['homePhone'],
          },
        },
        page4: {
          path: 'personal-information-4',
          title: 'Personal Information - Page 4',
          uiSchema: {
            ...titleUI(
              'Mailing address',
              "We'll send any important information about your application to this address.",
            ),
            address: addressUI(),
          },
          schema: {
            type: 'object',
            properties: {
              address: addressSchema(),
            },
          },
        },
      },
    },
    chapter2: {
      title: 'Relational Information',
      pages: {
        page1: {
          path: 'relational-information-1',
          title: 'Relational Information - Page 1',
          uiSchema: {
            ...titleUI('Relationship to Veteran'),
            relationshipToVeteran: relationshipToVeteranUI(),
          },
          schema: {
            type: 'object',
            properties: {
              relationshipToVeteran: relationshipToVeteranSchema,
            },
          },
        },
      },
    },
  },
};

export default formConfig;
