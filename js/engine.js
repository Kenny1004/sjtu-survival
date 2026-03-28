window.Game = window.Game || {};

Game.state = {
  gpa: 3.0, health: 80, mental: 60, money: 50,
  momentum: { gpa: 0, health: 0, mental: 0 },
  semester: 1, scene: 'title', flags: {},
  totalSemesters: 8, playerClass: null,
  activeQuests: [], completedQuests: [], warnings: 0,
  revealedQuests: []
};

Game.clamp = function(v, min, max) { return Math.max(min, Math.min(max, v)); };

// 智能flag合并：数值型累加，布尔型覆盖
Game.mergeFlags = function(target, source) {
  for (var key in source) {
    var val = source[key];
    if (typeof val === 'number' && typeof target[key] === 'number') {
      target[key] += val;
    } else {
      target[key] = val;
    }
  }
};

// 动量系统参数
Game.MOMENTUM = {
  decay: 0.5,        // 每次选择后旧动量保留比例
  caps: { gpa: 0.5, health: 20, mental: 20 },  // 动量上下限
  semesterDecay: 0.3  // 学期切换后动量保留比例（假期重置习惯）
};

// GPA边际效应递减：高GPA时正向收益减少，低GPA时收益放大
Game.gpaFactor = function(change) {
  var gpa = Game.state.gpa;
  if (change > 0) {
    var f = 0.3 + 1.2 * (4.3 - gpa) / 4.3;
    return Game.clamp(f, 0.3, 1.5);
  }
  return 1.0;
};

// ====== 动量系统：玩家选择使用 ======
// 选择改变动量（趋势），动量决定实际属性变化
// 金钱仍为即时变化
// 返回实际属性变化量（用于toast显示）
Game.applyChoiceEffect = function(effect) {
  var actual = {};
  var m = Game.state.momentum;
  var decay = Game.MOMENTUM.decay;
  var caps = Game.MOMENTUM.caps;

  ['gpa', 'health', 'mental'].forEach(function(key) {
    var delta = effect[key] || 0;

    // GPA正向递减
    if (key === 'gpa' && delta > 0) {
      delta = +(delta * Game.gpaFactor(delta)).toFixed(2);
      if (delta <= 0) delta = 0.01;
    }

    // 动量更新：旧动量衰减 + 新输入
    m[key] = m[key] * decay + delta;
    m[key] = Game.clamp(m[key], -caps[key], caps[key]);

    // 动量应用到属性
    var change;
    if (key === 'gpa') {
      change = +(m[key]).toFixed(1);
      if (change !== 0) {
        Game.state.gpa = Game.clamp(+(Game.state.gpa + change).toFixed(1), 0, 4.3);
      }
    } else {
      change = Math.round(m[key]);
      if (change !== 0) {
        Game.state[key] = Game.clamp(Game.state[key] + change, 0, 100);
      }
    }
    actual[key] = change;
  });

  // 金钱即时变化
  if (effect.money !== undefined && effect.money !== 0) {
    Game.state.money = Game.clamp(Game.state.money + effect.money, 0, 100);
    actual.money = effect.money;
  }

  // 合并flags，但对隐式支线进度做门控：
  // 放弃任务后，对应的进度flag不再累积
  if (effect.flags) {
    var flags = effect.flags;
    if (Game.PROGRESS_QUEST_MAP) {
      var filtered = {};
      for (var key in flags) {
        var qid = Game.PROGRESS_QUEST_MAP[key];
        if (qid) {
          // 进度flag：仅在任务未浮现（还在积攒中）或已接取时累积
          var revealed = Game.state.revealedQuests.indexOf(qid) !== -1;
          var active = Game.state.activeQuests.indexOf(qid) !== -1;
          if (!revealed || active) {
            filtered[key] = flags[key];
          }
        } else {
          filtered[key] = flags[key];
        }
      }
      flags = filtered;
    }
    Game.mergeFlags(Game.state.flags, flags);
  }
  Game.updateUI();
  // 检查隐式任务是否该浮现
  if (Game.checkHiddenQuests) Game.checkHiddenQuests();
  return actual;
};

