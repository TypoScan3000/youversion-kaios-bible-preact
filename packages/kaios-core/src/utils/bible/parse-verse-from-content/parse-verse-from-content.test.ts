import { describe, expect, it } from 'vitest';

import { html } from '../../../__mocks__/bible/genesis1.mock';
import { html as numbersCEV } from '../../../__mocks__/bible/numbers8.mock';
import { parseVerseFromContent } from './parse-verse-from-content';

describe('parseVerseFromContent on the server', () => {
  it('returns no data if no params are supplied', () => {
    expect(parseVerseFromContent({})).toStrictEqual({
      html: '',
      text: '',
    });

    expect(parseVerseFromContent({ fullContent: undefined })).toStrictEqual({
      html: '',
      text: '',
    });

    expect(parseVerseFromContent({ fullContent: null })).toStrictEqual({
      html: '',
      text: '',
    });
  });

  it('returns correct data for single USFM string', () => {
    expect(parseVerseFromContent({ fullContent: html, usfms: 'GEN.1.5' })).toStrictEqual({
      html:
        // eslint-disable-next-line no-useless-escape, prettier/prettier
        '<span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"label\">5</span><span class=\"content\">God called the light “day” and the darkness “night.”</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">And evening passed and morning came, marking the first day.</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">  </span></span>',
      text: 'God called the light “day” and the darkness “night.” And evening passed and morning came, marking the first day. ',
    });
  });

  it('returns correct data for USFM string with multiple references', () => {
    expect(
      parseVerseFromContent({
        fullContent: html,
        usfms: 'GEN.1.5+GEN.1.6+GEN.1.8',
      })
    ).toStrictEqual({
      html:
        // eslint-disable-next-line no-useless-escape, prettier/prettier
        '<span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"label\">5</span><span class=\"content\">God called the light “day” and the darkness “night.”</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">And evening passed and morning came, marking the first day.</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">  </span></span> <span class=\"verse v6\" data-usfm=\"GEN.1.6\"><span class=\"label\">6</span><span class=\"content\">Then God said, “Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.” </span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"label\">8</span><span class=\"content\">God called the space “sky.”</span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"content\">And evening passed and morning came, marking the second day.</span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"content\">  </span></span>',
      text: 'God called the light “day” and the darkness “night.” And evening passed and morning came, marking the first day. Then God said, “Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.” God called the space “sky.” And evening passed and morning came, marking the second day. ',
    });
  });

  it('returns correct data for an array with a single USFM string', () => {
    expect(parseVerseFromContent({ fullContent: html, usfms: ['GEN.1.5'] })).toStrictEqual({
      html:
        // eslint-disable-next-line no-useless-escape, prettier/prettier
        '<span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"label\">5</span><span class=\"content\">God called the light “day” and the darkness “night.”</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">And evening passed and morning came, marking the first day.</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">  </span></span>',
      text: 'God called the light “day” and the darkness “night.” And evening passed and morning came, marking the first day. ',
    });
  });

  it('returns correct data for an array with a single USFM string with multiple references', () => {
    expect(
      parseVerseFromContent({
        fullContent: html,
        usfms: ['GEN.1.5+GEN.1.6+GEN.1.8'],
      })
    ).toStrictEqual({
      html:
        // eslint-disable-next-line no-useless-escape, prettier/prettier
        '<span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"label\">5</span><span class=\"content\">God called the light “day” and the darkness “night.”</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">And evening passed and morning came, marking the first day.</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">  </span></span> <span class=\"verse v6\" data-usfm=\"GEN.1.6\"><span class=\"label\">6</span><span class=\"content\">Then God said, “Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.” </span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"label\">8</span><span class=\"content\">God called the space “sky.”</span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"content\">And evening passed and morning came, marking the second day.</span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"content\">  </span></span>',
      text: 'God called the light “day” and the darkness “night.” And evening passed and morning came, marking the first day. Then God said, “Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.” God called the space “sky.” And evening passed and morning came, marking the second day. ',
    });
  });

  it('returns correct data for an array of USFM strings', () => {
    expect(
      parseVerseFromContent({
        fullContent: html,
        usfms: ['GEN.1.5', 'GEN.1.6', 'GEN.1.8'],
      })
    ).toStrictEqual({
      html:
        // eslint-disable-next-line no-useless-escape, prettier/prettier
        '<span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"label\">5</span><span class=\"content\">God called the light “day” and the darkness “night.”</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">And evening passed and morning came, marking the first day.</span></span> <span class=\"verse v5\" data-usfm=\"GEN.1.5\"><span class=\"content\">  </span></span> <span class=\"verse v6\" data-usfm=\"GEN.1.6\"><span class=\"label\">6</span><span class=\"content\">Then God said, “Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.” </span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"label\">8</span><span class=\"content\">God called the space “sky.”</span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"content\">And evening passed and morning came, marking the second day.</span></span> <span class=\"verse v8\" data-usfm=\"GEN.1.8\"><span class=\"content\">  </span></span>',
      text: 'God called the light “day” and the darkness “night.” And evening passed and morning came, marking the first day. Then God said, “Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.” God called the space “sky.” And evening passed and morning came, marking the second day. ',
    });
  });

  // CEV and some others merge verse USFMS into a single verse so the output needs to be de-duplicated.
  it('does not return duplicate verses in html and text output', () => {
    const result = parseVerseFromContent({
      fullContent: numbersCEV,
      usfms: ['NUM.8.23', 'NUM.8.24', 'NUM.8.25', 'NUM.8.26'],
    });

    expect(result.html).toBe(
      // eslint-disable-next-line no-useless-escape, prettier/prettier
      '<span class=\"verse v23\" data-usfm=\"NUM.8.23\"><span class=\"label\">23</span><span class=\"content\">The </span><span class=\"nd\"><span class=\"content\">Lord</span></span><span class=\"content\"> also told Moses, </span></span> <span class=\"verse v24 v25\" data-usfm=\"NUM.8.24+NUM.8.25\"><span class=\"label\">24-25</span><span class=\"content\">“Levites who are between the ages of 25 and 50 must work at my sacred tent. But once they turn 50, they must retire. </span></span> <span class=\"verse v26\" data-usfm=\"NUM.8.26\"><span class=\"label\">26</span><span class=\"content\">They may help the other Levites in their duties, but they must no longer be responsible for any work themselves. Remember this when you assign their duties.”</span></span>'
    );
    expect(result.text).toBe(
      'The Lord also told Moses, “Levites who are between the ages of 25 and 50 must work at my sacred tent. But once they turn 50, they must retire. They may help the other Levites in their duties, but they must no longer be responsible for any work themselves. Remember this when you assign their duties.”'
    );
  });
});
