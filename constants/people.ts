
export interface Person {
  name: string;
  background: string;
}

export interface Category {
  category: string;
  people: Person[];
}

export const PEOPLE_DATA: Category[] = [
  {
    category: "初中时期（振华中学）",
    people: [
      { name: "徐说", background: "初中同学" },
      { name: "黄礼姝", background: "初中同学" },
      { name: "刘逸凡", background: "初中同学/游戏队友" },
      { name: "黄晨", background: "初中同学/游戏队友" },
      { name: "史轶", background: "通过游戏认识的朋友" },
      { name: "吴斌", background: "初中同学" },
      { name: "朱一鸣", background: "初中同学" },
      { name: "邓礼鸣", background: "初中同学" },
      { name: "牟英才", background: "初中同学，后移民加拿大" },
      { name: "刘易", background: "初中班长" },
      { name: "沈翃", background: "初中班主任" },
      { name: "陆铭洲", background: "初中同学" },
      { name: "史晨静", background: "高中同学" }
    ]
  },
  {
    category: "高中时期（苏州十中）",
    people: [
      { name: "高丁逸", background: "干嘛搜我哈哈哈~你发现了彩蛋！爱你❤" },
      { name: "沈思为", background: "为子，感谢你在高中第一天就和我成为了好朋友，我永远把你当作非常非常好的兄弟，我们认识12年了，希望一直保持联络到老！" },
      { name: "陆之渊", background: "渊哥，怀念我们大学时期一直一起玩游戏的时光，那时候多开心啊！虽然现在的生活也还行。我在心底一直把你当作最好的兄弟之一的，我相信你能感觉到，祝我们在30岁这个阶段，都能获得想要的一切！加油。" },
      { name: "戴承启", background: "老戴，好兄弟，羡慕你的豁达，现在还和那人是好朋友，我就不行哈哈哈。还羡慕你的厉害，我得向你学习争取早点有所成就，你是我的榜样。" },
      { name: "庄汉禹", background: "签，好久没联系，没想到你会看到这里，如果有机会多参加大家的活动吧，或者私下见见hh！" },
      { name: "李俊杰", background: "老李，好久没联系，感谢你在我高中离家出走的时候帮忙找我，我一直记得，谢谢你。" },
      { name: "何轶宁", background: "高中同学" },
      { name: "谢越", background: "谢越，怀念大学时期一起玩pubg哈哈，我还记得有一次就我俩玩沙漠地图最后还吃鸡了！现在可好？欢迎联系呀，看你也在上海～" },
      { name: "王子雨", background: "过去的都过去了吧，小说完结了。" },
      { name: "陆毅清", background: "长颈鹿，你一定一定要幸福。" },
      { name: "徐凯扬", background: "凯子！虽然我真的社交方面很懒惰，不会主动联系你，但是我把你也当好兄弟！婚姻和事业都要一直顺利！" },
      { name: "王品乘", background: "pp，你玩狼人杀和唱歌真厉害，respect！" },
      { name: "章超立", background: "嘴哥，感觉你以后是大官，别忘了我哈哈哈" },
      { name: "史轶", background: "你好呀，没想到你会看到这里哈哈哈，要幸福呀~" }
    ]
  },
  {
    category: "大学时期（山东工艺美术学院）",
    people: [
      { name: "李建兴", background: "建筑系学长" },
      { name: "王翼鹏", background: "狗鹏，好久没有联系，感谢大学时期的照顾~经常去你家添麻烦，有机会去济南一定找你叙叙旧。" },
      { name: "封硕", background: "bro，看到这里啦哈哈哈哈，赶紧找对象，有机会一起出去旅游！" },
      { name: "倪力", background: "你好，大学同学" },
      { name: "郭宇轩", background: "你好，大学同学" },
      { name: "杨春程", background: "你好，大学同学" },
      { name: "徐明祎", background: "你好，大学同学" },
      { name: "王之豪", background: "你好，大学同学" },
      { name: "耿梓铭", background: "你好，大学同学" },
      { name: "汪曾真", background: "曾哥，至今还记得你大学第一天的小苹果哈哈哈" },
      { name: "欧阳雨倩", background: "你好，大学同学" },
      { name: "杨公川", background: "你好，大学同学" },
      { name: "徐民彦", background: "徐老师，你是我最喜欢的大学老师！敬重您，有机会一定还会去拜访您的！" }
    ]
  },
  {
    category: "研究生时期（上海）",
    people: [
      { name: "张乐天", background: "乐天，别来无恙！有机会见！" },
      { name: "齐心语", background: "齐总？说好的聚餐呢？不要忘记了，上次还给你买礼物了哈哈哈都没送出去。归我自己了哼哈哈哈～" },
      { name: "游文彦", background: "你好，研究生同学" },
      { name: "李子明", background: "你好，研究生同学" },
      { name: "蒋飞", background: "飞哥！想你，但是我没啥做的好的，没脸去见你哈哈哈。您是我最好的研究生导师，是我一直尊敬佩服的偶像！" },
      { name: "王帅", background: "你好，研究生同学" },
      { name: "郑超文", background: "你好呀，好好的。" },
      { name: "李家曦", background: "你好，扎西德勒" },
      { name: "谢伟迹", background: "谢谢，少喝点" },
      { name: "李天宇", background: "你好，最牛逼的学弟" },
      { name: "孙晓玲", background: "你好，本硕学妹" },
      { name: "董晶艺", background: "你好，小艺。" },
      { name: "巫玉洁", background: "你好，小巫。" },
      { name: "赵心蕊", background: "你好，4心，要幸福呀。" },
      { name: "陆步", background: "步哥，眼看你越来越牛，作品越来越棒，真心感到敬佩！谢谢陆哥曾经带我经历过一段难忘的时光！" },
      { name: "郑丽君", background: "司令官！问好，你现在也是老师啦哈哈哈respect！希望早日听到你的好消息～" }
    ]
  },
  {
    category: "工作与近期生活",
    people: [
      { name: "Paul", background: "工作同事" },
      { name: "陈璐", background: "璐璐姐！你都看到这个我会不好意思的哈哈哈，璐璐姐是世界上最棒的领导！" },
      { name: "薛黎蓓", background: "薛老师好～谢谢您的关照～" },
      { name: "万雅欣", background: "工作同事" },
      { name: "吕颖婷", background: "你好，再见" },
      { name: "牛雯庆", background: "爱你哦宝宝，我先在30岁等你咯～希望我们今年顺利结婚哈哈哈，一起度过每一天😘" },
      { name: "张世超", background: "你好，研究生同学" },
      { name: "张子涵", background: "你好呀，张奶奶，苟富贵勿相忘！" }
    ]
  }
];