// 学期切换时衰减动量（假期/换环境 → 惯性重置）
Game.decayMomentum = function() {
  var m = Game.state.momentum;
  var sd = Game.MOMENTUM.semesterDecay;
  m.gpa = +(m.gpa * sd).toFixed(2);
  m.health = Math.round(m.health * sd);
  m.mental = Math.round(m.mental * sd);
};

// ====== 直接变化：随机事件、学期衰减、职业被动 ======
// 不经过动量，直接加减属性
Game.applyStat = function(changes) {
  if (changes.gpa !== undefined) {
    var raw = changes.gpa;
    var adjusted = +(raw * Game.gpaFactor(raw)).toFixed(1);
    if (raw > 0 && adjusted <= 0) adjusted = 0.1;
    if (raw < 0 && adjusted >= 0) adjusted = -0.1;
    Game.state.gpa = Game.clamp(+(Game.state.gpa + adjusted).toFixed(1), 0, 4.3);
  }
  if (changes.health !== undefined) Game.state.health = Game.clamp(Game.state.health + changes.health, 0, 100);
  if (changes.mental !== undefined) Game.state.mental = Game.clamp(Game.state.mental + changes.mental, 0, 100);
  if (changes.money !== undefined) Game.state.money = Game.clamp(Game.state.money + changes.money, 0, 100);
  if (changes.flags) Game.mergeFlags(Game.state.flags, changes.flags);
  Game.updateUI();
};

// 对 effect 的数值做 ±40% 随机浮动，返回新对象
Game.randomizeEffect = function(effect) {
  var result = {};
  var statKeys = ['gpa', 'health', 'mental', 'money'];
  for (var key in effect) {
    if (key === 'flags') {
      result.flags = effect.flags;
    } else if (statKeys.indexOf(key) !== -1 && typeof effect[key] === 'number' && effect[key] !== 0) {
      var base = effect[key];
      var factor = 0.6 + Math.random() * 0.8; // 0.6 ~ 1.4
      if (key === 'gpa') {
        result[key] = +(base * factor).toFixed(1);
        if (base > 0 && result[key] <= 0) result[key] = 0.1;
        if (base < 0 && result[key] >= 0) result[key] = -0.1;
      } else {
        result[key] = Math.round(base * factor);
        if (base > 0 && result[key] <= 0) result[key] = 1;
        if (base < 0 && result[key] >= 0) result[key] = -1;
      }
    } else {
      result[key] = effect[key];
    }
  }
  return result;
};

// 根据 base effect 生成范围文字（用于 hint 显示）
// 根据 base effect + 当前动量 计算实际预期范围（动量对玩家不可见）
Game.formatRange = function(effect) {
  var parts = [];
  var labels = { gpa: 'GPA', health: '体力', mental: '心理', money: '金钱' };
  var m = Game.state.momentum;
  var decay = Game.MOMENTUM.decay;
  var caps = Game.MOMENTUM.caps;

  ['gpa', 'health', 'mental', 'money'].forEach(function(key) {
    if (effect[key] !== undefined && effect[key] !== 0) {
      var base = effect[key];
      var lo, hi;

      if (key === 'money') {
        // 金钱直接加减，无动量
        lo = Math.round(base * 0.6); hi = Math.round(base * 1.4);
        if (base > 0) { lo = Math.max(1, lo); hi = Math.max(1, hi); }
        else { lo = Math.min(-1, lo); hi = Math.min(-1, hi); }
      } else {
        // 动量属性：计算 delta 范围 → 动量 → 实际变化
        var dLo = base * 0.6, dHi = base * 1.4;
        // GPA正向递减
        if (key === 'gpa' && base > 0) {
          var f = Game.gpaFactor(base);
          dLo *= f; dHi *= f;
        }
        // 动量公式：new_m = old_m * decay + delta
        var mLo = Game.clamp(m[key] * decay + dLo, -caps[key], caps[key]);
        var mHi = Game.clamp(m[key] * decay + dHi, -caps[key], caps[key]);
        if (key === 'gpa') {
          lo = +Math.min(mLo, mHi).toFixed(1);
          hi = +Math.max(mLo, mHi).toFixed(1);
        } else {
          lo = Math.round(Math.min(mLo, mHi));
          hi = Math.round(Math.max(mLo, mHi));
        }
      }

      // 格式化输出
      if (lo === 0 && hi === 0) return; // 动量抵消后无变化，不显示
      var a = Math.min(lo, hi), b = Math.max(lo, hi);
      var fmt = function(v) { return (v > 0 ? '+' : '') + v; };
      if (a === b) parts.push(labels[key] + ' ' + fmt(a));
      else parts.push(labels[key] + ' ' + fmt(a) + '~' + fmt(b));
    }
  });
  return parts.join(', ');
};

