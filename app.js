/**
 * Batch Renamer Pro v3 — Core Application
 * v2 features + v3: debounce, shift-select, responsive, context menu,
 * rule config i18n, preview virtual scroll.
 */
(() => {
  'use strict';

  // ═══════════════════════════════════════════════
  //  I18N (v3 #10: rule config labels added)
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
      ruleReplace:'查找替换', ruleReplaceDesc:'文本 / 正则',
      rulePrefix:'添加前缀', rulePrefixDesc:'文件名前',
      ruleSuffix:'添加后缀', ruleSuffixDesc:'文件名后',
      ruleNumbering:'序号编号', ruleNumberingDesc:'递增编号',
      ruleCase:'大小写转换', ruleCaseDesc:'大/小/首字母',
      ruleRemove:'删除字符', ruleRemoveDesc:'指定位置/类型',
      ruleExtension:'修改扩展名', ruleExtensionDesc:'更改后缀',
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
      scSelectAll:'全选', scInvertSel:'反选', scExport:'导出日志', scClose:'关闭弹窗',
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
      noFSAPI:'您的浏览器不支持 File System Access API，请使用 Chrome 或 Edge',
      clearRulesConfirm:'确定要删除所有重命名规则吗？',
      enterPresetName:'输入预设名称…',
      presetSaved:n=>`预设「${n}」已保存`,
      presetLoaded:n=>`已加载预设「${n}」`,
      noChanges:'无变更项',
      confirmTitle:'确认重命名', undoTitle:'撤销操作',
      savePresetTitle:'保存预设',
      regexValid:'✓', regexInvalid:'✗',
      customEdit:'自定义', clickToEdit:'双击编辑',
      failedOpen:'无法打开文件夹: ',
      nFailed:n=>`${n} 失败`,
      // v3 #10: Rule config labels
      rFind:'查找', rReplaceWith:'替换为', rRegex:'正则表达式', rCaseSensitive:'区分大小写',
      rPrefixText:'前缀文本', rSuffixText:'后缀文本',
      rStartValue:'起始值', rStep:'步长', rDigits:'位数', rPosition:'位置',
      rSeparator:'分隔符', rPosPrefix:'前缀', rPosSuffix:'后缀',
      rMode:'模式', rLower:'全小写 (abc)', rUpper:'全大写 (ABC)',
      rTitle:'首字母大写 (Abc)', rCamel:'驼峰 (abcDef)', rSnake:'蛇形 (abc_def)',
      rStartPos:'起始位', rDeleteCount:'删除数',
      rRemoveSpaces:'删除空格', rRemoveSpecial:'删除特殊字符',
      rNewExt:'新扩展名', rFormat:'格式', rDateSource:'日期来源',
      rCurrentDate:'当前日期', rModifiedDate:'文件修改日期',
      rInputFind:'输入要查找的文本', rInputReplace:'替换后的文本',
      rPhPrefix:'如：photo_', rPhSuffix:'如：_final', rPhExt:'如：jpg',
      // v3 #8: Mobile tabs
      tabFile:'文件', tabRules:'规则', tabPreview:'预览',
      // v3 #9: Context menu
      ctxSelectOnly:'仅选择此文件', ctxDeselect:'取消选择',
      ctxCopyName:'复制文件名', ctxLocatePreview:'在预览中定位',
      ctxFileInfo:'文件信息', fileInfoTitle:'文件信息',
      copied:'已复制', fiName:'文件名', fiSize:'大小',
      fiModified:'修改时间', fiType:'类型', fiPath:'路径',
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
      ruleReplace:'Find & Replace', ruleReplaceDesc:'Text / Regex',
      rulePrefix:'Add Prefix', rulePrefixDesc:'Before name',
      ruleSuffix:'Add Suffix', ruleSuffixDesc:'After name',
      ruleNumbering:'Numbering', ruleNumberingDesc:'Sequential',
      ruleCase:'Change Case', ruleCaseDesc:'Upper/Lower/Title',
      ruleRemove:'Remove Chars', ruleRemoveDesc:'Position/Type',
      ruleExtension:'Change Ext', ruleExtensionDesc:'New extension',
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
      scSelectAll:'Select all', scInvertSel:'Invert selection', scExport:'Export log', scClose:'Close dialog',
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
      noFSAPI:'Your browser does not support File System Access API. Please use Chrome or Edge.',
      clearRulesConfirm:'Delete all rename rules?',
      enterPresetName:'Enter preset name…',
      presetSaved:n=>`Preset "${n}" saved`,
      presetLoaded:n=>`Loaded preset "${n}"`,
      noChanges:'No changes',
      confirmTitle:'Confirm Rename', undoTitle:'Undo Operation',
      savePresetTitle:'Save Preset',
      regexValid:'✓', regexInvalid:'✗',
      customEdit:'custom', clickToEdit:'Double-click to edit',
      failedOpen:'Failed to open folder: ',
      nFailed:n=>`${n} failed`,
      // v3 #10: Rule config labels
      rFind:'Find', rReplaceWith:'Replace with', rRegex:'Regex', rCaseSensitive:'Case sensitive',
      rPrefixText:'Prefix text', rSuffixText:'Suffix text',
      rStartValue:'Start', rStep:'Step', rDigits:'Digits', rPosition:'Position',
      rSeparator:'Separator', rPosPrefix:'Prefix', rPosSuffix:'Suffix',
      rMode:'Mode', rLower:'lowercase (abc)', rUpper:'UPPERCASE (ABC)',
      rTitle:'Title Case (Abc)', rCamel:'camelCase', rSnake:'snake_case',
      rStartPos:'Start pos', rDeleteCount:'Count',
      rRemoveSpaces:'Remove spaces', rRemoveSpecial:'Remove special chars',
      rNewExt:'New extension', rFormat:'Format', rDateSource:'Date source',
      rCurrentDate:'Current date', rModifiedDate:'File modified date',
      rInputFind:'Text to find', rInputReplace:'Replacement text',
      rPhPrefix:'e.g. photo_', rPhSuffix:'e.g. _final', rPhExt:'e.g. jpg',
      // v3 #8: Mobile tabs
      tabFile:'Files', tabRules:'Rules', tabPreview:'Preview',
      // v3 #9: Context menu
      ctxSelectOnly:'Select only this', ctxDeselect:'Deselect',
      ctxCopyName:'Copy filename', ctxLocatePreview:'Locate in preview',
      ctxFileInfo:'File info', fileInfoTitle:'File Information',
      copied:'Copied', fiName:'Name', fiSize:'Size',
      fiModified:'Modified', fiType:'Type', fiPath:'Path',
    }
  };

  // ═══════════════════════════════════════════════
  //  STATE
  // ═══════════════════════════════════════════════
  const state = {
    dirHandle: null,
    files: [],
    allFileNames: [],
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
    // v3 additions
    lastClickedVisIdx: null,  // #7 Shift+Click
    activeTab: 'file',        // #8 Responsive
    contextFile: null,        // #9 Context menu target
  };

  // ═══════════════════════════════════════════════
  //  DOM
  // ═══════════════════════════════════════════════
  const $ = s => document.querySelector(s);
  const dom = {
    selectFolderBtn:$('#selectFolderBtn'), currentPath:$('#currentPath'),
    fileSearch:$('#fileSearch'), extFilter:$('#extFilter'),
    fileListContainer:$('#fileListContainer'), fileList:$('#fileList'),
    fileCount:$('#fileCount'), selectedCount:$('#selectedCount'),
    fileBadge:$('#fileBadge'), selectAllCb:$('#selectAllCheckbox'),
    recursiveToggle:$('#recursiveToggle'),
    sortBy:$('#sortBy'), sortDirBtn:$('#sortDirBtn'),
    addRuleTrigger:$('#addRuleTrigger'), ruleTypeMenu:$('#ruleTypeMenu'),
    rulesList:$('#rulesList'), ruleBadge:$('#ruleBadge'),
    clearRulesBtn:$('#clearRulesBtn'), collapseAllBtn:$('#collapseAllBtn'),
    presetSelect:$('#presetSelect'), savePresetBtn:$('#savePresetBtn'),
    previewContainer:$('#previewContainer'),
    previewBody:$('#previewBody'), previewEmpty:$('#previewEmpty'),
    changeCount:$('#changeCount'), conflictCount:$('#conflictCount'),
    unchangedCount:$('#unchangedCount'), showChangedOnly:$('#showChangedOnly'),
    actionInfo:$('#actionInfo'), undoBtn:$('#undoBtn'), executeBtn:$('#executeBtn'),
    exportLogBtn:$('#exportLogBtn'),
    confirmModal:$('#confirmModal'), modalTitle:$('#modalTitle'),
    modalBody:$('#modalBody'), modalCancelBtn:$('#modalCancelBtn'),
    modalConfirmBtn:$('#modalConfirmBtn'),
    promptModal:$('#promptModal'), promptTitle:$('#promptTitle'),
    promptInput:$('#promptInput'), promptCancelBtn:$('#promptCancelBtn'),
    promptConfirmBtn:$('#promptConfirmBtn'),
    shortcutsModal:$('#shortcutsModal'), shortcutsBtn:$('#shortcutsBtn'),
    shortcutsCloseBtn:$('#shortcutsCloseBtn'),
    themeToggle:$('#themeToggle'), langToggle:$('#langToggle'),
    progressOverlay:$('#progressOverlay'), progressBar:$('#progressBar'),
    progressCount:$('#progressCount'), progressErrors:$('#progressErrors'),
    dropZone:$('#dropZone'),
    toastContainer:$('#toastContainer'),
    // v3
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
  // v3 #5: Debounce
  function debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
  }
  function formatSize(b) {
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
    [dom.confirmModal,dom.promptModal,dom.shortcutsModal,dom.fileInfoModal].forEach(m=>m.classList.remove('open'));
    hideContextMenu();
  }

  // ═══════════════════════════════════════════════
  //  FILE SYSTEM
  // ═══════════════════════════════════════════════
  async function selectFolder() {
    try {
      state.dirHandle = await window.showDirectoryPicker({mode:'readwrite'});
      dom.currentPath.textContent=`📁 ${state.dirHandle.name}`;
      dom.currentPath.classList.remove('hidden');
      await loadFiles();
      toast(t('loadedFolder',state.dirHandle.name),'success');
    } catch(err) {
      if(err.name!=='AbortError') toast(t('failedOpen')+err.message,'error');
    }
  }

  async function loadFiles() {
    state.files=[];
    state.thumbnailCache.forEach(url=>URL.revokeObjectURL(url));
    state.thumbnailCache.clear();
    await scanDirectory(state.dirHandle, '');
    sortFiles();
    state.allFileNames = state.files.map(f=>f.name);
    const exts=[...new Set(state.files.map(f=>splitFilename(f.name).ext.toLowerCase()).filter(Boolean))].sort();
    dom.extFilter.innerHTML=`<option value="">${t('allTypes')}</option>`+exts.map(e=>`<option value="${e}">.${e}</option>`).join('');
    dom.fileSearch.disabled=false;dom.extFilter.disabled=false;
    dom.selectAllCb.disabled=false;dom.selectAllCb.checked=true;
    state.lastClickedVisIdx=null;
    renderFileList();updatePreview();
    generateThumbnails();
  }

  async function scanDirectory(dirHandle, prefix) {
    for await(const[name,handle]of dirHandle.entries()){
      if(handle.kind==='file'){
        try{
          const file=await handle.getFile();
          state.files.push({handle,name:file.name,relPath:prefix,size:file.size,lastModified:file.lastModified,selected:true,thumbUrl:null});
        }catch{}
      } else if(handle.kind==='directory' && state.recursive){
        await scanDirectory(handle, prefix?prefix+'/'+name:name);
      }
    }
  }

  async function generateThumbnails() {
    for(const f of state.files){
      const {ext}=splitFilename(f.name);
      if(isImageExt(ext) && !state.thumbnailCache.has(f.name)){
        try{
          const file=await f.handle.getFile();
          const url=URL.createObjectURL(file);
          state.thumbnailCache.set(f.name,url);
          f.thumbUrl=url;
        }catch{}
      }
    }
    renderFileList();
  }

  // ═══════════════════════════════════════════════
  //  SORTING
  // ═══════════════════════════════════════════════
  function sortFiles() {
    const dir = state.sortDir==='asc'?1:-1;
    state.files.sort((a,b)=>{
      switch(state.sortBy){
        case 'size': return (a.size-b.size)*dir;
        case 'date': return (a.lastModified-b.lastModified)*dir;
        case 'type': {
          const ea=splitFilename(a.name).ext.toLowerCase();
          const eb=splitFilename(b.name).ext.toLowerCase();
          return ea.localeCompare(eb)*dir || a.name.localeCompare(b.name,'zh')*dir;
        }
        default: return a.name.localeCompare(b.name,'zh')*dir;
      }
    });
  }

  // ═══════════════════════════════════════════════
  //  FILE LIST RENDERING (Virtual Scroll)
  // ═══════════════════════════════════════════════
  const ROW_H = 34;
  const BUFFER = 10;
  let _visibleFiles = [];

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
    const viewH = ct.clientHeight;
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
  }

  // ═══════════════════════════════════════════════
  //  RULE ENGINE
  // ═══════════════════════════════════════════════
  const RULE_DEFAULTS={
    replace:{find:'',replace:'',useRegex:false,caseSensitive:false},
    prefix:{text:''},suffix:{text:''},
    numbering:{start:1,step:1,digits:2,position:'suffix',separator:'_'},
    case:{mode:'lower'},
    remove:{from:0,count:0,removeSpaces:false,removeSpecial:false},
    extension:{newExt:''},
    date:{format:'YYYY-MM-DD',position:'prefix',source:'current',separator:'_'},
  };
  const RULE_LABELS={
    replace:'ruleReplace',prefix:'rulePrefix',suffix:'ruleSuffix',
    numbering:'ruleNumbering',case:'ruleCase',remove:'ruleRemove',
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

  // v3 #5: Debounced preview update
  const debouncedPreview = debounce(()=>updatePreview(), 150);

  function applyRule(rule,filename,index,file){
    if(!rule.enabled)return filename;
    const{base,ext}=splitFilename(filename);const p=rule.params;
    switch(rule.type){
      case 'replace':{
        if(!p.find)return filename;
        const n=ext?base:filename;let r;
        if(p.useRegex){try{r=n.replace(new RegExp(p.find,p.caseSensitive?'g':'gi'),p.replace)}catch{return filename}}
        else{const rx=new RegExp(p.find.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),p.caseSensitive?'g':'gi');r=n.replace(rx,p.replace)}
        return ext?r+'.'+ext:r;
      }
      case 'prefix':return ext?p.text+base+'.'+ext:p.text+filename;
      case 'suffix':return ext?base+p.text+'.'+ext:filename+p.text;
      case 'numbering':{
        const num=p.start+index*p.step;const pad=String(num).padStart(p.digits,'0');const s=p.separator;
        return p.position==='prefix'?(ext?pad+s+base+'.'+ext:pad+s+filename):(ext?base+s+pad+'.'+ext:filename+s+pad);
      }
      case 'case':{
        const n=ext?base:filename;let r;
        switch(p.mode){
          case 'upper':r=n.toUpperCase();break;case 'lower':r=n.toLowerCase();break;
          case 'title':r=n.replace(/\b\w/g,c=>c.toUpperCase());break;
          case 'camel':r=n.replace(/[-_\s]+(.)/g,(_,c)=>c.toUpperCase()).replace(/^./,c=>c.toLowerCase());break;
          case 'snake':r=n.replace(/([a-z])([A-Z])/g,'$1_$2').replace(/[\s-]+/g,'_').toLowerCase();break;
          default:r=n;
        }
        return ext?r+'.'+ext:r;
      }
      case 'remove':{
        let n=ext?base:filename;
        if(p.removeSpaces)n=n.replace(/\s+/g,'');
        if(p.removeSpecial)n=n.replace(/[^a-zA-Z0-9\u4e00-\u9fff._-]/g,'');
        if(p.count>0&&p.from>=0)n=n.substring(0,p.from)+n.substring(p.from+p.count);
        return ext?n+'.'+ext:n;
      }
      case 'extension':{if(!p.newExt)return filename;return base+'.'+p.newExt.replace(/^\./,'')}
      case 'date':{
        const now=p.source==='modified'?new Date(file.lastModified):new Date();
        const y=now.getFullYear(),mo=String(now.getMonth()+1).padStart(2,'0'),d=String(now.getDate()).padStart(2,'0');
        const h=String(now.getHours()).padStart(2,'0'),mi=String(now.getMinutes()).padStart(2,'0');
        let ds;
        switch(p.format){case 'YYYYMMDD':ds=`${y}${mo}${d}`;break;case 'YYYY-MM-DD HHmm':ds=`${y}-${mo}-${d} ${h}${mi}`;break;case 'DD-MM-YYYY':ds=`${d}-${mo}-${y}`;break;default:ds=`${y}-${mo}-${d}`}
        const s=p.separator;
        return p.position==='prefix'?(ext?ds+s+base+'.'+ext:ds+s+filename):(ext?base+s+ds+'.'+ext:filename+s+ds);
      }
      default:return filename;
    }
  }

  function computeNewName(file,index){
    if(state.customEdits[file.name])return state.customEdits[file.name];
    let n=file.name;for(const r of state.rules)n=applyRule(r,n,index,file);return n;
  }

  // ═══════════════════════════════════════════════
  //  RULES RENDERING (v3 #10: i18n labels)
  // ═══════════════════════════════════════════════
  function ruleConfigHTML(rule){
    const p=rule.params,id=rule.id;
    const field=(lbl,type,key,ph='',extra='')=>`<div class="rule-field"><label>${lbl}</label><input type="${type}" value="${escAttr(p[key])}" data-rule="${id}" data-key="${key}" ${type==='number'?'data-num':''} placeholder="${ph}" ${extra}></div>`;
    const sel=(lbl,key,opts)=>`<div class="rule-field"><label>${lbl}</label><select data-rule="${id}" data-key="${key}">${opts.map(([v,l])=>`<option value="${v}" ${p[key]===v?'selected':''}>${l}</option>`).join('')}</select></div>`;
    const chk=(lbl,key)=>`<label class="rule-toggle-option"><input type="checkbox" ${p[key]?'checked':''} data-rule="${id}" data-key="${key}" data-bool> ${lbl}</label>`;

    switch(rule.type){
      case 'replace':{
        const regexStatus = p.useRegex ? (()=>{
          try{new RegExp(p.find);return`<span class="regex-status valid">${t('regexValid')}</span>`}
          catch{return`<span class="regex-status invalid">${t('regexInvalid')}</span>`}
        })() : '';
        const cls=p.useRegex?(()=>{try{new RegExp(p.find);return'regex-valid'}catch{return'regex-invalid'}})():'';
        return `
          <div class="rule-field"><label>${t('rFind')}</label><input type="text" value="${escAttr(p.find)}" data-rule="${id}" data-key="find" placeholder="${t('rInputFind')}" class="${cls}">${regexStatus}</div>
          ${field(t('rReplaceWith'),'text','replace',t('rInputReplace'))}
          <div class="rule-field-inline">${chk(t('rRegex'),'useRegex')} ${chk(t('rCaseSensitive'),'caseSensitive')}</div>`;
      }
      case 'prefix': return field(t('rPrefixText'),'text','text',t('rPhPrefix'));
      case 'suffix': return field(t('rSuffixText'),'text','text',t('rPhSuffix'));
      case 'numbering': return `
        ${field(t('rStartValue'),'number','start','','min="0"')}${field(t('rStep'),'number','step','','min="1"')}${field(t('rDigits'),'number','digits','','min="1" max="10"')}
        ${sel(t('rPosition'),'position',[[`prefix`,t('rPosPrefix')],[`suffix`,t('rPosSuffix')]])}${field(t('rSeparator'),'text','separator','_')}`;
      case 'case': return sel(t('rMode'),'mode',[['lower',t('rLower')],['upper',t('rUpper')],['title',t('rTitle')],['camel',t('rCamel')],['snake',t('rSnake')]]);
      case 'remove': return `${field(t('rStartPos'),'number','from','0','min="0"')}${field(t('rDeleteCount'),'number','count','0','min="0"')}<div class="rule-field-inline">${chk(t('rRemoveSpaces'),'removeSpaces')} ${chk(t('rRemoveSpecial'),'removeSpecial')}</div>`;
      case 'extension': return field(t('rNewExt'),'text','newExt',t('rPhExt'));
      case 'date': return `
        ${sel(t('rFormat'),'format',[['YYYY-MM-DD','2024-01-15'],['YYYYMMDD','20240115'],['YYYY-MM-DD HHmm','2024-01-15 1430'],['DD-MM-YYYY','15-01-2024']])}
        ${sel(t('rPosition'),'position',[['prefix',t('rPosPrefix')],['suffix',t('rPosSuffix')]])}
        ${sel(t('rDateSource'),'source',[['current',t('rCurrentDate')],['modified',t('rModifiedDate')]])}
        ${field(t('rSeparator'),'text','separator','_')}`;
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
        if(key==='find'||key==='useRegex'){
          const rule=state.rules.find(r=>r.id===rid);
          if(rule&&rule.params.useRegex){
            const inp=dom.rulesList.querySelector(`[data-rule="${rid}"][data-key="find"]`);
            const statusEl=inp?.parentElement.querySelector('.regex-status');
            if(inp){try{new RegExp(rule.params.find);inp.className='regex-valid';if(statusEl){statusEl.className='regex-status valid';statusEl.textContent=t('regexValid')}}
              catch{inp.className='regex-invalid';if(statusEl){statusEl.className='regex-status invalid';statusEl.textContent=t('regexInvalid')}}}
          }
        }
      });
    });
    dom.rulesList.querySelectorAll('.rule-card').forEach(card=>{
      card.addEventListener('dragstart',e=>{card.classList.add('dragging');e.dataTransfer.setData('text/plain',card.dataset.ruleId);e.dataTransfer.effectAllowed='move'});
      card.addEventListener('dragend',()=>{card.classList.remove('dragging');dom.rulesList.querySelectorAll('.rule-card').forEach(c=>c.classList.remove('drag-over'))});
      card.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='move';card.classList.add('drag-over')});
      card.addEventListener('dragleave',()=>card.classList.remove('drag-over'));
      card.addEventListener('drop',e=>{
        e.preventDefault();card.classList.remove('drag-over');
        const did=+e.dataTransfer.getData('text/plain'),tid=+card.dataset.ruleId;
        if(did===tid)return;
        const di=state.rules.findIndex(r=>r.id===did),ti=state.rules.findIndex(r=>r.id===tid);
        const[moved]=state.rules.splice(di,1);state.rules.splice(ti,0,moved);
        renderRules();updatePreview();
      });
    });
  }

  // ═══════════════════════════════════════════════
  //  PREVIEW (v3 #11: virtual scroll)
  // ═══════════════════════════════════════════════
  const PREVIEW_ROW_H = 32;
  let _previewResults = [];
  let _displayResults = [];

  function updatePreview(){
    const sel=state.files.filter(f=>f.selected);
    if(sel.length===0||state.rules.length===0){
      dom.previewBody.innerHTML='';dom.previewEmpty.classList.remove('hidden');
      dom.changeCount.textContent='0';dom.conflictCount.textContent='0';dom.unchangedCount.textContent='0';
      dom.executeBtn.disabled=true;dom.actionInfo.textContent='';_previewResults=[];_displayResults=[];return;
    }
    const results=sel.map((file,i)=>({file,original:file.name,newName:computeNewName(file,i),isCustom:!!state.customEdits[file.name]}));
    const unselectedNames=new Set(state.files.filter(f=>!f.selected).map(f=>f.name.toLowerCase()));
    const nameCounts={};
    results.forEach(r=>{const k=r.newName.toLowerCase();nameCounts[k]=(nameCounts[k]||0)+1});
    results.forEach(r=>{
      r.changed=r.original!==r.newName;
      r.conflict=nameCounts[r.newName.toLowerCase()]>1 || (r.changed && unselectedNames.has(r.newName.toLowerCase()));
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
    dom.actionInfo.textContent=conflicts>0?t('hasConflict'):changes>0?t('willRename',changes):'';
  }

  function renderPreviewVirtualRows(){
    const ct=dom.previewContainer;
    const scrollTop=ct.scrollTop;
    const viewH=ct.clientHeight;
    const total=_displayResults.length;
    const start=Math.max(0,Math.floor(scrollTop/PREVIEW_ROW_H)-BUFFER);
    const end=Math.min(total,Math.ceil((scrollTop+viewH)/PREVIEW_ROW_H)+BUFFER);
    const topPad=start*PREVIEW_ROW_H;
    const bottomPad=(total-end)*PREVIEW_ROW_H;

    let html=topPad>0?`<tr class="spacer-row"><td colspan="4" style="height:${topPad}px"></td></tr>`:'';
    for(let i=start;i<end;i++){
      const r=_displayResults[i];
      const cls=r.conflict?'conflict':r.changed?(r.isCustom?'changed custom-edit':'changed'):'';
      const ico=r.conflict?'<span class="conflict-icon">⚠️</span>':r.changed?'<span style="color:var(--accent-2)">●</span>':'<span style="color:var(--text-muted)">○</span>';
      const newHtml=r.changed?highlightDiff(r.original,r.newName):escHtml(r.newName);
      const customBadge=r.isCustom?`<span class="custom-badge">${t('customEdit')}</span>`:'';
      html+=`<tr class="${cls}"><td class="col-status">${ico}</td><td class="original-name">${escHtml(r.original)}</td><td class="col-arrow">→</td><td class="new-name"><span class="new-name-editable" data-original="${escAttr(r.original)}" title="${t('clickToEdit')}">${newHtml}</span>${customBadge}</td></tr>`;
    }
    if(bottomPad>0)html+=`<tr class="spacer-row"><td colspan="4" style="height:${bottomPad}px"></td></tr>`;
    dom.previewBody.innerHTML=html;
    bindPreviewEditable();
  }

  function bindPreviewEditable(){
    dom.previewBody.querySelectorAll('.new-name-editable').forEach(el=>{
      el.addEventListener('dblclick',()=>{
        const orig=el.dataset.original;
        const current=state.customEdits[orig]||computeNewName(state.files.find(f=>f.name===orig),0);
        el.textContent=current;el.contentEditable='true';el.classList.add('editing');el.focus();
        const done=()=>{
          el.contentEditable='false';el.classList.remove('editing');
          const val=el.textContent.trim();
          if(val&&val!==computeNewName(state.files.find(f=>f.name===orig),0)){state.customEdits[orig]=val}
          else{delete state.customEdits[orig]}
          updatePreview();
        };
        el.addEventListener('blur',done,{once:true});
        el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();el.blur()}if(e.key==='Escape'){delete state.customEdits[orig];el.blur()}},{once:true});
      });
    });
  }

  function highlightDiff(o,n){
    const r=[];let i=0;
    while(i<o.length&&i<n.length&&o[i]===n[i]){r.push(escHtml(n[i]));i++}
    let oi=o.length-1,ni=n.length-1;const suf=[];
    while(oi>i&&ni>i&&o[oi]===n[ni]){suf.unshift(escHtml(n[ni]));oi--;ni--}
    if(i<=ni){r.push('<span class="diff-highlight">');for(let k=i;k<=ni;k++)r.push(escHtml(n[k]));r.push('</span>')}
    r.push(...suf);return r.join('');
  }

  // ═══════════════════════════════════════════════
  //  EXECUTE & UNDO
  // ═══════════════════════════════════════════════
  async function executeRename(){
    const sel=state.files.filter(f=>f.selected);
    const results=sel.map((file,i)=>({file,original:file.name,newName:computeNewName(file,i)})).filter(r=>r.original!==r.newName);
    if(!results.length)return;
    if(!await showConfirm(t('confirmTitle'),t('confirmRename',results.length)))return;

    dom.progressOverlay.classList.remove('hidden');
    dom.progressBar.style.width='0%';dom.progressCount.textContent=`0 / ${results.length}`;
    dom.progressErrors.classList.add('hidden');

    const existingNames=new Set(state.files.map(f=>f.name.toLowerCase()));
    const needsTemp=[];const direct=[];
    for(const r of results){
      const targetExists=existingNames.has(r.newName.toLowerCase()) && r.newName.toLowerCase()!==r.original.toLowerCase();
      const targetIsBeingRenamed=results.some(x=>x.original.toLowerCase()===r.newName.toLowerCase());
      if(targetExists && targetIsBeingRenamed){needsTemp.push(r)} else {direct.push(r)}
    }

    const undoEntries=[];let done=0,errors=0;
    const updateProgress=()=>{
      done++;const pct=Math.round(done/results.length*100);
      dom.progressBar.style.width=pct+'%';
      dom.progressCount.textContent=`${done} / ${results.length}`;
      if(errors>0){dom.progressErrors.classList.remove('hidden');dom.progressErrors.textContent=t('nFailed',errors)}
    };

    for(const r of needsTemp){
      const tempName=`__brp_temp_${Date.now()}_${Math.random().toString(36).slice(2)}_${r.original}`;
      try{await r.file.handle.move(tempName);r.file.name=tempName}catch(e){console.error(e);errors++}
    }
    for(const r of direct){
      try{await r.file.handle.move(r.newName);r.file.name=r.newName;undoEntries.push({handle:r.file.handle,oldName:r.original,newName:r.newName});updateProgress()}catch(e){console.error(e);errors++;updateProgress()}
    }
    for(const r of needsTemp){
      try{await r.file.handle.move(r.newName);r.file.name=r.newName;undoEntries.push({handle:r.file.handle,oldName:r.original,newName:r.newName});updateProgress()}catch(e){console.error(e);errors++;updateProgress()}
    }

    setTimeout(()=>dom.progressOverlay.classList.add('hidden'),400);

    if(undoEntries.length>0){
      state.undoStack.push({entries:undoEntries,timestamp:Date.now()});
      state.operationLogs.push({timestamp:Date.now(),entries:undoEntries.map(e=>({old:e.oldName,new:e.newName}))});
      dom.undoBtn.disabled=false;dom.exportLogBtn.disabled=false;
    }
    state.customEdits={};state.allFileNames=state.files.map(f=>f.name);
    if(errors===0)toast(t('successRename',undoEntries.length),'success');
    else toast(t('partialRename',undoEntries.length,errors),'warning');
    renderFileList();updatePreview();
  }

  async function undoRename(){
    if(!state.undoStack.length)return;
    const last=state.undoStack[state.undoStack.length-1];
    if(!await showConfirm(t('undoTitle'),t('confirmUndo',last.entries.length)))return;
    dom.undoBtn.disabled=true;let ok=0;
    for(const e of last.entries){
      try{await e.handle.move(e.oldName);const f=state.files.find(x=>x.handle===e.handle);if(f)f.name=e.oldName;ok++}catch(err){console.error(err)}
    }
    state.undoStack.pop();dom.undoBtn.disabled=!state.undoStack.length;
    state.allFileNames=state.files.map(f=>f.name);
    toast(t('successUndo',ok),'success');renderFileList();updatePreview();
  }

  // ═══════════════════════════════════════════════
  //  EXPORT LOG
  // ═══════════════════════════════════════════════
  function exportLog(){
    if(!state.operationLogs.length){toast('No operations to export','info');return}
    let csv='Timestamp,Original Name,New Name\n';
    state.operationLogs.forEach(log=>{
      const ts=new Date(log.timestamp).toISOString();
      log.entries.forEach(e=>{csv+=`"${ts}","${e.old}","${e.new}"\n`});
    });
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);
    a.download=`batch-rename-log-${new Date().toISOString().slice(0,10)}.csv`;a.click();
    URL.revokeObjectURL(a.href);toast('Log exported','success');
  }

  // ═══════════════════════════════════════════════
  //  PRESETS
  // ═══════════════════════════════════════════════
  const BUILTIN_PRESETS={
    __photo:[{type:'date',params:{format:'YYYY-MM-DD',position:'prefix',source:'modified',separator:'_'}},{type:'numbering',params:{start:1,step:1,digits:3,position:'suffix',separator:'_'}}],
    __code:[{type:'case',params:{mode:'snake'}},{type:'case',params:{mode:'lower'}}],
    __clean:[{type:'remove',params:{from:0,count:0,removeSpaces:true,removeSpecial:true}}],
  };

  function loadPresets(){
    const saved=JSON.parse(localStorage.getItem('brp_presets')||'{}');
    const oldCustom=dom.presetSelect.querySelector('optgroup.custom-presets');
    if(oldCustom)oldCustom.remove();
    if(Object.keys(saved).length>0){
      const grp=document.createElement('optgroup');grp.label=t('lang')==='en'?'Custom Presets':'自定义预设';grp.className='custom-presets';
      for(const name of Object.keys(saved)){
        const opt=document.createElement('option');opt.value='custom:'+name;opt.textContent='⭐ '+name;
        grp.appendChild(opt);
      }
      dom.presetSelect.appendChild(grp);
    }
  }

  function applyPreset(key){
    if(!key)return;
    let rules;
    if(key.startsWith('custom:')){
      const name=key.slice(7);
      const saved=JSON.parse(localStorage.getItem('brp_presets')||'{}');
      rules=saved[name];if(!rules)return;
      toast(t('presetLoaded',name),'success');
    } else {
      rules=BUILTIN_PRESETS[key];if(!rules)return;
      toast(t('presetLoaded',key.replace('__','')),'success');
    }
    state.rules=rules.map(r=>({id:uid(),type:r.type,params:{...RULE_DEFAULTS[r.type],...r.params},enabled:true,collapsed:false}));
    state.customEdits={};renderRules();updatePreview();
  }

  async function savePreset(){
    if(!state.rules.length)return;
    const name=await showPrompt(t('savePresetTitle'),t('enterPresetName'));
    if(!name)return;
    const saved=JSON.parse(localStorage.getItem('brp_presets')||'{}');
    saved[name]=state.rules.map(r=>({type:r.type,params:{...r.params}}));
    localStorage.setItem('brp_presets',JSON.stringify(saved));
    loadPresets();toast(t('presetSaved',name),'success');
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
        if(item.kind==='file'){
          const handle=await item.getAsFileSystemHandle();
          if(handle.kind==='directory'){
            state.dirHandle=handle;
            dom.currentPath.textContent=`📁 ${handle.name}`;dom.currentPath.classList.remove('hidden');
            await loadFiles();toast(t('loadedFolder',handle.name),'success');
            return;
          }
        }
      }
    });
  }

  // ═══════════════════════════════════════════════
  //  CONTEXT MENU (v3 #9)
  // ═══════════════════════════════════════════════
  function showContextMenu(e, file){
    e.preventDefault();
    state.contextFile=file;
    const menu=dom.contextMenu;
    menu.classList.remove('hidden');
    // Position, clamped to viewport
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
      case 'locate-preview':
        // Switch to preview tab on mobile, scroll to item
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
  //  RESPONSIVE TABS (v3 #8)
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
      // Desktop: show all panels, remove tab-active classes
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
      if(e.ctrlKey&&e.key==='o'){e.preventDefault();selectFolder()}
      if(e.ctrlKey&&e.key==='z'){e.preventDefault();if(!dom.undoBtn.disabled)undoRename()}
      if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();if(!dom.executeBtn.disabled)executeRename()}
      if(e.ctrlKey&&!e.shiftKey&&e.key==='a'){
        e.preventDefault();const allSel=state.files.every(f=>f.selected);
        state.files.forEach(f=>f.selected=!allSel);dom.selectAllCb.checked=!allSel;
        renderFileList();updatePreview();
      }
      if(e.ctrlKey&&e.shiftKey&&e.key==='A'){
        e.preventDefault();state.files.forEach(f=>f.selected=!f.selected);
        renderFileList();updatePreview();
      }
      if(e.ctrlKey&&e.key==='e'){e.preventDefault();exportLog()}
    });
  }

  // ═══════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════
  function init(){
    if(!('showDirectoryPicker' in window)){toast(t('noFSAPI'),'error');dom.selectFolderBtn.disabled=true;return}
    if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{})}
    const savedTheme=localStorage.getItem('brp_theme')||'dark';setTheme(savedTheme);
    const savedLang=localStorage.getItem('brp_lang')||'zh';setLang(savedLang);
    loadPresets();

    // File panel
    dom.selectFolderBtn.addEventListener('click',selectFolder);
    // v3 #5: Debounced search
    const debouncedSearch=debounce(v=>{state.searchTerm=v;renderFileList()},150);
    dom.fileSearch.addEventListener('input',e=>debouncedSearch(e.target.value));
    dom.extFilter.addEventListener('change',e=>{state.extFilter=e.target.value;renderFileList()});
    dom.selectAllCb.addEventListener('change',e=>{getVisibleFiles().forEach(f=>f.selected=e.target.checked);renderFileList();updatePreview()});

    // v3 #7: Shift+Click range select
    dom.fileList.addEventListener('click',e=>{
      const item=e.target.closest('.file-item');if(!item)return;
      const f=state.files[+item.dataset.index];if(!f)return;
      const visIdx=+item.dataset.vis;

      if(e.target.matches('.file-checkbox')){
        f.selected=e.target.checked;
        state.lastClickedVisIdx=visIdx;
      } else if(e.shiftKey && state.lastClickedVisIdx!==null){
        // Range select
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

    // v3 #9: Context menu
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
    });
    document.addEventListener('contextmenu',e=>{
      if(!e.target.closest('.file-item')&&!dom.contextMenu.contains(e.target))hideContextMenu();
    });

    // File info modal
    dom.fileInfoCloseBtn.addEventListener('click',()=>dom.fileInfoModal.classList.remove('open'));
    dom.fileInfoModal.addEventListener('click',e=>{if(e.target===dom.fileInfoModal)dom.fileInfoModal.classList.remove('open')});

    // Virtual scroll
    dom.fileListContainer.addEventListener('scroll',()=>{if(_visibleFiles.length)renderVirtualRows()});
    // v3 #11: Preview virtual scroll
    dom.previewContainer.addEventListener('scroll',()=>{if(_displayResults.length)renderPreviewVirtualRows()});

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
      state.rules.forEach(r=>r.collapsed=state.rulesAllCollapsed);renderRules();
    });
    // Presets
    dom.presetSelect.addEventListener('change',e=>{applyPreset(e.target.value);e.target.value=''});
    dom.savePresetBtn.addEventListener('click',savePreset);
    // Preview
    dom.showChangedOnly.addEventListener('change',e=>{state.showChangedOnly=e.target.checked;updatePreview()});
    // Execute & Undo
    dom.executeBtn.addEventListener('click',executeRename);
    dom.undoBtn.addEventListener('click',undoRename);
    dom.exportLogBtn.addEventListener('click',exportLog);
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

    // v3 #8: Mobile tabs
    dom.mobileTabs.querySelectorAll('.mobile-tab').forEach(tab=>{
      tab.addEventListener('click',()=>switchTab(tab.dataset.panel));
    });
    checkResponsive();
    window.addEventListener('resize',debounce(checkResponsive,200));
  }

  init();
})();
