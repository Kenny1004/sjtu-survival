window.Game = window.Game || {};

Game.calculateEnding = function() {
  var gpa = Game.state.gpa;
  var health = Game.state.health;
  var mental = Game.state.mental;
  var money = Game.state.money;
  var flags = Game.state.flags;
  var playerClass = Game.state.playerClass;
  var completedQuests = Game.state.completedQuests;
  var activeQuests = Game.state.activeQuests;
  var total = health + mental + money;
  var isExpelled = Game.state.warnings >= 2;

  // ====== 收集所有达成的成就结局 ======
  var achievements = [];

  // 完成的任务结局
  for (var i = 0; i < completedQuests.length; i++) {
    var id = completedQuests[i];
    var q = Game.QUESTS[id];
    if (q && q.ending && activeQuests.includes(id)) {
      achievements.push(q.ending);
    }
  }

  // 甜蜜毕业结局
  if (flags.togetherAfterGrad && gpa >= 3.0 && total >= 150) {
    achievements.push({ icon: '💑', title: '双向奔赴 · 一起毕业', rank: 'S+',
      text: '毕业典礼结束后，你和恋人在思源湖边的长椅上坐了很久。\n\n四年前你们还是陌生人。\n四年后，你们手里都拿着学位证书，心里都装着彼此。\n\nTA说："接下来的路，一起走吧。"\n你说："本来就是。"\n\n后来你们去了同一座城市，租了一间小小的公寓。\n冰箱上贴着交大的冰箱贴，书架上放着毕业合照。\n\n这个结局，不比满绩点差。' });
  } else if (flags.gradBreakup && gpa >= 2.0) {
    achievements.push({ icon: '🚶', title: '各奔前程', rank: 'A',
      text: '你拿到了学位证书。\n\n毕业典礼上，你在人群里看到了TA。\n你们目光交汇了一秒，然后都移开了。\n\n有些人陪你走过了最好的四年，但不会出现在之后的人生里。\n这不是遗憾，这是青春的一部分。\n\n多年后的某个深夜，你偶尔会想起思源湖边的夕阳。\n然后微笑着，继续过自己的日子。' });
  }

  // CS职业选手结局
  if (flags.csCareer) {
    if (mental >= 50) {
      achievements.push({ icon: '🔫', title: '电竞传奇 · 交大CS之光', rank: 'S+',
        text: '你走上了职业电竞的道路。\n\n虽然学业勉强毕业（或者延期了），但你在赛场上发光发热。\n第一年打二级联赛就帮助队伍升级，你的ID开始出现在各大赛事的击杀榜上。\n\n有人说你疯了，放着交大毕业生不当去打游戏。\n但当你举起奖杯的那一刻，你知道——这就是你的战场。\n\n"GG，WP。"\n\n交大电竞协会把你的照片挂在了活动室的墙上。\n下面写着："梦想不分赛道。"' });
    } else {
      achievements.push({ icon: '😞', title: '未竟的电竞梦', rank: 'B',
        text: '你去试训了，但职业的残酷超出想象。\n每天14小时高强度训练，队内竞争激烈。\n\n几个月后，你被告知：实力还差一些。\n\n你回到学校，申请了延期毕业。\n虽然梦碎了，但你不后悔尝试。\n\n多年后你在直播CS时，偶尔会想起那段追梦的日子。\n弹幕飘过："主播当年差点打职业的吗？"\n\n你笑了笑，没有回答。' });
    }
  }

  // ====== 主结局（毕业评级 或 退学）======
  var main;
  if (isExpelled) {
    main = { icon: '🚪', title: '被取消学籍', rank: 'F',
      text: '你的GPA连续两个学期低于1.7。\n\n根据《上海交通大学学分制课程学习管理条例》，教务处正式通知你：\n你的学籍已被取消。\n\n你站在包玉刚图书馆门口，看着来来往往的同学们，\n恍惚间觉得这一切像一场梦。\n\n辅导员拍了拍你的肩膀："回去好好想想，以后的路还很长。"\n\n你收拾好行李，最后看了一眼思源湖。\n也许有一天，你会以另一种身份回来。' };
  } else if (money <= 0) {
    main = { icon: '💸', title: '经济崩溃', rank: 'D',
      text: '你的钱包彻底见底了。\n\n交不起房租、买不起饭，最后不得不办理休学。\n\n你坐在宿舍里发了很久的呆，然后给家里打了个电话。\n\n这不是终点，只是一个教训：\n在大学里，理财也是必修课。' };
  } else if (gpa >= 3.9 && health >= 60 && mental >= 60 && money >= 40) {
    main = { icon: '🏆', title: '完美毕业 · 人生赢家', rank: 'SSS',
      text: '作为' + Game.CLASSES[playerClass].name + '，你以近乎满绩的成绩毕业，获得"上海市优秀毕业生"称号。\n\nGPA名列前茅（满绩4.3你拿了' + gpa.toFixed(1) + '），身体健康，心态阳光，经济独立。\n\n毕业典礼上，你回望四年——每一个选择，都成就了今天的你。\n\n交大，永远是你的家。' };
  } else if (gpa >= 3.5 && total >= 180) {
    main = { icon: '🎓', title: '优秀毕业生', rank: 'S',
      text: '你交出了一份优秀的答卷。GPA ' + gpa.toFixed(1) + '/4.3，在交大算得上出类拔萃。\n四年有挣扎有迷茫，但你始终没有放弃。\n\n未来的路很长，你已经准备好了。' };
  } else if (gpa >= 2.8 && total >= 120) {
    main = { icon: '😊', title: '顺利毕业', rank: 'A',
      text: '虽然不是最优秀的，但你用自己的方式走完了旅程。\n有遗憾也有收获。\n\n最重要的是——你毕业了。' };
  } else if (gpa >= 2.0) {
    main = { icon: '😓', title: '险险毕业', rank: 'B',
      text: '最后一个学期险象环生。好几门差点挂科，论文是DDL前一天才完成。\n\n但是——你毕业了！\n这份韧性，比任何成绩都重要。' };
  } else {
    main = { icon: '📜', title: '延期毕业', rank: 'C',
      text: '学分不够或GPA未达要求，需要延期一学期。\n\n这不是失败，只是多了一段旅程。\n很多成功的人都走过弯路。你没有放弃。' };
  }

  return { main: main, achievements: achievements };
};
