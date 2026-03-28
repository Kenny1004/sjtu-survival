window.Game = window.Game || {};

// 正事场景黑名单——考试、比赛、恋爱叙事、危机、答辩等不插入随机选项
Game.RARE_BLACKLIST = [
  // 军训
  's1_intro', 's1_military_hard', 's1_military_skip', 's1_military_social',
  // 考试/期末/选课
  's1_course', 's1_midterm_hard', 's1_midterm_balanced', 's1_midterm_easy', 's2_final',
  // CS赛事/电竞
  's1_cs_discover', 's2_cs_tournament', 's3_cs_escape',
  's4_cs_pro', 's4_cs_cupc', 's4_cs_night',
  's5_cs_clutch', 's7_cs_career',
  // 恋爱/约会叙事
  's2_romance', 's2_romance_start', 's2_fwb',
  's3_dating_app', 's3_date_meetup', 's3_hookup', 's3_date_serious',
  's4_late_swipe', 's4_booty_call',
  's5_rebound',
  's6_senior_crush', 's6_senior_yes', 's6_senior_no',
  's8_future_talk', 's8_breakup',
  // 重大决策/危机
  's5_crisis', 's5_end', 's7_mid',
  // 答辩
  's8_defense',
  // 单按钮过渡场景
  's1_end', 's3_end', 's4_end', 's6_end', 's7_end',
];

