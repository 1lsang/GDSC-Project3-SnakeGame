export default class Snake {
    /**
     * @params {number} gridSize - grid 격자 한칸의 길이
     * @params {number} tileCount - tile의 개수
     * @params {number} length - snake의 시작 길이
     */
    constructor(gridSize, tileCount, length) {
        this.length = length
        this.vx = 0
        this.vy = 0
        this.gridSize = gridSize
        this.tileCount = tileCount

        this.x = gridSize * Math.floor(Math.random() * tileCount)
        this.y = gridSize * Math.floor(Math.random() * tileCount)
    }

    draw(ctx) {
        this.x += this.vx
        this.y += this.vy

        ctx.fillStyle = "#fdd700"
        ctx.fillRect(this.x, this.y, this.gridSize, this.gridSize)
    }
}
