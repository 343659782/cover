export default class ConfigData {
    //===========================饼干==============================
    // key
    static binggan_key = "binggan";
    // 饼干下落速度
    static binggan_fall_speed = 0;
    // 饼干接取得分
    static binggan_score = 0;
    // 饼干宽度
    static binggan_width = 0;
    // 饼干高度
    static binggan_height = 0;

//===========================蛋糕==============================
    // key
    static cake_key = "cake";
    // 蛋糕下落速度
    static cake_fall_speed = 0;
    // 蛋糕接取得分
    static cake_score = 0;
    // 蛋糕宽度
    static cake_width = 0;
    // 蛋糕高度
    static cake_height = 0;

//===========================橙子==============================
    // key
    static orange_key = "orange";
    // 橙子下落速度
    static orange_fall_speed = 0;
    // 橙子接取得分
    static orange_score = 0;
    // 橙子宽度
    static orange_width = 0;
    // 橙子高度
    static orange_height = 0;

//===========================关卡信息==========================
    static LevelData = [
        {
            index: 0,
            // 标题文字
            name_str: "第一关",
            // 过关分数条件
            pass_score: 100,
        },
        {
            index: 1,
            name_str: "第二关",
            pass_score: 100,
        },
        {
            index: 2,
            name_str: "第三关",
            pass_score: 100,
        },
    ];
}

