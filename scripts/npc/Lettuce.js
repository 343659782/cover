import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";

const LETTUCE_IMG_SRC = 'images/lettuce.png';
const LETTUCE_WIDTH = 70;
const LETTUCE_HEIGHT = 20;

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
let tools = new Tools();

export default class Lettuce extends BaseFood {
    constructor() {
        super(LETTUCE_IMG_SRC, LETTUCE_WIDTH, LETTUCE_HEIGHT)
    }

    init(speed, score) {
        this.x = tools.rnd(0, window.innerWidth - LETTUCE_WIDTH);
        // this.x =0;
        this.y = -this.height;
        this[__.speed] = speed;
        this.visible = true;
        this.gain = false;
        this.name = "lettuce";
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
            databus.removeLettuces(this)
    }
}
