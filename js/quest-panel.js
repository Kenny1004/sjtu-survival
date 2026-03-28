window.Game = window.Game || {};

Game.toggleQuestPanel = function() {
  var panel = document.getElementById('questPanel');
  var overlay = document.getElementById('questOverlay');
  var isOpen = panel.classList.contains('open');
  panel.classList.toggle('open');
  overlay.classList.toggle('open');
  if (!isOpen) Game.renderQuestPanel();
};

Game.updateQuestCount = function() {
  var cnt = Game.state.activeQuests.length;
  var el = document.getElementById('questCount');
  el.textContent = cnt;
  el.style.display = cnt > 0 ? 'flex' : 'none';
};

Game.acceptQuest = function(id) {
  if (!Game.state.activeQuests.includes(id) && !Game.state.completedQuests.includes(id)) {
    Game.state.activeQuests.push(id);
    Game.showToast('📋 接取任务：' + Game.QUESTS[id].name, 'event');
    Game.updateQuestCount();
    Game.renderQuestPanel();
  }
};

Game.abandonQuest = function(id) {
  Game.state.activeQuests = Game.state.activeQuests.filter(function(q) { return q !== id; });
  Game.showToast('❌ 放弃任务：' + Game.QUESTS[id].name, 'negative');
  Game.updateQuestCount();
  Game.renderQuestPanel();
};

Game.checkQuests = function() {
  Game.state.activeQuests.forEach(function(id) {
    var q = Game.QUESTS[id];
    if (q.check(Game.state) && !Game.state.completedQuests.includes(id)) {
      Game.state.completedQuests.push(id);
    }
  });
};

Game.renderQuestPanel = function() {
  var panel = document.getElementById('questPanel');
  var available = Object.entries(Game.QUESTS).filter(function(entry) {
    var id = entry[0], q = entry[1];
    if (Game.state.activeQuests.includes(id) || Game.state.completedQuests.includes(id)) return false;
    if (q.hidden) return Game.state.revealedQuests.indexOf(id) !== -1;
    return Game.state.semester >= q.unlockSemester;
  });
  var active = Game.state.activeQuests.map(function(id) { return [id, Game.QUESTS[id]]; });

  var html = '<div class="quest-panel-title">📋 毕业目标 <button class="quest-close" onclick="toggleQuestPanel()">✕</button></div>';
  html += '<div class="quest-panel-sub">接取目标后，在毕业时满足条件即可解锁专属结局。可以同时追求多个目标。</div>';

  // 进行中的任务
  if (active.length > 0) {
    html += '<div class="quest-section-title">🎯 当前目标（' + active.length + '）</div>';
    active.forEach(function(entry) {
      var id = entry[0], q = entry[1];
      var met = q.check(Game.state);
      var reqs = q.reqText(Game.state);
      html += '<div class="quest-card active">' +
        '<div class="quest-header">' +
          '<span class="quest-icon">' + q.icon + '</span>' +
          '<span class="quest-name">' + q.name + '</span>' +
          '<span class="quest-status-tag ' + (met ? 'qst-done' : 'qst-active') + '">' + (met ? '✓ 已达成' : '进行中') + '</span>' +
        '</div>' +
        '<div class="quest-desc">' + q.desc + '</div>' +
        '<div class="quest-reqs">' + reqs.map(function(r) { return '<span class="' + (r.met ? 'req-met' : 'req-unmet') + '">' + (r.met ? '✓' : '✗') + ' ' + r.label + '</span>'; }).join('') + '</div>' +
        '<div class="quest-reward">🏆 ' + q.reward + '</div>' +
        '<div style="margin-top:8px;"><button class="quest-btn abandon" onclick="abandonQuest(\'' + id + '\')">放弃此目标</button></div>' +
      '</div>';
    });
  }

  // 可接取的任务
  if (available.length > 0) {
    html += '<div class="quest-section-title">📜 可接取的目标（' + available.length + '）</div>';
    available.forEach(function(entry) {
      var id = entry[0], q = entry[1];
      var reqs = q.reqText(Game.state);
      html += '<div class="quest-card">' +
        '<div class="quest-header">' +
          '<span class="quest-icon">' + q.icon + '</span>' +
          '<span class="quest-name">' + q.name + '</span>' +
        '</div>' +
        '<div class="quest-desc">' + q.desc + '</div>' +
        '<div class="quest-reqs">' + reqs.map(function(r) { return '<span class="' + (r.met ? 'req-met' : 'req-unmet') + '">' + (r.met ? '✓' : '✗') + ' ' + r.label + '</span>'; }).join('') + '</div>' +
        '<div class="quest-reward">🏆 ' + q.reward + '</div>' +
        '<div style="margin-top:8px;"><button class="quest-btn" onclick="acceptQuest(\'' + id + '\')">接取此目标</button></div>' +
      '</div>';
    });
  }

  // 尚未解锁的任务
  var locked = Object.entries(Game.QUESTS).filter(function(entry) {
    var id = entry[0], q = entry[1];
    if (q.hidden) return false; // 隐式任务不剧透
    return Game.state.semester < q.unlockSemester && !Game.state.activeQuests.includes(id);
  });
  if (locked.length > 0) {
    html += '<div class="quest-section-title">🔒 未解锁</div>';
    locked.forEach(function(entry) {
      var id = entry[0], q = entry[1];
      var semNames = ['', '大一·秋', '大一·春', '大二·秋', '大二·春', '大三·秋', '大三·春', '大四·秋', '大四·春'];
      html += '<div class="quest-card" style="opacity:0.4">' +
        '<div class="quest-header">' +
          '<span class="quest-icon">' + q.icon + '</span>' +
          '<span class="quest-name">' + q.name + '</span>' +
          '<span style="font-size:11px;color:var(--dim);">🔒 ' + semNames[q.unlockSemester] + '解锁</span>' +
        '</div>' +
      '</div>';
    });
  }

  panel.innerHTML = html;
};

