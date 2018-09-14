import React from 'react';
import Media from 'react-media';

const fCClogo =
  'https://www.dropbox.com/s/4552naguuj98xpw/spiraladder-logo-150x25.png?raw=1';
const fCCglyph =
  'https://www.dropbox.com/s/hg46kc4pc492e32/' +
  'spiraladder-responsive-logo-small-transparent-448x315.png?raw=1';

function NavLogo() {
  return (
    <Media query='(min-width: 735px)'>
      {matches =>
        matches ? (
          <img
            alt='learn to code at Spiraladder logo'
            className='nav-logo logo'
            src={fCClogo}
          />
        ) : (
          <img
            alt='learn to code at Spiraladder logo'
            className='nav-logo logo'
            src={fCCglyph}
          />
        )
      }
    </Media>
  );
}

NavLogo.displayName = 'NavLogo';

export default NavLogo;
