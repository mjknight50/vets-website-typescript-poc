// In a real app this would be imported from `vets-json-schema`:
// import fullSchema from 'vets-json-schema/dist/21P-527EZ-schema.json';

// In a real app this would not be imported directly; instead the schema that
// is imported from vets-json-schema should include these common definitions:
import commonDefinitions from 'vets-json-schema/dist/definitions.json';

import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import nameAndDateOfBirth from '../pages/nameAndDateOfBirth';
import identificationInformation from '../pages/identificationInformation';
import mailingAddress from '../pages/mailingAddress';
import phoneAndEmailAddress from '../pages/phoneAndEmailAddress';
import relationshipToVeteran from '../pages/relationshipToVeteran';
import serviceHistory from '../pages/serviceHistory';

import FormConfig from '../interfaces/FormInterface';
// @ts-ignore
import FormFooter from 'platform/forms/components/FormFooter';
// @ts-ignore
import manifest from '../manifest.json';

const formConfig: FormConfig = {
  rootUrl: manifest.rootUrl,
  urlPrefix: '/',
  v3SegmentedProgressBar: true,
  submit: () =>
    Promise.resolve({ attributes: { confirmationNumber: '1234-5678' } }),
  trackingPrefix: 'veterans-pensions-',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '21P-527',
  saveInProgress: {
    messages: {
      inProgress: 'Your Veterans pension benefits is in progress.',
      expired:
        'Your saved Veterans pension benefits has expired. If you want to apply for Veterans pension benefits application (21-527EZ), please start a new application.',
      saved: 'Your Veterans pension benefits application has been saved.',
    },
  },
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: 'Please start over to apply for pension benefits.',
    noAuth:
      'Please sign in again to continue your application for pension benefits.',
  },
  title: 'Apply for pension benefits',
  subTitle: 'Form 21P-527EZ',
  defaultDefinitions: commonDefinitions,
  chapters: {
    personalInformationChapter: {
      title: 'Your personal information',
      pages: {
        personalInformation1: {
          path: 'name-and-date-of-birth',
          title: 'Name and date of birth',
          uiSchema: nameAndDateOfBirth.uiSchema,
          schema: nameAndDateOfBirth.schema,
        },
        personalInformation2: {
          path: 'identification-information',
          title: 'Identification information',
          uiSchema: identificationInformation.uiSchema,
          schema: identificationInformation.schema,
        },
        relationshipToVeteran: {
          path: 'relationship-to-veteran',
          title: 'Relationship to Veteran',
          uiSchema: relationshipToVeteran.uiSchema,
          schema: relationshipToVeteran.schema,
        },
      },
    },
    militaryHistoryChapter: {
      title: 'Military history',
      pages: {
        serviceHistory: {
          path: 'service-history',
          title: 'Section Title: Service History',
          uiSchema: serviceHistory.uiSchema,
          schema: serviceHistory.schema,
        },
      },
    },
    mailingAddressChapter: {
      title: 'Mailing address',
      pages: {
        mailingAddress: {
          path: 'mailing-address',
          title: 'Mailing address',
          uiSchema: mailingAddress.uiSchema,
          schema: mailingAddress.schema,
        },
      },
    },
    contactInformationChapter: {
      title: 'Contact information',
      pages: {
        phoneAndEmailAddress: {
          path: 'phone-and-email-address',
          title: 'Phone and email address',
          uiSchema: phoneAndEmailAddress.uiSchema,
          schema: phoneAndEmailAddress.schema,
        },
      },
    },
  },
  footerContent: FormFooter,
};

export default formConfig;
