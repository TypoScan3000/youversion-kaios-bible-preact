/**
 * The result of parsing verse content from a full chapter.
 */
interface VerseContent {
  /** The verses with HTML formatting. */
  html: string;
  /** The text of the verses without HTML formatting. */
  text: string;
}

/**
 * Parameters for the parseVerseFromContent function.
 */
interface ParseVerseParams {
  /** The chapter HTML string. */
  fullContent?: string | null;
  /** The string or array of USFM references. Example: 'GEN.1.1', 'GEN.1.1+GEN.1.2'. */
  usfms?: string | Array<string>;
}

/**
 * Retrieves a specified sub-set of verse content from a full chapter given USFM input.
 * Can be a single verse or a range of verses.
 * It also returns some metadata about the chapter.
 *
 * DOMParser should be supported in all versions of KaiOS, but on-device testing is required.
 *
 * @param fullContent - The chapter HTML string.
 * @param usfms - The string or array of USFM references. Example: 'GEN.1.1', 'GEN.1.1+GEN.1.2'.
 *
 * @returns Returns an object with text and html for the requested verses, and metadata about the chapter.
 *
 * @example
 * ```js
 * parseVerseFromContent({ fullContent: '<html>HTML for Genesis 1</html>' })
 * // Returns metadata only `{ allVerseUsfms: ['GEN.1.1', 'GEN.1.2', ...etc], totalVerses: 31, }`
 *
 * parseVerseFromContent({fullContent: '<html>HTML for Genesis 1</html>' , usfms: 'GEN.1.1+GEN.1.2+GEN.1.3'})
 * // Returns text and html for Genesis 1:1-3, and the metadata for Genesis 1.
 *
 * parseVerseFromContent({fullContent: '<html>HTML for Genesis 1</html>' , usfms: ['GEN.1.1','GEN.1.2', 'GEN.1.3']})
 * // Returns text and html for Genesis 1:1-3, and the metadata for Genesis 1.
 * ```
 */
export function parseVerseFromContent({ usfms, fullContent }: ParseVerseParams): VerseContent {
  let returnValue: VerseContent;

  if (fullContent) {
    const textOutput: Array<string> = [];
    const htmlOutput: Array<string> = [];
    const versesOutput: Array<string> = [];

    const doc = new DOMParser().parseFromString(fullContent, 'text/html');

    const versesList: Array<string> = [];
    const verses = doc.evaluate(
      `//div/div/div/span[contains(concat('+',@data-usfm,'+'), '.')]/@data-usfm`,
      doc,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    let nextVerse = verses.iterateNext();

    while (nextVerse) {
      versesList.push(nextVerse.textContent || '');
      nextVerse = verses.iterateNext();
    }

    versesOutput.push(...new Set(versesList));

    let usfmList: Array<string> = [];
    if (usfms) {
      // convert string or array to appropriate split array to single out every verse
      // i.e. [rev.20.1, rev.20.4+rev.20.5+rev.20.6] -> [rev.20.1, rev.20.4, rev.20.5, rev.20.6]
      // or rev.20.4+rev.20.5+rev.20.6 -> [rev.20.4, rev.20.5, rev.20.6]
      if (Array.isArray(usfms)) {
        let split: Array<string> = [];
        usfms.forEach((usfm: string) => {
          split = split.concat(usfm.split('+'));
        });
        usfmList = split;
      } else {
        usfmList = usfms.split('+');
      }

      // Batch all USFMs into a single XPath query for better performance
      const usfmConditions = usfmList.map(usfm => `contains(concat('+',@data-usfm,'+'),'+${usfm}+')`).join(' or ');
      const htmlXpath = `//div/div/div/span[${usfmConditions}]`;
      const textXpath = `${htmlXpath}/node()[not(contains(concat(' ',@class,' '),' note '))][not(contains(concat(' ',@class,' '),' label '))]`;

      const html = doc.evaluate(htmlXpath, doc, null, XPathResult.ANY_TYPE, null);
      const text = doc.evaluate(textXpath, doc, null, XPathResult.ANY_TYPE, null);

      // text
      let nextText = text.iterateNext();
      while (nextText) {
        textOutput.push(nextText.textContent || '');
        nextText = text.iterateNext();
      }

      // html
      let nextHtml = html.iterateNext();
      while (nextHtml) {
        const htmlContent = (nextHtml as Element).outerHTML;
        htmlOutput.push(htmlContent);
        nextHtml = html.iterateNext();
      }
    }
    // Create a Set from the array to remove duplicates.
    const uniqueTextOutputItems = new Set(textOutput);
    // Check if the size of the Set is less than half the length of the original array.
    // This means every item has at least one duplicate.
    const isVersionWithDuplicate = uniqueTextOutputItems.size <= textOutput.length / 2;
    const textData = isVersionWithDuplicate ? [...uniqueTextOutputItems] : textOutput;
    returnValue = {
      // Some versions merge verses into one, so the output needs to be de-duplicated.
      html: [...new Set(htmlOutput)].join(' '),
      text: textData.join(' ').replace(/\s\s+/g, ' '),
    };
  } else {
    returnValue = {
      html: '',
      text: '',
    };
  }

  return returnValue;
}
