window.Game = window.Game || {};

Game.selectedClass = null;

Game.renderScene = function(sceneId) {
  if (Game.state.warnings >= 2 && sceneId !== 'ending') sceneId = 'ending';
  else if (Game.state.gpa <= 0 && sceneId !== 'gameover_gpa') sceneId = 'gameover_gpa';
  else if (Game.state.health <= 0 && sceneId !== 'gameover_health') sceneId = 'gameover_health';
  else if (Game.state.mental <= 0 && sceneId !== 'gameover_mental') sceneId = 'gameover_mental';
  else if (Game.state.money <= 0 && sceneId !== 'gameover_money') sceneId = 'gameover_money';

  Game.state.scene = sceneId;
  var scene = Game.scenes[sceneId];
  var card = document.getElementById('mainCard');
  card.style.animation = 'none'; card.offsetHeight; card.style.animation = 'fadeIn 0.6s ease';

  // 标题页
  if (sceneId === 'title') {
    Game.showStatus(false);
    card.innerHTML = '<div class="title-screen">' +
      '<div class="scene-icon">' + scene.icon + '</div>' +
      '<div class="scene-title">' + scene.title + '</div>' +
      '<div class="subtitle">一款关于选择与生存的文字冒险游戏</div>' +
      '<div class="scene-text">' + scene.text.replace(/\n/g,'<br>') + '</div>' +
      '<button class="start-btn" onclick="renderScene(\'classSelect\')">📖 选择你的身份</button>' +
    '</div>';
    return;
  }

  // 职业选择页
  if (sceneId === 'classSelect') {
    Game.showStatus(false);
    var grid = '<div class="class-grid">';
    var entries = Object.entries(Game.CLASSES);
    for (var i = 0; i < entries.length; i++) {
      var id = entries[i][0], c = entries[i][1];
      grid += '<div class="class-card" onclick="selectClass(\'' + id + '\')" id="class_' + id + '">' +
        '<div class="class-icon">' + c.icon + '</div>' +
        '<div class="class-name">' + c.name + ' <span class="difficulty-tag ' + c.diffClass + '">' + c.difficulty + '</span></div>' +
        '<div class="class-desc">' + c.desc + '</div>' +
        '<div class="class-stats">GPA ' + c.gpa.toFixed(1) + ' | 体力 ' + c.health + ' | 心理 ' + c.mental + ' | 金钱 ' + c.money + '</div>' +
        '<div class="class-passive">' + c.passive + '</div>' +
      '</div>';
    }
    grid += '</div>';
    card.innerHTML =
      '<div class="scene-icon">' + scene.icon + '</div>' +
      '<div class="scene-title">' + scene.title + '</div>' +
      '<div class="scene-text">' + scene.text.replace(/\n/g,'<br>') + '</div>' +
      grid +
      '<button class="start-btn" id="confirmClassBtn" style="opacity:0.3;pointer-events:none;margin-top:20px;" onclick="startGame()">确认选择</button>';
    return;
  }

  // 结局
  if (sceneId === 'ending') {
    Game.checkQuests();
    var result = Game.calculateEnding();
    var e = result.main;
    var achievements = result.achievements;
    var isExpelled = Game.state.warnings >= 2;
    Game.showStatus(true);

    // 成就结局卡片
    var achHtml = '';
    if (achievements.length > 0) {
      var achTitle = isExpelled
        ? '虽然离开了交大，但你在这里的日子并非一无所获……'
        : '在交大的日子里，你还收获了这些……';
      achHtml += '<div class="achievements-section">' +
        '<div class="achievements-title">' + achTitle + '</div>';
      achievements.forEach(function(a) {
        achHtml += '<div class="achievement-card">' +
          '<div class="achievement-header">' +
            '<span class="achievement-icon">' + a.icon + '</span>' +
            '<span class="achievement-name">' + a.title + '</span>' +
            '<span class="achievement-rank">' + a.rank + '</span>' +
          '</div>' +
          '<div class="achievement-text">' + a.text.replace(/\n/g,'<br>') + '</div>' +
        '</div>';
      });
      achHtml += '</div>';
    }

    // 任务完成列表
    var questHtml = '';
    if (Game.state.activeQuests.length > 0) {
      questHtml += '<div class="quest-ending-list">';
      questHtml += '<div style="text-align:center;color:var(--dim);font-size:13px;font-weight:700;margin-bottom:8px;border-top:1px solid rgba(255,255,255,0.06);padding-top:12px;">📋 目标达成</div>';
      Game.state.activeQuests.forEach(function(id) {
        var q = Game.QUESTS[id];
        var done = Game.state.completedQuests.includes(id);
        questHtml += '<div class="quest-ending-item">' +
          '<span class="qe-icon">' + q.icon + '</span>' +
          '<span style="flex:1">' + q.name + '</span>' +
          '<span style="font-weight:700;color:' + (done ? '#8f8' : '#f88') + '">' + (done ? '✓ 达成' : '✗ 未达成') + '</span>' +
        '</div>';
      });
      questHtml += '</div>';
    }

    card.innerHTML =
      '<div class="ending-badge">' + e.icon + '</div>' +
      '<div class="scene-title">' + e.title + '</div>' +
      '<div style="text-align:center;color:var(--gold);font-size:28px;font-weight:900;margin:10px 0;">评级：' + e.rank + '</div>' +
      '<div class="scene-text">' + e.text.replace(/\n/g,'<br>') + '</div>' +
      achHtml +
      '<div class="ending-stats">' +
        '<div><div class="es-val">' + Game.state.gpa.toFixed(1) + '</div>最终 GPA</div>' +
        '<div><div class="es-val">' + Game.state.health + '</div>最终体力</div>' +
        '<div><div class="es-val">' + Game.state.money + '</div>最终金钱</div>' +
        '<div><div class="es-val">' + Game.state.mental + '</div>最终心理</div>' +
      '</div>' +
      questHtml +
      '<div style="text-align:center;color:var(--dim);font-size:12px;margin-top:10px;">' +
        Game.CLASSES[Game.state.playerClass].icon + ' ' + Game.CLASSES[Game.state.playerClass].name + ' · ' +
        (isExpelled ? '在第 ' + Game.state.semester + ' 学期被取消学籍' : Game.state.semester + ' 个学期') +
      '</div>' +
      '<button class="restart-btn" onclick="location.reload()">🔄 再来一次</button>';
    return;
  }

  // 特殊结局（属性归零）
  if (scene.isEnding) {
    Game.showStatus(true);
    card.innerHTML =
      '<div class="ending-badge">' + scene.icon + '</div>' +
      '<div class="scene-title">' + scene.title + '</div>' +
      '<div class="scene-text">' + scene.text.replace(/\n/g,'<br>') + '</div>' +
      '<div class="ending-stats">' +
        '<div><div class="es-val">' + Game.state.gpa.toFixed(1) + '</div>最终 GPA</div>' +
        '<div><div class="es-val">' + Game.state.health + '</div>最终体力</div>' +
        '<div><div class="es-val">' + Game.state.money + '</div>最终金钱</div>' +
        '<div><div class="es-val">' + Game.state.mental + '</div>最终心理</div>' +
      '</div>' +
      '<div style="text-align:center;color:var(--dim);font-size:12px;margin-top:10px;">' +
        Game.CLASSES[Game.state.playerClass].icon + ' ' + Game.CLASSES[Game.state.playerClass].name + ' · 在第 ' + Game.state.semester + ' 学期倒下' +
      '</div>' +
      '<button class="restart-btn" onclick="location.reload()">🔄 再来一次</button>';
    return;
  }

  // ====== 多选场景（groups）======
  if (scene.groups) {
    Game.showStatus(true);
    var text = typeof scene.text === 'function' ? scene.text() : scene.text;
    var groups = typeof scene.groups === 'function' ? scene.groups() : scene.groups;
    // 过滤有条件的picks
    var filteredGroups = groups.map(function(g) {
      var picks = g.picks.filter(function(p) { return !p.condition || p.condition(Game.state); });
      return { label: g.label, exclusive: g.exclusive, picks: picks };
    }).filter(function(g) { return g.picks.length > 0; });

    var gHtml = '<div class="choice-groups">';
    filteredGroups.forEach(function(g, gi) {
      gHtml += '<div class="choice-group"><div class="group-header">' +
        '<span class="group-label">' + g.label + '</span>' +
        '<span class="group-tag ' + (g.exclusive ? 'exclusive' : 'optional') + '">' + (g.exclusive ? '选一个' : '可多选') + '</span>' +
      '</div><div class="group-picks">';
      g.picks.forEach(function(p, pi) {
        var hint = p.effect ? Game.formatRange(p.effect) : (p.hint || '');
        gHtml += '<button class="pick-btn" data-g="' + gi + '" data-p="' + pi + '" onclick="togglePick(' + gi + ',' + pi + ')">' +
          '<span class="pick-indicator">' + (g.exclusive ? '○' : '☐') + '</span>' +
          '<div class="pick-body">' + p.text +
          (hint ? '<span class="pick-hint">' + hint + '</span>' : '') +
          '</div></button>';
      });
      gHtml += '</div></div>';
    });
    gHtml += '</div><button class="confirm-groups-btn" onclick="confirmGroups()">确认选择 →</button>';

    card.innerHTML =
      '<div class="scene-icon">' + scene.icon + '</div>' +
      '<div class="scene-title">' + scene.title + '</div>' +
      '<div class="scene-text">' + text.replace(/\n/g,'<br>') + '</div>' + gHtml;

    // 初始化选中状态
    Game._groupScene = { groups: filteredGroups, next: scene.next, semester: scene.semester };
    Game._groupSel = {};
    filteredGroups.forEach(function(g, gi) {
      Game._groupSel[gi] = g.exclusive ? [0] : [];
    });
    Game._updateGroupUI();
    Game._filterByLocation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // ====== 普通单选场景 ======
  Game.showStatus(true);
  var text = typeof scene.text === 'function' ? scene.text() : scene.text;
  var choiceList = typeof scene.choices === 'function' ? scene.choices() : (scene.choices || []);
  // 注入稀有随机选项（正事场景跳过）
  if (Game.RARE_BLACKLIST.indexOf(sceneId) === -1) {
    choiceList = Game.injectRareChoices(choiceList);
  }
  var choicesHtml = '<div class="choices">';
  choiceList.forEach(function(c, i) {
    // 用范围替代固定数值显示
    var hintText = c.effect ? Game.formatRange(c.effect) : '';
    // 保留非数值的提示文字（如 "获得flag: CS玩家"、"但是真的卸了吗？"）
    if (c.hint && hintText === '') hintText = c.hint;
    else if (c.hint) {
      // 检查hint中是否有非数值的补充说明
      var extra = c.hint.replace(/[GPA体力心理金钱趋势\s\d+\-.,~]+/g, '').replace(/^[,\s]+|[,\s]+$/g, '');
      if (extra) hintText += ' ' + extra;
    }
    var isRare = c.text.indexOf('✨') === 0;
    choicesHtml += '<button class="choice-btn' + (isRare ? ' rare' : '') + '" onclick="choose(' + i + ')" style="animation:fadeIn 0.4s ease ' + (0.1+i*0.1) + 's both;">' +
      '<span class="choice-emoji">' + ((c.text.match(/^\S+/)||[''])[0]) + '</span>' + c.text.replace(/^\S+\s*/,'') +
      (hintText ? '<span class="choice-hint">' + hintText + '</span>' : '') +
    '</button>';
  });
  choicesHtml += '</div>';
  card.innerHTML =
    '<div class="scene-icon">' + scene.icon + '</div>' +
    '<div class="scene-title">' + scene.title + '</div>' +
    '<div class="scene-text">' + text.replace(/\n/g,'<br>') + '</div>' +
    choicesHtml;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

Game.selectClass = function(id) {
  Game.selectedClass = id;
  document.querySelectorAll('.class-card').forEach(function(c) { c.classList.remove('selected'); });
  document.getElementById('class_' + id).classList.add('selected');
  var btn = document.getElementById('confirmClassBtn');
  btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
};

Game.startGame = function() {
  if (!Game.selectedClass) return;
  var cls = Game.CLASSES[Game.selectedClass];
  Game.state.playerClass = Game.selectedClass;
  Game.state.gpa = cls.gpa; Game.state.health = cls.health; Game.state.mental = cls.mental; Game.state.money = cls.money;
  Game.state.semester = 1; Game.state.flags = {}; Game.state.activeQuests = []; Game.state.completedQuests = []; Game.state.warnings = 0;
  Game.state.momentum = { gpa: 0, health: 0, mental: 0 };
  Game.state.revealedQuests = [];
  Game.updateUI();
  Game.renderScene('s1_intro');
};

Game.choose = function(index) {
  var scene = Game.scenes[Game.state.scene];
  var choiceList = typeof scene.choices === 'function' ? scene.choices() : scene.choices;
  var choice = choiceList[index];
  // 随机化数值（随机化后的值作为动量输入）
  var ef = Game.randomizeEffect(choice.effect);
  // 通过动量系统应用效果，返回实际属性变化
  var actual = Game.applyChoiceEffect(ef);
  if (choice.semester) Game.onSemesterChange(choice.semester);
  // toast 显示动量计算后的实际收益
  var parts = [];
  if (actual.gpa > 0) parts.push('GPA+' + actual.gpa);
  else if (actual.gpa < 0) parts.push('GPA' + actual.gpa);
  if (actual.health > 0) parts.push('体力+' + actual.health);
  else if (actual.health < 0) parts.push('体力' + actual.health);
  if (actual.mental > 0) parts.push('心理+' + actual.mental);
  else if (actual.mental < 0) parts.push('心理' + actual.mental);
  if (actual.money > 0) parts.push('金钱+' + actual.money);
  else if (actual.money < 0) parts.push('金钱' + actual.money);
  if (parts.length) {
    var pos = (actual.gpa > 0 || actual.health > 0 || actual.mental > 0 || actual.money > 0);
    var neg = (actual.gpa < 0 || actual.health < 0 || actual.mental < 0 || actual.money < 0);
    Game.showToast('🎲 ' + parts.join(' | '), pos && !neg ? 'positive' : 'negative');
  }
  setTimeout(function() { Game.renderScene(choice.next); }, 200);
};

// ====== 多选场景逻辑 ======
Game.togglePick = function(gi, pi) {
  var g = Game._groupScene.groups[gi];
  var sel = Game._groupSel;
  if (g.exclusive) {
    sel[gi] = [pi];
  } else {
    var idx = sel[gi].indexOf(pi);
    if (idx !== -1) sel[gi].splice(idx, 1); else sel[gi].push(pi);
  }
  Game._updateGroupUI();
  Game._filterByLocation();
};

Game._updateGroupUI = function() {
  var gs = Game._groupScene.groups;
  var sel = Game._groupSel;
  gs.forEach(function(g, gi) {
    g.picks.forEach(function(p, pi) {
      var btn = document.querySelector('[data-g="' + gi + '"][data-p="' + pi + '"]');
      if (!btn) return;
      var on = sel[gi].indexOf(pi) !== -1;
      btn.classList.toggle('selected', on);
      btn.querySelector('.pick-indicator').textContent = g.exclusive ? (on ? '●' : '○') : (on ? '☑' : '☐');
    });
  });
};

// 假期场景：根据exclusive组选中的地点(locId)过滤活动picks(loc)
Game._filterByLocation = function() {
  var gs = Game._groupScene.groups;
  var sel = Game._groupSel;
  // 找到exclusive组中选中pick的locId
  var locId = null;
  for (var gi = 0; gi < gs.length; gi++) {
    if (gs[gi].exclusive && sel[gi] && sel[gi].length > 0) {
      var pick = gs[gi].picks[sel[gi][0]];
      if (pick.locId) { locId = pick.locId; break; }
    }
  }
  if (locId === null) return; // 此场景无地点系统
  // 过滤非exclusive组的picks
  for (var gi = 0; gi < gs.length; gi++) {
    if (gs[gi].exclusive) continue;
    gs[gi].picks.forEach(function(p, pi) {
      var btn = document.querySelector('[data-g="' + gi + '"][data-p="' + pi + '"]');
      if (!btn) return;
      if (p.loc && p.loc !== locId) {
        btn.style.display = 'none';
        var idx = sel[gi].indexOf(pi);
        if (idx !== -1) sel[gi].splice(idx, 1);
      } else {
        btn.style.display = '';
      }
    });
  }
  Game._updateGroupUI();
};

Game.confirmGroups = function() {
  var gs = Game._groupScene;
  var sel = Game._groupSel;
  // 校验exclusive组必须有选择
  for (var gi = 0; gi < gs.groups.length; gi++) {
    if (gs.groups[gi].exclusive && (!sel[gi] || sel[gi].length === 0)) {
      Game.showToast('⚠️ 请在"' + gs.groups[gi].label + '"中选择一项', 'negative');
      return;
    }
  }
  // 合并所有选中效果
  var combined = {};
  var flags = {};
  var redirect = null;
  for (var gi = 0; gi < gs.groups.length; gi++) {
    (sel[gi] || []).forEach(function(pi) {
      var pick = gs.groups[gi].picks[pi];
      var ef = pick.effect || {};
      ['gpa','health','mental','money'].forEach(function(k) {
        if (ef[k]) combined[k] = (combined[k] || 0) + ef[k];
      });
      if (ef.flags) Game.mergeFlags(flags, ef.flags);
      if (pick.redirect) redirect = pick.redirect;
    });
  }
  if (Object.keys(flags).length) combined.flags = flags;
  // 随机化 + 动量
  var ef = Game.randomizeEffect(combined);
  var actual = Game.applyChoiceEffect(ef);
  if (gs.semester) Game.onSemesterChange(gs.semester);
  // toast
  var parts = [];
  if (actual.gpa > 0) parts.push('GPA+' + actual.gpa);
  else if (actual.gpa < 0) parts.push('GPA' + actual.gpa);
  if (actual.health > 0) parts.push('体力+' + actual.health);
  else if (actual.health < 0) parts.push('体力' + actual.health);
  if (actual.mental > 0) parts.push('心理+' + actual.mental);
  else if (actual.mental < 0) parts.push('心理' + actual.mental);
  if (actual.money > 0) parts.push('金钱+' + actual.money);
  else if (actual.money < 0) parts.push('金钱' + actual.money);
  if (parts.length) {
    var pos = parts.some(function(p) { return p.indexOf('+') !== -1; });
    var neg = parts.some(function(p) { return /\-/.test(p); });
    Game.showToast('🎲 ' + parts.join(' | '), pos && !neg ? 'positive' : 'negative');
  }
  var next = redirect || gs.next;
  setTimeout(function() { Game.renderScene(next); }, 200);
};

// Expose global aliases for HTML inline handlers
window.toggleQuestPanel = Game.toggleQuestPanel;
window.choose = Game.choose;
window.selectClass = Game.selectClass;
window.startGame = Game.startGame;
window.renderScene = Game.renderScene;
window.acceptQuest = Game.acceptQuest;
window.abandonQuest = Game.abandonQuest;
window.togglePick = Game.togglePick;
window.confirmGroups = Game.confirmGroups;
