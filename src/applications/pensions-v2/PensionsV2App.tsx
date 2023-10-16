import React, { ReactNode } from 'react';
//@ts-ignore
import RoutedSavableApp from 'platform/forms/save-in-progress/RoutedSavableApp';
import formConfig from './config/form';

interface AppProps {
  location: ReactNode;
  children: ReactNode;
}

export default function PensionsV2App({ location, children }: AppProps) {
  return (
    <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
      {children}
    </RoutedSavableApp>
  );
}
