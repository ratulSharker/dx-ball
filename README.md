# DX-Ball

This is a simple web based clone of dx-ball arcade game.

## Gameplay 🎥

[<img src="./screenshots/gameplay_screenshot_1.png" alt="Watch on youtube" width="400"/>](https://www.youtube.com/watch?v=bP4f78ZB80g)

## Play It 🎮
[Click to play 🕹](https://ratulsharker.github.io/dx-ball/)

## Server Version 🖥

There is a nodejs application along with followings ([Can be access in master branch](https://github.com/ratulSharker/dx-ball/tree/master))

 - API Server.
 - Authentication.
 - Score Management.
 - Fully containerized.

## Further Improvement 🧑‍💻

There are several [MDN Guideline](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas), read and improve performance. Following is a small list which can improve performance.

- [x] Disable canvas transperancy.
- [x] Separate canvas for Bat. Update only while mouse moved.
- [ ] Separate canvas for top score-stage_name-life. Update only while they updates.
- [x] Separate canvas for stage drawing. Update only while brick ball collide or stage updates.
- [x] Resizing images to size which they are drawn.
- [ ] Instead of clearing whole screen, only update the portion where the ball or power last time was present.
- [ ] Calculate collision and movement related tasks in a separate web worker, keep runloop only for rendering.
- [ ] Experimenting with `window.requestAnimationFrame`.
- [ ] Optimize stage brick collision by considering is the ball inside the stage area or not.
- [ ] Show nicer toast instead of showing `window.alert('msg')`.
- [ ] Introduce inter-ball collision.
- [ ] Introduce more power like following:
  - [ ] Shooting capabilities.
  - [ ] Fireball (blasting few neighbouring blocks).
  - [ ] Invincible ball (do not bounce back from bricks).
  - [ ] Introduce more that two ball.
- [ ] Put a screen of available stages.
- [ ] Ability to pause in the middle of game & quit from game.
- [ ] Ability to control SFX and Gameplay volume.
- [ ] Pacakge the whole js, css using a bundler.
- [ ] Introduce aspect ratio of gameplay screen.
- [x] After gameplay:
  - [x] Prompt user for name (In local storage)
  - [x] Store the score with given name.
  - [x] Show the hall of fame according to that.
- [ ] Hide the mouse cursor while playing the game.
- [ ] Introduce more natural fun stages.
- [ ] Show a nice loader, while the whole game is being loading.
- [ ] Show a intuitive messages.
  - [ ] Left click to start the game.
  - [ ] Right click to pause the game.
- [ ] Think of an idea, how mobile user will play this game.