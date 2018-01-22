import React from 'react';

import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        We love to see you
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        Made by
      </section>
    </Wrapper>
  );
}

export default Footer;
