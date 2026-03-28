window.Game = window.Game || {};

Game.scenes = {
  title: {
    icon: '🏫', title: '上海交通大学 · 生存挑战',
    text: '你收到了上海交通大学的录取通知书。\n从踏入校门的那一刻起，你的四年大学生涯正式开始。\n你能顺利毕业吗？\n\n🎯 保持 GPA（满绩4.3）、体力、心理、金钱四项属性存活8个学期\n📈 你的选择改变 GPA/体力/心理 的趋势（动量），持续的好习惯会积累惯性\n💰 金钱为即时变化——花了就没了\n📉 学期末GPA低于1.7触发退学警告，累计两次直接退学！\n💀 每学期自动衰减：体力-6 心理-5 金钱-8\n⚡ 随机事件可能随时发生\n📋 接取毕业目标达成条件解锁专属结局',
    isTitle: true,
  },

  classSelect: {
    icon: '🎭', title: '选择你的身份',
    text: '每个人来到交大的起点不同。\n你是谁？',
    isClassSelect: true,
  },

  // ========== 大一·秋 ==========
  s1_intro: {
    icon: '🍂', title: '开学报到',
    text: '九月的上海依然炎热。你拖着行李箱来到闵行校区，看着广阔的校园，心中充满期待与不安。\n\n室友来自五湖四海，宿舍楼下的食堂排着长队。军训即将开始……',
    choices: [
      { text: '💪 认真参加军训，锻炼意志', hint: '体力+5, 心理+6', next: 's1_military_hard', effect: { health: 5, mental: 6 } },
      { text: '🤒 想办法开病假条划水', hint: '体力+5, 心理-8', next: 's1_military_skip', effect: { health: 5, mental: -8 } },
      { text: '📱 军训间隙疯狂社交', hint: '心理+7, 体力-10', next: 's1_military_social', effect: { mental: 7, health: -10 } },
    ],
  },
  s1_military_hard: {
    icon: '🎖️', title: '军训标兵',
    text: '两周军训下来，你获得了"军训标兵"称号。\n但烈日暴晒让你黑了三个色号，脚上磨了好几个水泡。\n\n隔壁连队有个人老是偷偷看你……',
    choices: [
      { text: '😳 好像……还挺好看的？', hint: '心理+5', next: 's1_course', effect: { mental: 5, flags: { militaryCrush: true, _romanceCount: 1 } } },
      { text: '继续 →', next: 's1_course', effect: {} },
    ],
  },
  s1_military_skip: {
    icon: '😅', title: '划水成功',
    text: '你逃过了大部分军训。但看着同学们热火朝天，你心里空落落的。\n\n更糟糕的是——辅导员记住了你的名字，不是好的那种。',
    choices: [{ text: '继续 →', next: 's1_course', effect: {} }],
  },
  s1_military_social: {
    icon: '📱', title: '社交达人',
    text: '军训结束你加了200多个微信好友。\n但军训时偷玩手机被教官抓到罚站了两小时，体力消耗不小。',
    choices: [{ text: '继续 →', next: 's1_course', effect: {} }],
  },

  s1_course: {
    icon: '📖', title: '第一次选课',
    text: '选课系统准时崩溃。蹲守一小时终于进入系统。\n\n你的选择将决定这学期的命运——',
    choices: [
      { text: '📚 全选硬核课：高数、大物、C语言', hint: '心理-12（压力山大）', next: 's1_midterm_hard', effect: { mental: -12 } },
      { text: '⚖️ 难易搭配，合理安排', hint: '心理-5', next: 's1_midterm_balanced', effect: { mental: -5 } },
      { text: '🎨 多选通识水课', hint: '心理+5, 但GPA上限低', next: 's1_midterm_easy', effect: { mental: 5 } },
    ],
  },

  s1_midterm_hard: {
    icon: '😰', title: '期中考试周',
    text: '三门硬课同时期中考试。连续一周泡图书馆，每天只睡5小时。\n咖啡已经不够用了，手在发抖……',
    choices: [
      { text: '🌙 通宵复习！拼了！', hint: '体力-20, GPA+0.3, 心理-12', next: 's1_end', effect: { health: -20, gpa: 0.3, mental: -12 } },
      { text: '😴 适可而止，保证睡眠', hint: '体力-5, GPA+0.1', next: 's1_end', effect: { health: -5, gpa: 0.1 } },
      { text: '🆘 组队互助复习', hint: '心理+5, GPA+0.1, 体力-10', next: 's1_end', effect: { mental: 5, gpa: 0.1, health: -10 } },
    ],
  },
  s1_midterm_balanced: {
    icon: '📝', title: '期中考试周',
    text: '均衡的课表让你有喘息空间。期中考来了，你觉得准备得还行。',
    choices: [
      { text: '📚 图书馆冲刺一周', hint: 'GPA+0.2, 体力-10', next: 's1_end', effect: { gpa: 0.2, health: -10 } },
      { text: '🔫 室友说来两把CS放松一下', hint: '心理+8, GPA-0.05', next: 's1_cs_discover', effect: { mental: 8, gpa: -0.05 } },
      { text: '👥 找学长要往年试卷', hint: '心理+3, GPA+0.1', next: 's1_end', effect: { mental: 3, gpa: 0.1 } },
    ],
  },
  s1_cs_discover: {
    icon: '🔫', title: '初识CS',
    text: '室友拉你打了一把CS。你选了AK47，第一局就在Dust2被闪光弹晃瞎后惨死。\n\n"别急，多玩几把就好了。"\n\n于是"几把"变成了通宵。当你关掉游戏时，窗外已经天亮了。\n\n但不得不承认——Rush B的快乐是真实的。',
    choices: [
      { text: '🎯 这游戏有意思，以后继续玩', hint: '获得flag: CS玩家', next: 's1_end', effect: { flags: { csPlayer: true, _csCount: 1 } } },
      { text: '😱 不行不行，太上瘾了，卸载！', hint: '心理-3（但是真的卸了吗？）', next: 's1_end', effect: { mental: -3 } },
    ],
  },
  s1_midterm_easy: {
    icon: '😊', title: '期中考试周',
    text: '通识课考试轻松，你有大把时间。\n但身边同学都在拼命学习，你开始焦虑了……',
    choices: [
      { text: '😤 我也要卷！去图书馆', hint: '心理-12, GPA+0.1, 体力-5', next: 's1_end', effect: { mental: -12, gpa: 0.1, health: -5 } },
      { text: '🏃 趁空闲锻炼身体', hint: '体力+8, 心理+3', next: 's1_end', effect: { health: 8, mental: 3, flags: { _sportCount: 1 } } },
      { text: '🎭 参加话剧社演出', hint: '心理+8, GPA-0.05, 金钱-3', next: 's1_end', effect: { mental: 8, gpa: -0.05, money: -3 } },
    ],
  },

  s1_end: {
    icon: '❄️', title: '第一学期结束',
    text: function() {
      var t = '期末考试结束了。在思源门前看着冬日夕阳，感慨万千。\n第一个学期比想象中过得快太多了。';
      if (Game.state.flags.csPlayer) t += '\n\n（室友群里已经在约寒假CS排位了……）';
      return t;
    },
    choices: [{ text: '进入寒假 →', next: 'v1_winter', effect: {} }],
  },

  // ========== 大一·春 ==========
  s2_intro: {
    icon: '🌸', title: '大一·春季学期',
    text: function() {
      var t = '春天的交大樱花盛开，南洋通道变成粉色隧道。\n你适应了大学节奏，但挑战也在升级……';
      if (Game.state.flags.csPlayer) t += '\n\n你听说学校电竞社正在招募CS战队成员，校赛就在下个月。';
      return t;
    },
    choices: [
      { text: '🏆 报名数学建模竞赛', hint: 'GPA+0.1, 心理-12, 体力-8', next: 's2_event', effect: { gpa: 0.1, mental: -12, health: -8 } },
      { text: '🎵 加入学生乐队', hint: '心理+12, GPA-0.05, 金钱-3', next: 's2_event', effect: { mental: 12, gpa: -0.05, money: -3, flags: { _musicCount: 1, joinedBand: true } } },
      { text: '🔫 报名校CS电竞赛', hint: '心理+12, 体力-12, GPA-0.1, 金钱-3', next: 's2_cs_tournament', effect: { mental: 12, health: -12, gpa: -0.1, money: -3, flags: { csPlayer: true, csTournament: true, _csCount: 1 } } },
      { text: '❤️ 有人向你表白了……', hint: '???', next: 's2_romance', effect: {} },
    ],
  },
  s2_cs_tournament: {
    icon: '🎮', title: '校园CS联赛',
    text: function() {
      var t = '你和队友报名了交大校园CS联赛。\n\n小组赛你们一路碾压，你的AWP狙击让对手闻风丧胆。\n半决赛在Inferno上打满30回合，加时赛你一个1v3残局翻盘，全场沸腾！\n\n';
      if (Math.random() < 0.5) {
        t += '决赛遗憾输给了电院的队伍，获得亚军。\n对面的指挥太强了，你们的战术被完全读透。\n\n但这段经历让你在校园里小有名气。';
        return t;
      }
      t += '决赛Dust2，对面ECO局你们却被对手一把Deagle打崩了……\n但最后一张图Mirage，你用AK47交出了30杀的表演，成功捧杯！\n\n"交大CS冠军"——你没想过这会成为你的标签。';
      return t;
    },
    choices: [
      { text: '🏆 太爽了，继续打更高级别比赛', hint: '心理+6, GPA-0.1, 体力-5, 金钱-3', next: 's2_event', effect: { mental: 6, gpa: -0.1, health: -5, money: -3, flags: { csCompetitive: true } } },
      { text: '📚 见好就收，回归学业', hint: 'GPA+0.1, 心理-5', next: 's2_event', effect: { gpa: 0.1, mental: -5 } },
    ],
  },
  s2_romance: {
    icon: '💕', title: '校园恋情',
    text: function() {
      if (Game.state.flags.militaryCrush) return '军训时那个偷偷看你的人，居然和你选了同一门通识课！\n\n课后TA鼓起勇气要了你的微信。\n聊了一个月后，在樱花树下，TA红着脸说："我喜欢你。"';
      return '图书馆偶遇了好几次的那个人，终于向你表白了。\nTA 的眼神真挚而紧张。\n\n你的心跳加速了……';
    },
    choices: [
      { text: '💑 答应！在一起！', hint: '心理+14, 体力-8, GPA-0.05, 金钱-5', next: 's2_romance_start', effect: { mental: 14, health: -8, gpa: -0.05, money: -5, flags: { inRelationship: true, seriousRelation: true, _romanceCount: 1 } } },
      { text: '😏 暧昧一下就好，不想被束缚', hint: '心理+8, 金钱-5', next: 's2_fwb', effect: { mental: 8, money: -5, flags: { situationship: true, _romanceCount: 1 } } },
      { text: '🙏 拒绝，现在想专注学业', hint: '心理-10, GPA+0.1', next: 's2_event', effect: { mental: -10, gpa: 0.1 } },
    ],
  },
  s2_romance_start: {
    icon: '🌸', title: '恋爱的季节',
    text: '你们在一起了。\n\n一起去食堂吃饭，一起在图书馆自习，一起在南洋通道散步看樱花。\n周末去徐家汇看电影，晚上在宿舍楼下依依不舍地道别。\n\nTA给你带了早餐，你帮TA占了图书馆的座。\n\n世界突然变得很温柔。\n但你也发现——学习的时间确实变少了。',
    choices: [{ text: '继续 →', next: 's2_event', effect: {} }],
  },
  s2_fwb: {
    icon: '🌙', title: '暧昧不清',
    text: '你们保持着一种微妙的关系。\n\n偶尔一起吃饭，偶尔深夜聊天到凌晨，偶尔约出来喝酒后在外面开房。\n\n你们都没有捅破那层窗户纸。\nTA问你："我们算什么？"\n你说："顺其自然吧。"\n\n方便的时候是甜蜜，不方便的时候是自由。\n但有时候深夜醒来，枕边没有人，你会有一瞬间的空虚。',
    choices: [
      { text: '🤷 维持现状挺好的', hint: '心理+3', next: 's2_event', effect: { mental: 3, flags: { situationship: true } } },
      { text: '💕 认真谈吧，给TA一个交代', hint: '心理+9, GPA-0.05, 金钱-5', next: 's2_event', effect: { mental: 9, gpa: -0.05, money: -5, flags: { inRelationship: true, seriousRelation: true, situationship: false, _romanceCount: 1 } } },
    ],
  },

  s2_event: {
    icon: '🌊', title: '学期过半',
    text: '五月了，天气炎热。体测逼近。\n\n某天深夜，室友突然情绪崩溃了……',
    choices: [
      { text: '🤗 陪室友彻夜长谈', hint: '心理+3, 体力-15', next: 's2_final', effect: { mental: 3, health: -15, flags: { helpedRoommate: true } } },
      { text: '📞 建议TA去心理咨询', hint: '心理+4', next: 's2_final', effect: { mental: 4 } },
      { text: '😬 假装没看见', hint: '心理-12', next: 's2_final', effect: { mental: -12 } },
    ],
  },
  s2_final: {
    icon: '🔥', title: '期末季',
    text: '大一最后的期末考。下学期专业课难度要上台阶了……\n听说有人已经挂科退学了。',
    choices: [
      { text: '📚 全力备考', hint: 'GPA+0.2, 体力-15, 心理-10', next: 'v2_summer', effect: { gpa: 0.2, health: -15, mental: -10 } },
      { text: '⚖️ 重点突破', hint: 'GPA+0.1, 心理-3', next: 'v2_summer', effect: { gpa: 0.1, mental: -3 } },
      { text: '🏖️ 随缘吧，不卷了', hint: 'GPA-0.2, 心理+10, 体力+12', next: 'v2_summer', effect: { gpa: -0.2, mental: 10, health: 12 } },
    ],
  },

  // ========== 大二·秋 ==========
  s3_intro: {
    icon: '⚡', title: '大二·秋季学期',
    text: '专业课轰炸开始了。数据结构、电路原理、概率统计……\n课程难度直线飙升，身边开始有人挂科。\n\n焦虑弥漫在空气中。',
    next: 's3_mid',
    groups: [
      { label: '🎯 学期主线', exclusive: true, picks: [
        { text: '🔬 加入教授实验室', effect: { gpa: 0.1, mental: -8, health: -10, flags: { inLab: true, _researchCount: 1 } } },
        { text: '💻 ACM/ICPC训练', effect: { gpa: 0.1, mental: -12, health: -10, flags: { acm: true } } },
        { text: '🎯 专注课内学习', effect: { gpa: 0.2, mental: -3 } },
        { text: '😴 这学期缓一缓', effect: { health: 12, mental: 8, gpa: -0.1 } },
      ]},
      { label: '📅 课余时间', exclusive: false, picks: [
        { text: '🏅 竞选学生会', effect: { mental: 5, health: -5, money: -2, flags: { studentGov: true } } },
        { text: '🏃 坚持锻炼', effect: { health: 8, mental: 3, flags: { _sportCount: 1 } } },
        { text: '🔫 打CS放松', effect: { mental: 5, gpa: -0.05, flags: { csPlayer: true, _csCount: 1 } } },
        { text: '📖 广泛阅读', effect: { mental: 3, gpa: 0.1 } },
        { text: '⚽ 加入院足球队', effect: { health: 8, mental: 5, flags: { _sportCount: 1, footballTeam: true } }, condition: function(s) { return (s.flags._sportCount || 0) >= 2; } },
        { text: '🎵 乐队排练', effect: { mental: 8, gpa: -0.05, flags: { _musicCount: 1, bandPractice: true } }, condition: function(s) { return (s.flags._musicCount || 0) >= 1; } },
      ]},
    ],
  },

  s3_mid: {
    icon: '🌧️', title: '深夜的图书馆',
    text: function() {
      var t = '图书馆即将关门。路过东川路地铁站，烧烤摊的烟火气让你驻足。\n\n手机震动——好朋友说 TA 准备退学了。\n同时，你发现自己有一门课已经在挂科边缘……';
      if (Game.state.flags.csPlayer) t += '\n\nCS队友发来消息："今晚上分吗？打完这把就睡。"';
      return t;
    },
    choices: [
      { text: '🏃 去找朋友聊聊', hint: '心理-2, 体力-8', next: 's3_end', effect: { mental: -2, health: -8 } },
      { text: '📱 微信了解情况', hint: '心理-1', next: 's3_end', effect: { mental: -1 } },
      { text: '📚 先管好自己的成绩', hint: 'GPA+0.1, 心理-10', next: 's3_end', effect: { gpa: 0.1, mental: -10 } },
      { text: '🔫 不想了，开一把CS逃避现实', hint: '心理+5, GPA-0.1', next: 's3_cs_escape', effect: { mental: 5, gpa: -0.1, flags: { _csCount: 1 } } },
    ],
  },
  s3_cs_escape: {
    icon: '💀', title: 'Rush B, Don\'t Stop',
    text: '"打完这把就睡"——经典谎言。\n\n赢了要再来一把乘胜追击，输了要再来一把扳回来。\n你在Dust2的A大道上反复横跳，在Inferno的香蕉道上进退两难。\n\n就像你的人生。\n\n打到凌晨四点，你的段位上了，但明天的课肯定起不来了。\n手机里朋友的消息还没回……',
    choices: [
      { text: '😴 关机睡觉，明天再说', next: 's3_end', effect: {} },
      { text: '📱 回复朋友消息后再睡', hint: '心理+3, 体力-5', next: 's3_end', effect: { mental: 3, health: -5 } },
    ],
  },
  s3_end: {
    icon: '🍁', title: '秋去冬来',
    text: function() {
      var t = '大二上学期结束。你发现自己能看懂学术论文了，但代价是什么？\n\n身边有人拿到了大厂实习，有人发了顶会论文，也有人退学回家了。';
      if (Game.state.flags.situationship) t += '\n\n那个暧昧对象最近发了条朋友圈，和别人搂在一起。你假装没看见。';
      return t;
    },
    choices: [{ text: '进入寒假 →', next: 'v3_winter', effect: {} }],
  },
  s3_dating_app: {
    icon: '📱', title: '左滑右滑',
    text: '你下载了交友软件。\n\n简介写的是"SJTU / 大二 / 随缘"。\n照片选了那张在思源湖边拍的，看起来很文艺。\n\n一周内你收到了几十个like。\n你开始和几个人聊天，有华师大的，有复旦的，还有同校不同院的。\n\n滑到凌晨两点已经成了习惯。\n每一次match都带来一点多巴胺，但关掉手机后又是空虚。',
    choices: [
      { text: '🍷 约一个看起来不错的出来见面', hint: '心理+8, 体力-8, 金钱-5', next: 's3_date_meetup', effect: { mental: 8, health: -8, money: -5 } },
      { text: '😐 聊了几天就没劲了，卸载', hint: '心理-5', next: 's4_intro', effect: { mental: -5 }, semester: 4 },
    ],
  },
  s3_date_meetup: {
    icon: '🍻', title: '第一次线下见面',
    text: '你们约在了淮海路的一家酒吧。\n\n对方比照片好看一点。聊得也还行。\n几杯酒下肚，氛围越来越暧昧。\n\n"要不……去我那边坐坐？"\n\n你的心跳快了几拍。',
    choices: [
      { text: '😏 走，去看看', hint: '心理+9, 体力-12, 金钱-5', next: 's3_hookup', effect: { mental: 9, health: -12, money: -5, flags: { hookup: true, _romanceCount: 1 } } },
      { text: '🙂 今天太晚了，下次吧', hint: '心理+3', next: 's4_intro', effect: { mental: 3 }, semester: 4 },
      { text: '❤️ 我觉得你人挺好的，但我想认真了解你', hint: '心理+8, 金钱-5', next: 's3_date_serious', effect: { mental: 8, money: -5, flags: { _romanceCount: 1 } } },
    ],
  },
  s3_hookup: {
    icon: '🌃', title: '那一夜',
    text: '出租车穿过灯火通明的上海夜晚。\n\n那一夜发生了你预料中的事情。\n\n第二天早上醒来，阳光从窗帘缝隙里漏进来。\n你看着身边还在熟睡的人，有一种奇怪的感觉——\n\n不是后悔，但也说不上满足。\n\n你轻手轻脚地穿好衣服。手机上有三条未读消息，两个DDL提醒。\n\n回到宿舍，室友问你昨晚去哪了。\n你笑了笑，没说话。',
    choices: [
      { text: '📱 之后还有联系，偶尔约', hint: '心理+5, 体力-5, 金钱-5', next: 's4_intro', effect: { mental: 5, health: -5, money: -5, flags: { casualDating: true } }, semester: 4 },
      { text: '🚪 之后没再联系了', hint: '心理-5', next: 's4_intro', effect: { mental: -5 }, semester: 4 },
    ],
  },
  s3_date_serious: {
    icon: '💕', title: '认真的开始',
    text: '你决定认真了解这个人。\n\n你们开始频繁约会。从网红餐厅到弄堂小馆，从外滩夜景到朱家角古镇。\nTA不是交大的，但你们聊得来。\n\n半个月后，你们确认了关系。\n室友说："网恋奔现还成了，牛啊。"',
    choices: [{ text: '继续 →', next: 's4_intro', effect: { flags: { inRelationship: true, appRelation: true } }, semester: 4 }],
  },

  // ========== 大二·春 ==========
  s4_intro: {
    icon: '🌺', title: '大二·春季学期',
    text: '同学之间的差距开始拉大。\n有人发了论文，有人还在挣扎求过。\n有人已经想好了未来，有人还在迷茫。\n\n你呢？',
    choices: [
      { text: '💡 尝试创业', hint: '心理+7, GPA-0.3, 体力-10, 金钱-8', next: 's4_mid', effect: { mental: 7, gpa: -0.3, health: -10, money: -8, flags: { startup: true } } },
      { text: '📊 目标保研，全力冲GPA', hint: 'GPA+0.3, 体力-15, 心理-15', next: 's4_mid', effect: { gpa: 0.3, health: -15, mental: -15, flags: { aimPostgrad: true } } },
      { text: '🌍 准备出国，考托福GRE', hint: 'GPA+0.1, 体力-12, 心理-10, 金钱-10', next: 's4_mid', effect: { gpa: 0.1, health: -12, mental: -10, money: -10, flags: { aimAbroad: true } } },
      { text: '🔫 全职打CS，梦想成为职业选手', hint: '心理+15, GPA-0.5, 体力-8', next: 's4_cs_pro', effect: { mental: 15, gpa: -0.5, health: -8, flags: { csPlayer: true, csPro: true, _csCount: 1 } } },
    ],
  },
  s4_cs_pro: {
    icon: '🎮', title: '电竞梦',
    text: '你开始每天训练8小时以上。Aim训练、战术研究、录像回放……\n\n你的水平确实在飞速提升。FaceIt天梯上你已经打到了Level 9。\n有人在论坛上说你的甩狙有simple的影子。\n\n但现实是——\n上课基本不去了，辅导员连续给你打了三个电话。\n你的GPA正在自由落体。\n\n你在CS里是God，在学业上是Bot。',
    choices: [
      { text: '🔫 继续追梦，报名CUPC大学生联赛', hint: '心理+10, GPA-0.1, 体力-10, 金钱-3', next: 's4_cs_cupc', effect: { mental: 10, gpa: -0.1, health: -10, money: -3 } },
      { text: '📚 悬崖勒马，回归学业', hint: 'GPA+0.2, 心理-15（戒断反应）', next: 's4_mid', effect: { gpa: 0.2, mental: -15 } },
      { text: '⚖️ 试着两边都兼顾', hint: '体力-15, 心理-8', next: 's4_mid', effect: { health: -15, mental: -8 } },
    ],
  },
  s4_cs_cupc: {
    icon: '🏟️', title: 'CUPC大学生CS联赛',
    text: function() {
      var t = '你带队参加了全国大学生CS联赛。\n\n小组赛势如破竹，你的名字开始出现在电竞论坛上。\n"交大有个狙神，不知道是谁。"\n\n';
      if (Game.state.gpa < 2.0) {
        t += '但就在八强赛前一天，辅导员找到了你。\n"你的GPA已经不到2.0了。再这样下去，下学期可能会被学业警告。"\n\n你站在训练室门口，手里握着鼠标，心里握着未来。';
      } else {
        t += '八强赛你们在Nuke上演了一出惊天逆转，从3-12追到16-14！\n你最后一个回合的1v2残局让所有人站了起来。\n\n最终你们获得了全国第四名。有战队经理开始关注你了……';
      }
      return t;
    },
    choices: [
      { text: '🎮 和战队经理聊聊，万一能打职业呢', hint: '心理+12, GPA-0.1', next: 's4_mid', effect: { mental: 12, gpa: -0.1, flags: { csContact: true } } },
      { text: '📚 回来了，学业不能再拖了', hint: 'GPA+0.1, 心理-10', next: 's4_mid', effect: { gpa: 0.1, mental: -10 } },
    ],
  },
  s4_mid: {
    icon: '⏰', title: '凌晨两点的宿舍',
    text: function() {
      var t = '你躺在床上翻来覆去睡不着。\n\n';
      if (Game.state.flags.inRelationship) t += '恋人最近越来越冷淡，你们已经一周没说话了。\n你翻了翻TA的朋友圈，发现有个你不认识的人在每条下面点赞评论……\n';
      if (Game.state.flags.casualDating) t += '手机里有三个人在等你回消息。你一个都不想回。\n';
      if (Game.state.gpa < 2.5) t += '辅导员找你谈话了，说你的成绩已经亮红灯。\n';
      if (Game.state.health < 40) t += '身体频繁发出警告，上楼梯都会喘。\n';
      t += '\n手机屏幕亮了——室友在群里发了一条深夜emo。\n你也想发，但打了一行字又删掉了。';
      return t;
    },
    choices: function() {
      var c = [
        { text: '💪 明天开始改变', hint: '心理+5, 但什么都没变', next: 's4_end', effect: { mental: 5 } },
        { text: '📞 给家人打电话', hint: '心理+8', next: 's4_end', effect: { mental: 8 } },
        { text: '🏥 预约心理咨询', hint: '心理+15', next: 's4_end', effect: { mental: 15 } },
        { text: '🔫 打CS到天亮，只有开枪的时候脑子才能放空', hint: '心理+8, 体力-5, GPA-0.05', next: 's4_cs_night', effect: { mental: 8, health: -5, gpa: -0.05, flags: { csPlayer: true, _csCount: 1 } } },
      ];
      if (!Game.state.flags.inRelationship && !Game.state.flags.casualDating && Game.state.flags.datingApp) {
        c.push({ text: '📱 夜深人静，打开了探探', hint: '心理+5, 体力-5, 金钱-3', next: 's4_late_swipe', effect: { mental: 5, health: -5, money: -3 } });
      }
      if (Game.state.flags.casualDating) {
        c.push({ text: '📱 约了个人出来"散散心"', hint: '心理+7, 体力-10, 金钱-5', next: 's4_booty_call', effect: { mental: 7, health: -10, money: -5 } });
      }
      return c;
    },
  },
  s4_late_swipe: {
    icon: '📱', title: '深夜滑屏',
    text: '凌晨两点打开交友软件的人，都是什么心态呢？\n\n你知道答案——和你一样，睡不着，想找个人说说话。\n\n你match了一个人。头像是背影照，简介写着"失眠选手"。\n你发了句："你也睡不着？"\n\n聊了两个小时。从学业聊到人生，从星座聊到家庭。\n\nTA说："感觉和你聊天很舒服。"\n你说："我也是。"\n\n然后你们加了微信。\n第二天醒来，你看着聊天记录，想起了那句话——\n\n深夜的心动，白天还算不算数？',
    choices: [
      { text: '☀️ 约出来见个面吧', hint: '心理+8, 金钱-5', next: 's4_end', effect: { mental: 8, money: -5, flags: { datingApp: true } } },
      { text: '🙃 算了，深夜的冲动而已', hint: '心理-3', next: 's4_end', effect: { mental: -3 } },
    ],
  },
  s4_booty_call: {
    icon: '🌃', title: '深夜的出租车',
    text: '你给那个"偶尔约"的人发了条消息。\n对方秒回："来。"\n\n出租车在半夜的上海飞驰。\n你看着窗外的霓虹灯，想着自己到底在干什么。\n\n三个小时后，你坐上回学校的出租车。\n身体上的空虚被填满了，心里的空虚还在。\n\n你发了条朋友圈"今晚的月亮好圆"，仅自己可见。',
    choices: [
      { text: '😔 这样下去不行', hint: '心理-5', next: 's4_end', effect: { mental: -5, flags: { regretCasual: true } } },
      { text: '🤷 至少今晚不孤单', hint: '心理+3', next: 's4_end', effect: { mental: 3 } },
    ],
  },
  s4_cs_night: {
    icon: '🌃', title: '深夜的Dust2',
    text: '凌晨三点，整个宿舍楼都安静了，只有你的键盘鼠标还在响。\n\n你在Dust2上反复练习中门狙击。\n一枪，又一枪。每次击杀都带来短暂的多巴胺。\n\n"The bomb has been planted."\n\n这一刻你什么都不用想。不用想GPA，不用想未来，不用想那些无法回复的消息。\n\n只需要——瞄准，射击。\n\n直到窗外的天开始变亮。\n你关掉游戏，看了一眼战绩：42杀15死。\n\n如果人生也能像CS一样，死了还能下一局重来就好了。',
    choices: [
      { text: '😔 叹了口气，爬上床', next: 's4_end', effect: {} },
    ],
  },
  s4_end: {
    icon: '☀️', title: '大二结束',
    text: '大学过了一半。\n回想这两年，有收获有遗憾有成长有迷茫。\n\n窗外蝉声阵阵，暑假来了。',
    choices: [{ text: '进入暑假 →', next: 'v4_summer', effect: {} }],
  },

  // ========== 大三·秋 ==========
  s5_intro: {
    icon: '🔥', title: '大三·秋季学期',
    text: '大三了——公认最艰难的一年。\n专业核心课密集轰炸。保研的在卷绩点，出国的在考GT，就业的在找实习。\n\n焦虑达到了顶峰。每个人都在和时间赛跑。',
    next: 's5_crisis',
    groups: [
      { label: '📚 学期策略', exclusive: true, picks: [
        { text: '📚 咬牙冲刺专业课', effect: { gpa: 0.2, health: -12, mental: -10 } },
        { text: '🧘 保持节奏，压力管理', effect: { gpa: 0.1, mental: 5 } },
        { text: '🤝 组学习互助组', effect: { gpa: 0.1, mental: 5, health: -3 } },
        { text: '😴 主动降低强度', effect: { health: 10, mental: 8, gpa: -0.2 } },
      ]},
      { label: '📅 课余安排', exclusive: false, picks: [
        { text: '🏃 坚持锻炼', effect: { health: 8, mental: 3, flags: { _sportCount: 1 } } },
        { text: '🏥 定期心理咨询', effect: { mental: 8 } },
        { text: '🔫 打CS解压', effect: { mental: 5, gpa: -0.05, flags: { _csCount: 1 } }, condition: function(s) { return s.flags.csPlayer; } },
        { text: '🍺 周末约朋友放松', effect: { mental: 5, money: -3 } },
        { text: '🎵 乐队排练解压', effect: { mental: 8, gpa: -0.05, flags: { _musicCount: 1 } }, condition: function(s) { return (s.flags._musicCount || 0) >= 1; } },
        { text: '📄 帮导师写论文', effect: { gpa: 0.1, mental: -5, health: -5, flags: { _researchCount: 1, paperWriting: true } }, condition: function(s) { return s.flags.inLab; } },
        { text: '⚽ 加入院足球队', effect: { health: 8, mental: 5, flags: { _sportCount: 1, footballTeam: true } }, condition: function(s) { return (s.flags._sportCount || 0) >= 2 && !s.flags.footballTeam; } },
      ]},
    ],
  },
  s5_crisis: {
    icon: '😰', title: '至暗时刻',
    text: function() {
      var t = '深秋的晚上，你在宿舍阳台吹着冷风。\n\n';
      if (Game.state.flags.inRelationship) t += '💔 恋人提出了分手。TA说你最近太忙了，两个人越来越远……\n你翻到TA的朋友圈，已经和那个"点赞的人"在一起了。\n\n';
      if (Game.state.flags.casualDating) t += '💔 你的"固定约会对象"突然告诉你：TA要和别人正式在一起了。\n你说不上难过，但胸口闷闷的。\n\n';
      if (Game.state.flags.inLab) t += '⚠️ 导师的项目deadline临近，实验数据还没出来。导师在群里@了你三次……\n\n';
      if (Game.state.gpa < 3.0) t += '📉 你的排名已经跌出了保研线，需要另谋出路……\n\n';
      t += '一切似乎在同时崩塌。\n你感觉自己快撑不住了。';
      return t;
    },
    choices: function() {
      var c = [
        { text: '💪 扛住，一件件解决', hint: '心理-15, 体力-10, GPA+0.1', next: 's5_end', effect: { mental: -15, health: -10, gpa: 0.1 } },
        { text: '📞 给父母打电话', hint: '心理+12', next: 's5_end', effect: { mental: 12 } },
        { text: '🏥 去心理咨询中心', hint: '心理+18', next: 's5_end', effect: { mental: 18 } },
        { text: '🍺 约朋友喝酒', hint: '心理+8, 体力-10, GPA-0.1, 金钱-5', next: 's5_end', effect: { mental: 8, health: -10, gpa: -0.1, money: -5 } },
        { text: '🔫 打开CS，在虚拟世界里当一回英雄', hint: '心理+12, GPA-0.05', next: 's5_cs_clutch', effect: { mental: 12, gpa: -0.05, flags: { csPlayer: true, _csCount: 1 } } },
      ];
      if (Game.state.flags.inRelationship || Game.state.flags.casualDating) {
        c.push({ text: '📱 分手/断联后疯狂刷交友软件', hint: '心理+7, 体力-8, 金钱-5', next: 's5_rebound', effect: { mental: 7, health: -8, money: -5, flags: { inRelationship: false, casualDating: false, datingApp: true } } });
      }
      return c;
    },
  },
  s5_rebound: {
    icon: '💊', title: '用新欢忘旧爱',
    text: '一周内你约了四个人出来。\n\n周一咖啡，周三晚餐，周五酒吧，周末……\n\n你像是在流水线上一样高效地社交、暧昧、告别。\n每个人都觉你健谈又有趣，但没有人知道你在笑容背后藏着什么。\n\n其中一个人说："你好像在逃避什么。"\n\n你愣了一下，笑着说："没有啊。"\n\n那天回去的路上，你哭了。\n\n不是因为前任，是因为你发现——\n你在用别人的体温，来治疗自己的孤独。\n而这剂药，不管用。',
    choices: [
      { text: '😢 也许该好好面对自己了', hint: '心理+5', next: 's5_end', effect: { mental: 5, flags: { regretCasual: true } } },
      { text: '🤷 至少比一个人待着强', hint: '心理+2', next: 's5_end', effect: { mental: 2 } },
    ],
  },
  s5_cs_clutch: {
    icon: '🔫', title: '1v4 Clutch',
    text: '你打开CS，solo排位。\n\n这一局你状态出奇地好。\n最后一个回合，比分14-15，你的队友全倒了，场上只剩你一个人。\n1v4。\n\n你深吸一口气——\n第一个，闪光拉出来，爆头。\n第二个，从连接绕来，转身甩狙，击杀。\n第三个，A小道peek，你的AK精准三连击。\n最后一个……你听到了脚步声……从背后。\n\n你跳起来，180度转身，一枪爆头。\n\nACE。\n\n队友在语音里疯狂尖叫。\n\n你摘下耳机，发现自己在笑。\n虽然什么问题都没解决，但此刻你觉得——至少在某个世界里，你是最强的。',
    choices: [
      { text: '😌 带着好心情去面对明天', next: 's5_end', effect: { mental: 5 } },
    ],
  },
  s5_end: {
    icon: '🌟', title: '保研/申请季',
    text: function() {
      if (Game.state.gpa >= 3.5) return '凭借优秀的GPA，你获得了保研资格！\n但面试压力巨大，导师选择让你纠结……';
      else if (Game.state.gpa >= 2.8) return 'GPA不够保研。考研、出国、就业——你必须快速做出选择。\n时间不等人。';
      else return '⚠️ 绩点危险了。如果继续下降，毕业都会成问题。\n你必须在最后时刻奋起直追。';
    },
    choices: [{ text: '全力以赴 →', next: 'v5_winter', effect: {} }],
  },

  // ========== 大三·春 ==========
  s6_intro: {
    icon: '🌈', title: '大三·春季学期',
    text: '课程设计、毕业实习、各种DDL堆在一起。\n\n但你已经是"老交大人"了。该懂的潜规则，该认识的人，你都有了。\n问题是——够不够？',
    next: 's6_mid',
    groups: [
      { label: '🎯 学期重心', exclusive: true, picks: [
        { text: '🏢 互联网大厂实习', effect: { mental: -5, health: -18, gpa: -0.2, money: 15, flags: { bigCompany: true } } },
        { text: '🔬 全身心投入科研', effect: { gpa: 0.3, health: -12, mental: -8, flags: { _researchCount: 1, deepResearch: true } } },
        { text: '📚 稳住课内成绩', effect: { gpa: 0.2, mental: -5 } },
        { text: '🧘 降低节奏，身心调整', effect: { health: 10, mental: 8, gpa: -0.1 } },
      ]},
      { label: '📅 课余时间', exclusive: false, picks: [
        { text: '💘 在学长/学姐毕业前大胆表白', effect: {}, redirect: 's6_senior_crush', condition: function(s) { return !s.flags.inRelationship; } },
        { text: '🏃 坚持运动', effect: { health: 8, mental: 3, flags: { _sportCount: 1 } } },
        { text: '🔫 打CS解压', effect: { mental: 5, gpa: -0.05, flags: { _csCount: 1 } }, condition: function(s) { return s.flags.csPlayer; } },
        { text: '🎵 乐队排练', effect: { mental: 8, gpa: -0.05, flags: { _musicCount: 1 } }, condition: function(s) { return (s.flags._musicCount || 0) >= 1; } },
        { text: '📄 继续跟导师做科研', effect: { gpa: 0.1, health: -5, mental: -3, flags: { _researchCount: 1 } }, condition: function(s) { return s.flags.inLab; } },
        { text: '💼 投简历找暑期实习', effect: { mental: -3, money: 3, flags: { internship: true } } },
        { text: '🍺 和朋友们好好聚聚', effect: { mental: 8, money: -3 } },
        { text: '📖 图书馆自习', effect: { gpa: 0.1, mental: -3 } },
      ]},
    ],
  },
  s6_senior_crush: {
    icon: '💌', title: '毕业季的告白',
    text: '你一直暗恋的那个大四学长/学姐马上要毕业了。\n\n在TA的毕业晚会上，你喝了点酒壮胆，把TA拉到了教学楼后面。\n\n"我喜欢你。从大一认识你的时候就喜欢你了。"\n\n空气安静了三秒。',
    choices: function() {
      if (Math.random() < 0.4) {
        return [
          { text: '💕 TA笑了：其实我也是', hint: '心理+18, 金钱-5', next: 's6_senior_yes', effect: { mental: 18, money: -5, flags: { inRelationship: true, seniorLove: true, _romanceCount: 1 } } },
        ];
      }
      return [
        { text: '😢 TA说：你很好，但我要去北京/出国了……', hint: '心理-6', next: 's6_senior_no', effect: { mental: -6 } },
      ];
    },
  },
  s6_senior_yes: {
    icon: '🌅', title: '夕阳下的拥抱',
    text: '"其实我也是。只是一直没敢说。"\n\nTA拉着你的手，在毕业墙前拍了一张合照。\n\n虽然TA马上要离开上海了，异地恋充满不确定。\n但此刻，夕阳温柔，晚风刚好，你什么都不想管了。\n\n"等我毕业，我去找你。"',
    choices: [{ text: '继续 →', next: 's6_mid', effect: {} }],
  },
  s6_senior_no: {
    icon: '🚶', title: '得不到的永远在骚动',
    text: '"你是个很好的人……但我下个月就走了。异地的话，对你不公平。"\n\nTA拍了拍你的头，转身走了。\n\n你站在原地，看着TA的背影消失在路灯下。\n\n回宿舍的路上你买了一罐啤酒，坐在思源湖边喝完了。\n\n湖面上映着星星。你心想——暗恋三年，终于有个结果了。\n虽然不是想要的那个。',
    choices: [{ text: '继续 →', next: 's6_mid', effect: {} }],
  },
  s6_mid: {
    icon: '⏰', title: '凌晨四点的交大',
    text: '你见过凌晨四点的交大吗？\n图书馆门口路灯还亮着，远处有人在弹吉他。\n\n大学时光真的不多了。你突然很想哭。\n\n你最珍惜什么？',
    choices: [
      { text: '👨‍🎓 还能学习的时光', hint: 'GPA+0.1, 心理+3, 体力-5', next: 's6_end', effect: { gpa: 0.1, mental: 3, health: -5 } },
      { text: '👫 身边的人', hint: '心理+11', next: 's6_end', effect: { mental: 11 } },
      { text: '🌅 这份自由和可能性', hint: '心理+10', next: 's6_end', effect: { mental: 10 } },
    ],
  },
  s6_end: {
    icon: '🎆', title: '大三结束',
    text: '三年白驹过隙。\n你从懵懂新生成长为一个有方向的人——或者，一个更加迷茫的人。\n\n最后一年了。',
    choices: [{ text: '进入大四 →', next: 'v6_summer', effect: {} }],
  },

  // ========== 大四·秋 ==========
  s7_intro: {
    icon: '🎓', title: '大四·秋季学期',
    text: '毕业论文开题了。导师给了你一个有挑战性的题目。\n秋招如火如荼。\n\n这是决定未来的关键时刻。时间和精力都不够用了。',
    choices: [
      { text: '📝 全力写毕业论文', hint: 'GPA+0.2, 体力-12, 心理-5', next: 's7_mid', effect: { gpa: 0.2, health: -12, mental: -5, flags: { _researchCount: 1 } } },
      { text: '💼 疯狂冲秋招', hint: '心理-7, 体力-18, GPA-0.1, 金钱-3', next: 's7_mid', effect: { mental: -7, health: -18, gpa: -0.1, money: -3, flags: { jobHunting: true } } },
      { text: '📖 准备考研', hint: 'GPA+0.1, 心理-15, 体力-15', next: 's7_mid', effect: { gpa: 0.1, mental: -15, health: -15, flags: { gradSchool: true } } },
    ],
  },
  s7_mid: {
    icon: '🍂', title: '深秋抉择',
    text: function() {
      if (Game.state.flags.jobHunting) return '你收到了几个offer，但都不是最心仪的公司。\n要接受"还行"的offer，还是继续等？\n\n每天都在焦虑和期待中度过。';
      if (Game.state.flags.gradSchool) return '考研倒计时60天。压力巨大。\n自习室里坐满了同样焦虑的人。\n有人崩溃哭了出来。';
      return '毕业论文终于有了突破！\n但导师说："还不够，再改改。"\n你已经改了第七版了……';
    },
    choices: function() {
      var c = [
        { text: '坚持到底', hint: '体力-10, 心理-5, GPA+0.1', next: 's7_end', effect: { health: -10, mental: -5, gpa: 0.1 } },
        { text: '给自己喘息空间', hint: '体力+5, 心理+5, GPA-0.1', next: 's7_end', effect: { health: 5, mental: 5, gpa: -0.1 } },
      ];
      if (Game.state.flags.csContact) {
        c.push({ text: '🔫 认真考虑职业电竞的邀请', hint: '心理+15, GPA-0.3', next: 's7_cs_career', effect: { mental: 15, gpa: -0.3 } });
      }
      return c;
    },
  },
  s7_cs_career: {
    icon: '🎮', title: '电竞十字路口',
    text: '你收到了一支半职业战队的试训邀请。\n\n队伍虽然不是顶级，但确实有打二级联赛的实力。\n如果顺利，也许能冲击Major预选赛。\n\n但这意味着——你可能要放弃正常毕业的机会。\n\n你坐在网吧里，一手握着鼠标，一手拿着手机看辅导员发的学业警告。\n\n你想起了第一次在宿舍玩CS的那个夜晚。\n那时候只是觉得好玩。什么时候变成了人生抉择？',
    choices: [
      { text: '🔫 去试训！人生能有几次追梦的机会', hint: '心理+20, GPA-0.3, 体力-10', next: 's7_end', effect: { mental: 20, gpa: -0.3, health: -10, flags: { csCareer: true } } },
      { text: '📚 梦想照进现实，还是先把书念完', hint: 'GPA+0.2, 心理-10', next: 's7_end', effect: { gpa: 0.2, mental: -10 } },
    ],
  },
  s7_end: {
    icon: '🎊', title: '新年钟声',
    text: '新年钟声敲响。你站在宿舍楼顶，看着远处外滩的烟花。\n\n还有一个学期就毕业了。\n四年就这么要过去了。\n\n不管结果如何，你还在这里。',
    choices: [{ text: '最后一学期 →', next: 'v7_winter', effect: {} }],
  },

  // ========== 大四·春 ==========
  s8_intro: {
    icon: '🌸', title: '大四·春——最后的学期',
    text: function() {
      var t = '樱花又开了。这是你在交大看到的第四次樱花。\n\n毕业论文答辩在即。四年的积淀，让你有了底气——或者，让你更加忐忑。';
      if (Game.state.flags.inRelationship) t += '\n\n你和恋人走在樱花大道上。TA问你："毕业以后，我们怎么办？"';
      if (Game.state.flags.seniorLove) t += '\n\n异地恋一年了。TA发来消息："我在北京租好房了，有你的位置。"';
      return t;
    },
    choices: function() {
      var c = [
        { text: '📝 全力准备答辩', hint: 'GPA+0.2, 体力-8, 心理-3', next: 's8_defense', effect: { gpa: 0.2, health: -8, mental: -3 } },
        { text: '📸 和朋友拍毕业照', hint: '心理+12', next: 's8_defense', effect: { mental: 12 } },
        { text: '🍻 毕业旅行', hint: '心理+15, 体力-8, GPA-0.1, 金钱-8', next: 's8_defense', effect: { mental: 15, health: -8, gpa: -0.1, money: -8 } },
      ];
      if (Game.state.flags.inRelationship && !Game.state.flags.seniorLove) {
        c.push({ text: '💍 和恋人认真谈谈未来', hint: '心理+9, 金钱-5', next: 's8_future_talk', effect: { mental: 9, money: -5 } });
      }
      return c;
    },
  },
  s8_future_talk: {
    icon: '💑', title: '关于我们的未来',
    text: '你们坐在思源湖边，天边是粉紫色的晚霞。\n\n"毕业以后……你想怎么样？"\n\n你看着TA的眼睛。四年前，你们还是陌生人。\n现在TA是你在这座城市最重要的人。\n\n你们聊了很多——关于去哪个城市，关于异地还是同城，关于租房还是回家。\n\n没有标准答案。但至少，你们在认真面对。',
    choices: [
      { text: '💕 不管去哪，在一起就好', hint: '心理+9, 金钱-5', next: 's8_defense', effect: { mental: 9, money: -5, flags: { togetherAfterGrad: true } } },
      { text: '🙁 也许……毕业就是终点', hint: '心理-9', next: 's8_breakup', effect: { mental: -9 } },
    ],
  },
  s8_breakup: {
    icon: '💔', title: '毕业季分手',
    text: '你们都知道这一天迟早会来。\n\n不是不爱了，是现实太复杂。\n一个要去北京，一个要留上海。\n谁也不想让对方为自己牺牲前途。\n\n最后一次拥抱，你们在宿舍楼下站了很久。\n\n"谢谢你这几年。"\n"我也是。"\n\n转身的时候，你没有回头。\n因为你知道一回头，你就会改变主意。\n\n走回宿舍的楼梯上，你终于哭了出来。',
    choices: [{ text: '💧 擦干眼泪，继续走', next: 's8_defense', effect: { flags: { inRelationship: false, gradBreakup: true } } }],
  },
  s8_defense: {
    icon: '🎤', title: '毕业答辩',
    text: function() {
      if (Game.state.gpa >= 3.5) return '你的毕业论文获得答辩委员会一致好评！\n"研究扎实，论述清晰，优秀的本科论文。"\n\n你激动得眼眶湿润了。';
      if (Game.state.gpa >= 2.5) return '答辩有几个问题让你紧张，但总体回答得不错。\n委员会经过讨论，宣布——你通过了！\n\n你长舒一口气。';
      if (Game.state.gpa >= 2.0) return '答辩过程很艰难，评委提了尖锐的问题。\n你尽力回答了每一个。\n漫长等待后……勉强通过了。\n你差点瘫在座位上。';
      return '答辩委员会遗憾地通知你：论文未达到毕业要求。\n你需要延期……\n\n走出答辩教室，走廊很长很安静。';
    },
    choices: [{ text: '查看结局 →', next: 'ending', effect: {} }],
  },

  // ========== 假期 ==========
  v1_winter: {
    icon: '🧧', title: '大一·寒假',
    text: function() {
      var t = '回到家，爸妈在车站等你。桌上摆满了你爱吃的菜。\n高中同学群里约着春节聚会。\n\n一个月的假期，想做的事情太多了——';
      if (Game.state.flags.csPlayer) t += '\n\n室友群："初三开始冲天梯？在线等！"';
      return t;
    },
    next: 's2_intro', semester: 2,
    groups: [
      { label: '📍 假期基地', exclusive: true, picks: [
        { text: '🏠 回家过年', effect: { health: 8, mental: 5 }, locId: 'home' },
        { text: '📚 留校自习预习', effect: { gpa: 0.1, mental: -3 }, locId: 'campus' },
      ]},
      { label: '📅 假期活动', exclusive: false, picks: [
        { text: '🧧 走亲访友收红包', effect: { money: 8, mental: 3 }, loc: 'home' },
        { text: '🎆 和高中死党聚会', effect: { mental: 8, money: -5 }, loc: 'home' },
        { text: '💤 疯狂补觉恢复元气', effect: { health: 8 } },
        { text: '🏃 寒假健身计划', effect: { health: 5, mental: 3, flags: { _sportCount: 1 } } },
        { text: '🔫 和室友组队冲CS天梯', effect: { mental: 10, health: -5, gpa: -0.05, flags: { _csCount: 1 } }, condition: function(s) { return s.flags.csPlayer; } },
        { text: '🎸 寒假学吉他', effect: { mental: 5, money: -3, flags: { _musicCount: 1, guitar: true } } },
      ]},
    ],
  },
  v2_summer: {
    icon: '☀️', title: '大一·暑假',
    text: '第一个大学暑假，两个月完整的自由时间。\n\n朋友圈里有人在旅行，有人在实习，有人在家打游戏。\n你的暑假计划是——',
    next: 's3_intro', semester: 3,
    groups: [
      { label: '📍 暑假去哪', exclusive: true, picks: [
        { text: '🏠 回家待着', effect: { health: 8, mental: 5 }, locId: 'home' },
        { text: '🏖️ 来一场旅行', effect: { mental: 10, money: -5 }, locId: 'travel' },
        { text: '📚 留校学习', effect: { gpa: 0.1, mental: -3 }, locId: 'campus' },
      ]},
      { label: '📅 暑假安排', exclusive: false, picks: [
        { text: '💼 找份暑期兼职', effect: { money: 12, health: -8 } },
        { text: '🏃 暑假健身打卡', effect: { health: 12, mental: 3, flags: { _sportCount: 1 } } },
        { text: '🎮 在家躺平打游戏', effect: { mental: 5, gpa: -0.05 }, loc: 'home' },
        { text: '🚗 报名学车', effect: { money: -5, mental: 3, health: -3 } },
        { text: '⚽ 参加暑期足球训练营', effect: { health: 8, mental: 5, money: -2, flags: { _sportCount: 1, footballTraining: true } }, loc: 'campus' },
        { text: '🎵 学一门乐器', effect: { mental: 8, money: -5, flags: { _musicCount: 1 } } },
      ]},
    ],
  },
  v3_winter: {
    icon: '🎄', title: '大二·寒假',
    text: function() {
      var t = '大二的寒假，回家的感觉不一样了。\n\n爸妈开始问"有对象了吗""以后想干嘛"。\n你说"还在想"，然后逃回了房间。';
      if (Game.state.flags.inRelationship) t += '\n\n恋人发来消息："寒假好无聊，想你了。"';
      if (Game.state.flags.situationship) t += '\n\n那个暧昧的人发来"新年快乐"，你纠结了半天怎么回。';
      return t;
    },
    next: 's4_intro', semester: 4,
    groups: [
      { label: '📍 寒假重心', exclusive: true, picks: [
        { text: '🏠 回家陪家人过年', effect: { health: 8, mental: 5 }, locId: 'home' },
        { text: '🔬 留校搞科研', effect: { gpa: 0.2, health: -10, mental: -5 }, locId: 'campus' },
        { text: '📝 准备转专业', effect: { mental: -8, gpa: -0.2 }, locId: 'campus' },
      ]},
      { label: '📅 假期活动', exclusive: false, picks: [
        { text: '📱 天天有局，社交密集期', effect: { mental: 8, money: -5 }, loc: 'home' },
        { text: '💤 每天睡到自然醒', effect: { health: 10, mental: 3 } },
        { text: '📚 预习下学期', effect: { gpa: 0.1, mental: -3 } },
        { text: '📱 下载探探，寒假太无聊了', effect: { mental: 5, money: -2, flags: { datingApp: true } }, redirect: 's3_dating_app', condition: function(s) { return !s.flags.inRelationship && !s.flags.casualDating; } },
        { text: '🔬 寒假留校做实验', effect: { gpa: 0.1, health: -8, mental: -5, flags: { _researchCount: 1 } }, loc: 'campus', condition: function(s) { return s.flags.inLab; } },
      ]},
    ],
  },
  v4_summer: {
    icon: '🌴', title: '大二·暑假',
    text: '大学过半了。这可能是最后一个"没有压力"的长假。\n\n大三开学就要面对保研、考研、就业的抉择。\n趁现在——',
    next: 's5_intro', semester: 5,
    groups: [
      { label: '📍 暑假主线', exclusive: true, picks: [
        { text: '🏢 找大厂暑期实习', effect: { money: 10, health: -10, mental: -3, flags: { internship: true } }, locId: 'campus' },
        { text: '🔬 暑假科研/竞赛', effect: { gpa: 0.2, health: -8, mental: -5, flags: { _researchCount: 1 } }, locId: 'campus' },
        { text: '🏠 回家休整', effect: { health: 10, mental: 8 }, locId: 'home' },
      ]},
      { label: '📅 另外还想', exclusive: false, picks: [
        { text: '🌍 来一趟旅行', effect: { mental: 10, money: -8 } },
        { text: '🏋️ 暑假健身改造', effect: { health: 12, mental: 3, money: -3, flags: { _sportCount: 1 } } },
        { text: '📖 看几本好书', effect: { mental: 5, gpa: 0.1 } },
        { text: '🎮 打两个月游戏', effect: { mental: 5, health: -3, gpa: -0.05 } },
        { text: '🎸 暑假组乐队排练', effect: { mental: 8, money: -3, flags: { _musicCount: 1, bandFormed: true } }, loc: 'campus', condition: function(s) { return (s.flags._musicCount || 0) >= 1; } },
      ]},
    ],
  },
  v5_winter: {
    icon: '🌨️', title: '大三·寒假',
    text: function() {
      var t = '这个寒假没人能真正放松。\n\n保研的在等结果，考研的已经开始复习，出国的在刷标化。\n朋友圈全是"上岸""offer""录取"的消息。';
      if (Game.state.gpa >= 3.5) t += '\n\n你的GPA不错，但能否最终保研还是未知数。';
      else if (Game.state.gpa < 2.5) t += '\n\n看着自己的GPA，你有点慌了。';
      return t;
    },
    next: 's6_intro', semester: 6,
    groups: [
      { label: '📍 寒假重心', exclusive: true, picks: [
        { text: '📚 闭关备考，抢跑一步', effect: { gpa: 0.1, health: -8, mental: -8 }, locId: 'campus' },
        { text: '🏠 回家充电，调整心态', effect: { health: 10, mental: 8 }, locId: 'home' },
        { text: '💼 找个寒假实习', effect: { money: 8, health: -8, mental: -3 }, locId: 'campus' },
      ]},
      { label: '📅 额外安排', exclusive: false, picks: [
        { text: '🧘 学冥想和正念', effect: { mental: 10, health: 3 } },
        { text: '📖 读几本课外书', effect: { mental: 5 } },
        { text: '🏃 坚持跑步', effect: { health: 8, mental: 3, flags: { _sportCount: 1 } } },
        { text: '🧧 和亲戚朋友聚聚', effect: { mental: 5, money: -3 }, loc: 'home' },
      ]},
    ],
  },
  v6_summer: {
    icon: '🏝️', title: '大三·暑假',
    text: function() {
      var t = '这是你最后一个暑假了。下次放假……就是毕业。\n\n';
      if (Game.state.flags.bigCompany || Game.state.flags.internship) t += '秋招提前批已经开始了。你的简历准备好了吗？';
      else if (Game.state.flags.gradSchool) t += '考研倒计时开始。暑假是最后的大块复习时间。';
      else t += '有人在实习，有人在备考，有人在享受最后的自由。';
      return t;
    },
    next: 's7_intro', semester: 7,
    groups: [
      { label: '📍 暑假主线', exclusive: true, picks: [
        { text: '💼 秋招提前批/暑期实习', effect: { money: 8, health: -10, mental: -5, flags: { internship: true } }, locId: 'campus' },
        { text: '📖 闭关备考（考研/GT）', effect: { gpa: 0.1, health: -8, mental: -8, flags: { gradSchool: true } }, locId: 'campus' },
        { text: '🏠 回家陪父母', effect: { health: 10, mental: 8 }, locId: 'home' },
      ]},
      { label: '📅 另外还想', exclusive: false, picks: [
        { text: '🎒 最后一次长途旅行', effect: { mental: 12, money: -8 } },
        { text: '🏋️ 健身塑形', effect: { health: 8, mental: 3, flags: { _sportCount: 1 } } },
        { text: '📝 提前写毕业论文开题', effect: { gpa: 0.1, mental: -3 }, loc: 'campus' },
        { text: '🍻 毕业季前和好友狂欢', effect: { mental: 8, money: -5 } },
      ]},
    ],
  },
  v7_winter: {
    icon: '🎑', title: '大四·寒假',
    text: function() {
      var t = '这可能是你最后一次以"学生"身份回家过年。\n\n爸妈看你的眼神多了几分不舍。年夜饭上被问了无数遍"毕业去哪"。';
      if (Game.state.flags.csCareer) t += '\n\n战队的试训邀请还在邮箱里。你反复看了好几遍。';
      else if (Game.state.flags.jobHunting) t += '\n\n手里的offer让你安心了些，但真的要当打工人了。';
      else t += '\n\n论文、答辩、未来……焦虑和期待交织。';
      return t;
    },
    next: 's8_intro', semester: 8,
    groups: [
      { label: '📍 最后的寒假', exclusive: true, picks: [
        { text: '🏠 好好陪家人', effect: { health: 8, mental: 10 }, locId: 'home' },
        { text: '📝 提前回校赶论文', effect: { gpa: 0.2, health: -5, mental: -3 }, locId: 'campus' },
      ]},
      { label: '📅 还想做的事', exclusive: false, picks: [
        { text: '🍻 和大学好友"最后的聚会"', effect: { mental: 8, money: -5 } },
        { text: '📸 整理四年的照片和回忆', effect: { mental: 5 } },
        { text: '💼 准备面试/简历', effect: { mental: -3, money: 3 } },
        { text: '🏃 最后冲刺锻炼身体', effect: { health: 8, flags: { _sportCount: 1 } } },
      ]},
    ],
  },

  // ========== 属性归零 / 退学 ==========
  gameover_expelled: {
    icon: '🚪', title: '被取消学籍',
    text: '你的GPA连续两个学期低于1.7。\n\n根据《上海交通大学学分制课程学习管理条例》，教务处正式通知你：\n你的学籍已被取消。\n\n你站在包玉刚图书馆门口，看着来来往往的同学们，\n恍惚间觉得这一切像一场梦。\n\n辅导员拍了拍你的肩膀："回去好好想想，以后的路还很长。"\n\n你收拾好行李，最后看了一眼思源湖。\n也许有一天，你会以另一种身份回来。',
    isEnding: true, endingType: 'expelled',
  },
  gameover_health: {
    icon: '🏥', title: '身体崩溃',
    text: '长期的熬夜和过劳让你的身体撑不住了。\n你在实验室晕倒，被送进了医院。\n\n医生说你需要休学一年。\n\n这不是终点，只是一个弯路。养好身体，还能重新出发。',
    isEnding: true, endingType: 'health_fail',
  },
  gameover_mental: {
    icon: '😢', title: '心理危机',
    text: '持续的压力和焦虑让你陷入严重的心理困境。\n无法集中注意力，每天都很痛苦。\n\n在辅导员和咨询师帮助下，你决定休学。\n\n寻求帮助是勇敢的。你会好起来的。',
    isEnding: true, endingType: 'mental_fail',
  },
  gameover_money: {
    icon: '💸', title: '经济破产',
    text: '生活费花光了，信用卡也透支了。\n你不得不四处借钱，室友帮你交了这个月的饭钱。\n\n辅导员建议你申请助学贷款或者找份兼职。\n\n你坐在空荡荡的食堂里，看着余额为零的手机屏幕。\n\n也许该给家里打个电话了……',
    isEnding: true, endingType: 'money_fail',
  },
  gameover_gpa: {
    icon: '📉', title: 'GPA归零',
    text: 'GPA跌到了0——所有课程全部挂科。\n\n教务处的通知冷冰冰的：因学业成绩严重不合格，取消学籍。\n\n你坐在空荡荡的教室里，看着窗外的梧桐树发呆。\n手机里还有昨晚打CS的截图。\n\n一切来不及后悔了。',
    isEnding: true, endingType: 'gpa_fail',
  },
};
