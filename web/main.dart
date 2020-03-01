import 'dart:html';

import 'canvas.dart';
import 'game.dart';
import 'game_event.dart';

Future main() async {
  final canvas = createCanvas();
  document.body.append(canvas);

  final game = Game();

  window.onKeyDown.listen((event) {
    game.handleGameEvent(KeyboardGameEvent(event.keyCode, true));
  });

  window.onKeyUp.listen((event) {
    game.handleGameEvent(KeyboardGameEvent(event.keyCode, false));
  });

  window.onFocus.listen((event) {
    game.handleGameEvent(WindowFocusEvent(true));
  });

  window.onBlur.listen((event) {
    game.handleGameEvent(WindowFocusEvent(false));
  });

  num lastFrameTime = 0;
  while (true) {
    final currentFrameTime = await window.animationFrame;
    final delta = currentFrameTime - lastFrameTime;
    lastFrameTime = currentFrameTime;

    game.handleGameEvent(UpdateEvent(delta / 1000));

    canvas.context2D.clearRect(0, 0, canvas.width, canvas.height);
    game.handleGameEvent(DrawEvent(canvas.context2D));
  }
}
