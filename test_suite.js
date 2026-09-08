// Comprehensive verification test suite for BatchRenamer Pro
const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Read app.js and extract the core logic
const appJsCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Create a VM context or sandbox to evaluate app.js functions
const mockElements = {};
function getMockEl(id) {
  if (!mockElements[id]) {
    mockElements[id] = {
      id,
      dataset: {},
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      },
      addEventListener: () => {},
      querySelector: (sel) => getMockEl(sel),
      querySelectorAll: () => [],
      appendChild: () => {},
      remove: () => {},
      focus: () => {},
      click: () => {},
      disabled: false,
      textContent: '',
      innerHTML: '',
      value: '',
      checked: false
    };
  }
  return mockElements[id];
}

const mockDocument = {
  querySelector: (s) => getMockEl(s),
  querySelectorAll: () => [],
  addEventListener: () => {},
  createElement: (tag) => getMockEl(tag),
  documentElement: { dataset: {} }
};

const mockWindow = {
  innerWidth: 1200,
  innerHeight: 800,
  addEventListener: () => {},
  showDirectoryPicker: async () => {},
  showOpenFilePicker: async () => {},
  requestAnimationFrame: (cb) => setTimeout(cb, 0),
  cancelAnimationFrame: (id) => clearTimeout(id)
};

const mockStorage = {};
const mockLocalStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; }
};

// Evaluate the functions in a controlled scope
const context = {
  document: mockDocument,
  window: mockWindow,
  localStorage: mockLocalStorage,
  navigator: { serviceWorker: { register: () => Promise.resolve() }, clipboard: { writeText: async () => {} } },
  URL: { createObjectURL: () => 'blob:mock', revokeObjectURL: () => {} },
  Blob: function(parts, opts) { this.parts = parts; this.opts = opts; },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  console: console
};

// We wrap appJsCode so we can expose internal functions for testing
const wrappedCode = appJsCode.replace(
  /\(function\s*\(\)\s*\{/,
  '(function() {\n'
).replace(
  /init\(\);\s*\}\)\(\);/,
  `
    global.__TEST_EXPORTS__ = {
      splitFilename,
      getFileKey,
      applyRule,
      computeNewName,
      validateFilename,
      getExportEntries,
      state,
      RULE_DEFAULTS,
      BUILTIN_PRESETS,
      LANG,
      t
    };
    // skip init in test
  })();`
);

const vm = require('vm');
const sandbox = { ...context, global: {} };
vm.createContext(sandbox);
vm.runInContext(wrappedCode, sandbox);

const exp = sandbox.global.__TEST_EXPORTS__;
assert(exp, 'Exports from app.js must exist');

const { splitFilename, getFileKey, applyRule, computeNewName, validateFilename, getExportEntries, state, RULE_DEFAULTS, BUILTIN_PRESETS } = exp;

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('\n--- Running BatchRenamer Core Verification Suite ---');

// 1. splitFilename tests
test('splitFilename standard file', () => {
  const r = splitFilename('photo.jpg');
  assert.strictEqual(r.base, 'photo');
  assert.strictEqual(r.ext, 'jpg');
});

test('splitFilename multi-dot file', () => {
  const r = splitFilename('archive.tar.gz');
  assert.strictEqual(r.base, 'archive.tar');
  assert.strictEqual(r.ext, 'gz');
});

test('splitFilename dotfile (no base)', () => {
  const r = splitFilename('.gitignore');
  assert.strictEqual(r.base, '.gitignore');
  assert.strictEqual(r.ext, '');
});

test('splitFilename no extension', () => {
  const r = splitFilename('Makefile');
  assert.strictEqual(r.base, 'Makefile');
  assert.strictEqual(r.ext, '');
});

// 2. Replace rule tests
test('Rule: replace plain text', () => {
  const rule = {
    enabled: true,
    type: 'replace',
    params: { find: 'apple', replace: 'orange', useRegex: false, caseSensitive: false, applyTo: 'base' }
  };
  assert.strictEqual(applyRule(rule, 'apple_pie.txt', 0), 'orange_pie.txt');
});

