/* 所有学校、人物、通知与服务信息均为演示数据。 */
window.CAMPUS_DATA = {
  schools: [
    {
      id: 'qinghe',
      name: '青禾大学',
      shortName: '青禾',
      englishName: 'Qinghe University',
      city: '杭州',
      college: '设计与创新学院',
      student: {
        name: '林同学',
        id: '2024001086',
        major: '数字媒体艺术',
        grade: '2024级'
      },
      notices: [
        {
          id: 'qinghe-notice-1',
          title: '秋季学期图书馆延长开放，晚归也有好去处',
          summary: '即日起，主馆二层自习区开放至 23:00，记得带上校园卡。',
          body: '期中学习周临近，青禾图书馆主馆二层自习区在演示学期内延长开放至 23:00。其他阅览区域仍于 22:00 关闭。\n\n22:00 后请从东侧入口进出，携带校园卡，并保持安静。座位可在校园服务中的“自习室预约”入口查看；临时离开超过 30 分钟请释放座位，给下一位同学留一个位置。\n\n本条为校园平台功能演示，不代表真实开放安排。',
          category: '学校',
          source: '图书馆',
          date: '2026-10-24',
          urgent: false,
          readTime: '3分钟前'
        },
        {
          id: 'qinghe-notice-2',
          title: '请在周一前确认你的专业选修课意向',
          summary: '2024级数字媒体艺术专业选修意向收集将于 10月26日 18:00 截止。',
          body: '本次收集面向设计与创新学院 2024级数字媒体艺术专业同学，用于了解下学期选修课需求，并非正式选课。\n\n请在 10月26日 18:00 前进入学院教学服务入口，按个人兴趣选择最多三门课程。提交后可在截止前修改。若暂时没有明确方向，可以选择“希望先了解课程介绍”。\n\n正式课程安排以后续教务通知为准。本条为演示通知。',
          category: '学院',
          source: '设计与创新学院',
          date: '2026-10-24',
          urgent: true,
          readTime: '18分钟前'
        },
        {
          id: 'qinghe-notice-3',
          title: '校园音乐节志愿者招募，欢迎一起搭建舞台',
          summary: '需要现场引导、舞台协助与影像记录伙伴，零经验也可以报名。',
          body: '青禾声浪社正在为秋日校园音乐节招募活动志愿者。你可以根据空闲时间选择现场引导、舞台协助或影像记录。活动前会安排一次简短说明会。\n\n请先查看活动日程，再选择能够完整参加的时段。报名成功后，活动卡片会出现在“我的日程”中；如临时无法参加，请提前取消报名。\n\n志愿服务记录与具体安排均为演示内容，不作真实学分或时长承诺。',
          category: '社团',
          source: '声浪音乐社',
          date: '2026-10-24',
          urgent: false,
          readTime: '35分钟前'
        },
        {
          id: 'qinghe-notice-4',
          title: '周日校园接驳车临时调整路线',
          summary: '因校园道路养护，10月25日“艺术楼站”临时移至南门广场。',
          body: '为配合校园道路养护，10月25日 08:00 至 17:00，接驳车不经停艺术楼站，临时停靠点设在南门广场指示牌旁。其他站点及发车间隔保持演示设定。\n\n需要前往艺术楼的同学，可在南门广场下车后沿步行道通行，预留约 8 分钟。雨天请注意地面湿滑。\n\n本条为演示路线变更，请勿据此安排真实出行。',
          category: '学校',
          source: '校园服务中心',
          date: '2026-10-24',
          urgent: false,
          readTime: '1小时前'
        },
        {
          id: 'qinghe-notice-5',
          title: '工作坊开放：把你的第一版作品带来聊聊',
          summary: '周三晚开放作品交流，欢迎带着草图、模型或还没想清楚的问题参加。',
          body: '学院创意工作坊将在下周三晚开放“作品进行时”交流。每位同学可用 5 分钟介绍一件正在创作的作品，也可以只来听听。\n\n不要求完整成品，草图、交互原型、摄影小样都欢迎。请提前准备一张作品图片和一个最希望得到反馈的问题。现场名额有限，请通过活动入口查看演示报名状态。\n\n本条为演示学院资讯。',
          category: '学院',
          source: '设计与创新学院',
          date: '2026-10-24',
          urgent: false,
          readTime: '2小时前'
        },
        {
          id: 'qinghe-notice-6',
          title: '摄影社周末漫游：一起收藏校园的秋天',
          summary: '手机也能参加，从湖畔出发，记录属于你的校园角落。',
          body: '光影摄影社本周末组织校园秋日漫游，路线从湖畔草坪出发，经过老教学楼、银杏步道与北区小广场，全程约 90 分钟。\n\n手机、相机均可参加，社员会分享简单的构图和光线观察方法。请穿舒适的鞋子，自备饮水。遇雨将调整为室内作品分享，变更会在活动详情内同步。\n\n本条为演示社团通知。',
          category: '社团',
          source: '光影摄影社',
          date: '2026-10-24',
          urgent: false,
          readTime: '3小时前'
        }
      ],
      events: [
        {
          id: 'qinghe-event-1',
          title: '秋日草坪音乐会',
          subtitle: '把周末留给音乐和晚风',
          club: '声浪音乐社',
          category: '文艺',
          time: '16:30–18:30',
          date: '10月25日 周日',
          location: '南湖草坪',
          capacity: 120,
          joined: 86,
          cover: 'assets/event-music.svg',
          description: '找一个草坪上的位置，和同学一起听木吉他、独立乐队与熟悉的校园旋律。欢迎带上野餐垫，也欢迎一个人来。活动结束请带走身边垃圾；如遇下雨，会在活动详情中发布场地调整。此为演示活动。'
        },
        {
          id: 'qinghe-event-2',
          title: '沿着校园，慢跑五公里',
          subtitle: '不用追配速，和秋天一起呼吸',
          club: '青禾跑步社',
          category: '运动',
          time: '07:30–08:30',
          date: '10月25日 周日',
          location: '东操场集合',
          capacity: 40,
          joined: 27,
          cover: 'assets/event-outdoor.svg',
          description: '适合想开始跑步的同学。一起热身后沿校园慢跑，可根据状态选择三公里或五公里，最后做拉伸。请穿适合运动的鞋，量力参加，自备饮水。此为演示活动。'
        },
        {
          id: 'qinghe-event-3',
          title: '周末放映室：关于青春的故事',
          subtitle: '看完一部电影，再交换一个想法',
          club: '银幕电影社',
          category: '文艺',
          time: '19:00–21:30',
          date: '10月25日 周日',
          location: '学生活动中心 201',
          capacity: 60,
          joined: 42,
          cover: 'assets/event-film.svg',
          description: '一次轻松的主题放映与映后交流，围绕成长、选择和友谊聊聊自己的感受。不需要影评知识，也不用提前做功课。片目及放映授权信息将在真实活动确认后单独公告，本页面仅演示报名功能。'
        },
        {
          id: 'qinghe-event-4',
          title: '旧书交换，让好故事继续旅行',
          subtitle: '带来一本书，遇见另一位读者',
          club: '微光志愿者协会',
          category: '公益',
          time: '14:00–16:00',
          date: '10月28日 周三',
          location: '图书馆前广场',
          capacity: 100,
          joined: 64,
          cover: 'assets/event-outdoor.svg',
          description: '带一本整洁、适合分享的书，写下推荐理由，现场自由交换。教材、文学、艺术与科普书籍都欢迎，无法当场交换的书可以自行带回。请勿携带个人证件或夹有隐私资料的书籍。此为演示活动。'
        },
        {
          id: 'qinghe-event-5',
          title: '设计夜谈：从一个好问题开始',
          subtitle: '用身边的小观察，开启新的创作',
          club: '创意实践社',
          category: '学术',
          time: '19:00–20:30',
          date: '10月29日 周四',
          location: '设计楼 302',
          capacity: 45,
          joined: 31,
          cover: 'assets/event-film.svg',
          description: '以校园生活中的一个小问题为起点，分组讨论用户需求，尝试画出一个初步方案。无需设计基础，带着好奇心就可以参与。此为演示活动。'
        }
      ],
      courses: [
        { id: 'qinghe-course-1', name: '设计思维', teacher: '陈老师', location: '设计楼 A302', weekday: 1, start: '08:00', end: '09:35', period: '1–2节', color: 'green', weeks: '1–16周' },
        { id: 'qinghe-course-2', name: '大学英语', teacher: '许老师', location: '知行楼 204', weekday: 1, start: '14:00', end: '15:35', period: '5–6节', color: 'blue', weeks: '1–16周' },
        { id: 'qinghe-course-3', name: '交互设计基础', teacher: '周老师', location: '设计楼 B205', weekday: 2, start: '10:00', end: '11:35', period: '3–4节', color: 'purple', weeks: '1–16周' },
        { id: 'qinghe-course-4', name: '影像叙事', teacher: '沈老师', location: '传媒楼 108', weekday: 2, start: '14:00', end: '15:35', period: '5–6节', color: 'peach', weeks: '1–16周' },
        { id: 'qinghe-course-5', name: '艺术与生活', teacher: '林老师', location: '博雅楼 301', weekday: 3, start: '08:00', end: '09:35', period: '1–2节', color: 'blue', weeks: '1–16周' },
        { id: 'qinghe-course-6', name: '数字图像处理', teacher: '方老师', location: '设计楼机房 402', weekday: 3, start: '14:00', end: '15:35', period: '5–6节', color: 'green', weeks: '1–16周' },
        { id: 'qinghe-course-7', name: '用户体验研究', teacher: '顾老师', location: '设计楼 A305', weekday: 4, start: '10:00', end: '11:35', period: '3–4节', color: 'purple', weeks: '1–16周' },
        { id: 'qinghe-course-8', name: '体育 · 羽毛球', teacher: '陆老师', location: '体育馆 2号场', weekday: 4, start: '16:00', end: '17:35', period: '7–8节', color: 'peach', weeks: '1–16周' },
        { id: 'qinghe-course-9', name: '创意编程', teacher: '吴老师', location: '创新楼 306', weekday: 5, start: '10:00', end: '11:35', period: '3–4节', color: 'blue', weeks: '1–16周' },
        { id: 'qinghe-course-10', name: '设计思维', teacher: '陈老师', location: '设计楼 A302', weekday: 6, start: '08:00', end: '09:35', period: '1–2节', color: 'green', weeks: '1–16周' },
        { id: 'qinghe-course-11', name: '交互设计基础', teacher: '周老师', location: '设计楼 B205', weekday: 6, start: '10:00', end: '11:35', period: '3–4节', color: 'purple', weeks: '1–16周' },
        { id: 'qinghe-course-12', name: '数字媒体工作坊', teacher: '方老师', location: '创新工坊 101', weekday: 6, start: '14:00', end: '15:35', period: '5–6节', color: 'peach', weeks: '1–16周' }
      ],
      guides: [
        {
          id: 'qinghe-guide-1', title: '找个安静座位：自习室怎么预约', category: '学习', summary: '选好校区和时段，给专注留一个位置。', location: '图书馆主馆 / 学习空间', hours: '主馆 07:30–23:00（演示）',
          steps: ['打开校园服务中的“自习室预约”，选择日期与时段。', '查看座位设施，按需选择电源区或安静区。', '到馆后在预约页面完成签到，临时离开请按页面提示保留座位。', '不再使用时及时签退；实际开放与预约规则以学校公告为准。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'qinghe-guide-2', title: '打印装订去哪儿，一次带齐材料', category: '学习', summary: '课程作业、作品集和报告打印的校园小指南。', location: '生活服务中心 1层', hours: '周一至周日 08:30–21:00（演示）',
          steps: ['先将文件导出为 PDF，检查页码、尺寸与字体。', '到店说明单双面、纸张与装订方式，并确认演示价目。', '大批量打印先试印一份，检查颜色与裁切。', '取件后核对页数，及时删除公共设备中的个人文件。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'qinghe-guide-3', title: '校园卡找不到了，先挂失再补办', category: '办事', summary: '先保护账户，再查看补卡需要的材料。', location: '综合服务大厅 3号窗口', hours: '工作日 09:00–12:00 / 13:30–16:30（演示）',
          steps: ['进入校园卡服务查看挂失入口；本 Demo 不执行真实挂失。', '按校方要求准备学生身份证明与补卡申请材料。', '到服务大厅核验身份，确认是否产生补卡费用。', '领卡后检查账户与门禁状态，原卡恢复使用规则请向窗口确认。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'qinghe-guide-4', title: '宿舍报修：问题描述清楚，师傅少跑一趟', category: '生活', summary: '水电、家具和网络问题都能从这里找到处理入口。', location: '后勤服务中心 / 线上报修', hours: '线上可提交；处理时段依工单类别（演示）',
          steps: ['选择宿舍楼与房间号，填写可以联系到你的方式。', '选择报修类型，描述现象并上传不含隐私的现场照片。', '填写方便上门的时段，提交后保存工单编号。', '维修完成后确认结果；漏电等紧急情况请优先联系真实值班人员。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'qinghe-guide-5', title: '收快递不用绕路：校园驿站指南', category: '生活', summary: '看看取件位置和开放时间，顺路带走包裹。', location: '东区生活广场后侧', hours: '09:00–20:30（演示）',
          steps: ['收到到站通知后，确认包裹所在驿站。', '准备取件码，到相应区域核对收件人信息。', '检查包裹外观，有破损先与驿站工作人员确认。', '大件或暂时无法领取的包裹，提前咨询保管与搬运安排。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'qinghe-guide-6', title: '在读证明与成绩单，申请前看这里', category: '办事', summary: '需要中英文材料时，先确认用途、份数与格式。', location: '知行楼 1层自助服务区', hours: '工作日 08:30–17:00（演示）',
          steps: ['先向接收方确认材料语言、盖章与密封要求。', '通过教务服务入口查看可申请的材料类型。', '核对姓名与学籍信息后，按学校流程申请或打印。', '领取时检查信息；需要更正请联系教务服务人员。'], phone: '000-0000-0000（演示）'
        }
      ],
      clubs: [
        { id: 'qinghe-club-1', name: '光影摄影社', category: '文艺', description: '从手机摄影到胶片漫游，和我们一起观察校园里的光。', members: 128, icon: 'camera' },
        { id: 'qinghe-club-2', name: '声浪音乐社', category: '文艺', description: '排练、创作和草坪弹唱，总有一段旋律属于你。', members: 216, icon: 'music' },
        { id: 'qinghe-club-3', name: '微光志愿者协会', category: '公益', description: '从一次旧书交换开始，让身边的小事变得更好。', members: 186, icon: 'heart' },
        { id: 'qinghe-club-4', name: '青禾跑步社', category: '运动', description: '新手友好的校园慢跑，沿途有风，也有同行的伙伴。', members: 94, icon: 'run' }
      ]
    },
    {
      id: 'nanchuan',
      name: '南川理工大学',
      shortName: '南川',
      englishName: 'Nanchuan Institute of Technology',
      city: '成都',
      college: '计算机与智能工程学院',
      student: {
        name: '林同学',
        id: '2024001086',
        major: '软件工程',
        grade: '2024级'
      },
      notices: [
        {
          id: 'nanchuan-notice-1', title: '创新实验室周末开放，预约前看这份说明', summary: '开放工位、基础设备与小组讨论空间，首次使用需完成入场说明。',
          body: '南川创新实验室本周末开放学生项目工位与讨论空间。首次到访的同学，请先在实验室服务入口阅读设备使用说明，并选择合适的预约时段。\n\n个人电脑可以带入；需要借用设备的同学，请填写用途并等待管理员确认。预约成功不代表获得全部设备使用资格，具体依现场说明执行。\n\n本条为校园平台演示通知。', category: '学校', source: '创新实践中心', date: '2026-10-24', urgent: false, readTime: '5分钟前'
        },
        {
          id: 'nanchuan-notice-2', title: '软件工程课程项目分组确认将于周一截止', summary: '请2024级同学核对组员与选题，有问题及时联系课程助教。',
          body: '软件工程课程项目分组确认将于 10月26日 18:00 结束。请每组指定一位同学在课程平台提交组员、选题和简短的问题描述。\n\n提交后请组员相互核对，避免遗漏或重复加入。尚未找到小组的同学，可在课堂交流区登记，由助教按实际情况协助匹配。\n\n页面中的教师与课程信息均为演示数据。', category: '学院', source: '计算机与智能工程学院', date: '2026-10-24', urgent: true, readTime: '12分钟前'
        },
        {
          id: 'nanchuan-notice-3', title: '新手也欢迎：开源共学小组开始招募', summary: '一起读懂一个小项目，完成第一次代码协作。',
          body: '代码与咖啡社开启本学期的开源共学计划。活动从版本管理与阅读项目说明开始，逐步尝试文档修改、问题复现和简单功能讨论。\n\n不要求已有开源贡献经历，欢迎带着问题参与。请自行准备电脑，真实软件环境与项目选择以活动组织方后续公告为准。\n\n本条仅演示社团招募流程。', category: '社团', source: '代码与咖啡社', date: '2026-10-24', urgent: false, readTime: '30分钟前'
        },
        {
          id: 'nanchuan-notice-4', title: '北区运动场周日上午部分区域维护', summary: '跑道北侧暂缓通行，健身可选择西区操场。',
          body: '10月25日 08:00 至 12:00，北区运动场跑道北侧进行日常维护。请按现场指引绕行，不进入围挡区域。\n\n计划晨练的同学可选择西区操场，球场开放情况请查看场馆预约页面。维护完成时间如有变化，将在此通知中更新。\n\n本条为演示设施通知，不代表真实维护安排。', category: '学校', source: '校园运行中心', date: '2026-10-24', urgent: false, readTime: '1小时前'
        },
        {
          id: 'nanchuan-notice-5', title: '算法午间谈：从一道题聊到一种思路', summary: '下周二开放交流，不排名、不竞速，欢迎带题讨论。',
          body: '学院学习支持小组将在下周二中午开展算法交流，从一个具体问题出发，讨论如何拆解条件、选择数据结构与检查边界情况。\n\n欢迎带来卡住自己的题目，现场先独立思考，再交换解法。内容面向已有程序设计基础的同学，参加前无需额外准备。\n\n本条为演示学院活动通知。', category: '学院', source: '计算机与智能工程学院', date: '2026-10-24', urgent: false, readTime: '2小时前'
        },
        {
          id: 'nanchuan-notice-6', title: '周末山野徒步，先看路线再报名', summary: '短程轻徒步，行前说明会将介绍装备、天气与集合安排。',
          body: '南川山野社拟开展周末轻徒步交流活动。请报名同学完整查看路线、强度与活动说明，根据个人情况决定是否参加。\n\n请穿防滑运动鞋，自备饮水与简单补给。天气或道路条件不适合时，活动会延期并在详情页更新。活动内容、地点和组织均为演示，不构成真实出行邀请。', category: '社团', source: '南川山野社', date: '2026-10-24', urgent: false, readTime: '3小时前'
        }
      ],
      events: [
        {
          id: 'nanchuan-event-1', title: '日落音乐角', subtitle: '在理工校园里，给感性一点时间', club: '回声音乐社', category: '文艺', time: '17:00–18:30', date: '10月25日 周日', location: '西区银杏广场', capacity: 90, joined: 58, cover: 'assets/event-music.svg', description: '从一把吉他开始，唱几首喜欢的歌。可以听，也可以在报名时留言想分享的曲目。现场设有轻声交流区，请共同维护舒适的聆听氛围。此为演示活动。'
        },
        {
          id: 'nanchuan-event-2', title: '银杏步道轻徒步', subtitle: '走一段路，认识一些新朋友', club: '南川山野社', category: '运动', time: '09:00–11:00', date: '10月25日 周日', location: '南门集合点', capacity: 35, joined: 24, cover: 'assets/event-outdoor.svg', description: '以校园周边步行为主题的轻量活动，含热身、观察记录与行后交流。请先了解演示路线强度，自备饮水，按天气准备衣物。此页面不构成真实出行邀请。'
        },
        {
          id: 'nanchuan-event-3', title: '周末科学纪录片之夜', subtitle: '从一个问题出发，看见更大的世界', club: '星野科学社', category: '学术', time: '19:00–21:00', date: '10月25日 周日', location: '理学楼 106', capacity: 80, joined: 53, cover: 'assets/event-film.svg', description: '围绕科学探索主题开展放映和交流，欢迎提出你在片中产生的问题。无需专业背景，也不要求发言。片目与放映安排为演示，真实授权需另行确认。'
        },
        {
          id: 'nanchuan-event-4', title: '第一次开源协作工作坊', subtitle: '把一个想法，变成大家能一起做的小项目', club: '代码与咖啡社', category: '学术', time: '14:00–16:00', date: '10月28日 周三', location: '创新中心 208', capacity: 50, joined: 37, cover: 'assets/event-film.svg', description: '通过一个小型示例体验项目说明、分工、讨论和协作流程。请自带电脑，活动前会在详情页更新演示准备清单。新手可以从文档和体验反馈开始参与。此为演示活动。'
        },
        {
          id: 'nanchuan-event-5', title: '修好一件小物，让它再用久一点', subtitle: '校园旧物整理与维修经验分享', club: '暖阳志愿者协会', category: '公益', time: '14:00–16:00', date: '10月31日 周六', location: '学生活动中心 1层', capacity: 60, joined: 29, cover: 'assets/event-outdoor.svg', description: '分享日常物品保养、整理和基础维修经验，讨论哪些物品适合自行处理，哪些应交给专业人员。现场不开展电池、带电设备等高风险拆修。此为演示活动。'
        }
      ],
      courses: [
        { id: 'nanchuan-course-1', name: '数据结构', teacher: '何老师', location: '明理楼 301', weekday: 1, start: '08:00', end: '09:35', period: '1–2节', color: 'green', weeks: '1–16周' },
        { id: 'nanchuan-course-2', name: '离散数学', teacher: '赵老师', location: '求真楼 205', weekday: 1, start: '14:00', end: '15:35', period: '5–6节', color: 'purple', weeks: '1–16周' },
        { id: 'nanchuan-course-3', name: '计算机组成原理', teacher: '郑老师', location: '明理楼 204', weekday: 2, start: '10:00', end: '11:35', period: '3–4节', color: 'blue', weeks: '1–16周' },
        { id: 'nanchuan-course-4', name: '大学英语', teacher: '邹老师', location: '博学楼 108', weekday: 2, start: '14:00', end: '15:35', period: '5–6节', color: 'peach', weeks: '1–16周' },
        { id: 'nanchuan-course-5', name: '软件工程导论', teacher: '唐老师', location: '创新中心 302', weekday: 3, start: '08:00', end: '09:35', period: '1–2节', color: 'green', weeks: '1–16周' },
        { id: 'nanchuan-course-6', name: '程序设计实践', teacher: '宋老师', location: '计算机实验楼 402', weekday: 3, start: '14:00', end: '15:35', period: '5–6节', color: 'blue', weeks: '1–16周' },
        { id: 'nanchuan-course-7', name: '概率论与数理统计', teacher: '蒋老师', location: '求真楼 306', weekday: 4, start: '10:00', end: '11:35', period: '3–4节', color: 'purple', weeks: '1–16周' },
        { id: 'nanchuan-course-8', name: '体育 · 篮球', teacher: '魏老师', location: '西区篮球场', weekday: 4, start: '16:00', end: '17:35', period: '7–8节', color: 'peach', weeks: '1–16周' },
        { id: 'nanchuan-course-9', name: '信息技术与社会', teacher: '杜老师', location: '博学楼 203', weekday: 5, start: '10:00', end: '11:35', period: '3–4节', color: 'green', weeks: '1–16周' },
        { id: 'nanchuan-course-10', name: '数据结构', teacher: '何老师', location: '明理楼 301', weekday: 6, start: '08:00', end: '09:35', period: '1–2节', color: 'green', weeks: '1–16周' },
        { id: 'nanchuan-course-11', name: '计算机组成原理', teacher: '郑老师', location: '明理楼 204', weekday: 6, start: '10:00', end: '11:35', period: '3–4节', color: 'blue', weeks: '1–16周' },
        { id: 'nanchuan-course-12', name: '软件项目实践', teacher: '唐老师', location: '创新中心 302', weekday: 6, start: '14:00', end: '15:35', period: '5–6节', color: 'purple', weeks: '1–16周' }
      ],
      guides: [
        {
          id: 'nanchuan-guide-1', title: '实验室预约，先选工位再确认设备', category: '学习', summary: '课程项目和小组协作，都能找到合适的空间。', location: '创新中心 2层', hours: '周一至周日 09:00–21:00（演示）',
          steps: ['在实验室服务中选择工位、讨论室或设备申请。', '查看使用条件，首次入场先阅读并完成基础说明。', '填写用途、人数与时段，等待需要审核的设备申请确认。', '结束后整理工位、归还物品，并在预约页面签退。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'nanchuan-guide-2', title: '校园网络连接不稳，先做这几步', category: '学习', summary: '从账号状态到现场报障，快速找到合适的处理入口。', location: '信息服务大厅 / 线上服务台', hours: '工作日 09:00–17:00（演示）',
          steps: ['检查设备连接的网络名称，确认不是陌生热点。', '通过学校官方入口查看账号状态与设备数量。', '记录问题发生的时间、位置与设备提示信息。', '提交报障时附上不含密码的截图，不向他人发送登录凭据。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'nanchuan-guide-3', title: '学生证明与成绩单，如何准备', category: '办事', summary: '先问清材料要求，再走线上或线下申请流程。', location: '行政楼 1层学生服务区', hours: '工作日 08:30–12:00 / 14:00–17:00（演示）',
          steps: ['确认接收方需要的语言、份数和盖章方式。', '打开教务服务查看可办理的材料清单。', '核对个人信息，按提示提交演示申请。', '真实材料请通过校方系统领取；需要密封或特殊格式时提前咨询。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'nanchuan-guide-4', title: '宿舍设施坏了，怎么提交报修', category: '生活', summary: '说清位置、现象和方便上门的时间，处理更顺畅。', location: '后勤事务中心 / 线上报修', hours: '线上可提交；处理安排依工单状态（演示）',
          steps: ['选择楼栋、房间和设施类别。', '描述具体问题，上传避开个人物品的照片。', '留下可联系时段，保存工单编号以便查询。', '出现紧急危险时，停止使用相关设施并联系真实值班人员。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'nanchuan-guide-5', title: '校区接驳，出发前看看站点', category: '生活', summary: '跨区上课和办事前，确认方向、上车点与时间。', location: '南门站 / 北区教学站', hours: '07:00–21:00（演示）',
          steps: ['在接驳服务中选择出发站与目的地。', '核对工作日、周末和节假日时刻安排。', '提前到站，按现场标识排队并准备校园身份凭证。', '本页面时刻为演示，真实出行请以校方最新公告为准。'], phone: '000-0000-0000（演示）'
        },
        {
          id: 'nanchuan-guide-6', title: '校园卡遗失，挂失与补办指南', category: '办事', summary: '先找到官方挂失入口，再准备身份证明。', location: '学生服务大厅 2号窗口', hours: '工作日 09:00–12:00 / 14:00–16:30（演示）',
          steps: ['进入学校官方校园卡服务，查找挂失入口。', '核对相关账户状态，按官方提示处理；Demo 不操作真实账户。', '准备学生身份证明，查看补卡是否需要预约或缴费。', '领卡后按校方要求检查门禁、消费等权限。'], phone: '000-0000-0000（演示）'
        }
      ],
      clubs: [
        { id: 'nanchuan-club-1', name: '镜头记录社', category: '文艺', description: '拍下银杏、实验室和忙碌的同学，把普通一天记录下来。', members: 102, icon: 'camera' },
        { id: 'nanchuan-club-2', name: '回声音乐社', category: '文艺', description: '下课后一起排练，让喜欢的旋律在校园里回响。', members: 174, icon: 'music' },
        { id: 'nanchuan-club-3', name: '暖阳志愿者协会', category: '公益', description: '从旧物分享、校园服务到社区陪伴，一起做些小事。', members: 203, icon: 'heart' },
        { id: 'nanchuan-club-4', name: '南川山野社', category: '运动', description: '从校园步道走向自然，认真准备，轻松同行。', members: 86, icon: 'run' }
      ]
    }
  ]
};
