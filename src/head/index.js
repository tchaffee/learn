import favicons from './favicons';
import meta from './meta';
import styleSheets from './styleSheets';
// import mathjax from './mathjax';
import analytics from './analytics';

const metaAndStyleSheets = meta
  .concat(favicons, styleSheets, analytics)
  .map((element, i) => ({ ...element, key: `meta-stylesheet-${i}` }));

export default metaAndStyleSheets;