// 格式化debuff文本用于UI显示
Game.formatDebuff = function(debuff) {
  if (!debuff) return '';
  var parts = [];
  var labels = { gpa: 'GPA', health: '体力', mental: '心理', money: '金钱' };
  ['gpa', 'health', 'mental', 'money'].forEach(function(k) {
    if (debuff[k]) parts.push(labels[k] + debuff[k]);
  });
  return parts.join(' ');
};

// 动量方向箭头
Game.momentumArrow = function(key) {
  var v = Game.state.momentum[key];
  var t = key === 'gpa' ? 0.05 : 2;
  if (v > t) return '<span class="m-arrow m-up">▲</span>';
  if (v < -t) return '<span class="m-arrow m-down">▼</span>';
  return '<span class="m-arrow m-flat">─</span>';
};

Game.updateUI = function() {
  // 动量属性：数值 + 趋势箭头
  document.getElementById('gpaVal').innerHTML = Game.state.gpa.toFixed(1) + Game.momentumArrow('gpa');
  document.getElementById('healthVal').innerHTML = Game.state.health + Game.momentumArrow('health');
  document.getElementById('mentalVal').innerHTML = Game.state.mental + Game.momentumArrow('mental');
  // 金钱无动量
  document.getElementById('moneyVal').textContent = Game.state.money;

  document.getElementById('gpaBar').style.width = (Game.state.gpa / 4.3 * 100) + '%';
  document.getElementById('healthBar').style.width = Game.state.health + '%';
  document.getElementById('mentalBar').style.width = Game.state.mental + '%';
  document.getElementById('moneyBar').style.width = Game.state.money + '%';

  // 低属性警告
  ['gpa','health','mental','money'].forEach(function(k) {
    var el = document.getElementById(k + 'Val');
    var v = k === 'gpa' ? Game.state.gpa : Game.state[k];
    var threshold = k === 'gpa' ? 1.7 : 25;
    el.parentElement.classList.toggle('stat-warn', v <= threshold && v > 0);
  });

  var semNames = ['', '大一·秋', '大一·春', '大二·秋', '大二·春', '大三·秋', '大三·春', '大四·秋', '大四·春'];
  var classInfo = Game.CLASSES[Game.state.playerClass];
  var badge = classInfo ? '<span class="class-badge">' + classInfo.icon + ' ' + classInfo.name + '</span> ' : '';
  var warnTag = Game.state.warnings > 0 ? ' <span style="color:#f44;font-weight:900;">⚠️ 退学警告 ' + Game.state.warnings + '/2</span>' : '';
  document.getElementById('semesterInd').innerHTML = badge + '⏳ ' + (semNames[Game.state.semester] || '未知') + ' — 第 ' + Game.state.semester + '/' + Game.state.totalSemesters + ' 学期' + warnTag;
};

