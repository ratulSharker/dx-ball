# DX-Ball

This is a simple clone of dx-ball arcade game.

## Installation

Clone the repository

```bash
git clone https://github.com/ratulSharker/dx-ball.git
```

Install the depdendency

```bash
cd dx-ball
npm install
```

## Run

Run the project

```bash
npm start
```

Access in browser http://localhost:8000

## Development

This project uses `nodemon` & `eslint` in development mode. To run in development mode

```bash
npm run dev
```

## Further Improvement

There are several [MDN Guideline](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas), read and improve performance. Following is a small list which can improve performance.

- [ ] Disable canvas transperancy.
- [ ] Separate canvas for Bat. Update only while mouse moved.
- [ ] Separate canvas for top score-stage_name-life. Update only while they updates.
- [ ] Separate canvas for stage drawing. Update only while brick ball collide or stage updates.
- [ ] Resizing images to size which they are drawn.