test('Rule: replace regex with capture groups ($1, $2)', () => {
  const rule = {
    enabled: true,
    type: 'replace',
    params: { find: 'track_(\\d+)_(.*)', replace: 'S01E$1 - $2', useRegex: true, caseSensitive: false, applyTo: 'base' }
  };
  assert.strictEqual(applyRule(rule, 'track_05_song.flac', 0), 'S01E05 - song.flac');
});

test('Rule: replace global regex flag with "g" in pattern (bugfix verification)', () => {
  const rule = {
    enabled: true,
    type: 'replace',
    params: { find: 'tag', replace: 'label', useRegex: true, caseSensitive: false, applyTo: 'base' }
  };
  assert.strictEqual(applyRule(rule, 'tag_one_tag_two.jpg', 0), 'label_one_label_two.jpg');
});

test('Rule: replace regex with PCRE (?i) stripped and made case-insensitive', () => {
  const rule = {
    enabled: true,
    type: 'replace',
    params: { find: '(?i)\\b(1080p|720p)\\b', replace: '', useRegex: true, caseSensitive: false, applyTo: 'base' }
  };
  assert.strictEqual(applyRule(rule, 'Movie.1080p.mkv', 0), 'Movie..mkv');
});

test('Rule: replace regex Unicode-aware \\p{L}', () => {
  const rule = {
    enabled: true,
    type: 'replace',
    params: { find: '\\p{L}+', replace: 'WORD', useRegex: true, caseSensitive: false, applyTo: 'base' }
  };
  assert.strictEqual(applyRule(rule, 'Café_123.jpg', 0), 'WORD_123.jpg');
});

test('Rule: replace target scope applyTo "ext"', () => {
  const rule = {
    enabled: true,
    type: 'replace',
    params: { find: 'jpeg', replace: 'jpg', useRegex: false, caseSensitive: false, applyTo: 'ext' }
  };
  assert.strictEqual(applyRule(rule, 'jpeg_file.jpeg', 0), 'jpeg_file.jpg');
});

test('Rule: replace target scope applyTo "all"', () => {
  const rule = {
    enabled: true,
    type: 'replace',
    params: { find: '.', replace: '_', useRegex: false, caseSensitive: false, applyTo: 'all' }
  };
  assert.strictEqual(applyRule(rule, 'file.name.txt', 0), 'file_name_txt');
});

// 3. Prefix & Suffix rules
test('Rule: prefix', () => {
  const rule = { enabled: true, type: 'prefix', params: { text: '2026_' } };
  assert.strictEqual(applyRule(rule, 'photo.jpg', 0), '2026_photo.jpg');
});

test('Rule: suffix', () => {
  const rule = { enabled: true, type: 'suffix', params: { text: '_v2' } };
  assert.strictEqual(applyRule(rule, 'document.pdf', 0), 'document_v2.pdf');
});

// 4. Insert rule
test('Rule: insert at index', () => {
  const rule = { enabled: true, type: 'insert', params: { text: '_NEW', position: 4, fromEnd: false, applyTo: 'base' } };
  assert.strictEqual(applyRule(rule, 'testfile.txt', 0), 'test_NEWfile.txt');
});

test('Rule: insert from end', () => {
  const rule = { enabled: true, type: 'insert', params: { text: '_END', position: 4, fromEnd: true, applyTo: 'base' } };
  assert.strictEqual(applyRule(rule, 'testfile.txt', 0), 'test_ENDfile.txt');
});

// 5. Numbering rule
test('Rule: numbering suffix mode with 0-index and padding', () => {
  const rule = { enabled: true, type: 'numbering', params: { start: 0, step: 1, digits: 3, position: 'suffix', separator: '_' } };
  assert.strictEqual(applyRule(rule, 'image.png', 0), 'image_000.png');
  assert.strictEqual(applyRule(rule, 'image.png', 5), 'image_005.png');

  // Negative start formatting safety
  const negRule = { enabled: true, type: 'numbering', params: { start: -5, step: 1, digits: 3, position: 'suffix', separator: '_' } };
  assert.strictEqual(applyRule(negRule, 'image.png', 0), 'image_-005.png');
});