// 隐式任务检查：爱好积累够了就浮现
Game.checkHiddenQuests = function() {
  Object.entries(Game.QUESTS).forEach(function(entry) {
    var id = entry[0], q = entry[1];
    if (!q.hidden) return;
    if (Game.state.revealedQuests.indexOf(id) !== -1) return;
    if (!q.hidden.revealCheck(Game.state)) return;
    // 发现！
    Game.state.revealedQuests.push(id);
    if (Game.state.activeQuests.indexOf(id) === -1) {
      Game.state.activeQuests.push(id);
    }
    Game.updateQuestCount();
    setTimeout(function() { Game.showHiddenQuestReveal(q); }, 300);
  });
};

Game.showHiddenQuestReveal = function(quest) {
  var overlay = document.createElement('div');
  overlay.className = 'event-modal-overlay';
  overlay.innerHTML =
    '<div class="event-modal hidden-quest-modal">' +
      '<div class="event-modal-title" style="color:#d8a0ff;">🔓 隐藏支线发现</div>' +
      '<div class="event-modal-icon">' + quest.icon + '</div>' +
      '<div class="event-modal-text" style="font-size:18px;font-weight:700;color:#fff;">' + quest.name + '</div>' +
      '<div class="event-modal-text" style="font-size:14px;color:#ccc;">' + quest.hidden.revealText + '</div>' +
      '<div class="event-modal-text" style="font-size:12px;color:var(--dim);margin-top:8px;">' + quest.desc + '</div>' +
      '<button class="event-modal-btn" style="background:rgba(200,100,255,0.15);border-color:rgba(200,100,255,0.4);color:#d8a0ff;" id="hiddenQuestBtn">看看怎么回事</button>' +
    '</div>';
  document.body.appendChild(overlay);
  document.getElementById('hiddenQuestBtn').onclick = function() {
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.opacity = '0';
    setTimeout(function() { overlay.remove(); }, 300);
  };
};

// 学期切换时触发
Game.onSemesterChange = function(newSem) {
  Game.state.semester = newSem;
  // 学期衰减
  Game.applyStat(Game.SEMESTER_DECAY);
  // 职业被动
  var cls = Game.CLASSES[Game.state.playerClass];
  if (cls && cls.passiveFn) cls.passiveFn(Game.state);
  // 学期切换时衰减动量（假期/换环境重置惯性）
  Game.decayMomentum();

  // 学业警告检查：学期末GPA低于1.7
  var needWarning = Game.state.gpa > 0 && Game.state.gpa < 1.7;
  if (needWarning) Game.state.warnings++;

  // 后续流程：随机事件 → 任务解锁 → 学业警告
  var afterEvents = function() {
    // 检查任务解锁
    var newlyAvailable = Object.entries(Game.QUESTS).filter(function(entry) {
      var id = entry[0], q = entry[1];
      return q.unlockSemester === newSem && !Game.state.activeQuests.includes(id) && !Game.state.completedQuests.includes(id);
    });
    if (newlyAvailable.length > 0) {
      Game.showToast('📋 新目标解锁！点击右下角查看', 'event');
    }
    // 如果触发了学业警告，延迟显示
    if (needWarning) {
      setTimeout(function() {
        Game.showAcademicWarning(Game.state.warnings, function() {
          if (Game.state.warnings >= 2) {
            Game.renderScene('ending');
          }
        });
      }, 500);
    }
  };

  // 随机事件(60%概率触发) - 用弹窗展示
  if (Math.random() < 0.6) {
    var evt = Game.RANDOM_EVENTS[Math.floor(Math.random() * Game.RANDOM_EVENTS.length)];
    Game.applyStat(evt.effect);
    setTimeout(function() {
      Game.showEventModal(evt, afterEvents);
    }, 400);
  } else {
    setTimeout(afterEvents, 400);
  }
  // 检查已接任务的完成状态
  Game.checkQuests();
  Game.updateUI();
  Game.updateQuestCount();
};
