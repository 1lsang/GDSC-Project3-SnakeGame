/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import Apple from "./apple"
import Snake from "./snake"
// import style from "./style/button.module.css"

export default class App {
    #pixelRatio

    #grid

    #gridSize

    #score

    constructor() {
        this.canvas = document.createElement("canvas")
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext("2d")

        this.#pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

        this.#grid = 20

        this.#score = 0

        window.addEventListener("resize", this.resize.bind(this), false) // resize 설정
        this.resize()

        this.startBtns = document.querySelectorAll(".start")
        this.startBtns.forEach((button) => {
            button.addEventListener("click", () => {
                this.startGame()
            })
        })

        this.pauseBtn = document.querySelector(".pause-btn")
        this.pauseBtn.addEventListener("click", () => {
            this.pause()
        })

        this.continueBtn = document.querySelector(".continue")
        this.continueBtn.addEventListener("click", () => {
            this.continue()
        })
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight
        this.stage = Math.min(this.stageWidth, this.stageHeight)

        this.canvas.width = this.stage * this.#pixelRatio
        this.canvas.height = this.stage * this.#pixelRatio

        // 레티나 디스플레이에서 해상도 4배로 늘리기
        this.ctx.scale(this.#pixelRatio, this.#pixelRatio)

        // Set grid size
        this.#gridSize =
            Math.min(this.stageWidth, this.stageHeight) / this.#grid
    }

    scoreIncrease() {
        this.#score += 1
    }

    startGame() {
        this.#score = 0

        this.snake = new Snake(this.#gridSize, this.#grid, 4)
        this.apple = new Apple(this.#grid, this.#gridSize)

        this.game = setInterval(this.animate.bind(this), 100)

        document.querySelector(".start-ui").classList.add("hidden")
        document.querySelector(".game-over").classList.add("hidden")
        document.querySelector(".pause-btn").classList.remove("hidden")
    }

    pause() {
        document.querySelector(".pause-btn").classList.add("hidden")
        document.querySelector(".pause-ui").classList.remove("hidden")
        clearInterval(this.game)
    }

    continue() {
        document.querySelector(".pause-ui").classList.add("hidden")
        document.querySelector(".pause-btn").classList.remove("hidden")
        this.game = setInterval(this.animate.bind(this), 100)
    }

    gameOver() {
        clearInterval(this.game)
        document.querySelector(".pause-btn").classList.add("hidden")
        document.querySelector(".game-over").classList.remove("hidden")
    }

    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        this.snake.draw(this.ctx, this.#gridSize, this.#grid)
        this.apple.draw(this.ctx, this.#gridSize, this.#grid)

        if (
            this.snake.gridX === this.apple.gridX &&
            this.snake.gridY === this.apple.gridY
        ) {
            this.apple = new Apple(this.#grid, this.#gridSize)
            this.snake.length += 1
            this.scoreIncrease()
        }

        this.ctx.font = "24px NeoDGM"
        this.ctx.textAlign = "center"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(
            `SCORE 점수: ${this.#score}`,
            this.stage / 2,
            this.stage - 24
        )

        if (
            this.snake.gridX < 0 ||
            this.snake.gridX > this.#grid ||
            this.snake.gridY < 0 ||
            this.snake.gridY > this.#grid
        ) {
            this.gameOver()
        }
    }
}
