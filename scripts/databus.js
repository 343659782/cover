import Pool from './base/pool'
import ConfigData from "../ConfigData";

let instance;

/**
 * 全局状态管理器
 */
export default class DataBus {
    constructor() {
        if (instance)
            return instance;

        instance = this;

        this.pool = new Pool();

        this.restart()
    }

    // 重置游戏
    restart(){
        this.levelData = ConfigData.LevelData[0];
        this.reset();
    }

    // 重置一关
    reset() {
        this.frame = 0;
        this.score = 0;
        this.animations = [];
        this.topBreads = [];
        this.foods = [];
        this.gainFoodCount = 0;
        this.gameOver = false;
        this.gameFinish = false;
        this.levelOver = false;
    }

    /**
     * 回收子弹，进入对象池
     * 此后不进入帧循环
     */
    removeTopBreads(topBread) {
        let temp = this.topBreads.shift();
        temp.visible = false;
        this.pool.recover('topBread', topBread)
    }

    removeFood(food){
        let index = 0;
        for (let i = 0; i < this.foods.length; i++) {
            if (this.foods[i] === food) {
                index = i;
                break;
            }
        }

        let temp = this.foods[index];
        temp.visible = false;
        this.foods.splice(index, 1);
        this.pool.recover(food.poolKey, food);
    }
}
