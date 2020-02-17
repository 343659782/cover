import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";

const STEAK_IMG_SRC = 'images/lettuce2.png';
const STEAK_WIDTH = 50;
const STEAK_HEIGHT = 20;

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
let tools = new Tools();

export default class Steak extends BaseFood {
    constructor() {
        super(STEAK_IMG_SRC, STEAK_WIDTH, STEAK_HEIGHT)
    }

    init(speed, score) {
        this.x = tools.rnd(0, window.innerWidth - STEAK_WIDTH);
        // this.x =0;
        this.y = -this.height;
        this[__.speed] = speed;
        this.visible = true;
        this.gain = false;
        this.name = "steak";
        this.score = score;
    }

    // 每一帧更新位置
    update() {
        if (this.gain) {
            return;
        }
        this.y += this[__.speed];
        // 超出屏幕外回收自身
        if (this.y > window.innerHeight + this.height)
            databus.removeSteak(this)
    }
}
