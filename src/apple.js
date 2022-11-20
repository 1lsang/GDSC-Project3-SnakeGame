export default class Apple {
    constructor(grid, gridSize) {
        this.grid = grid
        this.gridSize = gridSize

        this.gridX = 1 + Math.round(Math.random() * (this.grid - 2))
        this.gridY = 1 + Math.round(Math.random() * (this.grid - 2))

        this.x = this.gridX * this.gridSize
        this.y = this.gridY * this.gridSize
    }

    draw(ctx) {
        ctx.fillStyle = "#ff0000"
        ctx.beginPath()
        // ctx.fillRect(this.x, this.y, this.gridSize - 2, this.gridSize - 2)
        ctx.arc(
            this.x + this.gridSize / 2,
            this.y + this.gridSize / 2,
            this.gridSize / 2,
            0,
            Math.PI * 2,
            false
        )
        ctx.fill()
        ctx.closePath()
    }
}