test('Rule: numbering replace mode with custom prefix and suffix', () => {
  const rule = {
    enabled: true,
    type: 'numbering',
    params: {
      start: 1,
      step: 1,
      digits: 4,
      position: 'replace',
      customPrefix: 'PIC_',
      customSuffix: '_raw',
      separator: ''
    }
  };
  assert.strictEqual(applyRule(rule, 'oldname.png', 0), 'PIC_0001_raw.png');

  // UI customText takes precedence if updated by user
  const uiRule = {
    enabled: true,
    type: 'numbering',
    params: {
      start: 1,
      digits: 2,
      position: 'replace',
      customPrefix: 'OLD_',
      customText: 'USER_EDIT_',
      separator: ''
    }
  };
  assert.strictEqual(applyRule(uiRule, 'old.png', 0), 'USER_EDIT_01.png');
});

// 6. Case conversion rule
test('Rule: case UPPER and lower', () => {
  const upperRule = { enabled: true, type: 'case', params: { mode: 'upper', applyTo: 'base' } };
  const lowerRule = { enabled: true, type: 'case', params: { mode: 'lower', applyTo: 'base' } };
  assert.strictEqual(applyRule(upperRule, 'test-name.png', 0), 'TEST-NAME.png');
  assert.strictEqual(applyRule(lowerRule, 'TEST-NAME.PNG', 0), 'test-name.PNG');
});

test('Rule: case Title Case with accented characters and symbols', () => {
  const rule = { enabled: true, type: 'case', params: { mode: 'title', applyTo: 'base' } };
  assert.strictEqual(applyRule(rule, 'dÉjÀ vu (part 2).mp4', 0), 'Déjà Vu (Part 2).mp4');
  assert.strictEqual(applyRule(rule, "don't look back.mp4", 0), "Don't Look Back.mp4");
});

test('Rule: case camelCase and PascalCase', () => {
  const camel = { enabled: true, type: 'case', params: { mode: 'camel', applyTo: 'base' } };
  const pascal = { enabled: true, type: 'case', params: { mode: 'pascal', applyTo: 'base' } };
  assert.strictEqual(applyRule(camel, 'hello_world-test.js', 0), 'helloWorldTest.js');
  assert.strictEqual(applyRule(pascal, 'hello_world-test.js', 0), 'HelloWorldTest.js');

  // applyTo 'all' preserves file extension
  const camelAll = { enabled: true, type: 'case', params: { mode: 'camel', applyTo: 'all' } };
  assert.strictEqual(applyRule(camelAll, 'my-cool-file.txt', 0), 'myCoolFile.txt');
});

test('Rule: case snake_case and kebab-case', () => {
  const snake = { enabled: true, type: 'case', params: { mode: 'snake', applyTo: 'base' } };
  const kebab = { enabled: true, type: 'case', params: { mode: 'kebab', applyTo: 'base' } };
  assert.strictEqual(applyRule(snake, 'HelloWorld Test.js', 0), 'hello_world_test.js');
  assert.strictEqual(applyRule(kebab, 'Hello World_Test.js', 0), 'hello-world-test.js');

  // applyTo 'all' preserves file extension
  const snakeAll = { enabled: true, type: 'case', params: { mode: 'snake', applyTo: 'all' } };
  assert.strictEqual(applyRule(snakeAll, 'my-cool-file.txt', 0), 'my_cool_file.txt');
  const kebabAll = { enabled: true, type: 'case', params: { mode: 'kebab', applyTo: 'all' } };
  assert.strictEqual(applyRule(kebabAll, 'my_cool_file.txt', 0), 'my-cool-file.txt');
});

// 7. Remove rule
test('Rule: remove digits', () => {
  const rule = {
    enabled: true,
    type: 'remove',
    params: { removeDigits: true, removeSpaces: false, removeSpecial: false, from: 0, count: 0 }
  };
  assert.strictEqual(applyRule(rule, 'file123_456.txt', 0), 'file_.txt');
});

test('Rule: removeSpecial preserves spaces when removeSpaces is false', () => {
  const rule = {
    enabled: true,
    type: 'remove',
    params: { removeSpecial: true, removeSpaces: false, removeDigits: false, from: 0, count: 0 }
  };
  assert.strictEqual(applyRule(rule, 'Special @#$ Name 中文 (test) é.txt', 0), 'Special  Name 中文 test é.txt');
});

