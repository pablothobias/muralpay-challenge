import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

const FONTS_DIR = path.join(process.cwd(), 'public/fonts');

if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

const downloadFont = () => {
  const url = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';

  const options = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      Accept: 'text/css,*/*;q=0.1',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://fonts.googleapis.com/',
    },
  };

  https
    .get(url, options, res => {
      let css = '';

      res.on('data', chunk => {
        css += chunk;
      });

      res.on('end', () => {
        console.log('CSS fetched, searching for font URL...');
        let fontMatch = css.match(/src:\s*url\((.*?\.woff2)\)/);

        if (!fontMatch || !fontMatch[1]) {
          fontMatch = css.match(/url\((.*?\.woff2)\)/);
        }

        if (!fontMatch || !fontMatch[1]) {
          console.error('❌ Could not find font URL in CSS');
          console.log('CSS content:', css.substring(0, 500) + '...');
          return;
        }

        const woff2Url = fontMatch[1];
        console.log('Font URL found:', woff2Url);

        https
          .get(woff2Url, options, res => {
            if (res.statusCode !== 200) {
              console.error(`❌ Failed to download font: HTTP ${res.statusCode}`);
              return;
            }

            const dest = path.join(FONTS_DIR, 'inter-var-latin.woff2');
            const writeStream = fs.createWriteStream(dest);

            res.pipe(writeStream);

            writeStream.on('error', error => {
              console.error('❌ Error writing font file:', error);
              if (fs.existsSync(dest)) {
                fs.unlinkSync(dest);
              }
            });

            writeStream.on('finish', () => {
              console.log('✅ Font downloaded successfully');

              const customCss = `
                @font-face {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 100 900;
                  font-display: optional;
                  src: url('/fonts/inter-var-latin.woff2') format('woff2');
                  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }`;

              try {
                fs.writeFileSync(path.join(FONTS_DIR, 'fonts.css'), customCss);
                console.log('✅ Font CSS generated');
              } catch (error) {
                console.error('❌ Error writing CSS file:', error);
              }
            });
          })
          .on('error', error => {
            console.error('❌ Error downloading font:', error);
          });
      });
    })
    .on('error', error => {
      console.error('❌ Error fetching Google Fonts CSS:', error);
    });
};

downloadFont();
