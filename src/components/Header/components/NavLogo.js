import React from 'react';
import Media from 'react-media';

const fCClogo =
  'https://dl.dropbox.com/s/axj20gzbebk3pio/teencodecamp_logo.png?raw=1';
const fCCglyph = 'https://s3.amazonaws.com/freecodecamp/FFCFire.png';

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