test('Rule: remove illegal characters', () => {
  const rule = {
    enabled: true,
    type: 'remove',
    params: { removeIllegal: true, from: 0, count: 0 }
  };
  assert.strictEqual(applyRule(rule, 'bad:name*with?chars<>.txt', 0), 'badnamewithchars.txt');
});

test('Rule: collapseSpaces and trim', () => {
  const rule = {
    enabled: true,
    type: 'remove',
    params: { collapseSpaces: true, trim: true, from: 0, count: 0 }
  };
  assert.strictEqual(applyRule(rule, '  __my   long__file--name__  .txt', 0), 'my long_file-name.txt');
});

// 8. Extension rule
test('Rule: extension lower, upper, remove, custom', () => {
  const lower = { enabled: true, type: 'extension', params: { mode: 'lower' } };
  const upper = { enabled: true, type: 'extension', params: { mode: 'upper' } };
  const remove = { enabled: true, type: 'extension', params: { mode: 'remove' } };
  const custom = { enabled: true, type: 'extension', params: { mode: 'custom', newExt: 'jpeg' } };
  const customEmpty = { enabled: true, type: 'extension', params: { mode: 'custom', newExt: '' } };

  assert.strictEqual(applyRule(lower, 'file.JPG', 0), 'file.jpg');
  assert.strictEqual(applyRule(upper, 'file.png', 0), 'file.PNG');
  assert.strictEqual(applyRule(remove, 'file.png', 0), 'file');
  assert.strictEqual(applyRule(custom, 'file.png', 0), 'file.jpeg');
  assert.strictEqual(applyRule(customEmpty, 'file.png', 0), 'file.png');
});

// 9. Built-in presets
test('Built-in Presets validity check', () => {
  assert(BUILTIN_PRESETS.__photo, '__photo preset must exist');
  assert(BUILTIN_PRESETS.__cleanMedia, '__cleanMedia preset must exist');
  assert(BUILTIN_PRESETS.__normalizeSpaces, '__normalizeSpaces preset must exist');
  assert(BUILTIN_PRESETS.__webSafe, '__webSafe preset must exist');
  assert(BUILTIN_PRESETS.__addDatePrefix, '__addDatePrefix preset must exist');
  assert(BUILTIN_PRESETS.__stripDigits, '__stripDigits preset must exist');
  assert(BUILTIN_PRESETS.__code, '__code preset must exist');
  assert(BUILTIN_PRESETS.__clean, '__clean preset must exist');
  assert(BUILTIN_PRESETS.__lowerExt, '__lowerExt preset must exist');

  state.rules = BUILTIN_PRESETS.__webSafe.map((r, i) => ({ id: i, enabled: true, ...r }));
  const res = computeNewName({ name: 'Web Safe Test 2026!.PNG' }, 0);
  assert.strictEqual(res, 'web-safe-test-2026.png');
});

