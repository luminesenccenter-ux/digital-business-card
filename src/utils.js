export function normalizeUrl(value = '') {
  const clean = value.trim();
  if (!clean) return '';
  return /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
}

export function digitsOnly(value = '') {
  return value.replace(/[^\d+]/g, '');
}

export function initials(name = '') {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('') || 'א';
}

export function socialLabel(key) {
  return ({ instagram: 'Instagram', facebook: 'Facebook', linkedin: 'LinkedIn' })[key] || key;
}
