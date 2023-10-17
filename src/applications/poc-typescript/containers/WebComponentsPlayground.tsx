import React from 'react';

// @ts-ignore
import { VaTextInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

export default function WebComponents() {
  return (
    <main className="vads-u-padding--3">
      <h1>VA Development with Typescript</h1>
      <form>
        <h3>Web Components</h3>
        <h4>
          <code>&lt;VaTextInput /&gt;</code>
        </h4>
        <p className="vads-u-font-size--md">
          Use web components with react-bindings
        </p>
        <VaTextInput
          id="react-bindings-web-component-input"
          name="name"
          type="text"
          label={'Input Label'}
          required
          value={''}
          onInput={function noRefCheck() {}}
          onBlur={function noRefCheck() {}}
        />
        <hr />
        <h4>
          <code>&lt;va-text-input /&gt;</code>
        </h4>
        <p className="vads-u-font-size--md">These do not require an import</p>
        {/* @ts-ignore */}
        <va-text-input
          label="Input Label"
          required
          type="text"
          id="web-component-input"
          name="message-subject"
          onInput={function noRefCheck() {}}
          value={''}
        />
      </form>
    </main>
  );
}
