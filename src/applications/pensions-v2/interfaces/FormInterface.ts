import IntroductionPage from '../containers/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';

// Define the individual UI and Schema types
interface UIObject {
  [key: string]: any; // Replace 'any' with the appropriate types
}

interface SchemaObject<
  TProperties = Record<string, any>, // Replace 'any' with the appropriate type
  TRequired = string[]
> {
  type: string;
  properties: TProperties;
  items?: {
    type: string;
    properties: TProperties;
    required?: TRequired;
  };
}

interface UIPageSchema {
  path: string;
  title: string;
  uiSchema: UIObject;
  schema: SchemaObject;
}

interface Chapter {
  title: string;
  pages: Record<string, UIPageSchema>;
}

type Chapters = {
  [key: string]: Chapter;
};

export default interface FormConfig {
  rootUrl: string;
  urlPrefix: string;
  dev?: {
    showNavLinks: boolean;
  };
  v3SegmentedProgressBar: boolean;
  submit: () => Promise<{ attributes: { confirmationNumber: string } }>;
  submitUrl?: string;
  transformForSubmit?: () => {};
  trackingPrefix: string;
  introduction: typeof IntroductionPage;
  confirmation: typeof ConfirmationPage;
  formId: string;
  saveInProgress: any; // Replace 'any' with the appropriate type
  version: number;
  prefillEnabled: boolean;
  savedFormMessages: {
    notFound: string;
    noAuth: string;
  };
  title: string | (() => string);
  subTitle: string;
  defaultDefinitions: any; // Replace 'any' with the appropriate type
  chapters: Chapters;
  footerContent?: any; // Replace 'any' with the appropriate type
}
