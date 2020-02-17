/**
 * 游戏基础的精灵类
 */
export default class Sprite {
    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        this.img = new Image();
        this.img.src = imgSrc
        this.width = width
        this.height = height

        this.x = x
        this.y = y

        this.visible = true
    }

    /**
     * 将精灵图绘制在canvas上
     */
    drawToCanvas(ctx) {
        if (!this.visible)
            return

        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    /**
     * 简单的碰撞检测定义：
     * 另一个精灵的中心点处于本精灵所在的矩形内即可
     * @param{Sprite} sp: Sptite的实例
     */
    isCollideWith(sp) {
        if (!this.visible || !sp.visible)
            return false;

        let spX = sp.x + sp.width * 0.5;
        let spY = sp.y - sp.height * 0.5;
        let thisX = this.x + this.width * 0.5;
        let thisY = this.y - this.height * 0.5;

        let disX = Math.abs(spX - thisX);
        let disY = Math.abs(spY - thisY);

        let sax = sp.width + this.width;
        let say = sp.height + this.height;
        return !!(disX <= sax * 0.5 && disY <= say * 0.5);
    }
}
