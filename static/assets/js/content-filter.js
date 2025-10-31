// content-filter.js - Porn site detection and blocking
const PORN_SITES = [
  'pornhub', 'xvideos', 'xnxx', 'xhamster', 'redtube', 'youporn', 'tube8',
  'spankbang', 'eporner', 'txxx', 'hqporner', 'porn', 'xxx', 'sex',
  'onlyfans', 'fansly', 'chaturbate', 'stripchat', 'cam4', 'bongacams',
  'nhentai', 'hentai', 'rule34', 'e621', 'gelbooru', 'danbooru',
  'brazzers', 'realitykings', 'bangbros', 'naughtyamerica', 'fakehub',
  'pornpics', 'sex.com', 'thumbzilla', 'porntrex', 'motherless',
  'heavy-r', 'pornktube', 'drtuber', 'slutload', 'keezmovies',
  'porndig', 'pornwhite', 'faphouse', 'manyvids', 'clips4sale'
];

function isPornSite(url) {
  try {
    const urlLower = url.toLowerCase();
    return PORN_SITES.some(site => urlLower.includes(site));
  } catch (e) {
    return false;
  }
}

function checkBanStatus() {
  const banExpiry = localStorage.getItem('pornBanExpiry');
  if (banExpiry && Date.now() < parseInt(banExpiry)) {
    return true; // Still banned
  }
  if (banExpiry) {
    localStorage.removeItem('pornBanExpiry');
  }
  return false;
}

function setBan() {
  const banExpiry = Date.now() + (60 * 60 * 1000); // 1 hour from now
  localStorage.setItem('pornBanExpiry', banExpiry.toString());
}

function shouldBlockUrl(url) {
  // Check if user is currently banned
  if (checkBanStatus()) {
    return { blocked: true, reason: 'banned' };
  }
  
  // Check if URL is a porn site
  if (isPornSite(url)) {
    setBan();
    return { blocked: true, reason: 'porn' };
  }
  
  return { blocked: false };
}