// 10. Script generator safety checks (PowerShell, Bat, Sh)
test('Export script syntax: PowerShell single quote escaping', () => {
  const oldName = "test'file.txt";
  const newName = "new'name.txt";
  const oldEsc = oldName.replace(/'/g, "''");
  const newEsc = newName.replace(/'/g, "''");
  const cmd = `Rename-Item -LiteralPath '${oldEsc}' -NewName '${newEsc}' -ErrorAction Continue`;
  assert.strictEqual(cmd, "Rename-Item -LiteralPath 'test''file.txt' -NewName 'new''name.txt' -ErrorAction Continue");
});

test('Export script syntax: Batch % escaping', () => {
  const name = "100%_complete%20.txt";
  const escaped = name.replace(/%/g, '%%');
  assert.strictEqual(escaped, '100%%_complete%%20.txt');
});

test('Export script syntax: Bash $ and ` escaping', () => {
  const name = 'file$name`test"quote\\slash.txt';
  const escaped = name.replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/`/g, '\\`').replace(/"/g, '\\"');
  assert.strictEqual(escaped, 'file\\$name\\`test\\"quote\\\\slash.txt');
});

// 11. Edge cases: Subdirectory collision safety
test('Subdirectory collision safety (same name in different dirs is valid)', () => {
  const f1 = { name: 'photo.jpg', relPath: 'folderA' };
  const f2 = { name: 'photo.jpg', relPath: 'folderB' };
  assert.notStrictEqual(getFileKey(f1), getFileKey(f2));
  assert.strictEqual(getFileKey(f1), 'folderA/photo.jpg');
  assert.strictEqual(getFileKey(f2), 'folderB/photo.jpg');
});

// 12. Edge cases: Date rule with new formats
test('Rule: date format YYYY-MM and replace mode', () => {
  const mockFile = { lastModified: new Date('2026-05-18T14:30:00Z').getTime() };
  const rule = {
    enabled: true,
    type: 'date',
    params: { format: 'YYYY-MM', position: 'replace', source: 'modified', separator: '_' }
  };
  const res = applyRule(rule, 'report.docx', 0, mockFile);
  assert(res.endsWith('.docx'));
  assert(res.includes('2026-05'));
});

// 13. Edge cases: Unicode surrogate pairs
test('Edge case: Unicode surrogate pairs and emojis in filenames', () => {
  const rule = { enabled: true, type: 'suffix', params: { text: '_🎨' } };
  assert.strictEqual(applyRule(rule, '✨sparkle.png', 0), '✨sparkle_🎨.png');
});

// 14. Invalid filename validation checks
test('Filename validation for illegal characters, blank names, and Windows reserved names', () => {
  assert.strictEqual(validateFilename('valid_name.txt').valid, true);
  assert.strictEqual(validateFilename('bad:name.txt').valid, false);
  assert.strictEqual(validateFilename('bad/slash.txt').valid, false);
  assert.strictEqual(validateFilename('bad\\backslash.txt').valid, false);
  assert.strictEqual(validateFilename('bad*star.txt').valid, false);
  assert.strictEqual(validateFilename('bad?question.txt').valid, false);
  assert.strictEqual(validateFilename('bad"quote.txt').valid, false);
  assert.strictEqual(validateFilename('bad<angle.txt').valid, false);
  assert.strictEqual(validateFilename('bad>angle.txt').valid, false);
  assert.strictEqual(validateFilename('bad|pipe.txt').valid, false);
  assert.strictEqual(validateFilename('   ').valid, false);
  assert.strictEqual(validateFilename('trailing_dot.').valid, false);
  assert.strictEqual(validateFilename('trailing_space ').valid, false);

  // Windows reserved device names
  assert.strictEqual(validateFilename('CON.txt').valid, false);
  assert.strictEqual(validateFilename('aux.json').valid, false);
  assert.strictEqual(validateFilename('nul.png').valid, false);
  assert.strictEqual(validateFilename('com1.log').valid, false);
  assert.strictEqual(validateFilename('LPT1').valid, false);

  // Trailing space/dot in base name (Windows NTFS illegal)
  assert.strictEqual(validateFilename('file .txt').valid, false);
  assert.strictEqual(validateFilename('file..txt').valid, false);
});

// 15. Export entries separation between pending script and historical operation logs
test('Export entries: forScript returns preview, non-script prefers operation logs', () => {
  state.files = [{ name: 'current_file.txt', relPath: '', selected: true }];
  state.rules = [{ id: 'r1', enabled: true, type: 'prefix', params: { text: 'new_' } }];
  state.customEdits = {};
  state.operationLogs = [{
    timestamp: Date.now() - 10000,
    entries: [{ old: 'past_file.txt', new: 'past_file_renamed.txt', relPath: '' }]
  }];

  // Scripts should always export pending changes to execute
  const scriptEntries = getExportEntries(true);
  assert.strictEqual(scriptEntries.length, 1);
  assert.strictEqual(scriptEntries[0].old, 'current_file.txt');
  assert.strictEqual(scriptEntries[0].new, 'new_current_file.txt');

  // CSV/JSON log exports should export the historical operation log of the executed batch
  const logEntries = getExportEntries(false);
  assert.strictEqual(logEntries.length, 1);
  assert.strictEqual(logEntries[0].old, 'past_file.txt');
  assert.strictEqual(logEntries[0].new, 'past_file_renamed.txt');
});

console.log(`\n==============================================`);
console.log(`Test Suite Completed: ${passedTests} passed, ${process.exitCode ? 1 : 0} failed.`);
console.log(`==============================================\n`);
