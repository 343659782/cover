/**
 * 游戏基础的食材类
 */
import sprite from "../base/sprite";

export default class BaseFood extends sprite {
    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        super(imgSrc, width, height, x, y);

        this.offsetY = 0;
    }
}