Game.showToast = function(text, type) {
  var t = document.createElement('div');
  t.className = 'result-toast ' + (type === 'positive' ? 'result-positive' : type === 'event' ? 'result-event' : 'result-negative');
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(function() { t.remove(); }, 2500);
};

// 随机事件弹窗（随机事件为直接变化，不走动量）
Game.showEventModal = function(evt, callback) {
  var ef = evt.effect;
  var parts = [];
  if (ef.gpa > 0) parts.push({ text: 'GPA +' + ef.gpa, pos: true });
  if (ef.gpa < 0) parts.push({ text: 'GPA ' + ef.gpa, pos: false });
  if (ef.health > 0) parts.push({ text: '体力 +' + ef.health, pos: true });
  if (ef.health < 0) parts.push({ text: '体力 ' + ef.health, pos: false });
  if (ef.mental > 0) parts.push({ text: '心理 +' + ef.mental, pos: true });
  if (ef.mental < 0) parts.push({ text: '心理 ' + ef.mental, pos: false });
  if (ef.money > 0) parts.push({ text: '金钱 +' + ef.money, pos: true });
  if (ef.money < 0) parts.push({ text: '金钱 ' + ef.money, pos: false });

  var effectsHtml = parts.map(function(p) {
    return '<span class="' + (p.pos ? 'event-eff-pos' : 'event-eff-neg') + '">' + p.text + '</span>';
  }).join('');

  var overlay = document.createElement('div');
  overlay.className = 'event-modal-overlay';
  overlay.innerHTML =
    '<div class="event-modal">' +
      '<div class="event-modal-title">⚡ 随机事件</div>' +
      '<div class="event-modal-icon">' + evt.text.slice(0, 2) + '</div>' +
      '<div class="event-modal-text">' + evt.text.slice(2).trim() + '</div>' +
      '<div class="event-modal-effects">' + effectsHtml + '</div>' +
      '<button class="event-modal-btn">确认</button>' +
    '</div>';
  document.body.appendChild(overlay);

  overlay.querySelector('.event-modal-btn').onclick = function() {
    overlay.style.animation = 'none';
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.opacity = '0';
    setTimeout(function() { overlay.remove(); if (callback) callback(); }, 300);
  };
};

// 学业警告弹窗
Game.showAcademicWarning = function(warningCount, callback) {
  var isExpelled = warningCount >= 2;
  var overlay = document.createElement('div');
  overlay.className = 'event-modal-overlay';
  overlay.innerHTML =
    '<div class="event-modal">' +
      '<div class="event-modal-title">⚠️ 学业警告</div>' +
      '<div class="event-modal-icon">📉</div>' +
      '<div class="event-modal-text">' +
        (isExpelled
          ? '你的GPA连续两学期低于1.7。\n\n根据《上海交通大学学分制课程学习管理条例》，\n你已被取消学籍。\n\n四年的旅程，在这里画上了句号……'
          : '你的学期GPA低于1.7！\n\n教务处发来了学业警告通知。\n如果下一次期末GPA仍低于1.7，你将被退学。\n\n这是第 ' + warningCount + ' 次警告。') +
      '</div>' +
      '<div class="event-modal-effects">' +
        '<span class="event-eff-neg">⚠️ 退学警告 ' + warningCount + '/2</span>' +
      '</div>' +
      '<button class="event-modal-btn">' + (isExpelled ? '接受现实' : '知道了') + '</button>' +
    '</div>';
  document.body.appendChild(overlay);
  overlay.querySelector('.event-modal-btn').onclick = function() {
    overlay.style.transition = 'opacity 0.3s';
    overlay.style.opacity = '0';
    setTimeout(function() { overlay.remove(); if (callback) callback(); }, 300);
  };
};

Game.showStatus = function(v) {
  document.getElementById('statusBar').classList.toggle('hidden', !v);
  document.getElementById('semesterInd').classList.toggle('hidden', !v);
  document.getElementById('questToggle').classList.toggle('hidden', !v);
  if (v) Game.updateQuestCount();
};
