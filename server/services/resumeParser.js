const path = require('path');

const resumeParser = {
  async extractText(fileBuffer, originalName) {
    if (!fileBuffer) return '';
    const ext = path.extname(originalName || '').toLowerCase();

    // Plain text extraction
    if (ext === '.txt' || !ext) {
      return fileBuffer.toString('utf-8');
    }

    // PDF extraction: parse raw text streams or fallback to standard regex string decoding
    if (ext === '.pdf') {
      try {
        const rawString = fileBuffer.toString('latin1');
        // Extract text inside PDF stream parentheses / BT ... ET blocks
        const matches = rawString.match(/\(([^)]+)\)/g);
        if (matches && matches.length > 10) {
          return matches.map((m) => m.slice(1, -1)).join(' ');
        }
        return fileBuffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ');
      } catch (err) {
        return fileBuffer.toString('utf-8');
      }
    }

    // DOCX extraction
    if (ext === '.docx') {
      try {
        const rawString = fileBuffer.toString('utf-8');
        // Extract XML text tags <w:t>...</w:t>
        const matches = rawString.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (matches) {
          return matches.map((m) => m.replace(/<[^>]+>/g, '')).join(' ');
        }
        return fileBuffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ');
      } catch {
        return fileBuffer.toString('utf-8');
      }
    }

    return fileBuffer.toString('utf-8');
  }
};

module.exports = resumeParser;
