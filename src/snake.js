export default class Snake {
    /**
     * @params {number} tileSize - grid 격자 한칸의 길이
     * @params {number} gridSize - 한 변의 격자 크기
     * @params {number} length - snake의 시작 길이
     */

    body = ["3, 10", "2, 10", "2, 9", "2, 8"]

    constructor(gridSize, grid, length) {
        this.length = length

        this.vx = 1
        this.vy = 0
        this.grid = grid
        this.gridSize = gridSize

        this.gridX = 3
        this.gridY = 10

        this.setEvent()
    }

    draw(ctx) {
        this.gridX += this.vx
        this.gridY += this.vy

        this.body.forEach((position) => {
            const [gridX, gridY] = position.split(",")
            const x = this.gridSize * gridX
            const y = this.gridSize * gridY

            ctx.fillStyle = "green"
            ctx.fillRect(x, y, this.gridSize - 2, this.gridSize - 2)
        })

        this.body.pop()
        while (this.body.length < this.length)
            this.body.unshift(`${this.gridX}, ${this.gridY}`)

        this.x = this.gridSize * this.gridX
        this.y = this.gridSize * this.gridY

        console.log(
            this.body.slice(1).includes(`${this.gridX}, ${this.gridY}`),
            `${this.gridX}, ${this.gridY}`
        )
    }

    setEvent() {
        document.addEventListener("keydown", (e) => {
            if (this.vy === 0) {
                if (e.key === "ArrowUp") {
                    this.vx = 0
                    this.vy = -1
                } else if (e.key === "ArrowDown") {
                    this.vx = 0
                    this.vy = 1
                }
            } else if (this.vx === 0) {
                if (e.key === "ArrowLeft") {
                    this.vx = -1
                    this.vy = 0
                } else if (e.key === "ArrowRight") {
                    this.vx = 1
                    this.vy = 0
                }
            }
            // this.gridX += this.vx
            // this.gridY += this.vy
        })
    }
}
