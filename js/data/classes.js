window.Game = window.Game || {};

Game.CLASSES = {
  xueba: {
    icon: '🤓', name: '学霸', difficulty: 'normal', diffClass: 'diff-normal',
    desc: '从小到大的尖子生，学习是刻在DNA里的。但心理压力？那是家常便饭。',
    gpa: 3.5, health: 55, mental: 40, money: 40,
    passive: '被动：考试前自动 GPA+0.1，但每学期心理-5',
    passiveFn(s) { var gain = +(0.1 * Game.gpaFactor(0.1)).toFixed(1) || 0.1; s.gpa = Math.min(4.3, +(s.gpa + gain).toFixed(1)); s.mental = Math.max(0, s.mental - 5); },
  },
  sheniu: {
    icon: '🎤', name: '社牛', difficulty: 'normal', diffClass: 'diff-normal',
    desc: '天生的社交达人，走到哪儿都是焦点。心态好，但一坐下来学习？要命。',
    gpa: 2.5, health: 65, mental: 75, money: 35,
    passive: '被动：每学期心理+5，但GPA自动-0.1（太多局了）',
    passiveFn(s) { s.mental = Math.min(100, s.mental + 5); s.gpa = Math.max(0, +(s.gpa - 0.1).toFixed(1)); },
  },
  tiyu: {
    icon: '🏃', name: '体育特长生', difficulty: 'hard', diffClass: 'diff-hard',
    desc: '靠体育特招进交大。体能无敌，但高数是什么？能吃吗？',
    gpa: 2.0, health: 95, mental: 55, money: 40,
    passive: '被动：每学期体力+10，但GPA-0.1（基础太差）',
    passiveFn(s) { s.health = Math.min(100, s.health + 10); s.gpa = Math.max(0, +(s.gpa - 0.1).toFixed(1)); },
  },
  fuerdai: {
    icon: '💎', name: '富二代', difficulty: 'easy', diffClass: 'diff-easy',
    desc: '家里有矿，从小见过大世面。不缺钱、心态好，但容易摆烂。',
    gpa: 2.6, health: 70, mental: 65, money: 80,
    passive: '被动：每学期金钱+10，但有30%概率摆烂GPA-0.2',
    passiveFn(s) { s.money = Math.min(100, s.money + 10); if (Math.random() < 0.3) s.gpa = Math.max(0, +(s.gpa - 0.2).toFixed(1)); },
  },
  juanwang: {
    icon: '📚', name: '卷王', difficulty: 'hard', diffClass: 'diff-hard',
    desc: '不卷会死星人。GPA就是生命，但身体和心理都在透支。',
    gpa: 3.8, health: 35, mental: 30, money: 45,
    passive: '被动：每学期GPA+0.1，但体力-8、心理-8',
    passiveFn(s) { var gain = +(0.1 * Game.gpaFactor(0.1)).toFixed(1) || 0.1; s.gpa = Math.min(4.3, +(s.gpa + gain).toFixed(1)); s.health = Math.max(0, s.health - 8); s.mental = Math.max(0, s.mental - 8); },
  },
  putong: {
    icon: '😐', name: '小镇做题家', difficulty: 'hell', diffClass: 'diff-hell',
    desc: '从十八线小城考进交大，什么都要从头开始。没有背景，只有背影。',
    gpa: 2.8, health: 50, mental: 35, money: 25,
    passive: '被动：逆境成长——低属性每学期自动恢复（GPA<1.7时+0.1，其他<30时+3）',
    passiveFn(s) {
      if (s.gpa > 0 && s.gpa < 1.7) s.gpa = Math.min(4.3, +(s.gpa + 0.1).toFixed(1));
      if (s.health > 0 && s.health < 30) s.health = Math.min(100, s.health + 3);
      if (s.mental > 0 && s.mental < 30) s.mental = Math.min(100, s.mental + 3);
      if (s.money > 0 && s.money < 30) s.money = Math.min(100, s.money + 3);
    },
  },
};
