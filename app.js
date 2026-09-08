/**
 * Batch Renamer Pro v4 — Core Application
 * Enterprise-grade batch renaming engine with multi-platform File System API / fallback support,
 * 60fps virtual scroll, deep Unicode character processing, and script export.
 */
(() => {
  'use strict';

  // ═══════════════════════════════════════════════
  //  I18N
  // ═══════════════════════════════════════════════
  const LANG = {
    zh: {
      subtitle:'批量文件重命名工具', selectFolder:'📂 选择文件夹',
      fileList:'文件列表', noFiles:'暂无文件',
      selectFolderHint:'点击上方按钮或拖放文件夹到此处',
      noMatch:'无匹配文件', tryFilter:'尝试修改筛选条件',
      recursive:'递归', selectAll:'全选',
      sortName:'名称', sortSize:'大小', sortDate:'日期', sortType:'类型',
      allTypes:'全部类型',
      renameRules:'重命名规则', addRule:'＋ 添加规则',
      addRuleHint:'添加规则以开始重命名', clearRules:'清空规则',
      selectPreset:'选择预设…', builtinPresets:'内置预设', savePreset:'保存预设',
      managePresets:'预设管理器', presetManagerTitle:'预设管理器',
      exportPresets:'📤 导出全部预设', importPresets:'📥 导入预设',
      noCustomPresets:'暂无自定义预设，保存规则后将在此显示。',
      deletePresetConfirm:n=>`确定要删除预设「${n}」吗？`,
      presetDeleted:n=>`已删除预设「${n}」`,
      presetImportSuccess:n=>`成功导入 ${n} 个预设`,
      presetImportFailed:'导入预设文件格式无效',
      ruleReplace:'查找替换', ruleReplaceDesc:'文本 / 正则',
      rulePrefix:'添加前缀', rulePrefixDesc:'文件名前',
      ruleSuffix:'添加后缀', ruleSuffixDesc:'文件名后',
      ruleInsert:'插入字符', ruleInsertDesc:'指定位置插入',
      ruleNumbering:'序号编号', ruleNumberingDesc:'递增编号/替换',
      ruleCase:'大小写转换', ruleCaseDesc:'大/小/首字母/驼峰/蛇形',
      ruleRemove:'删除字符', ruleRemoveDesc:'位置/空格/特殊字符',
      ruleExtension:'修改扩展名', ruleExtensionDesc:'更改/小写/大写/删除',
      ruleDate:'插入日期', ruleDateDesc:'当前 / 修改日期',
      preview:'预览', changes:'个变更', conflicts:'个冲突',
      unchanged:'个不变', showChangedOnly:'仅显示变更项',
      originalName:'原文件名', newName:'新文件名',
      previewHint:'选择文件并添加规则后，预览将在此显示',
      undo:'↩ 撤销上次操作', execute:'✅ 执行重命名',
      cancel:'取消', confirm:'确认', close:'关闭',
      renaming:'正在重命名…',
      keyboardShortcuts:'快捷键',
      scOpen:'选择文件夹', scExec:'执行重命名', scUndo:'撤销',
      scSelectAll:'全选', scInvertSel:'反选', scSearch:'聚焦搜索框',
      scAddRule:'添加规则菜单', scExport:'导出日志 / 脚本', scClose:'关闭弹窗',
      dropHere:'拖放文件夹到此处',
      nFiles:n=>`${n} 个文件`, nSelected:n=>`已选 ${n}`,
      willRename:n=>`将重命名 ${n} 个文件`,
      hasConflict:'⚠️ 存在冲突，请修改规则',
      confirmRename:n=>`即将重命名 <strong>${n}</strong> 个文件。<br><br>此操作会直接修改文件名，是否继续？`,
      confirmUndo:n=>`即将撤销上次操作（${n} 个文件），恢复为原始文件名。<br><br>是否继续？`,
      successRename:n=>`成功重命名 ${n} 个文件`,
      partialRename:(s,f)=>`成功 ${s} 个，失败 ${f} 个`,
      successUndo:n=>`已撤销 ${n} 个文件的重命名`,
      loadedFolder:n=>`已加载文件夹: ${n}`,
      noFSAPI:'当前浏览器未启用原生文件写入 API，已自动开启安全预览与批处理脚本导出模式。',
      clearRulesConfirm:'确定要删除所有重命名规则吗？',
      enterPresetName:'输入预设名称…',
      presetSaved:n=>`预设「${n}」已保存`,
      presetLoaded:n=>`已加载预设「${n}」`,
      noChanges:'无变更项',
      confirmTitle:'确认重命名', undoTitle:'撤销操作',
      savePresetTitle:'保存预设',
      regexValid:'✓ 正则有效', regexInvalid:'✗ 正则语法错误',
      customEdit:'自定义', clickToEdit:'双击编辑新文件名',
      failedOpen:'无法打开文件夹: ',
      nFailed:n=>`${n} 失败`,
      // Rule config labels & options
      rFind:'查找', rReplaceWith:'替换为', rRegex:'正则表达式', rCaseSensitive:'区分大小写',
      rApplyTo:'应用范围', rApplyBase:'仅文件名(保留扩展名)', rApplyAll:'完整名称(含扩展名)', rApplyExt:'仅扩展名',
      rPrefixText:'前缀文本', rSuffixText:'后缀文本',
      rInsertText:'插入文本', rInsertPos:'插入位置(索引)', rFromEnd:'从末尾计算',
      rStartValue:'起始值', rStep:'步长', rDigits:'位数', rPosition:'编号位置',
      rSeparator:'分隔符', rPosPrefix:'前缀', rPosSuffix:'后缀', rPosReplace:'整名替换(加自定义前缀)',
      rCustomText:'前缀文本', rPhCustomText:'如：IMG_',
      rMode:'转换模式', rLower:'全小写 (abc)', rUpper:'全大写 (ABC)',
      rTitle:'每个单词首字母大写 (Title Case)', rCamel:'小驼峰 (camelCase)',
      rPascal:'大驼峰 (PascalCase)', rSnake:'蛇形 (snake_case)', rKebab:'短横线 (kebab-case)',
      rStartPos:'起始位置', rDeleteCount:'删除字符数',
      rRemoveSpaces:'删除空格', rRemoveSpecial:'删除特殊字符(保留Unicode文字与符号)', rRemoveDigits:'删除所有数字',
      rExtMode:'扩展名操作', rExtCustom:'自定义新扩展名', rExtLower:'转为全小写 (.jpg)',
      rExtUpper:'转为全大写 (.JPG)', rExtRemove:'删除扩展名',
      rNewExt:'新扩展名', rFormat:'日期格式', rDateSource:'日期来源',
      rCurrentDate:'当前系统日期', rModifiedDate:'文件修改日期',
      rInputFind:'输入要查找的文本或正则', rInputReplace:'替换后的文本（正则支持 $1, $2）',
      rPhPrefix:'如：photo_', rPhSuffix:'如：_final', rPhExt:'如：jpg',
      // Regex quick helper
      rgCleanMedia:'去字幕组/分辨率标签', rgCleanBrackets:'去中英文括号内容', rgSpaceToUnderscore:'空格转下划线',
      // Export menu
      exportCsv:'导出 CSV 日志 (Excel 兼容 UTF-8)', exportJson:'导出 JSON 变更清单',
      exportBat:'导出 Windows 批处理脚本 (.bat)', exportPs1:'导出 Windows PowerShell 脚本 (.ps1)',
      exportSh:'导出 Linux/Mac Shell 脚本 (.sh)',
      exportSuccess:n=>`已成功导出 ${n}`,
      // Mobile tabs & context menu
      tabFile:'文件', tabRules:'规则', tabPreview:'预览',
      ctxSelectOnly:'仅选择此文件', ctxDeselect:'取消选择',
      ctxCopyName:'复制文件名', ctxCopyNewName:'复制新文件名', ctxLocatePreview:'在预览中定位',
      ctxFileInfo:'文件信息', fileInfoTitle:'文件信息',
      copied:'已复制到剪贴板', fiName:'文件名', fiSize:'大小',
      fiModified:'修改时间', fiType:'类型', fiPath:'相对路径',
      // Power enhancements
      selectFiles:'📄 选择文件', invertSelection:'反选',
      resetCustom:'重置手动修改', customEditsReset:'已重置所有手动修改',
      apply:'应用', customPresets:'自定义预设',
      hasInvalidName:'⚠️ 存在无效文件名(空或含非法字符)',
      errBlankName:'文件名不能为空',
      errIllegalChars:'文件名包含非法字符: \\ / : * ? " < > |',
      errTrailingChar:'文件名不能以点或空格结尾',
      errReservedName:'文件名不能是系统保留名称 (CON, PRN, AUX, NUL, COM1-9, LPT1-9)',
      errTooLong:'文件名长度不能超过 255 个字符',
      noPermission:'文件写入权限未被授予',
      rCustomSuffix:'后缀文本', rPhCustomSuffix:'如：_backup',
      rRemoveIllegal:'移除非法字符 (\\ / : * ? " < > |)',
      rCollapseSpaces:'压缩多余空格与下划线', rTrim:'修剪首尾空格与符号',
      rgDigitsOnly:'提取数字', rgDatePrefix:'去除日期前缀', rgUnderscoreToSpace:'下划线转空格',
      preset___photo:'📷 照片整理 (日期+编号)',
      preset___cleanMedia:'🎬 影视清理 (去字幕组/分辨率标签)',
      preset___normalizeSpaces:'🗜️ 整理空格 (去首尾/压缩)',
      preset___webSafe:'🌐 Web安全命名 (kebab-case)',
      preset___addDatePrefix:'📅 添加日期前缀 (修改日期)',
      preset___stripDigits:'🔢 去除全部数字',
      preset___code:'💻 代码规范 (snake_case)',
      preset___clean:'🧹 批量清理 (去特殊字符/空格)',
      preset___lowerExt:'📎 扩展名全小写',
      builtinPresets:'内置预设',
      rulesCount:n=>`${n} 条规则`,
      del:'删除',
    },
    en: {
      subtitle:'Batch File Renaming Tool', selectFolder:'📂 Select Folder',
      fileList:'File List', noFiles:'No files',
      selectFolderHint:'Click the button above or drag a folder here',
      noMatch:'No matching files', tryFilter:'Try adjusting your filter',
      recursive:'Recursive', selectAll:'Select All',
      sortName:'Name', sortSize:'Size', sortDate:'Date', sortType:'Type',
      allTypes:'All types',
      renameRules:'Rename Rules', addRule:'＋ Add Rule',
      addRuleHint:'Add rules to start renaming', clearRules:'Clear Rules',
      selectPreset:'Select preset…', builtinPresets:'Built-in Presets', savePreset:'Save Preset',
      managePresets:'Preset Manager', presetManagerTitle:'Preset Manager',
      exportPresets:'📤 Export All Presets', importPresets:'📥 Import Presets',
      noCustomPresets:'No custom presets yet. Saved rules will appear here.',
      deletePresetConfirm:n=>`Delete preset "${n}"?`,
      presetDeleted:n=>`Preset "${n}" deleted`,
      presetImportSuccess:n=>`Imported ${n} presets successfully`,
      presetImportFailed:'Invalid preset JSON file',
      ruleReplace:'Find & Replace', ruleReplaceDesc:'Text / Regex',
      rulePrefix:'Add Prefix', rulePrefixDesc:'Before name',
      ruleSuffix:'Add Suffix', ruleSuffixDesc:'After name',
      ruleInsert:'Insert Text', ruleInsertDesc:'At specific position',
      ruleNumbering:'Numbering', ruleNumberingDesc:'Sequential / Replace',
      ruleCase:'Change Case', ruleCaseDesc:'Upper/Lower/Title/Camel/Snake/Kebab',
      ruleRemove:'Remove Chars', ruleRemoveDesc:'Position/Space/Special',
      ruleExtension:'Change Ext', ruleExtensionDesc:'Custom/Lower/Upper/Remove',
      ruleDate:'Insert Date', ruleDateDesc:'Current / Modified',
      preview:'Preview', changes:'changes', conflicts:'conflicts',
      unchanged:'unchanged', showChangedOnly:'Show changes only',
      originalName:'Original Name', newName:'New Name',
      previewHint:'Select files and add rules to see preview',
      undo:'↩ Undo Last', execute:'✅ Execute Rename',
      cancel:'Cancel', confirm:'Confirm', close:'Close',
      renaming:'Renaming…',
      keyboardShortcuts:'Keyboard Shortcuts',
      scOpen:'Select folder', scExec:'Execute rename', scUndo:'Undo',
      scSelectAll:'Select all', scInvertSel:'Invert selection', scSearch:'Focus search',
      scAddRule:'Add rule menu', scExport:'Export log / script', scClose:'Close dialog',
      dropHere:'Drop folder here',
      nFiles:n=>`${n} files`, nSelected:n=>`${n} selected`,
      willRename:n=>`Will rename ${n} files`,
      hasConflict:'⚠️ Conflicts detected, adjust rules',
      confirmRename:n=>`About to rename <strong>${n}</strong> files.<br><br>This will modify filenames directly. Continue?`,
      confirmUndo:n=>`Undo last operation (${n} files) and restore original names?`,
      successRename:n=>`Successfully renamed ${n} files`,
      partialRename:(s,f)=>`${s} succeeded, ${f} failed`,
      successUndo:n=>`Undid renaming of ${n} files`,
      loadedFolder:n=>`Loaded folder: ${n}`,
      noFSAPI:'Native File System write API is unavailable in this browser. Safe preview and script export mode enabled.',
      clearRulesConfirm:'Delete all rename rules?',
      enterPresetName:'Enter preset name…',
      presetSaved:n=>`Preset "${n}" saved`,
      presetLoaded:n=>`Loaded preset "${n}"`,
      noChanges:'No changes',
      confirmTitle:'Confirm Rename', undoTitle:'Undo Operation',
      savePresetTitle:'Save Preset',
      regexValid:'✓ Valid regex', regexInvalid:'✗ Invalid regex syntax',
      customEdit:'custom', clickToEdit:'Double-click to edit name',
      failedOpen:'Failed to open folder: ',
      nFailed:n=>`${n} failed`,
      // Rule config labels & options
      rFind:'Find', rReplaceWith:'Replace with', rRegex:'Regex', rCaseSensitive:'Case sensitive',
      rApplyTo:'Apply To', rApplyBase:'Base name only (keep ext)', rApplyAll:'Full name (with ext)', rApplyExt:'Extension only',
      rPrefixText:'Prefix text', rSuffixText:'Suffix text',
      rInsertText:'Text to insert', rInsertPos:'Position (index)', rFromEnd:'From end',
      rStartValue:'Start', rStep:'Step', rDigits:'Digits', rPosition:'Position',
      rSeparator:'Separator', rPosPrefix:'Prefix', rPosSuffix:'Suffix', rPosReplace:'Replace base name',
      rCustomText:'Custom prefix', rPhCustomText:'e.g. IMG_',
      rMode:'Mode', rLower:'lowercase (abc)', rUpper:'UPPERCASE (ABC)',
      rTitle:'Title Case (Abc Def)', rCamel:'camelCase',
      rPascal:'PascalCase', rSnake:'snake_case', rKebab:'kebab-case',
      rStartPos:'Start pos', rDeleteCount:'Count',
      rRemoveSpaces:'Remove spaces', rRemoveSpecial:'Remove special chars (Unicode safe)', rRemoveDigits:'Remove digits',
      rExtMode:'Extension mode', rExtCustom:'Custom extension', rExtLower:'lowercase (.jpg)',
      rExtUpper:'UPPERCASE (.JPG)', rExtRemove:'Remove extension',
      rNewExt:'New extension', rFormat:'Format', rDateSource:'Date source',
      rCurrentDate:'Current date', rModifiedDate:'File modified date',
      rInputFind:'Text or regex pattern', rInputReplace:'Replacement text ($1, $2 supported in regex)',
      rPhPrefix:'e.g. photo_', rPhSuffix:'e.g. _final', rPhExt:'e.g. jpg',
      // Regex quick helper
      rgCleanMedia:'Clean Media/Resolution Tags', rgCleanBrackets:'Remove Bracket Contents', rgSpaceToUnderscore:'Spaces to Underscores',
      // Export menu
      exportCsv:'Export CSV Log (Excel UTF-8)', exportJson:'Export JSON Manifest',
      exportBat:'Export Windows Script (.bat)', exportPs1:'Export Windows PowerShell Script (.ps1)',
      exportSh:'Export Linux/Mac Script (.sh)',
      exportSuccess:n=>`Exported ${n} successfully`,
      // Mobile tabs & context menu
      tabFile:'Files', tabRules:'Rules', tabPreview:'Preview',
      ctxSelectOnly:'Select only this', ctxDeselect:'Deselect',
      ctxCopyName:'Copy filename', ctxCopyNewName:'Copy new filename', ctxLocatePreview:'Locate in preview',
      ctxFileInfo:'File info', fileInfoTitle:'File Information',
      copied:'Copied to clipboard', fiName:'Name', fiSize:'Size',
      fiModified:'Modified', fiType:'Type', fiPath:'Path',
      // Power enhancements
      selectFiles:'📄 Select Files', invertSelection:'Invert',
      resetCustom:'Reset Custom Edits', customEditsReset:'Reset all custom edits',
      apply:'Apply', customPresets:'Custom Presets',
      hasInvalidName:'⚠️ Invalid filename (empty or illegal characters)',
      errBlankName:'Filename cannot be empty',
      errIllegalChars:'Filename contains illegal characters: \\ / : * ? " < > |',
      errTrailingChar:'Filename cannot end with dot or space',
      errReservedName:'Filename cannot be a reserved device name (CON, PRN, AUX, NUL, COM1-9, LPT1-9)',
      errTooLong:'Filename cannot exceed 255 characters',
      noPermission:'File write permission not granted',
      rCustomSuffix:'Custom suffix', rPhCustomSuffix:'e.g. _backup',
      rRemoveIllegal:'Remove illegal characters (\\ / : * ? " < > |)',
      rCollapseSpaces:'Collapse duplicate spaces & symbols', rTrim:'Trim leading/trailing spaces & symbols',
      rgDigitsOnly:'Extract Digits Only', rgDatePrefix:'Remove Date Prefix', rgUnderscoreToSpace:'Underscores to Spaces',
      preset___photo:'📷 Photo Organizer (Date + Seq)',
      preset___cleanMedia:'🎬 Clean Media Tags (Release Groups/Resolution)',
      preset___normalizeSpaces:'🗜️ Normalize Spaces (Trim & Collapse)',
      preset___webSafe:'🌐 Web-Safe Name (kebab-case + lowercase ext)',
      preset___addDatePrefix:'📅 Date Prefix (Modified Date YYYY-MM-DD)',
      preset___stripDigits:'🔢 Remove Digits',
      preset___code:'💻 Code Standard (snake_case)',
      preset___clean:'🧹 Batch Clean (Special chars/Spaces)',
      preset___lowerExt:'📎 Lowercase Extension',
      builtinPresets:'Built-in Presets',
      rulesCount:n=>`${n} rules`,
      del:'Delete',
    }
  };

  // ═══════════════════════════════════════════════
  //  STATE
  // ═══════════════════════════════════════════════
  const state = {
    dirHandle: null,
    files: [],
    rules: [],
    undoStack: [],
    customEdits: {},
    operationLogs: [],
    nextRuleId: 1,
    searchTerm: '',
    extFilter: '',
    showChangedOnly: false,
    sortBy: 'name',
    sortDir: 'asc',
    recursive: false,
    lang: 'zh',
    theme: 'dark',
    rulesAllCollapsed: false,
    thumbnailCache: new Map(),
    lastClickedVisIdx: null,
    activeTab: 'file',
    contextFile: null,
    isFallbackMode: false,
    editingFileKey: null,
  };

  // ═══════════════════════════════════════════════
  //  DOM
  // ═══════════════════════════════════════════════
  const $ = s => document.querySelector(s);
  const dom = {
    selectFolderBtn:$('#selectFolderBtn'),
    selectFilesBtn:$('#selectFilesBtn'),
    fallbackFolderInput:$('#fallbackFolderInput'),
    fallbackFilesInput:$('#fallbackFilesInput'),
    currentPath:$('#currentPath'),
    fileSearch:$('#fileSearch'), extFilter:$('#extFilter'),
    fileListContainer:$('#fileListContainer'), fileList:$('#fileList'),
    fileCount:$('#fileCount'), selectedCount:$('#selectedCount'),
    fileBadge:$('#fileBadge'), selectAllCb:$('#selectAllCheckbox'),
    invertSelectionBtn:$('#invertSelectionBtn'),
    recursiveToggle:$('#recursiveToggle'),
    sortBy:$('#sortBy'), sortDirBtn:$('#sortDirBtn'),
    addRuleTrigger:$('#addRuleTrigger'), ruleTypeMenu:$('#ruleTypeMenu'),
    rulesList:$('#rulesList'), ruleBadge:$('#ruleBadge'),
    clearRulesBtn:$('#clearRulesBtn'), collapseAllBtn:$('#collapseAllBtn'),
    presetSelect:$('#presetSelect'), savePresetBtn:$('#savePresetBtn'),
    managePresetsBtn:$('#managePresetsBtn'),
    previewContainer:$('#previewContainer'),
    previewBody:$('#previewBody'), previewEmpty:$('#previewEmpty'),
    changeCount:$('#changeCount'), conflictCount:$('#conflictCount'),
    unchangedCount:$('#unchangedCount'), showChangedOnly:$('#showChangedOnly'),
    resetCustomEditsBtn:$('#resetCustomEditsBtn'), customEditCount:$('#customEditCount'),
    actionInfo:$('#actionInfo'), undoBtn:$('#undoBtn'), executeBtn:$('#executeBtn'),
    exportMenuBtn:$('#exportMenuBtn'), exportMenu:$('#exportMenu'),
    confirmModal:$('#confirmModal'), modalTitle:$('#modalTitle'),
    modalBody:$('#modalBody'), modalCancelBtn:$('#modalCancelBtn'),
    modalConfirmBtn:$('#modalConfirmBtn'),
    promptModal:$('#promptModal'), promptTitle:$('#promptTitle'),
    promptInput:$('#promptInput'), promptCancelBtn:$('#promptCancelBtn'),
    promptConfirmBtn:$('#promptConfirmBtn'),
    presetManagerModal:$('#presetManagerModal'),
    presetListContainer:$('#presetListContainer'),
    exportPresetsBtn:$('#exportPresetsBtn'),
    importPresetsInput:$('#importPresetsInput'),
    presetManagerCloseBtn:$('#presetManagerCloseBtn'),
    shortcutsModal:$('#shortcutsModal'), shortcutsBtn:$('#shortcutsBtn'),
    shortcutsCloseBtn:$('#shortcutsCloseBtn'),
    themeToggle:$('#themeToggle'), langToggle:$('#langToggle'),
    progressOverlay:$('#progressOverlay'), progressBar:$('#progressBar'),
    progressCount:$('#progressCount'), progressErrors:$('#progressErrors'),
    dropZone:$('#dropZone'),
    toastContainer:$('#toastContainer'),
    mobileTabs:$('#mobileTabs'),
    contextMenu:$('#contextMenu'),
    fileInfoModal:$('#fileInfoModal'), fileInfoBody:$('#fileInfoBody'),
    fileInfoCloseBtn:$('#fileInfoCloseBtn'),
  };

  // ═══════════════════════════════════════════════
  //  UTILITIES
  // ═══════════════════════════════════════════════
  function uid() { return state.nextRuleId++; }
  function t(key, ...args) {
    const v = LANG[state.lang][key];
    return typeof v === 'function' ? v(...args) : (v || key);
  }
  function debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
  }
  function formatSize(b) {
    if(!b && b !== 0) return '-';
    if(b<1024)return b+' B';
    if(b<1048576)return(b/1024).toFixed(1)+' KB';
    if(b<1073741824)return(b/1048576).toFixed(1)+' MB';
    return(b/1073741824).toFixed(2)+' GB';
  }
  function getFileIcon(ext) {
    const m={image:['jpg','jpeg','png','gif','bmp','svg','webp','ico','tif','tiff','avif'],
      audio:['mp3','wav','flac','aac','ogg','wma','m4a'],
      video:['mp4','avi','mkv','mov','wmv','flv','webm','m4v'],
      doc:['doc','docx','pdf','txt','rtf','md','odt'],
      sheet:['xls','xlsx','csv','tsv','ods'],ppt:['ppt','pptx','odp'],
      code:['js','ts','py','java','c','cpp','h','cs','go','rs','rb','php','html','css','json','xml','yaml','yml','sql','sh','bat','ps1'],
      archive:['zip','rar','7z','tar','gz','bz2','xz']};
    const l=(ext||'').toLowerCase();
    for(const[cat,exts]of Object.entries(m)){
      if(exts.includes(l))return{image:'🖼️',audio:'🎵',video:'🎬',doc:'📝',sheet:'📊',ppt:'📊',code:'💻',archive:'📦'}[cat];
    }
    return '📄';
  }
  function isImageExt(ext){return['jpg','jpeg','png','gif','bmp','webp','ico','avif','svg'].includes((ext||'').toLowerCase())}
  function splitFilename(n){const i=n.lastIndexOf('.');if(i<=0)return{base:n,ext:''};return{base:n.substring(0,i),ext:n.substring(i+1)}}
  function getFileKey(f){return f.relPath ? `${f.relPath}/${f.name}` : f.name;}
  function escAttr(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  function escHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

  // ═══════════════════════════════════════════════
  //  TOAST & MODAL
  // ═══════════════════════════════════════════════
  function toast(msg, type='info') {
    const icons={success:'✅',error:'❌',warning:'⚠️',info:'ℹ️'};
    const el=document.createElement('div');el.className=`toast ${type}`;
    el.innerHTML=`<span class="toast-icon">${icons[type]}</span><span class="toast-message">${escHtml(msg)}</span>`;
    dom.toastContainer.appendChild(el);
    setTimeout(()=>{el.classList.add('leaving');el.addEventListener('animationend',()=>el.remove())},3500);
  }
  function showConfirm(title,body){
    return new Promise(resolve=>{
      dom.modalTitle.textContent=title;dom.modalBody.innerHTML=body;dom.confirmModal.classList.add('open');
      const cleanup=r=>{dom.confirmModal.classList.remove('open');dom.modalConfirmBtn.onclick=null;dom.modalCancelBtn.onclick=null;resolve(r)};
      dom.modalConfirmBtn.onclick=()=>cleanup(true);dom.modalCancelBtn.onclick=()=>cleanup(false);
    });
  }
  function showPrompt(title,placeholder=''){
    return new Promise(resolve=>{
      dom.promptTitle.textContent=title;dom.promptInput.value='';dom.promptInput.placeholder=placeholder;
      dom.promptModal.classList.add('open');dom.promptInput.focus();
      const cleanup=v=>{dom.promptModal.classList.remove('open');dom.promptConfirmBtn.onclick=null;dom.promptCancelBtn.onclick=null;resolve(v)};
      dom.promptConfirmBtn.onclick=()=>cleanup(dom.promptInput.value.trim()||null);
      dom.promptCancelBtn.onclick=()=>cleanup(null);
      dom.promptInput.onkeydown=e=>{if(e.key==='Enter')dom.promptConfirmBtn.click()};
    });
  }
  function closeAllModals(){
    [dom.confirmModal,dom.promptModal,dom.shortcutsModal,dom.fileInfoModal,dom.presetManagerModal].forEach(m=>m&&m.classList.remove('open'));
    hideContextMenu();
    hideExportMenu();
    dom.ruleTypeMenu?.classList.remove('open');
  }

  // ═══════════════════════════════════════════════
  //  FILE SYSTEM & FALLBACK
  // ═══════════════════════════════════════════════
  async function selectFolder() {
    if ('showDirectoryPicker' in window) {
      try {
        state.dirHandle = await window.showDirectoryPicker({mode:'readwrite'});
        dom.currentPath.textContent=`📁 ${state.dirHandle.name}`;
        dom.currentPath.classList.remove('hidden');
        state.isFallbackMode = false;
        await loadFiles();
        toast(t('loadedFolder',state.dirHandle.name),'success');
      } catch(err) {
        if(err.name!=='AbortError') toast(t('failedOpen')+err.message,'error');
      }
    } else {
      // Fallback file input
      dom.fallbackFolderInput.click();
    }
  }

  async function selectFiles() {
    if ('showOpenFilePicker' in window) {
      try {
        const handles = await window.showOpenFilePicker({ multiple: true });
        if (!handles.length) return;
        state.files = [];
        state.thumbnailCache.forEach(url => URL.revokeObjectURL(url));
        state.thumbnailCache.clear();
        state.isFallbackMode = false;
        state.dirHandle = null;

        for (let i = 0; i < handles.length; i++) {
          const handle = handles[i];
          const file = await handle.getFile();
          state.files.push({
            id: 'file_' + i + '_' + file.name,
            handle: handle,
            fileObj: file,
            name: file.name,
            relPath: '',
            size: file.size,
            lastModified: file.lastModified,
            selected: true,
            thumbUrl: null
          });
        }
        dom.currentPath.textContent = `📄 ${handles.length} ${state.lang === 'zh' ? '个已选文件' : 'files selected'}`;
        dom.currentPath.classList.remove('hidden');
        onFilesLoaded();
        toast(t('nFiles', handles.length), 'success');
      } catch (err) {
        if (err.name !== 'AbortError') dom.fallbackFilesInput.click();
      }
    } else {
      dom.fallbackFilesInput.click();
    }
  }

  function handleFallbackFiles(fileList) {
    state.files = [];
    state.thumbnailCache.forEach(url => URL.revokeObjectURL(url));
    state.thumbnailCache.clear();
    state.isFallbackMode = true;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const relPath = file.webkitRelativePath
        ? file.webkitRelativePath.split('/').slice(0, -1).join('/')
        : '';
      state.files.push({
        id: 'fb_' + i + '_' + file.name,
        handle: null,
        fileObj: file,
        name: file.name,
        relPath: relPath,
        size: file.size,
        lastModified: file.lastModified,
        selected: true,
        thumbUrl: null
      });
    }

    const folderName = fileList[0]?.webkitRelativePath?.split('/')[0] || 'Selected Files';
    dom.currentPath.textContent = `📁 ${folderName} (Preview Mode)`;
    dom.currentPath.classList.remove('hidden');
    onFilesLoaded();
    toast(t('loadedFolder', folderName), 'success');
  }

  async function loadFiles() {
    state.files=[];
    state.thumbnailCache.forEach(url=>URL.revokeObjectURL(url));
    state.thumbnailCache.clear();
    await scanDirectory(state.dirHandle, '');
    onFilesLoaded();
  }

  function onFilesLoaded() {
    sortFiles();
    const exts=[...new Set(state.files.map(f=>splitFilename(f.name).ext.toLowerCase()).filter(Boolean))].sort();
    dom.extFilter.innerHTML=`<option value="">${t('allTypes')}</option>`+exts.map(e=>`<option value="${e}">.${e}</option>`).join('');
    dom.fileSearch.disabled=false;dom.extFilter.disabled=false;
    dom.selectAllCb.disabled=false;dom.selectAllCb.checked=true;
    if (dom.invertSelectionBtn) dom.invertSelectionBtn.disabled=false;
    state.lastClickedVisIdx=null;
    renderFileList();updatePreview();
    generateThumbnails();
  }

  async function scanDirectory(dirHandle, prefix) {
    for await(const[name,handle]of dirHandle.entries()){
      if(handle.kind==='file'){
        try{
          const file=await handle.getFile();
          state.files.push({
            id: prefix ? `${prefix}/${name}` : name,
            handle,
            fileObj: file,
            name: file.name,
            relPath: prefix,
            size: file.size,
            lastModified: file.lastModified,
            selected: true,
            thumbUrl: null
          });
        }catch{}
      } else if(handle.kind==='directory' && state.recursive){
        await scanDirectory(handle, prefix?prefix+'/'+name:name);
      }
    }
  }

  async function generateThumbnails() {
    for(const f of state.files){
      const {ext}=splitFilename(f.name);
      const key = getFileKey(f);
      if(isImageExt(ext) && !state.thumbnailCache.has(key)){
        try{
          const file = f.handle ? await f.handle.getFile() : f.fileObj;
          if (file) {
            const url = URL.createObjectURL(file);
            state.thumbnailCache.set(key, url);
            f.thumbUrl = url;
          }
        }catch{}
      }
    }
    renderFileList();
  }

  // ═══════════════════════════════════════════════
  //  SORTING (Natural Sort)
  // ═══════════════════════════════════════════════
  function sortFiles() {
    const dir = state.sortDir==='asc'?1:-1;
    state.files.sort((a,b)=>{
      switch(state.sortBy){
        case 'size': {
          const diff = (a.size-b.size)*dir;
          if (diff !== 0) return diff;
          return (a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) * dir) ||
                 ((a.relPath || '').localeCompare(b.relPath || '', undefined, { numeric: true, sensitivity: 'base' }) * dir);
        }
        case 'date': {
          const diff = (a.lastModified-b.lastModified)*dir;
          if (diff !== 0) return diff;
          return (a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) * dir) ||
                 ((a.relPath || '').localeCompare(b.relPath || '', undefined, { numeric: true, sensitivity: 'base' }) * dir);
        }
        case 'type': {
          const ea=splitFilename(a.name).ext.toLowerCase();
          const eb=splitFilename(b.name).ext.toLowerCase();
          const extCmp = ea.localeCompare(eb, undefined, { numeric: true, sensitivity: 'base' }) * dir;
          if (extCmp !== 0) return extCmp;
          const nameCmp = a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) * dir;
          if (nameCmp !== 0) return nameCmp;
          return (a.relPath || '').localeCompare(b.relPath || '', undefined, { numeric: true, sensitivity: 'base' }) * dir;
        }
        default: {
          const nameCmp = a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }) * dir;
          if (nameCmp !== 0) return nameCmp;
          return (a.relPath || '').localeCompare(b.relPath || '', undefined, { numeric: true, sensitivity: 'base' }) * dir;
        }
      }
    });
  }

  // ═══════════════════════════════════════════════
  //  FILE LIST RENDERING (Virtual Scroll)
  // ═══════════════════════════════════════════════
  const ROW_H = 34;
  const BUFFER = 10;
  let _visibleFiles = [];
  let _fileListRaf = null;
  let _previewRaf = null;

  function getVisibleFiles() {
    return state.files.filter(f=>{
      if(state.searchTerm && !f.name.toLowerCase().includes(state.searchTerm.toLowerCase()))return false;
      if(state.extFilter && splitFilename(f.name).ext.toLowerCase()!==state.extFilter)return false;
      return true;
    });
  }

  function renderFileList() {
    _visibleFiles = getVisibleFiles();
    if(_visibleFiles.length===0){
      dom.fileList.innerHTML=`<div class="file-list-empty"><span class="empty-icon">${state.files.length?'🔍':'📂'}</span><span class="empty-text">${state.files.length?t('noMatch'):t('noFiles')}</span><span class="empty-hint">${state.files.length?t('tryFilter'):t('selectFolderHint')}</span></div>`;
    } else {
      renderVirtualRows();
    }
    updateFileStats();
  }

  function renderVirtualRows() {
    const ct = dom.fileListContainer;
    const scrollTop = ct.scrollTop;
    const viewH = ct.clientHeight || 400;
    const total = _visibleFiles.length;
    const start = Math.max(0, Math.floor(scrollTop/ROW_H)-BUFFER);
    const end = Math.min(total, Math.ceil((scrollTop+viewH)/ROW_H)+BUFFER);
    const topPad = start*ROW_H;
    const bottomPad = (total-end)*ROW_H;

    let html = `<div style="height:${topPad}px"></div>`;
    for(let i=start;i<end;i++){
      const f=_visibleFiles[i];
      const idx=state.files.indexOf(f);
      const{ext}=splitFilename(f.name);
      const iconHtml = f.thumbUrl
        ? `<img class="file-thumb" src="${f.thumbUrl}" alt="" loading="lazy">`
        : `<span class="file-icon">${getFileIcon(ext)}</span>`;
      const pathHtml = f.relPath ? `<span class="file-path">${escHtml(f.relPath)}/</span>` : '';
      html+=`<div class="file-item ${f.selected?'selected':''}" data-index="${idx}" data-vis="${i}"><input type="checkbox" class="file-checkbox" ${f.selected?'checked':''}>${iconHtml}${pathHtml}<span class="file-name" title="${escAttr(f.name)}">${escHtml(f.name)}</span><span class="file-size">${formatSize(f.size)}</span></div>`;
    }
    html+=`<div style="height:${bottomPad}px"></div>`;
    dom.fileList.innerHTML=html;
  }

  function updateFileStats() {
    const total=state.files.length;
    const selected=state.files.filter(f=>f.selected).length;
    dom.fileCount.textContent=t('nFiles',total);
    dom.selectedCount.textContent=t('nSelected',selected);
    dom.fileBadge.textContent=total;
    dom.fileBadge.classList.toggle('hidden',total===0);

    const vis = getVisibleFiles();
    const visSelected = vis.filter(f => f.selected).length;
    dom.selectAllCb.checked = vis.length > 0 && visSelected === vis.length;
    dom.selectAllCb.indeterminate = visSelected > 0 && visSelected < vis.length;
  }

  // ═══════════════════════════════════════════════
  //  RULE ENGINE
  // ═══════════════════════════════════════════════
  const RULE_DEFAULTS={
    replace:{find:'',replace:'',useRegex:false,caseSensitive:false,applyTo:'base'},
    prefix:{text:''},
    suffix:{text:''},
    insert:{text:'',position:0,fromEnd:false,applyTo:'base'},
    numbering:{start:1,step:1,digits:2,position:'suffix',separator:'_',customText:'IMG_',customSuffix:''},
    case:{mode:'lower',applyTo:'base'},
    remove:{from:0,count:0,fromEnd:false,removeSpaces:false,removeSpecial:false,removeDigits:false,removeIllegal:false,collapseSpaces:false,trim:false},
    extension:{mode:'custom',newExt:''},
    date:{format:'YYYY-MM-DD',position:'prefix',source:'current',separator:'_'},
  };
  const RULE_LABELS={
    replace:'ruleReplace',prefix:'rulePrefix',suffix:'ruleSuffix',
    insert:'ruleInsert',numbering:'ruleNumbering',case:'ruleCase',remove:'ruleRemove',
    extension:'ruleExtension',date:'ruleDate',
  };

  function addRule(type){
    state.rules.push({id:uid(),type,params:{...RULE_DEFAULTS[type]},enabled:true,collapsed:false});
    renderRules();updatePreview();
  }
  function removeRule(id){state.rules=state.rules.filter(r=>r.id!==id);renderRules();updatePreview()}
  function toggleRule(id){const r=state.rules.find(x=>x.id===id);if(r)r.enabled=!r.enabled;renderRules();updatePreview()}
  function cloneRule(id){
    const src=state.rules.find(x=>x.id===id);if(!src)return;
    const idx=state.rules.indexOf(src);
    const clone={id:uid(),type:src.type,params:{...src.params},enabled:src.enabled,collapsed:false};
    state.rules.splice(idx+1,0,clone);renderRules();updatePreview();
  }
  function toggleCollapseRule(id){
    const r=state.rules.find(x=>x.id===id);if(r)r.collapsed=!r.collapsed;renderRules();
  }
  function moveRule(id,dir){
    const idx=state.rules.findIndex(r=>r.id===id);
    const ni=idx+dir;if(ni<0||ni>=state.rules.length)return;
    [state.rules[idx],state.rules[ni]]=[state.rules[ni],state.rules[idx]];
    renderRules();updatePreview();
  }
  function clearRules(){state.rules=[];state.customEdits={};renderRules();updatePreview()}
  function updateRuleParam(id,key,value){
    const r=state.rules.find(x=>x.id===id);if(r){r.params[key]=value;debouncedPreview()}
  }

  const debouncedPreview = debounce(()=>updatePreview(), 120);

  function applyRule(rule,filename,index,file={}){
    if(!rule.enabled)return filename;
    const{base,ext}=splitFilename(filename);const p=rule.params;
    switch(rule.type){
      case 'replace':{
        if(!p.find)return filename;
        const target = p.applyTo === 'all' ? filename : (p.applyTo === 'ext' ? ext : (ext ? base : filename));
        if (!target && p.applyTo === 'ext') return filename;
        let r;
        if(p.useRegex){
          try{
            let pattern = p.find;
            let caseSensitive = p.caseSensitive;
            if (pattern.startsWith('(?i)')) {
              pattern = pattern.slice(4);
              caseSensitive = false;
            }
            const flags = (caseSensitive ? '' : 'i') + 'g';
            let rx;
            try {
              rx = new RegExp(pattern, flags + 'u');
            } catch {
              rx = new RegExp(pattern, flags);
            }
            r = target.replace(rx, p.replace);
          }catch{return filename}
        } else {
          const rx = new RegExp(p.find.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), p.caseSensitive ? 'g' : 'gi');
          r = target.replace(rx, () => p.replace);
        }
        if (p.applyTo === 'all') return r;
        if (p.applyTo === 'ext') return base ? (r ? base + '.' + r : base) : r;
        return ext ? r + '.' + ext : r;
      }
      case 'prefix': return ext ? (p.text||'') + base + '.' + ext : (p.text||'') + filename;
      case 'suffix': return ext ? base + (p.text||'') + '.' + ext : filename + (p.text||'');
      case 'insert': {
        const applyTo = p.applyTo || 'base';
        const target = applyTo === 'all' ? filename : (applyTo === 'ext' ? ext : (ext ? base : filename));
        if (!target && applyTo === 'ext') return filename;
        const text = p.text || '';
        let pos = parseInt(p.position, 10) || 0;
        if (p.fromEnd) {
          pos = Math.max(0, target.length - pos);
        } else {
          pos = Math.max(0, Math.min(target.length, pos));
        }
        const r = target.substring(0, pos) + text + target.substring(pos);
        if (applyTo === 'all') return r;
        if (applyTo === 'ext') return base ? (r ? base + '.' + r : base) : r;
        return ext ? r + '.' + ext : r;
      }
      case 'numbering':{
        const start = isNaN(parseInt(p.start, 10)) ? 1 : parseInt(p.start, 10);
        const step = isNaN(parseInt(p.step, 10)) ? 1 : Math.max(1, parseInt(p.step, 10));
        const digits = Math.max(1, Math.min(10, parseInt(p.digits, 10) || 1));
        const num = start + index * step;
        const pad = num < 0
          ? '-' + String(Math.abs(num)).padStart(digits, '0')
          : String(num).padStart(digits, '0');
        const s = p.separator !== undefined ? p.separator : '_';

        if (p.position === 'replace') {
          const customPrefix = (p.customText !== undefined && p.customText !== '')
            ? p.customText
            : (p.customPrefix !== undefined ? p.customPrefix : (p.customText || ''));
          const customSuffix = p.customSuffix || '';
          const combined = customPrefix + pad + customSuffix;
          return ext ? combined + '.' + ext : combined;
        } else if (p.position === 'prefix') {
          return ext ? pad + s + base + '.' + ext : pad + s + filename;
        } else {
          return ext ? base + s + pad + '.' + ext : filename + s + pad;
        }
      }
      case 'case':{
        const applyTo = p.applyTo || 'base';
        const transform = (str) => {
          if (!str) return str;
          switch(p.mode){
            case 'upper': return str.toUpperCase();
            case 'lower': return str.toLowerCase();
            case 'title':
              return str.toLowerCase().replace(/(^|[^\p{L}\p{N}])(\p{L})/gu, (m, sep, letter, offset, fullStr) => {
                if (sep === "'" && offset > 0 && /[\p{L}]/u.test(fullStr[offset - 1])) {
                  return sep + letter;
                }
                return sep + letter.toUpperCase();
              });
            case 'camel': {
              const words = str.trim().split(/[\s_\-\.]+/).filter(Boolean);
              if (!words.length) return str;
              return words.map((w, idx) => {
                const lw = w.toLowerCase();
                return idx === 0 ? lw : lw.charAt(0).toUpperCase() + lw.slice(1);
              }).join('');
            }
            case 'pascal': {
              const words = str.trim().split(/[\s_\-\.]+/).filter(Boolean);
              if (!words.length) return str;
              return words.map(w => {
                const lw = w.toLowerCase();
                return lw.charAt(0).toUpperCase() + lw.slice(1);
              }).join('');
            }
            case 'snake':
              return str
                .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
                .replace(/[\s\-\.]+/g, '_')
                .replace(/_+/g, '_')
                .toLowerCase();
            case 'kebab':
              return str
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .replace(/[\s_\.]+/g, '-')
                .replace(/-+/g, '-')
                .toLowerCase();
            default: return str;
          }
        };

        if (applyTo === 'all') {
          if (['camel', 'pascal', 'snake', 'kebab'].includes(p.mode)) {
            return ext ? transform(base) + '.' + (p.mode === 'upper' ? ext.toUpperCase() : ext.toLowerCase()) : transform(filename);
          }
          return transform(filename);
        } else if (applyTo === 'ext') {
          return ext ? base + '.' + transform(ext) : filename;
        } else {
          return ext ? transform(base) + '.' + ext : transform(filename);
        }
      }
      case 'remove':{
        let n=ext?base:filename;
        if(p.removeSpaces)n=n.replace(/\s+/g,'');
        if(p.removeSpecial){
          const pattern = p.removeSpaces ? /[^\p{L}\p{N}._-]/gu : /[^\p{L}\p{N}\s._-]/gu;
          n=n.replace(pattern,'');
        }
        if(p.removeIllegal)n=n.replace(/[\\/:*?"<>|]/g,'');
        if(p.removeDigits)n=n.replace(/\d+/g,'');
        if(p.collapseSpaces){
          n=n.replace(/\s{2,}/g,' ').replace(/_{2,}/g,'_').replace(/-{2,}/g,'-');
        }
        if(p.trim){
          n=n.replace(/^[\s_\-]+|[\s_\-]+$/g,'');
        }

        const from = parseInt(p.from, 10) || 0;
        const count = parseInt(p.count, 10) || 0;
        if (count > 0) {
          if (p.fromEnd) {
            const start = Math.max(0, n.length - from - count);
            const end = Math.max(0, n.length - from);
            n = n.substring(0, start) + n.substring(end);
          } else {
            n = n.substring(0, from) + n.substring(from + count);
          }
        }
        return ext?n+'.'+ext:n;
      }
      case 'extension':{
        const mode = p.mode || 'custom';
        if (mode === 'lower') {
          return ext ? base + '.' + ext.toLowerCase() : filename;
        } else if (mode === 'upper') {
          return ext ? base + '.' + ext.toUpperCase() : filename;
        } else if (mode === 'remove') {
          return base;
        } else {
          const clean = (p.newExt || '').replace(/^\./, '').trim();
          if (!clean) return filename;
          return base ? base + '.' + clean : clean;
        }
      }
      case 'date':{
        const now = p.source==='modified' && file.lastModified ? new Date(file.lastModified) : new Date();
        const y=now.getFullYear(),mo=String(now.getMonth()+1).padStart(2,'0'),d=String(now.getDate()).padStart(2,'0');
        const h=String(now.getHours()).padStart(2,'0'),mi=String(now.getMinutes()).padStart(2,'0'),sc=String(now.getSeconds()).padStart(2,'0');
        const y2=String(y).slice(2);
        let ds;
        switch(p.format){
          case 'YYYYMMDD':ds=`${y}${mo}${d}`;break;
          case 'YYYY.MM.DD':ds=`${y}.${mo}.${d}`;break;
          case 'YYYY_MM_DD':ds=`${y}_${mo}_${d}`;break;
          case 'YYYYMMDD_HHmmss':ds=`${y}${mo}${d}_${h}${mi}${sc}`;break;
          case 'YYYY-MM-DD_HH-mm':ds=`${y}-${mo}-${d}_${h}-${mi}`;break;
          case 'YYYY-MM-DD HHmm':ds=`${y}-${mo}-${d} ${h}${mi}`;break;
          case 'DD-MM-YYYY':ds=`${d}-${mo}-${y}`;break;
          case 'YYMMDD':ds=`${y2}${mo}${d}`;break;
          case 'YYYY-MM':ds=`${y}-${mo}`;break;
          default:ds=`${y}-${mo}-${d}`;
        }
        const s=p.separator !== undefined ? p.separator : '_';
        if (p.position === 'replace') {
          return ext ? ds + '.' + ext : ds;
        } else if (p.position === 'prefix') {
          return ext ? ds + s + base + '.' + ext : ds + s + filename;
        } else {
          return ext ? base + s + ds + '.' + ext : filename + s + ds;
        }
      }
      default:return filename;
    }
  }

  function computeNewName(file,index){
    const key = getFileKey(file);
    if(state.customEdits[key])return state.customEdits[key];
    let n=file.name;
    for(const r of state.rules) n=applyRule(r,n,index,file);
    return n;
  }

  // ═══════════════════════════════════════════════
  //  RULES RENDERING
  // ═══════════════════════════════════════════════
  function ruleConfigHTML(rule){
    const p=rule.params,id=rule.id;
    const field=(lbl,type,key,ph='',extra='')=>`<div class="rule-field"><label>${lbl}</label><input type="${type}" value="${escAttr(p[key]!==undefined?p[key]:'')}" data-rule="${id}" data-key="${key}" ${type==='number'?'data-num':''} placeholder="${ph}" ${extra}></div>`;
    const sel=(lbl,key,opts)=>`<div class="rule-field"><label>${lbl}</label><select data-rule="${id}" data-key="${key}">${opts.map(([v,l])=>`<option value="${v}" ${p[key]===v?'selected':''}>${l}</option>`).join('')}</select></div>`;
    const chk=(lbl,key)=>`<label class="rule-toggle-option"><input type="checkbox" ${p[key]?'checked':''} data-rule="${id}" data-key="${key}" data-bool> ${lbl}</label>`;

    switch(rule.type){
      case 'replace':{
        const regexStatus = p.useRegex ? (()=>{
          try{
            let pat = p.find || '';
            if (pat.startsWith('(?i)')) pat = pat.slice(4);
            new RegExp(pat, 'u');
            return`<span class="regex-status valid" title="${t('regexValid')}">✓</span>`;
          }catch{return`<span class="regex-status invalid" title="${t('regexInvalid')}">✗</span>`}
        })() : '';
        const cls=p.useRegex?(()=>{try{let pat=p.find||'';if(pat.startsWith('(?i)'))pat=pat.slice(4);new RegExp(pat,'u');return'regex-valid'}catch{return'regex-invalid'}})():'';
        const regexPresetsHtml = p.useRegex ? `
          <div class="regex-presets-bar">
            <span class="regex-preset-tag" data-preset-find="\\s*[(\\[（【][^)\\]）】]*[)\\]）】]\\s*" data-preset-rep=" ">${t('rgCleanBrackets')}</span>
            <span class="regex-preset-tag" data-preset-find="\\b(1080p|720p|4k|2160p|x264|x265|hevc|web-dl|bluray|hdrip)\\b" data-preset-rep="">${t('rgCleanMedia')}</span>
            <span class="regex-preset-tag" data-preset-find="\\s+" data-preset-rep="_">${t('rgSpaceToUnderscore')}</span>
            <span class="regex-preset-tag" data-preset-find="_+" data-preset-rep=" ">${t('rgUnderscoreToSpace')}</span>
            <span class="regex-preset-tag" data-preset-find="^\\d{4}[-_.]\\d{2}[-_.]\\d{2}[-_.]?" data-preset-rep="">${t('rgDatePrefix')}</span>
          </div>` : '';
        return `
          <div class="rule-field"><label>${t('rFind')}</label><input type="text" value="${escAttr(p.find)}" data-rule="${id}" data-key="find" placeholder="${t('rInputFind')}" class="${cls}">${regexStatus}</div>
          ${regexPresetsHtml}
          ${field(t('rReplaceWith'),'text','replace',t('rInputReplace'))}
          ${sel(t('rApplyTo'),'applyTo',[['base',t('rApplyBase')],['all',t('rApplyAll')],['ext',t('rApplyExt')]])}
          <div class="rule-field-inline">${chk(t('rRegex'),'useRegex')} ${chk(t('rCaseSensitive'),'caseSensitive')}</div>`;
      }
      case 'prefix': return field(t('rPrefixText'),'text','text',t('rPhPrefix'));
      case 'suffix': return field(t('rSuffixText'),'text','text',t('rPhSuffix'));
      case 'insert': return `
        ${field(t('rInsertText'),'text','text',t('rPhSuffix'))}
        ${field(t('rInsertPos'),'number','position','0','min="0"')}
        ${sel(t('rApplyTo'),'applyTo',[['base',t('rApplyBase')],['all',t('rApplyAll')],['ext',t('rApplyExt')]])}
        <div class="rule-field-inline">${chk(t('rFromEnd'),'fromEnd')}</div>`;
      case 'numbering': {
        const isReplace = p.position === 'replace';
        return `
          ${sel(t('rPosition'),'position',[['suffix',t('rPosSuffix')],['prefix',t('rPosPrefix')],['replace',t('rPosReplace')]])}
          ${isReplace ? `
            <div class="rule-field-inline">
              ${field(t('rCustomText'),'text','customText',t('rPhCustomText'))}
              ${field(t('rCustomSuffix'),'text','customSuffix',t('rPhCustomSuffix'))}
            </div>` : ''}
          <div class="rule-field-inline">
            ${field(t('rStartValue'),'number','start','1','min="0"')}
            ${field(t('rStep'),'number','step','1','min="1"')}
            ${field(t('rDigits'),'number','digits','2','min="1" max="10"')}
          </div>
          ${!isReplace ? field(t('rSeparator'),'text','separator','_') : ''}`;
      }
      case 'case': return `
        ${sel(t('rMode'),'mode',[['lower',t('rLower')],['upper',t('rUpper')],['title',t('rTitle')],['camel',t('rCamel')],['pascal',t('rPascal')],['snake',t('rSnake')],['kebab',t('rKebab')]])}
        ${sel(t('rApplyTo'),'applyTo',[['base',t('rApplyBase')],['all',t('rApplyAll')],['ext',t('rApplyExt')]])}`;
      case 'remove': return `
        <div class="rule-field-inline">
          ${field(t('rStartPos'),'number','from','0','min="0"')}
          ${field(t('rDeleteCount'),'number','count','0','min="0"')}
          ${chk(t('rFromEnd'),'fromEnd')}
        </div>
        <div class="rule-field-inline">
          ${chk(t('rRemoveSpaces'),'removeSpaces')}
          ${chk(t('rRemoveSpecial'),'removeSpecial')}
          ${chk(t('rRemoveIllegal'),'removeIllegal')}
          ${chk(t('rRemoveDigits'),'removeDigits')}
          ${chk(t('rCollapseSpaces'),'collapseSpaces')}
          ${chk(t('rTrim'),'trim')}
        </div>`;
      case 'extension': {
        const isCustom = (p.mode || 'custom') === 'custom';
        return `
          ${sel(t('rExtMode'),'mode',[['custom',t('rExtCustom')],['lower',t('rExtLower')],['upper',t('rExtUpper')],['remove',t('rExtRemove')]])}
          ${isCustom ? field(t('rNewExt'),'text','newExt',t('rPhExt')) : ''}`;
      }
      case 'date': return `
        ${sel(t('rFormat'),'format',[['YYYY-MM-DD','2025-05-18'],['YYYYMMDD','20250518'],['YYYY_MM_DD','2025_05_18'],['YYYY.MM.DD','2025.05.18'],['YYYYMMDD_HHmmss','20250518_143000'],['YYYY-MM-DD_HH-mm','2025-05-18_14-30'],['YYYY-MM-DD HHmm','2025-05-18 1430'],['DD-MM-YYYY','18-05-2025'],['YYMMDD','250518'],['YYYY-MM','2025-05']])}
        ${sel(t('rPosition'),'position',[['prefix',t('rPosPrefix')],['suffix',t('rPosSuffix')],['replace',t('rPosReplace')]])}
        ${sel(t('rDateSource'),'source',[['current',t('rCurrentDate')],['modified',t('rModifiedDate')]])}
        ${p.position !== 'replace' ? field(t('rSeparator'),'text','separator','_') : ''}`;
      default:return '';
    }
  }

  function renderRules(){
    if(state.rules.length===0){
      dom.rulesList.innerHTML=`<div class="rules-empty"><span class="empty-icon">⚙️</span><span>${t('addRuleHint')}</span></div>`;
      dom.clearRulesBtn.classList.add('hidden');dom.ruleBadge.classList.add('hidden');
      dom.collapseAllBtn.classList.add('hidden');
    } else {
      dom.rulesList.innerHTML=state.rules.map((rule,i)=>`
        <div class="rule-card ${rule.enabled?'':'disabled'} ${rule.collapsed?'collapsed':''}" data-rule-id="${rule.id}" draggable="true" style="animation-delay:${i*30}ms">
          <div class="rule-card-header" data-collapse-id="${rule.id}">
            <span class="drag-handle" title="⠿">⠿</span>
            <span class="rule-type-badge ${rule.type}">${t(RULE_LABELS[rule.type])}</span>
            <div class="rule-actions">
              <button class="rule-action-btn" data-action="move-up" data-id="${rule.id}" title="▲">▲</button>
              <button class="rule-action-btn" data-action="move-down" data-id="${rule.id}" title="▼">▼</button>
              <button class="rule-action-btn" data-action="clone" data-id="${rule.id}" title="⧉">⧉</button>
              <button class="rule-action-btn toggle-${rule.enabled?'on':'off'}" data-action="toggle" data-id="${rule.id}">${rule.enabled?'👁':'👁‍🗨'}</button>
              <button class="rule-action-btn delete" data-action="delete" data-id="${rule.id}">✕</button>
            </div>
          </div>
          <div class="rule-card-body">${ruleConfigHTML(rule)}</div>
        </div>`).join('');
      dom.clearRulesBtn.classList.remove('hidden');
      dom.ruleBadge.textContent=state.rules.length;dom.ruleBadge.classList.remove('hidden');
      dom.collapseAllBtn.classList.remove('hidden');
    }
    bindRuleEvents();
  }

  function bindRuleEvents(){
    dom.rulesList.querySelectorAll('.rule-action-btn').forEach(btn=>{
      btn.onclick=e=>{e.stopPropagation();const id=+btn.dataset.id;const a=btn.dataset.action;
        if(a==='delete')removeRule(id);else if(a==='toggle')toggleRule(id);
        else if(a==='move-up')moveRule(id,-1);else if(a==='move-down')moveRule(id,1);
        else if(a==='clone')cloneRule(id);
      };
    });
    dom.rulesList.querySelectorAll('[data-collapse-id]').forEach(hdr=>{
      hdr.addEventListener('click',e=>{
        if(e.target.closest('.rule-action-btn')||e.target.closest('.drag-handle'))return;
        toggleCollapseRule(+hdr.dataset.collapseId);
      });
    });
    dom.rulesList.querySelectorAll('[data-rule][data-key]').forEach(el=>{
      const ev=el.matches('select')?'change':el.matches('[data-bool]')?'change':'input';
      el.addEventListener(ev,()=>{
        const rid=+el.dataset.rule,key=el.dataset.key;
        let v;if(el.hasAttribute('data-bool'))v=el.checked;
        else if(el.hasAttribute('data-num'))v=parseInt(el.value)||0;else v=el.value;
        updateRuleParam(rid,key,v);

        // Re-render rule if select changed mode/position
        if (el.matches('select') && (key === 'mode' || key === 'position')) {
          renderRules();
        }

        if(key==='find'||key==='useRegex'){
          const rule=state.rules.find(r=>r.id===rid);
          if(rule&&rule.params.useRegex){
            const inp=dom.rulesList.querySelector(`[data-rule="${rid}"][data-key="find"]`);
            const statusEl=inp?.parentElement.querySelector('.regex-status');
            if(inp){
              try{
                new RegExp(rule.params.find);
                inp.className='regex-valid';
                if(statusEl){statusEl.className='regex-status valid';statusEl.textContent='✓';statusEl.title=t('regexValid');}
              } catch{
                inp.className='regex-invalid';
                if(statusEl){statusEl.className='regex-status invalid';statusEl.textContent='✗';statusEl.title=t('regexInvalid');}
              }
            }
          }
        }
      });
    });

    // Quick regex preset tag clicks
    dom.rulesList.querySelectorAll('.regex-preset-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const card = tag.closest('.rule-card');
        if (!card) return;
        const rid = +card.dataset.ruleId;
        const rule = state.rules.find(r => r.id === rid);
        if (rule) {
          rule.params.find = tag.dataset.presetFind;
          rule.params.replace = tag.dataset.presetRep;
          renderRules();
          updatePreview();
        }
      });
    });

    // Deterministic Drag and Drop Reordering
    dom.rulesList.querySelectorAll('.rule-card').forEach(card=>{
      card.addEventListener('dragstart',e=>{card.classList.add('dragging');e.dataTransfer.setData('text/plain',card.dataset.ruleId);e.dataTransfer.effectAllowed='move'});
      card.addEventListener('dragend',()=>{card.classList.remove('dragging');dom.rulesList.querySelectorAll('.rule-card').forEach(c=>c.classList.remove('drag-over'))});
      card.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='move';card.classList.add('drag-over')});
      card.addEventListener('dragleave',()=>card.classList.remove('drag-over'));
      card.addEventListener('drop',e=>{
        e.preventDefault();card.classList.remove('drag-over');
        const did=+e.dataTransfer.getData('text/plain'),tid=+card.dataset.ruleId;
        if(did===tid)return;
        const movedRule = state.rules.find(r => r.id === did);
        const targetRule = state.rules.find(r => r.id === tid);
        if (!movedRule || !targetRule) return;
        const di = state.rules.indexOf(movedRule);
        state.rules.splice(di, 1);
        const ti = state.rules.indexOf(targetRule);
        state.rules.splice(ti, 0, movedRule);
        renderRules();updatePreview();
      });
    });
  }

  // ═══════════════════════════════════════════════
  //  PREVIEW (Virtual Scroll + Conflict Detection)
  // ═══════════════════════════════════════════════
  const PREVIEW_ROW_H = 32;
  let _previewResults = [];
  let _displayResults = [];

  const ILLEGAL_CHARS_RE = /[\\/:*?"<>|]/;
  const WINDOWS_RESERVED_RE = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$/i;

  function validateFilename(newName) {
    if (typeof newName !== 'string' || !newName.trim()) {
      return { valid: false, reason: 'blank' };
    }
    if (ILLEGAL_CHARS_RE.test(newName)) {
      return { valid: false, reason: 'illegal' };
    }
    if (WINDOWS_RESERVED_RE.test(newName)) {
      return { valid: false, reason: 'reserved' };
    }
    if (newName.length > 255) {
      return { valid: false, reason: 'tooLong' };
    }
    const { base: newBase } = splitFilename(newName);
    if (/[. ]$/.test(newName) || (newBase && /[. ]$/.test(newBase))) {
      return { valid: false, reason: 'trailing' };
    }
    return { valid: true };
  }

  function updatePreview(){
    const sel=state.files.filter(f=>f.selected);
    if(sel.length===0||state.rules.length===0){
      dom.previewBody.innerHTML='';dom.previewEmpty.classList.remove('hidden');
      dom.changeCount.textContent='0';dom.conflictCount.textContent='0';dom.unchangedCount.textContent='0';
      dom.executeBtn.disabled=true;dom.actionInfo.textContent='';_previewResults=[];_displayResults=[];
      dom.exportMenuBtn.disabled = state.operationLogs.length === 0;
      if (dom.resetCustomEditsBtn) dom.resetCustomEditsBtn.classList.add('hidden');
      return;
    }

    const results=sel.map((file,i)=>({
      file,
      original:file.name,
      newName:computeNewName(file,i),
      relPath:file.relPath||'',
      isCustom:!!state.customEdits[getFileKey(file)]
    }));

    // Subdirectory-aware conflict detection
    const unselectedInDir = new Map();
    state.files.filter(f=>!f.selected).forEach(f=>{
      const dir = f.relPath || '';
      if(!unselectedInDir.has(dir)) unselectedInDir.set(dir, new Set());
      unselectedInDir.get(dir).add(f.name.toLowerCase());
    });

    const newNamesInDir = new Map();
    results.forEach(r=>{
      const dir = r.relPath;
      if(!newNamesInDir.has(dir)) newNamesInDir.set(dir, new Map());
      const dirMap = newNamesInDir.get(dir);
      const k = r.newName.toLowerCase();
      dirMap.set(k, (dirMap.get(k)||0)+1);
    });

    let hasInvalidName = false;
    results.forEach(r=>{
      const dir = r.relPath;
      r.changed = r.original !== r.newName;
      const countInDir = newNamesInDir.get(dir)?.get(r.newName.toLowerCase()) || 0;
      const existsUnselected = unselectedInDir.get(dir)?.has(r.newName.toLowerCase()) || false;

      const val = validateFilename(r.newName);
      r.invalid = !val.valid;
      if (r.invalid) {
        hasInvalidName = true;
        r.invalidReason = val.reason;
      }

      r.conflict = countInDir > 1 || (r.changed && existsUnselected) || r.invalid;
    });

    const changes=results.filter(r=>r.changed).length;
    const conflicts=results.filter(r=>r.conflict).length;
    dom.changeCount.textContent=changes;dom.conflictCount.textContent=conflicts;
    dom.unchangedCount.textContent=results.filter(r=>!r.changed).length;
    _previewResults=results;
    _displayResults=state.showChangedOnly?results.filter(r=>r.changed):results;
    dom.previewEmpty.classList.toggle('hidden',_displayResults.length>0);
    if(_displayResults.length===0){
      dom.previewBody.innerHTML=`<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--text-muted)">${t('noChanges')}</td></tr>`;
    } else {
      renderPreviewVirtualRows();
    }
    dom.executeBtn.disabled=changes===0||conflicts>0;
    dom.exportMenuBtn.disabled=changes===0 && state.operationLogs.length===0;

    const customCount = Object.keys(state.customEdits).length;
    if (dom.resetCustomEditsBtn) {
      dom.resetCustomEditsBtn.classList.toggle('hidden', customCount === 0);
      if (dom.customEditCount) dom.customEditCount.textContent = customCount;
    }

    dom.actionInfo.textContent = hasInvalidName
      ? t('hasInvalidName')
      : conflicts > 0
        ? t('hasConflict')
        : changes > 0
          ? t('willRename', changes)
          : '';
  }

  function renderPreviewVirtualRows(){
    const ct=dom.previewContainer;
    const scrollTop=ct.scrollTop;
    const viewH=ct.clientHeight || 400;
    const total=_displayResults.length;
    const start=Math.max(0,Math.floor(scrollTop/PREVIEW_ROW_H)-BUFFER);
    const end=Math.min(total,Math.ceil((scrollTop+viewH)/PREVIEW_ROW_H)+BUFFER);
    const topPad=start*PREVIEW_ROW_H;
    const bottomPad=(total-end)*PREVIEW_ROW_H;

    let html=topPad>0?`<tr class="spacer-row"><td colspan="4" style="height:${topPad}px"></td></tr>`:'';
    for(let i=start;i<end;i++){
      const r=_displayResults[i];
      const cls=r.conflict?'conflict':r.changed?(r.isCustom?'changed custom-edit':'changed'):'';
      let ico;
      if (r.invalid) {
        let tip;
        switch (r.invalidReason) {
          case 'blank': tip = t('errBlankName'); break;
          case 'illegal': tip = t('errIllegalChars'); break;
          case 'reserved': tip = t('errReservedName'); break;
          case 'tooLong': tip = t('errTooLong'); break;
          default: tip = t('errTrailingChar'); break;
        }
        ico = `<span class="conflict-icon" title="${escAttr(tip)}">⛔</span>`;
      } else if (r.conflict) {
        ico = `<span class="conflict-icon" title="${escAttr(t('hasConflict'))}">⚠️</span>`;
      } else if (r.changed) {
        ico = '<span style="color:var(--accent-2)">●</span>';
      } else {
        ico = '<span style="color:var(--text-muted)">○</span>';
      }
      const newHtml=r.changed?highlightDiff(r.original,r.newName):escHtml(r.newName);
      const customBadge=r.isCustom?`<span class="custom-badge">${t('customEdit')}</span>`:'';
      const fileKey = getFileKey(r.file);
      html+=`<tr class="${cls}"><td class="col-status">${ico}</td><td class="original-name">${escHtml(r.original)}</td><td class="col-arrow">→</td><td class="new-name"><span class="new-name-editable" data-key="${escAttr(fileKey)}" data-index="${i}" title="${t('clickToEdit')}">${newHtml}</span>${customBadge}</td></tr>`;
    }
    if(bottomPad>0)html+=`<tr class="spacer-row"><td colspan="4" style="height:${bottomPad}px"></td></tr>`;
    dom.previewBody.innerHTML=html;
    bindPreviewEditable();
  }

  function bindPreviewEditable(){
    dom.previewBody.querySelectorAll('.new-name-editable').forEach(el=>{
      el.addEventListener('dblclick',()=>{
        const fileKey=el.dataset.key;
        const targetResult = _previewResults.find(r => getFileKey(r.file) === fileKey);
        if (!targetResult) return;
        const current = state.customEdits[fileKey] || targetResult.newName;
        el.textContent=current;
        el.contentEditable='true';
        el.classList.add('editing');
        el.focus();

        let cancelled = false;
        const done=()=>{
          el.removeEventListener('keydown', onKeyDown);
          el.contentEditable='false';
          el.classList.remove('editing');
          if (!cancelled) {
            const val=el.textContent.trim();
            if(val && val !== targetResult.original){
              state.customEdits[fileKey] = val;
            } else {
              delete state.customEdits[fileKey];
            }
          }
          updatePreview();
        };

        const onKeyDown = e => {
          if(e.key==='Enter'){
            e.preventDefault();
            el.blur();
          } else if(e.key==='Escape'){
            e.preventDefault();
            cancelled = true;
            el.textContent = current;
            el.blur();
          }
        };

        el.addEventListener('blur',done,{once:true});
        el.addEventListener('keydown', onKeyDown);
      });
    });
  }

  function highlightDiff(o,n){
    if (o === n) return escHtml(n);
    let start = 0;
    while(start < o.length && start < n.length && o[start] === n[start]) {
      start++;
    }
    if (start > 0 && n.charCodeAt(start - 1) >= 0xD800 && n.charCodeAt(start - 1) <= 0xDBFF) {
      start--;
    }
    let oEnd = o.length - 1;
    let nEnd = n.length - 1;
    while(oEnd >= start && nEnd >= start && o[oEnd] === n[nEnd]) {
      oEnd--;
      nEnd--;
    }
    if (nEnd >= 0 && nEnd < n.length - 1 && n.charCodeAt(nEnd) >= 0xD800 && n.charCodeAt(nEnd) <= 0xDBFF) {
      nEnd++;
    }
    const prefix = escHtml(n.substring(0, start));
    const changedNew = escHtml(n.substring(start, nEnd + 1));
    const suffix = escHtml(n.substring(nEnd + 1));

    if (changedNew.length > 0) {
      return `${prefix}<span class="diff-highlight diff-added">${changedNew}</span>${suffix}`;
    } else {
      return `${prefix}<span class="diff-highlight diff-deleted">▪</span>${suffix}`;
    }
  }

  // ═══════════════════════════════════════════════
  //  EXECUTE & UNDO
  // ═══════════════════════════════════════════════
  async function executeRename(){
    const sel=state.files.filter(f=>f.selected);
    const results=sel.map((file,i)=>({
      file,
      original:file.name,
      newName:computeNewName(file,i),
      relPath:file.relPath||''
    })).filter(r=>r.original!==r.newName);

    if(!results.length)return;

    if (state.isFallbackMode || !results[0].file.handle || typeof results[0].file.handle.move !== 'function') {
      // Fallback export script
      showExportOptions(results);
      return;
    }

    if(!await showConfirm(t('confirmTitle'),t('confirmRename',results.length)))return;

    // Verify write permissions for individual files if loaded without dirHandle
    for (const r of results) {
      if (r.file.handle && typeof r.file.handle.queryPermission === 'function') {
        try {
          let perm = await r.file.handle.queryPermission({ mode: 'readwrite' });
          if (perm !== 'granted') {
            perm = await r.file.handle.requestPermission({ mode: 'readwrite' });
            if (perm !== 'granted') {
              toast(t('noPermission'), 'error');
              return;
            }
          }
        } catch (permErr) {
          console.warn('Permission check error', permErr);
        }
      }
    }

    dom.progressOverlay.classList.remove('hidden');
    dom.progressBar.style.width='0%';dom.progressCount.textContent=`0 / ${results.length}`;
    dom.progressErrors.classList.add('hidden');

    // Identify case-only or cross-collision renames needing temp file
    const existingInDir = new Map();
    state.files.forEach(f => {
      const dir = f.relPath || '';
      if (!existingInDir.has(dir)) existingInDir.set(dir, new Set());
      existingInDir.get(dir).add(f.name.toLowerCase());
    });

    const needsTemp=[];const direct=[];
    for(const r of results){
      const dir = r.relPath;
      const targetExists = existingInDir.get(dir)?.has(r.newName.toLowerCase());
      const isSameCaseChange = r.original.toLowerCase() === r.newName.toLowerCase() && r.original !== r.newName;
      const targetIsBeingRenamed = results.some(x => x.relPath === dir && x.original.toLowerCase() === r.newName.toLowerCase());

      if(isSameCaseChange || (targetExists && targetIsBeingRenamed)){
        needsTemp.push(r);
      } else {
        direct.push(r);
      }
    }

    const undoEntries=[];let done=0,errors=0;
    const updateProgress=()=>{
      done++;const pct=Math.round(done/results.length*100);
      dom.progressBar.style.width=pct+'%';
      dom.progressCount.textContent=`${done} / ${results.length}`;
      if(errors>0){dom.progressErrors.classList.remove('hidden');dom.progressErrors.textContent=t('nFailed',errors)}
    };

    const phase1Success = new Set();
    // Phase 1: Move colliding/case-changed files to temporary names
    for(const r of needsTemp){
      const tempName=`__brp_tmp_${Date.now()}_${Math.random().toString(36).slice(2,7)}.tmp`;
      try{
        await r.file.handle.move(tempName);
        r.file.name=tempName;
        phase1Success.add(r);
      }catch(e){
        console.error(e);
        errors++;
      }
    }

    // Phase 2: Direct renames
    for(const r of direct){
      try{
        await r.file.handle.move(r.newName);
        const oldKey = getFileKey(r.file);
        r.file.name=r.newName;
        const newKey = getFileKey(r.file);
        if (state.thumbnailCache.has(oldKey)) {
          state.thumbnailCache.set(newKey, state.thumbnailCache.get(oldKey));
          state.thumbnailCache.delete(oldKey);
        }
        undoEntries.push({handle:r.file.handle,oldName:r.original,newName:r.newName,relPath:r.relPath});
        updateProgress();
      }catch(e){
        console.error(e);
        errors++;
        updateProgress();
      }
    }

    // Phase 3: Move temp files to their final names
    for(const r of needsTemp){
      if (!phase1Success.has(r)) continue;
      try{
        await r.file.handle.move(r.newName);
        const oldKey = r.relPath ? `${r.relPath}/${r.original}` : r.original;
        r.file.name=r.newName;
        const newKey = getFileKey(r.file);
        if (state.thumbnailCache.has(oldKey)) {
          state.thumbnailCache.set(newKey, state.thumbnailCache.get(oldKey));
          state.thumbnailCache.delete(oldKey);
        }
        undoEntries.push({handle:r.file.handle,oldName:r.original,newName:r.newName,relPath:r.relPath});
        updateProgress();
      }catch(e){
        console.error('Phase 3 move failed, restoring temp file:', e);
        try {
          await r.file.handle.move(r.original);
          r.file.name = r.original;
        } catch (restoreErr) {
          console.error('Failed to restore temp file:', restoreErr);
        }
        errors++;
        updateProgress();
      }
    }

    setTimeout(()=>dom.progressOverlay.classList.add('hidden'),400);

    if(undoEntries.length>0){
      state.undoStack.push({entries:undoEntries,timestamp:Date.now()});
      state.operationLogs.push({timestamp:Date.now(),entries:undoEntries.map(e=>({old:e.oldName,new:e.newName,relPath:e.relPath}))});
      dom.undoBtn.disabled=false;
      dom.exportMenuBtn.disabled=false;
    }
    state.customEdits={};
    if(errors===0)toast(t('successRename',undoEntries.length),'success');
    else toast(t('partialRename',undoEntries.length,errors),'warning');
    sortFiles();
    renderFileList();updatePreview();
  }

  async function undoRename(){
    if(!state.undoStack.length)return;
    const last=state.undoStack[state.undoStack.length-1];
    if(!await showConfirm(t('undoTitle'),t('confirmUndo',last.entries.length)))return;
    dom.undoBtn.disabled=true;let ok=0;
    const entriesToUndo = [...last.entries].reverse();
    for(const e of entriesToUndo){
      try{
        const isCaseOnly = e.newName.toLowerCase() === e.oldName.toLowerCase() && e.newName !== e.oldName;
        if (isCaseOnly) {
          const temp = `__brp_undo_${Date.now()}_${Math.random().toString(36).slice(2,7)}.tmp`;
          await e.handle.move(temp);
        }
        await e.handle.move(e.oldName);
        const f=state.files.find(x=>x.handle===e.handle);
        if(f){
          const currentKey = getFileKey(f);
          f.name=e.oldName;
          const origKey = getFileKey(f);
          if (state.thumbnailCache.has(currentKey)) {
            state.thumbnailCache.set(origKey, state.thumbnailCache.get(currentKey));
            state.thumbnailCache.delete(currentKey);
          }
        }
        ok++;
      }catch(err){console.error(err)}
    }
    state.undoStack.pop();
    dom.undoBtn.disabled=!state.undoStack.length;
    toast(t('successUndo',ok),'success');
    sortFiles();
    renderFileList();updatePreview();
  }

  // ═══════════════════════════════════════════════
  //  EXPORT LOG & SCRIPTS
  // ═══════════════════════════════════════════════
  function hideExportMenu(){dom.exportMenu.classList.add('hidden')}
  function showExportOptions(customResults=null){
    dom.exportMenu.classList.toggle('hidden');
  }

  function getExportEntries(forScript = false) {
    const sel = state.files.filter(f => f.selected);
    const previewChanges = sel.map((file, i) => ({
      old: file.name,
      new: computeNewName(file, i),
      relPath: file.relPath || ''
    })).filter(r => r.old !== r.new);

    if (forScript) {
      return previewChanges;
    }

    if (state.operationLogs.length > 0) {
      return state.operationLogs[state.operationLogs.length - 1].entries;
    }
    return previewChanges;
  }

  function exportData(type) {
    const isScript = type === 'bat' || type === 'sh' || type === 'ps1';
    const entries = getExportEntries(isScript);
    if (!entries.length) {
      toast(t('noChanges'), 'info');
      hideExportMenu();
      return;
    }

    if (isScript && _previewResults.some(r => r.conflict)) {
      toast(t('hasConflict'), 'warning');
    }

    const dateStr = new Date().toISOString().slice(0, 10);

    if (type === 'csv') {
      let csv = 'Timestamp,Relative Path,Original Name,New Name\r\n';
      const ts = new Date().toISOString();
      entries.forEach(e => {
        const p = e.relPath ? `"${e.relPath.replace(/"/g, '""')}"` : '""';
        const o = `"${e.old.replace(/"/g, '""')}"`;
        const n = `"${e.new.replace(/"/g, '""')}"`;
        csv += `"${ts}",${p},${o},${n}\r\n`;
      });
      // Include UTF-8 BOM for Microsoft Excel compatibility
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      downloadBlob(blob, `batch-rename-log-${dateStr}.csv`);
      toast(t('exportSuccess', 'CSV'), 'success');
    } else if (type === 'json') {
      const jsonStr = JSON.stringify({ timestamp: Date.now(), total: entries.length, changes: entries }, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
      downloadBlob(blob, `batch-rename-manifest-${dateStr}.json`);
      toast(t('exportSuccess', 'JSON'), 'success');
    } else if (type === 'bat') {
      let script = '@echo off\r\nchcp 65001 > nul\r\nREM ====================================\r\nREM Batch Renamer Pro Generated Script\r\nREM ====================================\r\n\r\n';
      entries.forEach(e => {
        const p = e.relPath ? e.relPath.replace(/\//g, '\\') + '\\' : '';
        const oldEsc = (p + e.old).replace(/%/g, '%%');
        const newEsc = e.new.replace(/%/g, '%%');
        const isCaseOnly = e.old.toLowerCase() === e.new.toLowerCase() && e.old !== e.new;
        if (isCaseOnly) {
          script += `ren "${oldEsc}" "${newEsc}.tmp"\r\n`;
          script += `ren "${p}${newEsc}.tmp" "${newEsc}"\r\n`;
        } else {
          script += `ren "${oldEsc}" "${newEsc}"\r\n`;
        }
      });
      script += '\r\necho Renaming complete!\r\npause\r\n';
      const blob = new Blob(['\uFEFF' + script], { type: 'text/plain;charset=utf-8;' });
      downloadBlob(blob, `rename-script-${dateStr}.bat`);
      toast(t('exportSuccess', '.bat'), 'success');
    } else if (type === 'ps1') {
      let script = '# ====================================\r\n# Batch Renamer Pro Generated Script\r\n# ====================================\r\n[Console]::OutputEncoding = [System.Text.Encoding]::UTF8\r\n\r\n';
      entries.forEach(e => {
        const p = e.relPath ? e.relPath.replace(/\//g, '\\') + '\\' : '';
        const oldEsc = (p + e.old).replace(/'/g, "''");
        const newEsc = e.new.replace(/'/g, "''");
        const isCaseOnly = e.old.toLowerCase() === e.new.toLowerCase() && e.old !== e.new;
        if (isCaseOnly) {
          const tmpName = '__brp_' + Math.random().toString(36).slice(2, 8) + '.tmp';
          script += `Rename-Item -LiteralPath '${oldEsc}' -NewName '${tmpName}' -ErrorAction Continue\r\n`;
          script += `Rename-Item -LiteralPath '${(p + tmpName).replace(/'/g, "''")}' -NewName '${newEsc}' -ErrorAction Continue\r\n`;
        } else {
          script += `Rename-Item -LiteralPath '${oldEsc}' -NewName '${newEsc}' -ErrorAction Continue\r\n`;
        }
      });
      script += '\r\nWrite-Host "Renaming complete!" -ForegroundColor Green\r\nRead-Host "Press Enter to exit"\r\n';
      const blob = new Blob(['\uFEFF' + script], { type: 'text/plain;charset=utf-8;' });
      downloadBlob(blob, `rename-script-${dateStr}.ps1`);
      toast(t('exportSuccess', '.ps1'), 'success');
    } else if (type === 'sh') {
      let script = '#!/bin/bash\n# ====================================\n# Batch Renamer Pro Generated Script\n# ====================================\n\n';
      entries.forEach(e => {
        const p = e.relPath ? e.relPath + '/' : '';
        const oldEsc = (p + e.old).replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/`/g, '\\`').replace(/"/g, '\\"');
        const newEsc = (p + e.new).replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/`/g, '\\`').replace(/"/g, '\\"');
        script += `mv "${oldEsc}" "${newEsc}"\n`;
      });
      script += '\necho "Renaming complete!"\n';
      const blob = new Blob([script], { type: 'text/x-sh;charset=utf-8;' });
      downloadBlob(blob, `rename-script-${dateStr}.sh`);
      toast(t('exportSuccess', '.sh'), 'success');
    }
    hideExportMenu();
  }

  function downloadBlob(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  // ═══════════════════════════════════════════════
  //  PRESETS & PRESET MANAGER
  // ═══════════════════════════════════════════════
  const BUILTIN_PRESETS={
    __photo:[
      {type:'date',params:{format:'YYYY-MM-DD',position:'prefix',source:'modified',separator:'_'}},
      {type:'numbering',params:{start:1,step:1,digits:3,position:'suffix',separator:'_'}}
    ],
    __cleanMedia:[
      {type:'replace',params:{find:'\\s*[(\\[（【][^)\\]）】]*[)\\]）】]\\s*',replace:' ',useRegex:true,caseSensitive:false,applyTo:'base'}},
      {type:'replace',params:{find:'\\b(1080p|720p|4k|2160p|x264|x265|hevc|web-dl|bluray|hdrip)\\b',replace:'',useRegex:true,caseSensitive:false,applyTo:'base'}},
      {type:'remove',params:{removeSpaces:false,removeSpecial:false,collapseSpaces:true,trim:true,from:0,count:0}}
    ],
    __normalizeSpaces:[
      {type:'remove',params:{removeSpaces:false,removeSpecial:false,removeDigits:false,removeIllegal:false,collapseSpaces:true,trim:true,from:0,count:0}}
    ],
    __webSafe:[
      {type:'remove',params:{removeSpaces:false,removeSpecial:true,removeDigits:false,removeIllegal:true,collapseSpaces:true,trim:true,from:0,count:0}},
      {type:'case',params:{mode:'kebab',applyTo:'base'}},
      {type:'extension',params:{mode:'lower'}}
    ],
    __addDatePrefix:[
      {type:'date',params:{format:'YYYY-MM-DD',position:'prefix',source:'modified',separator:'_'}}
    ],
    __stripDigits:[
      {type:'remove',params:{removeDigits:true,removeSpaces:false,removeSpecial:false,removeIllegal:false,collapseSpaces:false,trim:false,from:0,count:0}}
    ],
    __code:[
      {type:'case',params:{mode:'snake',applyTo:'base'}}
    ],
    __clean:[
      {type:'remove',params:{from:0,count:0,removeSpaces:true,removeSpecial:true,removeDigits:false,removeIllegal:true,collapseSpaces:true,trim:true}}
    ],
    __lowerExt:[
      {type:'extension',params:{mode:'lower'}}
    ]
  };

  function loadPresets(){
    const saved=JSON.parse(localStorage.getItem('brp_presets')||'{}');
    const oldCustom=dom.presetSelect.querySelector('optgroup.custom-presets');
    if(oldCustom)oldCustom.remove();
    if(Object.keys(saved).length>0){
      const grp=document.createElement('optgroup');
      grp.label=state.lang==='en'?'Custom Presets':'自定义预设';
      grp.className='custom-presets';
      for(const name of Object.keys(saved)){
        const opt=document.createElement('option');
        opt.value='custom:'+name;
        opt.textContent='⭐ '+name;
        grp.appendChild(opt);
      }
      dom.presetSelect.appendChild(grp);
    }
  }

  function applyPreset(key){
    if(!key)return;
    let rules;
    let presetLabel = '';
    if(key.startsWith('custom:')){
      const name=key.slice(7);
      const saved=JSON.parse(localStorage.getItem('brp_presets')||'{}');
      rules=saved[name];if(!rules)return;
      presetLabel = name;
    } else {
      rules=BUILTIN_PRESETS[key];if(!rules)return;
      const transKey = 'preset_' + key;
      presetLabel = t(transKey) || key.replace('__','');
    }
    state.rules=rules.map(r=>({
      id:uid(),
      type:r.type,
      params:{...RULE_DEFAULTS[r.type],...r.params},
      enabled:true,
      collapsed:false
    }));
    state.customEdits={};
    renderRules();
    updatePreview();
    toast(t('presetLoaded',presetLabel),'success');
  }

  async function savePreset(){
    if(!state.rules.length){toast(t('addRuleHint'),'info');return;}
    const name=await showPrompt(t('savePresetTitle'),t('enterPresetName'));
    if(!name)return;
    const saved=JSON.parse(localStorage.getItem('brp_presets')||'{}');
    saved[name]=state.rules.map(r=>({type:r.type,params:{...r.params}}));
    localStorage.setItem('brp_presets',JSON.stringify(saved));
    loadPresets();
    toast(t('presetSaved',name),'success');
  }

  function openPresetManager(){
    renderPresetManagerList();
    dom.presetManagerModal.classList.add('open');
  }

  function renderPresetManagerList(){
    const saved=JSON.parse(localStorage.getItem('brp_presets')||'{}');
    const customNames=Object.keys(saved);

    const builtinKeys = Object.keys(BUILTIN_PRESETS);
    const builtinHtml = builtinKeys.map(key => {
      const transKey = 'preset_' + key;
      const label = t(transKey) || key;
      const ruleCount = BUILTIN_PRESETS[key].length;
      return `
        <div class="preset-list-item builtin">
          <div>
            <span class="preset-item-name">${escHtml(label)}</span>
            <span class="preset-item-rules-count">(${t('rulesCount', ruleCount)})</span>
          </div>
          <div class="preset-item-actions">
            <button class="btn btn-secondary btn-sm" data-apply-preset="${escAttr(key)}">${t('apply')}</button>
          </div>
        </div>`;
    }).join('');

    let customHtml = '';
    if (customNames.length) {
      customHtml = customNames.map(name => `
        <div class="preset-list-item">
          <div>
            <span class="preset-item-name">⭐ ${escHtml(name)}</span>
            <span class="preset-item-rules-count">(${t('rulesCount', saved[name].length)})</span>
          </div>
          <div class="preset-item-actions">
            <button class="btn btn-secondary btn-sm" data-apply-preset="custom:${escAttr(name)}">${t('apply')}</button>
            <button class="rule-action-btn delete" data-delete-preset="${escAttr(name)}" title="${t('del')}">✕</button>
          </div>
        </div>`).join('');
    } else {
      customHtml = `<div style="padding:12px;text-align:center;color:var(--text-muted);font-size:0.85rem">${t('noCustomPresets')}</div>`;
    }

    dom.presetListContainer.innerHTML = `
      <div class="preset-section-title">${t('builtinPresets')}</div>
      ${builtinHtml}
      <div class="preset-section-title" style="margin-top:14px">${t('customPresets')}</div>
      ${customHtml}
    `;

    dom.presetListContainer.querySelectorAll('[data-apply-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        applyPreset(btn.dataset.applyPreset);
        dom.presetManagerModal.classList.remove('open');
      });
    });

    dom.presetListContainer.querySelectorAll('[data-delete-preset]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const name = btn.dataset.deletePreset;
        if (await showConfirm(t('confirmTitle'), t('deletePresetConfirm', name))) {
          const s = JSON.parse(localStorage.getItem('brp_presets') || '{}');
          delete s[name];
          localStorage.setItem('brp_presets', JSON.stringify(s));
          loadPresets();
          renderPresetManagerList();
          toast(t('presetDeleted', name), 'info');
        }
      });
    });
  }

  function exportAllPresets() {
    const saved = localStorage.getItem('brp_presets') || '{}';
    const blob = new Blob([saved], { type: 'application/json;charset=utf-8;' });
    downloadBlob(blob, `batch-renamer-presets-${new Date().toISOString().slice(0,10)}.json`);
    toast(t('exportSuccess', 'JSON Presets'), 'success');
  }

  function importPresets(file) {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error();
        const current = JSON.parse(localStorage.getItem('brp_presets') || '{}');
        let count = 0;
        for (const [name, rules] of Object.entries(data)) {
          if (Array.isArray(rules)) {
            current[name] = rules;
            count++;
          }
        }
        localStorage.setItem('brp_presets', JSON.stringify(current));
        loadPresets();
        renderPresetManagerList();
        toast(t('presetImportSuccess', count), 'success');
      } catch {
        toast(t('presetImportFailed'), 'error');
      }
    };
    reader.readAsText(file);
  }

  // ═══════════════════════════════════════════════
  //  THEME & LANG
  // ═══════════════════════════════════════════════
  function setTheme(theme){
    state.theme=theme;document.documentElement.dataset.theme=theme;
    dom.themeToggle.textContent=theme==='dark'?'🌙':'☀️';
    localStorage.setItem('brp_theme',theme);
  }
  function setLang(lang){
    state.lang=lang;localStorage.setItem('brp_lang',lang);
    dom.langToggle.textContent=lang==='zh'?'中/En':'En/中';
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.dataset.i18n;const text=t(key);
      if(el.querySelector('.panel-badge')){
        const badge=el.querySelector('.panel-badge');
        el.textContent=text+' ';el.appendChild(badge);
      }else{el.textContent=text}
    });
    document.querySelectorAll('[data-i18n-opt]').forEach(el => {
      el.textContent = t(el.dataset.i18nOpt);
    });
    document.querySelectorAll('[data-i18n-optgroup]').forEach(el => {
      el.label = t(el.dataset.i18nOptgroup);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.dataset.i18nTitle);
    });
    renderFileList();renderRules();updatePreview();
  }

  // ═══════════════════════════════════════════════
  //  DRAG & DROP
  // ═══════════════════════════════════════════════
  function setupDragDrop(){
    const panel=document.querySelector('.file-panel');
    let dragCounter=0;
    panel.addEventListener('dragenter',e=>{
      e.preventDefault();dragCounter++;
      if(e.dataTransfer.types.includes('Files')){dom.dropZone.classList.remove('hidden');dom.dropZone.classList.add('active')}
    });
    panel.addEventListener('dragleave',e=>{
      e.preventDefault();dragCounter--;if(dragCounter<=0){dragCounter=0;dom.dropZone.classList.add('hidden');dom.dropZone.classList.remove('active')}
    });
    panel.addEventListener('dragover',e=>e.preventDefault());
    panel.addEventListener('drop',async e=>{
      e.preventDefault();dragCounter=0;dom.dropZone.classList.add('hidden');dom.dropZone.classList.remove('active');
      const items=[...e.dataTransfer.items];
      for(const item of items){
        if(item.kind==='file' && 'getAsFileSystemHandle' in item){
          const handle=await item.getAsFileSystemHandle();
          if(handle && handle.kind==='directory'){
            state.dirHandle=handle;
            dom.currentPath.textContent=`📁 ${handle.name}`;dom.currentPath.classList.remove('hidden');
            state.isFallbackMode = false;
            await loadFiles();toast(t('loadedFolder',handle.name),'success');
            return;
          }
        }
      }

      // Check if dropped items are individual files and support FileSystemHandle
      if ('getAsFileSystemHandle' in DataTransferItem.prototype) {
        const fileHandles = [];
        for (const item of items) {
          if (item.kind === 'file') {
            try {
              const h = await item.getAsFileSystemHandle();
              if (h && h.kind === 'file') fileHandles.push(h);
            } catch {}
          }
        }
        if (fileHandles.length > 0) {
          state.files = [];
          state.thumbnailCache.forEach(url => URL.revokeObjectURL(url));
          state.thumbnailCache.clear();
          state.isFallbackMode = false;
          state.dirHandle = null;

          for (let i = 0; i < fileHandles.length; i++) {
            const handle = fileHandles[i];
            const file = await handle.getFile();
            state.files.push({
              id: 'file_' + i + '_' + file.name,
              handle: handle,
              fileObj: file,
              name: file.name,
              relPath: '',
              size: file.size,
              lastModified: file.lastModified,
              selected: true,
              thumbUrl: null
            });
          }
          dom.currentPath.textContent = `📄 ${fileHandles.length} ${state.lang === 'zh' ? '个已选文件' : 'files selected'}`;
          dom.currentPath.classList.remove('hidden');
          onFilesLoaded();
          toast(t('nFiles', fileHandles.length), 'success');
          return;
        }
      }

      if (e.dataTransfer.files.length) {
        handleFallbackFiles(e.dataTransfer.files);
      }
    });
  }

  // ═══════════════════════════════════════════════
  //  CONTEXT MENU
  // ═══════════════════════════════════════════════
  function showContextMenu(e, file){
    e.preventDefault();
    state.contextFile=file;
    const menu=dom.contextMenu;
    menu.classList.remove('hidden');
    const x=Math.min(e.clientX,window.innerWidth-220);
    const y=Math.min(e.clientY,window.innerHeight-menu.offsetHeight-10);
    menu.style.left=x+'px';menu.style.top=y+'px';
  }
  function hideContextMenu(){dom.contextMenu.classList.add('hidden');state.contextFile=null}

  function handleContextAction(action){
    const f=state.contextFile;if(!f){hideContextMenu();return}
    switch(action){
      case 'select-only':
        state.files.forEach(x=>x.selected=x===f);
        renderFileList();updatePreview();break;
      case 'deselect':
        f.selected=false;renderFileList();updatePreview();break;
      case 'copy-name':
        navigator.clipboard.writeText(f.name).then(()=>toast(t('copied'),'success'));break;
      case 'copy-new-name': {
        const prev = _previewResults.find(r => r.file === f);
        let newName;
        if (prev) {
          newName = prev.newName;
        } else {
          const sel = state.files.filter(x => x.selected);
          const selIdx = sel.indexOf(f);
          newName = computeNewName(f, selIdx >= 0 ? selIdx : 0);
        }
        navigator.clipboard.writeText(newName).then(()=>toast(t('copied'),'success'));
        break;
      }
      case 'locate-preview':
        if(window.innerWidth<1024)switchTab('preview');
        const idx=_previewResults.findIndex(r=>r.original===f.name);
        if(idx>=0){dom.previewContainer.scrollTop=idx*PREVIEW_ROW_H;renderPreviewVirtualRows()}
        break;
      case 'file-info':
        showFileInfo(f);break;
    }
    hideContextMenu();
  }

  function showFileInfo(f){
    const {ext}=splitFilename(f.name);
    const modified=new Date(f.lastModified).toLocaleString();
    dom.fileInfoBody.innerHTML=`<table class="file-info-table">
      <tr><td>${t('fiName')}</td><td>${escHtml(f.name)}</td></tr>
      <tr><td>${t('fiSize')}</td><td>${formatSize(f.size)}</td></tr>
      <tr><td>${t('fiType')}</td><td>${ext?'.'+ext.toUpperCase():'-'}</td></tr>
      <tr><td>${t('fiModified')}</td><td>${modified}</td></tr>
      ${f.relPath?`<tr><td>${t('fiPath')}</td><td>${escHtml(f.relPath)}</td></tr>`:''}
    </table>`;
    dom.fileInfoModal.classList.add('open');
  }

  // ═══════════════════════════════════════════════
  //  RESPONSIVE TABS
  // ═══════════════════════════════════════════════
  function switchTab(tab){
    state.activeTab=tab;
    dom.mobileTabs.querySelectorAll('.mobile-tab').forEach(t=>{
      t.classList.toggle('active',t.dataset.panel===tab);
    });
    document.querySelectorAll('.file-panel,.rules-panel,.preview-panel').forEach(p=>{
      p.classList.remove('tab-active');
    });
    const panelMap={file:'.file-panel',rules:'.rules-panel',preview:'.preview-panel'};
    document.querySelector(panelMap[tab])?.classList.add('tab-active');
  }

  function checkResponsive(){
    if(window.innerWidth<1024){
      switchTab(state.activeTab);
    } else {
      document.querySelectorAll('.file-panel,.rules-panel,.preview-panel').forEach(p=>{
        p.classList.remove('tab-active');
        p.style.display='';
      });
    }
  }

  // ═══════════════════════════════════════════════
  //  KEYBOARD SHORTCUTS
  // ═══════════════════════════════════════════════
  function setupShortcuts(){
    document.addEventListener('keydown',e=>{
      if(e.target.matches('input,select,[contenteditable="true"]')&&e.key!=='Escape')return;
      if(e.key==='Escape'){closeAllModals();return}
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const key = e.key.toLowerCase();
      if(isCmdOrCtrl&&key==='o'){e.preventDefault();selectFolder()}
      if(isCmdOrCtrl&&key==='z'){e.preventDefault();if(!dom.undoBtn.disabled)undoRename()}
      if(isCmdOrCtrl&&key==='enter'){e.preventDefault();if(!dom.executeBtn.disabled)executeRename()}
      if(isCmdOrCtrl&&!e.shiftKey&&key==='a'){
        e.preventDefault();const allSel=_visibleFiles.every(f=>f.selected);
        _visibleFiles.forEach(f=>f.selected=!allSel);
        renderFileList();updatePreview();
      }
      if(isCmdOrCtrl&&e.shiftKey&&key==='a'){
        e.preventDefault();state.files.forEach(f=>f.selected=!f.selected);
        renderFileList();updatePreview();
      }
      if(isCmdOrCtrl&&key==='f'){e.preventDefault();dom.fileSearch.focus()}
      if(isCmdOrCtrl&&key==='r'){e.preventDefault();dom.ruleTypeMenu.classList.toggle('open')}
      if(isCmdOrCtrl&&key==='e'){e.preventDefault();if(!dom.exportMenuBtn.disabled)showExportOptions()}
      if(isCmdOrCtrl&&key==='/'){e.preventDefault();dom.shortcutsModal.classList.add('open')}
    });
  }

  // ═══════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════
  function init(){
    if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{})}
    const savedTheme=localStorage.getItem('brp_theme')||'dark';setTheme(savedTheme);
    const savedLang=localStorage.getItem('brp_lang')||'zh';setLang(savedLang);
    loadPresets();

    if(!('showDirectoryPicker' in window)){
      toast(t('noFSAPI'),'info');
    }

    // File panel
    dom.selectFolderBtn.addEventListener('click',selectFolder);
    dom.selectFilesBtn?.addEventListener('click',selectFiles);
    dom.fallbackFolderInput.addEventListener('change',e=>{if(e.target.files.length)handleFallbackFiles(e.target.files)});
    dom.fallbackFilesInput.addEventListener('change',e=>{if(e.target.files.length)handleFallbackFiles(e.target.files)});

    const debouncedSearch=debounce(v=>{state.searchTerm=v;renderFileList()},150);
    dom.fileSearch.addEventListener('input',e=>debouncedSearch(e.target.value));
    dom.extFilter.addEventListener('change',e=>{state.extFilter=e.target.value;renderFileList()});
    dom.selectAllCb.addEventListener('change',e=>{getVisibleFiles().forEach(f=>f.selected=e.target.checked);renderFileList();updatePreview()});
    dom.invertSelectionBtn?.addEventListener('click',()=>{
      getVisibleFiles().forEach(f=>f.selected=!f.selected);
      renderFileList();
      updatePreview();
    });

    // Shift+Click range select
    dom.fileList.addEventListener('click',e=>{
      const item=e.target.closest('.file-item');if(!item)return;
      const f=state.files[+item.dataset.index];if(!f)return;
      const visIdx=+item.dataset.vis;

      if(e.target.matches('.file-checkbox')){
        f.selected=e.target.checked;
        state.lastClickedVisIdx=visIdx;
      } else if(e.shiftKey && state.lastClickedVisIdx!==null){
        const start=Math.min(state.lastClickedVisIdx,visIdx);
        const end=Math.max(state.lastClickedVisIdx,visIdx);
        for(let i=start;i<=end;i++){
          if(_visibleFiles[i])_visibleFiles[i].selected=true;
        }
      } else {
        f.selected=!f.selected;
        state.lastClickedVisIdx=visIdx;
      }
      renderFileList();updatePreview();
    });

    // Context menu
    dom.fileList.addEventListener('contextmenu',e=>{
      const item=e.target.closest('.file-item');if(!item)return;
      const f=state.files[+item.dataset.index];if(!f)return;
      showContextMenu(e,f);
    });
    dom.contextMenu.addEventListener('click',e=>{
      const item=e.target.closest('.ctx-item');if(!item)return;
      handleContextAction(item.dataset.action);
    });
    document.addEventListener('click',e=>{
      if(!dom.contextMenu.contains(e.target))hideContextMenu();
      if(!dom.exportDropdownWrapper?.contains(e.target) && !dom.exportMenuBtn.contains(e.target))hideExportMenu();
    });
    document.addEventListener('contextmenu',e=>{
      if(!e.target.closest('.file-item')&&!dom.contextMenu.contains(e.target))hideContextMenu();
    });

    // File info modal
    dom.fileInfoCloseBtn.addEventListener('click',()=>dom.fileInfoModal.classList.remove('open'));
    dom.fileInfoModal.addEventListener('click',e=>{if(e.target===dom.fileInfoModal)dom.fileInfoModal.classList.remove('open')});

    // Virtual scroll with rAF
    let _previewListRaf = null;
    dom.fileListContainer.addEventListener('scroll',()=>{
      if(_fileListRaf) cancelAnimationFrame(_fileListRaf);
      _fileListRaf = requestAnimationFrame(()=>{if(_visibleFiles.length)renderVirtualRows()});
    });
    dom.previewContainer.addEventListener('scroll',()=>{
      if(_previewListRaf) cancelAnimationFrame(_previewListRaf);
      _previewListRaf = requestAnimationFrame(()=>{if(_displayResults.length)renderPreviewVirtualRows()});
    });

    // Sort
    dom.sortBy.addEventListener('change',e=>{state.sortBy=e.target.value;sortFiles();renderFileList();updatePreview()});
    dom.sortDirBtn.addEventListener('click',()=>{state.sortDir=state.sortDir==='asc'?'desc':'asc';dom.sortDirBtn.textContent=state.sortDir==='asc'?'↑':'↓';sortFiles();renderFileList();updatePreview()});
    // Recursive
    dom.recursiveToggle.addEventListener('change',e=>{state.recursive=e.target.checked;if(state.dirHandle)loadFiles()});
    // Rules
    dom.addRuleTrigger.addEventListener('click',e=>{e.stopPropagation();dom.ruleTypeMenu.classList.toggle('open')});
    document.addEventListener('click',()=>dom.ruleTypeMenu.classList.remove('open'));
    dom.ruleTypeMenu.querySelectorAll('.rule-type-option').forEach(opt=>{
      opt.addEventListener('click',e=>{e.stopPropagation();addRule(opt.dataset.type);dom.ruleTypeMenu.classList.remove('open')});
    });
    dom.clearRulesBtn.addEventListener('click',async()=>{if(await showConfirm(t('clearRules'),t('clearRulesConfirm')))clearRules()});
    dom.collapseAllBtn.addEventListener('click',()=>{
      state.rulesAllCollapsed=!state.rulesAllCollapsed;
      state.rules.forEach(r=>r.collapsed=state.rulesAllCollapsed);
      dom.collapseAllBtn.textContent = state.rulesAllCollapsed ? '⊞' : '▬';
      renderRules();
    });
    // Presets
    dom.presetSelect.addEventListener('change',e=>{applyPreset(e.target.value);e.target.value=''});
    dom.savePresetBtn.addEventListener('click',savePreset);
    dom.managePresetsBtn.addEventListener('click',openPresetManager);
    dom.presetManagerCloseBtn.addEventListener('click',()=>dom.presetManagerModal.classList.remove('open'));
    dom.presetManagerModal.addEventListener('click',e=>{if(e.target===dom.presetManagerModal)dom.presetManagerModal.classList.remove('open')});
    dom.exportPresetsBtn.addEventListener('click',exportAllPresets);
    dom.importPresetsInput.addEventListener('change',e=>{if(e.target.files[0])importPresets(e.target.files[0])});

    // Export Menu
    dom.exportMenuBtn.addEventListener('click',e=>{e.stopPropagation();showExportOptions()});
    dom.exportMenu.querySelectorAll('.export-item').forEach(item=>{
      item.addEventListener('click',e=>{e.stopPropagation();exportData(item.dataset.export)});
    });

    // Preview
    dom.showChangedOnly.addEventListener('change',e=>{state.showChangedOnly=e.target.checked;updatePreview()});
    dom.resetCustomEditsBtn?.addEventListener('click',()=>{
      state.customEdits={};
      updatePreview();
      toast(t('customEditsReset'),'info');
    });
    // Execute & Undo
    dom.executeBtn.addEventListener('click',executeRename);
    dom.undoBtn.addEventListener('click',undoRename);
    // Theme & Lang
    dom.themeToggle.addEventListener('click',()=>setTheme(state.theme==='dark'?'light':'dark'));
    dom.langToggle.addEventListener('click',()=>setLang(state.lang==='zh'?'en':'zh'));
    // Modals
    dom.confirmModal.addEventListener('click',e=>{if(e.target===dom.confirmModal)dom.modalCancelBtn.click()});
    dom.promptModal.addEventListener('click',e=>{if(e.target===dom.promptModal)dom.promptCancelBtn.click()});
    dom.shortcutsModal.addEventListener('click',e=>{if(e.target===dom.shortcutsModal)dom.shortcutsCloseBtn.click()});
    dom.shortcutsBtn.addEventListener('click',()=>dom.shortcutsModal.classList.add('open'));
    dom.shortcutsCloseBtn.addEventListener('click',()=>dom.shortcutsModal.classList.remove('open'));
    // Drag drop & Shortcuts
    setupDragDrop();setupShortcuts();

    // Mobile tabs
    dom.mobileTabs.querySelectorAll('.mobile-tab').forEach(tab=>{
      tab.addEventListener('click',()=>switchTab(tab.dataset.panel));
    });
    checkResponsive();
    window.addEventListener('resize',debounce(checkResponsive,200));
  }

  init();
})();
