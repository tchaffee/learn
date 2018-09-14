const guideBase = 'https://guide.spiraladder.com/certifications';

export function createGuideUrl(slug = '') {
  return guideBase + slug;
}
