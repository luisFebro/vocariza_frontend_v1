// extract only domain name from an url.

export default function getSiteName(url) {
    return url.replace(/.+\/\/|www.|\..+/g, "");
}

/*examples
const urls = [
  'www.abc.au.uk',
  'https://github.com',
  'http://github.ca',
  'https://www.google.ru',
  'http://www.google.co.uk',
  'www.yandex.com',
  'yandex.ru',
  'yandex'
]

*/
