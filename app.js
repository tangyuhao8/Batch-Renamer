/**
 * Batch Renamer Pro — Core Application
 * File System Access API-based local batch file renaming tool
 */

(() => {
  'use strict';

  // ───── State ─────
  const state = {
    dirHandle: null,
    files: [],            // { handle, name, size, lastModified, selected }
    rules: [],            // { id, type, params, enabled }
    undoStack: [],        // [{ entries: [{ handle, oldName, newName }] }]
    nextRuleId: 1,
    searchTerm: '',
    extFilter: '',
    showChangedOnly: false,
  };

  // ───── DOM Refs ─────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    selectFolderBtn: $('#selectFolderBtn'),
    currentPath:     $('#currentPath'),
    fileSearch:      $('#fileSearch'),
    extFilter:       $('#extFilter'),
    fileList:        $('#fileList'),
    fileCount:       $('#fileCount'),
    selectedCount:   $('#selectedCount'),
    fileBadge:       $('#fileBadge'),
    selectAllCb:     $('#selectAllCheckbox'),

    addRuleTrigger:  $('#addRuleTrigger'),
    ruleTypeMenu:    $('#ruleTypeMenu'),
    rulesList:       $('#rulesList'),
    ruleBadge:       $('#ruleBadge'),
    clearRulesBtn:   $('#clearRulesBtn'),

    previewBody:     $('#previewBody'),
    previewEmpty:    $('#previewEmpty'),
    changeCount:     $('#changeCount'),
    conflictCount:   $('#conflictCount'),
    unchangedCount:  $('#unchangedCount'),
    showChangedOnly: $('#showChangedOnly'),
    actionInfo:      $('#actionInfo'),
    undoBtn:         $('#undoBtn'),
    executeBtn:      $('#executeBtn'),

    confirmModal:    $('#confirmModal'),
    modalTitle:      $('#modalTitle'),
    modalBody:       $('#modalBody'),
    modalCancelBtn:  $('#modalCancelBtn'),
    modalConfirmBtn: $('#modalConfirmBtn'),
    toastContainer:  $('#toastContainer'),
  };

  // ───── Utility ─────
  function uid() { return state.nextRuleId++; }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }

  function getFileIcon(ext) {
    const map = {
      image: ['jpg','jpeg','png','gif','bmp','svg','webp','ico','tif','tiff'],
      audio: ['mp3','wav','flac','aac','ogg','wma','m4a'],
      video: ['mp4','avi','mkv','mov','wmv','flv','webm','m4v'],
      doc:   ['doc','docx','pdf','txt','rtf','md','odt'],
      sheet: ['xls','xlsx','csv','tsv','ods'],
      ppt:   ['ppt','pptx','odp'],
      code:  ['js','ts','py','java','c','cpp','h','cs','go','rs','rb','php','html','css','json','xml','yaml','yml','sql','sh','bat','ps1'],
      archive: ['zip','rar','7z','tar','gz','bz2','xz'],
    };
    const lower = (ext || '').toLowerCase();
    for (const [cat, exts] of Object.entries(map)) {
      if (exts.includes(lower)) {
        return { image:'🖼️', audio:'🎵', video:'🎬', doc:'📝', sheet:'📊', ppt:'📊', code:'💻', archive:'📦' }[cat];
      }
    }
    return '📄';
  }

  function splitFilename(name) {
    const idx = name.lastIndexOf('.');
    if (idx <= 0) return { base: name, ext: '' };
    return { base: name.substring(0, idx), ext: name.substring(idx + 1) };
  }

  // ───── Toast ─────
  function toast(message, type = 'info') {
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-message">${message}</span>`;
    dom.toastContainer.appendChild(el);
    setTimeout(() => {
      el.classList.add('leaving');
      el.addEventListener('animationend', () => el.remove());
    }, 3500);
  }

  // ───── Modal ─────
  function confirm(title, body) {
    return new Promise((resolve) => {
      dom.modalTitle.textContent = title;
      dom.modalBody.innerHTML = body;
      dom.confirmModal.classList.add('open');

      function cleanup(result) {
        dom.confirmModal.classList.remove('open');
        dom.modalConfirmBtn.removeEventListener('click', onConfirm);
        dom.modalCancelBtn.removeEventListener('click', onCancel);
        resolve(result);
      }
      function onConfirm() { cleanup(true); }
      function onCancel() { cleanup(false); }

      dom.modalConfirmBtn.addEventListener('click', onConfirm);
      dom.modalCancelBtn.addEventListener('click', onCancel);
    });
  }

  // ───────────────────────────────────────────────
  //  FILE SYSTEM
  // ───────────────────────────────────────────────

  async function selectFolder() {
    try {
      const dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      state.dirHandle = dirHandle;

      dom.currentPath.textContent = `📁 ${dirHandle.name}`;
      dom.currentPath.classList.remove('hidden');

      await loadFiles();
      toast(`已加载文件夹: ${dirHandle.name}`, 'success');
    } catch (err) {
      if (err.name !== 'AbortError') {
        toast('无法打开文件夹: ' + err.message, 'error');
      }
    }
  }

  async function loadFiles() {
    state.files = [];
    for await (const [name, handle] of state.dirHandle.entries()) {
      if (handle.kind === 'file') {
        try {
          const file = await handle.getFile();
          state.files.push({
            handle,
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
            selected: true,
          });
        } catch { /* skip inaccessible files */ }
      }
    }
    state.files.sort((a, b) => a.name.localeCompare(b.name, 'zh'));

    // Populate extension filter
    const exts = [...new Set(state.files.map(f => splitFilename(f.name).ext.toLowerCase()).filter(Boolean))].sort();
    dom.extFilter.innerHTML = '<option value="">全部类型</option>' +
      exts.map(e => `<option value="${e}">.${e}</option>`).join('');

    dom.fileSearch.disabled = false;
    dom.extFilter.disabled = false;
    dom.selectAllCb.disabled = false;
    dom.selectAllCb.checked = true;

    renderFileList();
    updatePreview();
  }

  // ───────────────────────────────────────────────
  //  FILE LIST RENDERING
  // ───────────────────────────────────────────────

  function getVisibleFiles() {
    return state.files.filter(f => {
      if (state.searchTerm && !f.name.toLowerCase().includes(state.searchTerm.toLowerCase())) return false;
      if (state.extFilter && splitFilename(f.name).ext.toLowerCase() !== state.extFilter) return false;
      return true;
    });
  }

  function renderFileList() {
    const visible = getVisibleFiles();
    if (visible.length === 0) {
      dom.fileList.innerHTML = `
        <div class="file-list-empty">
          <span class="empty-icon">${state.files.length ? '🔍' : '📂'}</span>
          <span class="empty-text">${state.files.length ? '无匹配文件' : '暂无文件'}</span>
          <span class="empty-hint">${state.files.length ? '尝试修改筛选条件' : '点击上方按钮选择文件夹'}</span>
        </div>`;
    } else {
      dom.fileList.innerHTML = visible.map((f, i) => {
        const { ext } = splitFilename(f.name);
        const icon = getFileIcon(ext);
        return `
          <div class="file-item ${f.selected ? 'selected' : ''}" data-index="${state.files.indexOf(f)}" style="animation-delay:${Math.min(i * 20, 300)}ms">
            <input type="checkbox" class="file-checkbox" ${f.selected ? 'checked' : ''}>
            <span class="file-icon">${icon}</span>
            <span class="file-name" title="${f.name}">${f.name}</span>
            <span class="file-size">${formatSize(f.size)}</span>
          </div>`;
      }).join('');
    }

    const total = state.files.length;
    const selected = state.files.filter(f => f.selected).length;
    dom.fileCount.textContent = `${total} 个文件`;
    dom.selectedCount.textContent = `已选 ${selected}`;
    dom.fileBadge.textContent = total;
    dom.fileBadge.classList.toggle('hidden', total === 0);
  }

  // ───────────────────────────────────────────────
  //  RULE ENGINE
  // ───────────────────────────────────────────────

  const RULE_DEFAULTS = {
    replace:   { find: '', replace: '', useRegex: false, caseSensitive: false },
    prefix:    { text: '' },
    suffix:    { text: '' },
    numbering: { start: 1, step: 1, digits: 2, position: 'suffix', separator: '_' },
    case:      { mode: 'lower' },
    remove:    { from: 0, count: 0, removeSpaces: false, removeSpecial: false },
    extension: { newExt: '' },
    date:      { format: 'YYYY-MM-DD', position: 'prefix', source: 'current', separator: '_' },
  };

  const RULE_LABELS = {
    replace: '查找替换', prefix: '添加前缀', suffix: '添加后缀',
    numbering: '序号编号', case: '大小写', remove: '删除字符',
    extension: '扩展名', date: '插入日期',
  };

  function addRule(type) {
    const rule = {
      id: uid(),
      type,
      params: { ...RULE_DEFAULTS[type] },
      enabled: true,
    };
    state.rules.push(rule);
    renderRules();
    updatePreview();
  }

  function removeRule(id) {
    state.rules = state.rules.filter(r => r.id !== id);
    renderRules();
    updatePreview();
  }

  function toggleRule(id) {
    const rule = state.rules.find(r => r.id === id);
    if (rule) rule.enabled = !rule.enabled;
    renderRules();
    updatePreview();
  }

  function updateRuleParam(id, key, value) {
    const rule = state.rules.find(r => r.id === id);
    if (rule) {
      rule.params[key] = value;
      updatePreview();
    }
  }

  function moveRule(id, dir) {
    const idx = state.rules.findIndex(r => r.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= state.rules.length) return;
    [state.rules[idx], state.rules[newIdx]] = [state.rules[newIdx], state.rules[idx]];
    renderRules();
    updatePreview();
  }

  function clearRules() {
    state.rules = [];
    renderRules();
    updatePreview();
  }

  // Apply a single rule to a filename
  function applyRule(rule, filename, index, file) {
    if (!rule.enabled) return filename;

    const { base, ext } = splitFilename(filename);
    const p = rule.params;

    switch (rule.type) {
      case 'replace': {
        if (!p.find) return filename;
        const nameToProcess = ext ? base : filename;
        let result;
        if (p.useRegex) {
          try {
            const flags = p.caseSensitive ? 'g' : 'gi';
            const rx = new RegExp(p.find, flags);
            result = nameToProcess.replace(rx, p.replace);
          } catch {
            return filename; // invalid regex
          }
        } else {
          if (p.caseSensitive) {
            result = nameToProcess.split(p.find).join(p.replace);
          } else {
            const rx = new RegExp(p.find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            result = nameToProcess.replace(rx, p.replace);
          }
        }
        return ext ? result + '.' + ext : result;
      }

      case 'prefix':
        return ext ? p.text + base + '.' + ext : p.text + filename;

      case 'suffix':
        return ext ? base + p.text + '.' + ext : filename + p.text;

      case 'numbering': {
        const num = p.start + index * p.step;
        const padded = String(num).padStart(p.digits, '0');
        const sep = p.separator;
        if (p.position === 'prefix') {
          return ext ? padded + sep + base + '.' + ext : padded + sep + filename;
        } else {
          return ext ? base + sep + padded + '.' + ext : filename + sep + padded;
        }
      }

      case 'case': {
        const nameToProcess = ext ? base : filename;
        let result;
        switch (p.mode) {
          case 'upper': result = nameToProcess.toUpperCase(); break;
          case 'lower': result = nameToProcess.toLowerCase(); break;
          case 'title':
            result = nameToProcess.replace(/\b\w/g, c => c.toUpperCase()); break;
          case 'camel':
            result = nameToProcess
              .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
              .replace(/^./, c => c.toLowerCase()); break;
          case 'snake':
            result = nameToProcess
              .replace(/([a-z])([A-Z])/g, '$1_$2')
              .replace(/[\s-]+/g, '_')
              .toLowerCase(); break;
          default: result = nameToProcess;
        }
        return ext ? result + '.' + ext : result;
      }

      case 'remove': {
        let nameToProcess = ext ? base : filename;
        if (p.removeSpaces) {
          nameToProcess = nameToProcess.replace(/\s+/g, '');
        }
        if (p.removeSpecial) {
          nameToProcess = nameToProcess.replace(/[^a-zA-Z0-9\u4e00-\u9fff._-]/g, '');
        }
        if (p.count > 0 && p.from >= 0) {
          nameToProcess = nameToProcess.substring(0, p.from) + nameToProcess.substring(p.from + p.count);
        }
        return ext ? nameToProcess + '.' + ext : nameToProcess;
      }

      case 'extension': {
        if (!p.newExt) return filename;
        const cleaned = p.newExt.replace(/^\./, '');
        return base + '.' + cleaned;
      }

      case 'date': {
        let dateStr;
        const now = p.source === 'modified' ? new Date(file.lastModified) : new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const h = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        switch (p.format) {
          case 'YYYY-MM-DD': dateStr = `${y}-${m}-${d}`; break;
          case 'YYYYMMDD':   dateStr = `${y}${m}${d}`; break;
          case 'YYYY-MM-DD HHmm': dateStr = `${y}-${m}-${d} ${h}${min}`; break;
          case 'DD-MM-YYYY': dateStr = `${d}-${m}-${y}`; break;
          default: dateStr = `${y}-${m}-${d}`;
        }
        const sep = p.separator;
        if (p.position === 'prefix') {
          return ext ? dateStr + sep + base + '.' + ext : dateStr + sep + filename;
        } else {
          return ext ? base + sep + dateStr + '.' + ext : filename + sep + dateStr;
        }
      }

      default:
        return filename;
    }
  }

  // Apply all rules to a file
  function computeNewName(file, index) {
    let name = file.name;
    for (const rule of state.rules) {
      name = applyRule(rule, name, index, file);
    }
    return name;
  }

  // ───────────────────────────────────────────────
  //  RULES RENDERING
  // ───────────────────────────────────────────────

  function ruleConfigHTML(rule) {
    const p = rule.params;
    const id = rule.id;

    switch (rule.type) {
      case 'replace':
        return `
          <div class="rule-field">
            <label>查找</label>
            <input type="text" value="${escAttr(p.find)}" data-rule="${id}" data-key="find" placeholder="输入要查找的文本">
          </div>
          <div class="rule-field">
            <label>替换为</label>
            <input type="text" value="${escAttr(p.replace)}" data-rule="${id}" data-key="replace" placeholder="替换后的文本">
          </div>
          <div class="rule-field-inline">
            <label class="rule-toggle-option"><input type="checkbox" ${p.useRegex ? 'checked' : ''} data-rule="${id}" data-key="useRegex" data-bool> 正则表达式</label>
            <label class="rule-toggle-option"><input type="checkbox" ${p.caseSensitive ? 'checked' : ''} data-rule="${id}" data-key="caseSensitive" data-bool> 区分大小写</label>
          </div>`;

      case 'prefix':
        return `
          <div class="rule-field">
            <label>前缀文本</label>
            <input type="text" value="${escAttr(p.text)}" data-rule="${id}" data-key="text" placeholder="如：photo_">
          </div>`;

      case 'suffix':
        return `
          <div class="rule-field">
            <label>后缀文本</label>
            <input type="text" value="${escAttr(p.text)}" data-rule="${id}" data-key="text" placeholder="如：_final">
          </div>`;

      case 'numbering':
        return `
          <div class="rule-field">
            <label>起始值</label>
            <input type="number" value="${p.start}" data-rule="${id}" data-key="start" data-num min="0">
          </div>
          <div class="rule-field">
            <label>步长</label>
            <input type="number" value="${p.step}" data-rule="${id}" data-key="step" data-num min="1">
          </div>
          <div class="rule-field">
            <label>位数</label>
            <input type="number" value="${p.digits}" data-rule="${id}" data-key="digits" data-num min="1" max="10">
          </div>
          <div class="rule-field">
            <label>位置</label>
            <select data-rule="${id}" data-key="position">
              <option value="prefix" ${p.position==='prefix'?'selected':''}>前缀</option>
              <option value="suffix" ${p.position==='suffix'?'selected':''}>后缀</option>
            </select>
          </div>
          <div class="rule-field">
            <label>分隔符</label>
            <input type="text" value="${escAttr(p.separator)}" data-rule="${id}" data-key="separator" placeholder="_">
          </div>`;

      case 'case':
        return `
          <div class="rule-field">
            <label>模式</label>
            <select data-rule="${id}" data-key="mode">
              <option value="lower" ${p.mode==='lower'?'selected':''}>全小写 (abc)</option>
              <option value="upper" ${p.mode==='upper'?'selected':''}>全大写 (ABC)</option>
              <option value="title" ${p.mode==='title'?'selected':''}>首字母大写 (Abc Def)</option>
              <option value="camel" ${p.mode==='camel'?'selected':''}>驼峰 (abcDef)</option>
              <option value="snake" ${p.mode==='snake'?'selected':''}>蛇形 (abc_def)</option>
            </select>
          </div>`;

      case 'remove':
        return `
          <div class="rule-field">
            <label>起始位</label>
            <input type="number" value="${p.from}" data-rule="${id}" data-key="from" data-num min="0" placeholder="0">
          </div>
          <div class="rule-field">
            <label>删除数</label>
            <input type="number" value="${p.count}" data-rule="${id}" data-key="count" data-num min="0" placeholder="0">
          </div>
          <div class="rule-field-inline">
            <label class="rule-toggle-option"><input type="checkbox" ${p.removeSpaces ? 'checked' : ''} data-rule="${id}" data-key="removeSpaces" data-bool> 删除空格</label>
            <label class="rule-toggle-option"><input type="checkbox" ${p.removeSpecial ? 'checked' : ''} data-rule="${id}" data-key="removeSpecial" data-bool> 删除特殊字符</label>
          </div>`;

      case 'extension':
        return `
          <div class="rule-field">
            <label>新扩展名</label>
            <input type="text" value="${escAttr(p.newExt)}" data-rule="${id}" data-key="newExt" placeholder="如：jpg">
          </div>`;

      case 'date':
        return `
          <div class="rule-field">
            <label>格式</label>
            <select data-rule="${id}" data-key="format">
              <option value="YYYY-MM-DD" ${p.format==='YYYY-MM-DD'?'selected':''}>2024-01-15</option>
              <option value="YYYYMMDD" ${p.format==='YYYYMMDD'?'selected':''}>20240115</option>
              <option value="YYYY-MM-DD HHmm" ${p.format==='YYYY-MM-DD HHmm'?'selected':''}>2024-01-15 1430</option>
              <option value="DD-MM-YYYY" ${p.format==='DD-MM-YYYY'?'selected':''}>15-01-2024</option>
            </select>
          </div>
          <div class="rule-field">
            <label>位置</label>
            <select data-rule="${id}" data-key="position">
              <option value="prefix" ${p.position==='prefix'?'selected':''}>前缀</option>
              <option value="suffix" ${p.position==='suffix'?'selected':''}>后缀</option>
            </select>
          </div>
          <div class="rule-field">
            <label>日期来源</label>
            <select data-rule="${id}" data-key="source">
              <option value="current" ${p.source==='current'?'selected':''}>当前日期</option>
              <option value="modified" ${p.source==='modified'?'selected':''}>文件修改日期</option>
            </select>
          </div>
          <div class="rule-field">
            <label>分隔符</label>
            <input type="text" value="${escAttr(p.separator)}" data-rule="${id}" data-key="separator" placeholder="_">
          </div>`;

      default: return '';
    }
  }

  function escAttr(str) {
    return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function renderRules() {
    if (state.rules.length === 0) {
      dom.rulesList.innerHTML = `
        <div class="rules-empty">
          <span class="empty-icon">⚙️</span>
          <span>添加规则以开始重命名</span>
        </div>`;
      dom.clearRulesBtn.classList.add('hidden');
      dom.ruleBadge.classList.add('hidden');
    } else {
      dom.rulesList.innerHTML = state.rules.map((rule, i) => `
        <div class="rule-card ${rule.enabled ? '' : 'disabled'}" data-rule-id="${rule.id}" draggable="true"
             style="animation-delay:${i * 40}ms">
          <div class="rule-card-header">
            <span class="drag-handle" title="拖拽排序">⠿</span>
            <span class="rule-type-badge ${rule.type}">${RULE_LABELS[rule.type]}</span>
            <div class="rule-actions">
              <button class="rule-action-btn" data-action="move-up" data-id="${rule.id}" title="上移">▲</button>
              <button class="rule-action-btn" data-action="move-down" data-id="${rule.id}" title="下移">▼</button>
              <button class="rule-action-btn toggle-${rule.enabled ? 'on' : 'off'}" data-action="toggle" data-id="${rule.id}" title="${rule.enabled ? '禁用' : '启用'}">${rule.enabled ? '👁' : '👁‍🗨'}</button>
              <button class="rule-action-btn delete" data-action="delete" data-id="${rule.id}" title="删除">✕</button>
            </div>
          </div>
          <div class="rule-card-body">
            ${ruleConfigHTML(rule)}
          </div>
        </div>`).join('');

      dom.clearRulesBtn.classList.remove('hidden');
      dom.ruleBadge.textContent = state.rules.length;
      dom.ruleBadge.classList.remove('hidden');
    }

    bindRuleEvents();
  }

  function bindRuleEvents() {
    // Rule action buttons
    dom.rulesList.querySelectorAll('.rule-action-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        if (action === 'delete') removeRule(id);
        else if (action === 'toggle') toggleRule(id);
        else if (action === 'move-up') moveRule(id, -1);
        else if (action === 'move-down') moveRule(id, 1);
      };
    });

    // Rule param inputs
    dom.rulesList.querySelectorAll('[data-rule][data-key]').forEach(el => {
      const event = el.matches('select') ? 'change' : el.matches('[data-bool]') ? 'change' : 'input';
      el.addEventListener(event, () => {
        const ruleId = parseInt(el.dataset.rule);
        const key = el.dataset.key;
        let value;
        if (el.hasAttribute('data-bool')) value = el.checked;
        else if (el.hasAttribute('data-num')) value = parseInt(el.value) || 0;
        else value = el.value;
        updateRuleParam(ruleId, key, value);
      });
    });

    // Drag and drop
    const cards = dom.rulesList.querySelectorAll('.rule-card');
    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', card.dataset.ruleId);
        e.dataTransfer.effectAllowed = 'move';
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        cards.forEach(c => c.classList.remove('drag-over'));
      });
      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        card.classList.add('drag-over');
      });
      card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
      });
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
        const targetId = parseInt(card.dataset.ruleId);
        if (draggedId === targetId) return;

        const dragIdx = state.rules.findIndex(r => r.id === draggedId);
        const targetIdx = state.rules.findIndex(r => r.id === targetId);
        const [moved] = state.rules.splice(dragIdx, 1);
        state.rules.splice(targetIdx, 0, moved);
        renderRules();
        updatePreview();
      });
    });
  }

  // ───────────────────────────────────────────────
  //  PREVIEW
  // ───────────────────────────────────────────────

  function updatePreview() {
    const selectedFiles = state.files.filter(f => f.selected);

    if (selectedFiles.length === 0 || state.rules.length === 0) {
      dom.previewBody.innerHTML = '';
      dom.previewEmpty.classList.remove('hidden');
      dom.changeCount.textContent = '0';
      dom.conflictCount.textContent = '0';
      dom.unchangedCount.textContent = '0';
      dom.executeBtn.disabled = true;
      dom.actionInfo.textContent = '';
      return;
    }

    // Compute new names
    const results = selectedFiles.map((file, i) => ({
      file,
      original: file.name,
      newName: computeNewName(file, i),
    }));

    // Detect conflicts
    const nameCounts = {};
    results.forEach(r => {
      const key = r.newName.toLowerCase();
      nameCounts[key] = (nameCounts[key] || 0) + 1;
    });

    results.forEach(r => {
      r.changed = r.original !== r.newName;
      r.conflict = nameCounts[r.newName.toLowerCase()] > 1;
    });

    const changes = results.filter(r => r.changed).length;
    const conflicts = results.filter(r => r.conflict).length;
    const unchanged = results.filter(r => !r.changed).length;

    dom.changeCount.textContent = changes;
    dom.conflictCount.textContent = conflicts;
    dom.unchangedCount.textContent = unchanged;

    // Filter
    let displayResults = results;
    if (state.showChangedOnly) {
      displayResults = results.filter(r => r.changed);
    }

    dom.previewEmpty.classList.add('hidden');

    if (displayResults.length === 0) {
      dom.previewBody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:30px;color:var(--text-muted);">无变更项</td></tr>`;
    } else {
      dom.previewBody.innerHTML = displayResults.map(r => {
        const rowClass = r.conflict ? 'conflict' : r.changed ? 'changed' : '';
        const statusIcon = r.conflict ? '<span class="conflict-icon" title="文件名冲突">⚠️</span>' :
                           r.changed ? '<span style="color:var(--accent-2)" title="已变更">●</span>' :
                           '<span style="color:var(--text-muted)" title="未变更">○</span>';
        const newNameHtml = r.changed ? highlightDiff(r.original, r.newName) : escHtml(r.newName);

        return `<tr class="${rowClass}">
          <td class="col-status">${statusIcon}</td>
          <td class="original-name">${escHtml(r.original)}</td>
          <td class="col-arrow">→</td>
          <td class="new-name">${newNameHtml}</td>
        </tr>`;
      }).join('');
    }

    dom.executeBtn.disabled = changes === 0 || conflicts > 0;
    dom.actionInfo.textContent = conflicts > 0 ? '⚠️ 存在冲突，请修改规则' :
                                 changes > 0 ? `将重命名 ${changes} 个文件` : '';
  }

  function highlightDiff(original, newName) {
    // Simple character-level diff highlighting
    const result = [];
    let i = 0, j = 0;
    const o = original, n = newName;

    // Find common prefix
    while (i < o.length && i < n.length && o[i] === n[i]) {
      result.push(escHtml(n[i]));
      i++;
    }
    // Find common suffix
    let oi = o.length - 1, ni = n.length - 1;
    const suffixChars = [];
    while (oi > i && ni > i && o[oi] === n[ni]) {
      suffixChars.unshift(escHtml(n[ni]));
      oi--;
      ni--;
    }
    // Middle part is the diff
    if (i <= ni) {
      result.push('<span class="diff-highlight">');
      for (let k = i; k <= ni; k++) result.push(escHtml(n[k]));
      result.push('</span>');
    }
    result.push(...suffixChars);
    return result.join('');
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ───────────────────────────────────────────────
  //  EXECUTE & UNDO
  // ───────────────────────────────────────────────

  async function executeRename() {
    const selectedFiles = state.files.filter(f => f.selected);
    const results = selectedFiles.map((file, i) => ({
      file,
      original: file.name,
      newName: computeNewName(file, i),
    })).filter(r => r.changed);

    if (results.length === 0) return;

    const confirmed = await confirm(
      '确认重命名',
      `即将重命名 <strong>${results.length}</strong> 个文件。<br><br>此操作会直接修改文件名，是否继续？`
    );
    if (!confirmed) return;

    dom.executeBtn.disabled = true;
    dom.executeBtn.innerHTML = '<span class="spinner"></span> 执行中…';

    const undoEntries = [];
    let successCount = 0;
    let errorCount = 0;

    for (const r of results) {
      try {
        await r.file.handle.move(r.newName);
        r.file.name = r.newName;
        undoEntries.push({ handle: r.file.handle, oldName: r.original, newName: r.newName });
        successCount++;
      } catch (err) {
        console.error(`Rename failed: ${r.original} → ${r.newName}`, err);
        errorCount++;
      }
    }

    if (undoEntries.length > 0) {
      state.undoStack.push({ entries: undoEntries, timestamp: Date.now() });
      dom.undoBtn.disabled = false;
    }

    dom.executeBtn.innerHTML = '✅ 执行重命名';

    if (errorCount === 0) {
      toast(`成功重命名 ${successCount} 个文件`, 'success');
    } else {
      toast(`成功 ${successCount} 个，失败 ${errorCount} 个`, 'warning');
    }

    renderFileList();
    updatePreview();
  }

  async function undoRename() {
    if (state.undoStack.length === 0) return;

    const last = state.undoStack[state.undoStack.length - 1];
    const confirmed = await confirm(
      '撤销操作',
      `即将撤销上次操作（${last.entries.length} 个文件），恢复为原始文件名。<br><br>是否继续？`
    );
    if (!confirmed) return;

    dom.undoBtn.disabled = true;
    let successCount = 0;

    for (const entry of last.entries) {
      try {
        await entry.handle.move(entry.oldName);
        const file = state.files.find(f => f.handle === entry.handle);
        if (file) file.name = entry.oldName;
        successCount++;
      } catch (err) {
        console.error(`Undo failed: ${entry.newName} → ${entry.oldName}`, err);
      }
    }

    state.undoStack.pop();
    dom.undoBtn.disabled = state.undoStack.length === 0;

    toast(`已撤销 ${successCount} 个文件的重命名`, 'success');
    renderFileList();
    updatePreview();
  }

  // ───────────────────────────────────────────────
  //  EVENT BINDING
  // ───────────────────────────────────────────────

  function init() {
    // Check API support
    if (!('showDirectoryPicker' in window)) {
      toast('您的浏览器不支持 File System Access API，请使用 Chrome 或 Edge', 'error');
      dom.selectFolderBtn.disabled = true;
      return;
    }

    // Folder select
    dom.selectFolderBtn.addEventListener('click', selectFolder);

    // File search
    dom.fileSearch.addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      renderFileList();
    });

    // Extension filter
    dom.extFilter.addEventListener('change', (e) => {
      state.extFilter = e.target.value;
      renderFileList();
    });

    // Select all
    dom.selectAllCb.addEventListener('change', (e) => {
      const visible = getVisibleFiles();
      visible.forEach(f => f.selected = e.target.checked);
      renderFileList();
      updatePreview();
    });

    // File item click delegation
    dom.fileList.addEventListener('click', (e) => {
      const item = e.target.closest('.file-item');
      if (!item) return;
      const idx = parseInt(item.dataset.index);
      const file = state.files[idx];
      if (!file) return;

      if (e.target.matches('.file-checkbox')) {
        file.selected = e.target.checked;
      } else {
        file.selected = !file.selected;
      }

      renderFileList();
      updatePreview();
    });

    // Add rule menu toggle
    dom.addRuleTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dom.ruleTypeMenu.classList.toggle('open');
    });

    // Close menu on outside click
    document.addEventListener('click', () => {
      dom.ruleTypeMenu.classList.remove('open');
    });

    // Rule type selection
    dom.ruleTypeMenu.querySelectorAll('.rule-type-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        addRule(opt.dataset.type);
        dom.ruleTypeMenu.classList.remove('open');
      });
    });

    // Clear rules
    dom.clearRulesBtn.addEventListener('click', async () => {
      const yes = await confirm('清空规则', '确定要删除所有重命名规则吗？');
      if (yes) clearRules();
    });

    // Preview filter
    dom.showChangedOnly.addEventListener('change', (e) => {
      state.showChangedOnly = e.target.checked;
      updatePreview();
    });

    // Execute & Undo
    dom.executeBtn.addEventListener('click', executeRename);
    dom.undoBtn.addEventListener('click', undoRename);

    // Close modal on overlay click
    dom.confirmModal.addEventListener('click', (e) => {
      if (e.target === dom.confirmModal) {
        dom.modalCancelBtn.click();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        if (!dom.undoBtn.disabled) undoRename();
      }
    });
  }

  // ───── Start ─────
  init();
})();