// 稀有选项池：数量大、触发概率低，提高每次游玩的新鲜度
// 只在日常生活、学期中间、假期等轻松场景出现
Game.RARE_CHOICES = [
  // ===== 校园日常 =====
  { text: '🐱 校园里有只猫一直跟着你，带它去看了兽医', effect: { mental: 10, money: -8 } },
  { text: '🚲 骑共享单车环闵行校区一整圈', effect: { health: 8, mental: 5 } },
  { text: '🌅 凌晨五点去思源湖看日出', effect: { mental: 12, health: -5 } },
  { text: '📻 去校园广播站客串了一期节目', effect: { mental: 8 } },
  { text: '🎪 逛了学校跳蚤市场，淘到了宝贝', effect: { money: 5, mental: 5 } },
  { text: '🧹 宿舍大扫除，在床底发现室友失踪半年的外卖盒', effect: { mental: 3, health: 3 } },
  { text: '🚿 宿舍热水器坏了，连洗三天冷水澡', effect: { health: -8, mental: -5 } },
  { text: '🐛 宿舍闯入一只巨型蟑螂，全寝室尖叫逃窜', effect: { mental: -5 } },
  { text: '📮 信箱里收到一封匿名鼓励信', effect: { mental: 10 } },
  { text: '🎂 给室友策划了一个惊喜生日派对', effect: { mental: 10, money: -8 } },
  { text: '🐈 成为了校园流浪猫的固定投喂人', effect: { mental: 8, money: -3 } },
  { text: '📝 给校报投了篇文章，居然被录用了', effect: { mental: 10, gpa: 0.1 } },
  { text: '🌸 在交大樱花大道拍照，被路人夸好看', effect: { mental: 8 } },
  { text: '🎓 偶遇学长分享保研经验，醍醐灌顶', effect: { gpa: 0.1, mental: 5 }, minSem: 3 },
  { text: '📢 被辅导员抓去当迎新志愿者', effect: { mental: 3, health: -5 }, maxSem: 4 },
  { text: '🔑 忘带校园卡，在宿舍楼下站了一小时', effect: { mental: -5, health: -3 } },
  { text: '🎭 参加了学校的即兴戏剧工作坊', effect: { mental: 10 } },
  { text: '📱 手机掉进思源湖了！', effect: { mental: -15, money: -12 } },

  // ===== 上海城市探索 =====
  { text: '🎡 一个人去了外滩，看了很久的黄浦江', effect: { mental: 10 } },
  { text: '🎪 上海迪士尼一日游！排队四小时玩了三个项目', effect: { mental: 18, money: -20, health: -8 } },
  { text: '📷 去武康路拍了一天文艺照', effect: { mental: 10, money: -5 } },
  { text: '🎬 在上海电影节看了一部大师作品', effect: { mental: 10, money: -8 } },
  { text: '🎻 去上海交响乐团听了场音乐会', effect: { mental: 12, money: -10 } },
  { text: '🚂 买了张火车票，周末一个人去了杭州', effect: { mental: 12, money: -10, health: -3 } },
  { text: '🏄 周末和朋友去金山冲浪', effect: { health: 8, mental: 10, money: -10 } },
  { text: '🧗 去了一次室内攀岩馆', effect: { health: 8, mental: 5, money: -5 } },
  { text: '🍜 发现五角场一家超隐蔽的神级小馆', effect: { mental: 8, money: -5 } },
  { text: '🎤 被朋友拉去KTV唱了一整晚', effect: { mental: 12, health: -8, money: -8 } },
  { text: '🧑‍🍳 去了一次农家乐，摘草莓喂鸡', effect: { mental: 10, money: -8, health: 3 } },
  { text: '🌃 坐在陆家嘴的天桥上看了一夜灯光', effect: { mental: 8, health: -3 } },

  // ===== 社交奇遇 =====
  { text: '🍺 在酒吧认识了一个超有意思的人', effect: { mental: 8, money: -10 } },
  { text: '📞 深夜接到老朋友电话，聊了三个小时', effect: { mental: 10, health: -5 } },
  { text: '🎯 和朋友们打了一下午飞盘', effect: { health: 8, mental: 8 } },
  { text: '🎲 和室友打了一晚上桌游', effect: { mental: 10, health: -5 } },
  { text: '🎪 参加了一场密室逃脱', effect: { mental: 8, money: -8 } },
  { text: '🧑‍🍳 和朋友一起做了顿大餐', effect: { mental: 10, money: -5, health: 3 } },
  { text: '💬 和很久没联系的老朋友重新取得了联系', effect: { mental: 8 } },
  { text: '🤝 参加了社区志愿者活动', effect: { mental: 12, health: -5 } },
  { text: '🎁 精心准备了一份礼物送给好朋友', effect: { mental: 5, money: -8 } },
  { text: '🧑‍🎤 被拉去当了一场婚礼的伴郎/伴娘', effect: { mental: 8, money: -10, health: -5 }, minSem: 5 },
  { text: '🎉 被邀请参加了一个很酷的主题派对', effect: { mental: 10, money: -8 } },

  // ===== 学业/知识 =====
  { text: '📖 在图书馆偶然翻到一本改变想法的书', effect: { mental: 8, gpa: 0.1 } },
  { text: '💡 半夜突然想通了一道困扰很久的题', effect: { gpa: 0.2, mental: 8 } },
  { text: '🧑‍💻 帮室友debug到凌晨三点', effect: { mental: 3, health: -5, gpa: 0.1 } },
  { text: '💻 参加了一个24小时黑客松', effect: { gpa: 0.1, health: -12, mental: 5 } },
  { text: '📖 花三天读完了一本很厚的哲学书', effect: { mental: 8 } },
  { text: '🎤 参加了辩论赛，唇枪舌战', effect: { mental: -5, gpa: 0.1 } },
  { text: '🎪 大创比赛拿了个奖', effect: { gpa: 0.1, mental: 8, money: 5 }, minSem: 3 },
  { text: '🧪 实验课上意外做出了很有趣的结果', effect: { gpa: 0.1, mental: 5 }, minSem: 2 },
  { text: '🧑‍🔬 旁听了一场院士讲座，打开了新世界', effect: { gpa: 0.1, mental: 8 } },
  { text: '🧑‍🎓 和教授单独聊了一次，受益匪浅', effect: { gpa: 0.1, mental: 8 }, minSem: 2 },
  { text: '💻 写了个小工具，在GitHub上收获50个star', effect: { mental: 10, gpa: 0.1 } },
  { text: '📊 做了个超漂亮的PPT，全班鼓掌', effect: { gpa: 0.1, mental: 8 } },
  { text: '🧪 实验室的试剂洒了，清理了一下午', effect: { health: -5, mental: -5 }, minSem: 3 },

  // ===== 健康/运动 =====
  { text: '🏊 去交大游泳馆游了个痛快', effect: { health: 10, mental: 5, money: -3 } },
  { text: '🏸 和同学打了一下午羽毛球', effect: { health: 10, mental: 5 } },
  { text: '🧘 尝试了人生第一次冥想课', effect: { mental: 10, health: 3 } },
  { text: '🏋️ 办了张健身卡，信誓旦旦——去了三次就没去了', effect: { money: -8, mental: -3 } },
  { text: '🏃 参加了校运会', effect: { health: 8, mental: 5 } },
  { text: '🧊 挑战了一次冬泳', effect: { health: 5, mental: 10 } },
  { text: '🌧️ 暴雨中骑车回宿舍，淋成落汤鸡', effect: { health: -10, mental: -5 } },
  { text: '💤 连续睡了16小时，醒来不知今夕何夕', effect: { health: 10, mental: 5, gpa: -0.05 } },
  { text: '🏃 跟着Keep练了一个月，效果拔群', effect: { health: 12, mental: 5 } },
  { text: '🤧 换季感冒了，在床上躺了三天', effect: { health: -10, mental: -5, gpa: -0.05 } },

  // ===== 网络/游戏/数码 =====
  { text: '🎮 发现了一个超好玩的独立游戏，沉迷了一周', effect: { mental: 8, gpa: -0.05, health: -5 } },
  { text: '🎮 Steam大促冲动消费了一波', effect: { money: -10, mental: 5 } },
  { text: '🧑‍🎨 在B站上传了自己做的视频，意外有十万播放', effect: { mental: 15, gpa: -0.05 } },
  { text: '📱 刷短视频刷到凌晨四点', effect: { health: -8, mental: -3, gpa: -0.05 } },
  { text: '🎮 和网友组队打到了服务器前100', effect: { mental: 10, health: -5 }, condition: function(s) { return s.flags.csPlayer; } },
  { text: '💻 电脑蓝屏了，论文没保存', effect: { mental: -15, gpa: -0.05 } },
  { text: '📱 换了新手机，心情莫名地好', effect: { mental: 8, money: -15 } },
  { text: '🤖 用AI帮忙写了个作业，被发现了', effect: { gpa: -0.2, mental: -10 }, minSem: 2 },
  { text: '📱 朋友圈发了条动态，获得了50+赞', effect: { mental: 5 } },

  // ===== 奇遇/搞笑/生活 =====
  { text: '🎹 路过琴房听到有人弹肖邦，驻足听了一个小时', effect: { mental: 10, health: -3 } },
  { text: '📦 快递站取错包裹，打开发现是一盒巧克力', effect: { mental: 5 } },
  { text: '🍔 半夜点了份超丰盛外卖犒劳自己', effect: { mental: 5, money: -5, health: -3 } },
  { text: '💇 心血来潮换了个新发型', effect: { mental: 5, money: -5 } },
  { text: '🐸 养了一只小乌龟，给它取名"绩点"', effect: { mental: 5, money: -3 } },
  { text: '🧶 学会了织围巾，送给了朋友', effect: { mental: 8, money: -3 } },
  { text: '📚 在旧书店淘到了绝版好书', effect: { mental: 8, money: -3 } },
  { text: '🎵 发现了一个超棒的宝藏歌手', effect: { mental: 5 } },
  { text: '🎰 抽盲盒上瘾，一口气拆了十个', effect: { money: -12, mental: 3 } },
  { text: '🧑‍🍳 尝试做饭，差点把厨房炸了', effect: { mental: -3, money: -5 } },
  { text: '🎤 鼓起勇气在校园歌手大赛唱了一首歌', effect: { mental: 12, health: -3 } },
  { text: '🌸 在路边捡到一只受伤的小鸟，带回宿舍养好了', effect: { mental: 10 } },
  { text: '🎨 买了套水彩笔，画了一下午画', effect: { mental: 10, money: -3 } },
  { text: '🎵 在宿舍练吉他，被隔壁投诉扰民', effect: { mental: -5 } },
  { text: '🧑‍🎤 学了一首吉他弹唱，在宿舍楼下表演', effect: { mental: 10 } },

  // ===== 恋爱/心动（单身限定）=====
  { text: '✨ 课堂上和邻座借了支笔，聊了起来，感觉很投缘', effect: { mental: 8, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship && !s.flags.casualDating; } },
  { text: '✨ 在图书馆对面坐着的人冲你笑了一下', effect: { mental: 5, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship; } },
  { text: '✨ 社团活动后和一个人一起走了很远的路', effect: { mental: 10, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship; } },
  { text: '✨ 有人在朋友圈评论了你的每一条动态', effect: { mental: 5, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship; } },
  { text: '✨ 雨天没带伞，有个人主动和你拼伞走了一路', effect: { mental: 8, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship; } },
  { text: '✨ 食堂遇到一个人总和你选同一个窗口，终于搭话了', effect: { mental: 5, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship && !s.flags.casualDating; } },
  { text: '✨ 有人给你带了早餐放在桌上，没留名字', effect: { mental: 10, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship; } },
  { text: '✨ 晚自习后有人问你要不要一起去便利店', effect: { mental: 5, money: -3, flags: { _romanceCount: 1 } }, condition: function(s) { return !s.flags.inRelationship; } },

  // ===== 经济相关 =====
  { text: '💰 在闲鱼卖掉不用的教材和闲置，小赚一笔', effect: { money: 8 } },
  { text: '🛒 双十一冲动消费，看到账单后悔了', effect: { money: -15, mental: -5 } },
  { text: '💸 花呗账单出来了，吓得手抖', effect: { mental: -8 } },
  { text: '🧧 爷爷奶奶偷偷给你转了笔钱', effect: { money: 10, mental: 5 } },
  { text: '💼 接了一个线上兼职，赚了点零花钱', effect: { money: 8, health: -3 } },
  { text: '🎫 中了超市抽奖，获得一箱泡面', effect: { money: 3, mental: 5 } },
  { text: '🚕 打车忘付钱，第二天补了双倍', effect: { money: -5, mental: -3 } },

  // ===== 内心成长/哲思 =====
  { text: '🌅 在天台看星星，思考人生的意义', effect: { mental: 8 } },
  { text: '📝 开始写日记，记录大学生活', effect: { mental: 8 } },
  { text: '🎭 参加了心理咨询中心的团体活动', effect: { mental: 12 } },
  { text: '🧘 尝试了一周的数字断联', effect: { mental: 10, health: 5 } },
  { text: '📖 重读了高中时最喜欢的一本书', effect: { mental: 8 } },
  { text: '💌 给未来的自己写了一封信', effect: { mental: 5 } },
  { text: '🎧 找到了一张完美的学习playlist', effect: { mental: 5, gpa: 0.1 } },
  { text: '🌳 在校园长椅上坐了一下午，什么都没干', effect: { mental: 8 } },
  { text: '📸 翻到了高中时的照片，感慨万千', effect: { mental: 5 } },
  { text: '🤔 和室友进行了一场关于人生的深夜长谈', effect: { mental: 10, health: -3 } },

  // ===== 隐式支线相关 =====
  { text: '⚽ 路过操场被拉去凑人数踢球', effect: { health: 8, mental: 5, flags: { _sportCount: 1 } } },
  { text: '⚽ 和同学踢了场野球，进了个漂亮的球', effect: { health: 5, mental: 8, flags: { _sportCount: 1 } } },
  { text: '🎸 在路边听到吉他声，忍不住跟着哼了起来', effect: { mental: 8, flags: { _musicCount: 1 } } },
  { text: '🎵 在宿舍弹吉他唱歌，隔壁竟然鼓起掌来', effect: { mental: 10, flags: { _musicCount: 1 } } },
  { text: '📄 意外发现了一个有趣的实验结果，导师很兴奋', effect: { gpa: 0.1, mental: 8, flags: { _researchCount: 1 } }, condition: function(s) { return s.flags.inLab; }, minSem: 3 },
  { text: '📄 帮师兄跑了一晚上实验数据', effect: { mental: -3, health: -5, gpa: 0.1, flags: { _researchCount: 1 } }, condition: function(s) { return s.flags.inLab; }, minSem: 3 },
];

