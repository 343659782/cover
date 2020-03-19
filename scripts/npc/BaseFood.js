/**
 * 游戏基础的食材类
 */
import DataBus from "../databus";
import animation from "../base/animation";

const MAX_LERP_INDEX = 10;

let databus = new DataBus();


export default class BaseFood extends animation {
    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        super(imgSrc, width, height, x, y);
        this.offsetY = 0;
        this.smooth = 8;
        this.targetX = 0;
        this.coverIndex = 0;
        this.poolKey = "";
        // 层叠盖住百分比
        this.heightPercent = 0.5;
        this.score = 0;
        this.speed = 5;

        // 旋转速度  分母越大旋转越快
        this.interval = 1000 / 5;
    }

    play() {
        this.playAnimation(0, false);
    }

    updatePosX(dt) {
        let originTargetX = this.targetX - this.width * 0.5;

        let distance = Math.abs(originTargetX - this.x);
        if (distance > 1) {
            let deltaIndex = (databus.gainFoodCount - this.coverIndex + 1);
            if (deltaIndex > 12) {
                deltaIndex = 12;
            }
            let delta = (originTargetX - this.x) * dt * this.smooth * deltaIndex;
            this.x += delta;
        } else {
            this.x = originTargetX;
        }
    }
}
