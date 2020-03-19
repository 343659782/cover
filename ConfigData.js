export default class ConfigData {
    // key
    static binggan_key = "binggan";
    static cake_key = "cake";
    static orange_key = "orange";

//===========================食材信息==========================
    static Foods = {
        //===========================饼干==============================
        binggan: {
            // key
            key: ConfigData.binggan_key,
            // 食材名字
            name: "饼干",
            // 下落速度
            fall_speed: 0,
            // 动画速度 默认5
            anim_speed: 0,
            // 接取得分
            score: 0,
            // 图片宽度
            width: 0,
            // 图片高度
            height: 0,
            // 图片数量 0-3 是4张
            image_count: 0,
        },
        //===========================蛋糕==============================
        cake: {
            key: ConfigData.cake_key,
            name: "蛋糕",
            fall_speed: 0,
            // 动画速度 默认5
            anim_speed: 0,
            score: 0,
            width: 0,
            height: 0,
            image_count: 0,
        },
        //===========================橙子==============================
        orange: {
            key: ConfigData.orange_key,
            name: "橙子",
            fall_speed: 0,
            // 动画速度 默认5
            anim_speed: 0,
            score: 0,
            width: 0,
            height: 0,
            image_count: 0,
        }
    };


//===========================关卡信息==========================
    static LevelData = [
        {
            index: 0,
            // 标题文字
            name_str: "第一关",
            // 过关分数条件
            pass_score: 100,
            // 过滤的食材(不填为都可以接)
            filter_food: {
                // true 为只能接 false为不能接
                permit: true,
                // 过滤的食材
                foods: []
            }
        },
        {
            index: 1,
            name_str: "第二关",
            pass_score: 100,
            // 过滤的食材(不填为都可以接)
            filter_food: {
                // true 为只能接 false为不能接
                permit: false,
                // 过滤的食材
                foods: [
                    ConfigData.binggan_key,
                ]
            }
        },
        {
            index: 2,
            name_str: "第三关",
            pass_score: 100,
            // 过滤的食材(不填为都可以接)
            filter_food: {
                // true 为只能接 false为不能接
                permit: true,
                // 过滤的食材
                foods: [
                    ConfigData.cake_key,
                ]
            }
        },
    ];
}