// 稀有选项注入函数
// 从池中随机挑选，约30%概率在场景中插入1个
Game.injectRareChoices = function(choices) {
  if (!choices || choices.length === 0) return choices;

  var sem = Game.state.semester;
  var eligible = Game.RARE_CHOICES.filter(function(rc) {
    if (rc.minSem && sem < rc.minSem) return false;
    if (rc.maxSem && sem > rc.maxSem) return false;
    if (rc.condition && !rc.condition(Game.state)) return false;
    return true;
  });

  // Fisher-Yates 洗牌
  for (var i = eligible.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = eligible[i]; eligible[i] = eligible[j]; eligible[j] = tmp;
  }

  // 从前3个候选中各12%概率触发，最多注入1个（总概率≈30%）
  var defaultNext = choices[0].next;
  var defaultSemester = choices[0].semester;
  var result = choices.slice();

  for (var i = 0; i < Math.min(eligible.length, 3); i++) {
    if (Math.random() < 0.12) {
      var rc = eligible[i];
      var choice = {
        text: '✨ ' + rc.text,
        hint: rc.hint || '',
        effect: rc.effect || {},
        next: defaultNext,
      };
      if (defaultSemester !== undefined) choice.semester = defaultSemester;
      // 随机位置插入
      var pos = Math.floor(Math.random() * (result.length + 1));
      result.splice(pos, 0, choice);
      break; // 最多1个
    }
  }

  return result;
};
