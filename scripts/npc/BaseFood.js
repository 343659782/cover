/**
 * 游戏基础的食材类
 */
import sprite from "../base/sprite";
import DataBus from "../databus";

const MAX_LERP_INDEX = 10;

let databus = new DataBus();


export default class BaseFood extends sprite {
    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        super(imgSrc, width, height, x, y);
        this.offsetY = 0;
        this.smooth = 2;
        this.targetX = 0;
        this.coverIndex = 0;
    }

    updatePosX(dt) {
        let originTargetX = this.targetX - this.width * 0.5;

        let distance = Math.abs(originTargetX - this.x);
        if (distance > 1) {
            this.x = this.x + (originTargetX - this.x) * dt * this.smooth;
        } else {
            this.x = originTargetX;
        }
    }
}
