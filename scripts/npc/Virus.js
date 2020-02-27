import Animation from '../base/animation'
import DataBus from '../databus'
import Tools from '../utils/Tools'
import BaseFood from "./BaseFood";

const VIRUS_IMG_SRC = 'images/virus_1.png';
const VIRUS_WIDTH = 40;
const VIRUS_HEIGHT = 40;

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus();
let tools = new Tools();

export default class Virus extends BaseFood {
    constructor() {
        super("", VIRUS_WIDTH, VIRUS_HEIGHT);

        this.initExplosionAnimation();
        this.interval = 1000 / 20;
        this.playAnimation(0, true);
    }

    init(speed) {
        this.x = tools.rnd(0, window.innerWidth - VIRUS_WIDTH);
        this.y = -this.height;

        this[__.speed] = speed;

        this.visible = true
    }

    // 预定义爆炸的帧动画
    initExplosionAnimation() {
        let frames = []

        const VIRUS_IMG_PREFIX = 'images/virus_';
        const VIRUS_FRAME_COUNT = 10;

        for (let i = 0; i < VIRUS_FRAME_COUNT; i++) {
            frames.push(VIRUS_IMG_PREFIX + (i + 1) + '.png')
        }

        this.initFrames(frames)
    }

    // 每一帧更新子弹位置
    update(dt) {
        if (this.gain) {
            return;
        }
        this.y += this[__.speed];

        // 对象回收
        if (this.y > window.innerHeight + this.height)
            databus.removeVirus(this)
    }
}
