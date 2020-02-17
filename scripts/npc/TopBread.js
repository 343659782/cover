import DataBus   from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";

const TOP_BREAD_IMG_SRC = 'images/bot_bread.png';
const TOP_BREAD_WIDTH   = 60;
const TOP_BREAD_HEIGHT  = 20;

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
let tools = new Tools();

export default class TopBread extends BaseFood {
    constructor() {
        super(TOP_BREAD_IMG_SRC, TOP_BREAD_WIDTH, TOP_BREAD_HEIGHT)
    }

    init(speed) {
        this.x = tools.rnd(0, window.innerWidth - TOP_BREAD_WIDTH);
        this.y = -this.height;

        this[__.speed] = speed;

        this.visible = true
    }

    // 每一帧更新位置
    update() {
        this.y += this[__.speed];

        // 对象回收
        if ( this.y > window.innerHeight + this.height )
            databus.removeTopBreads(this)
    }
}
