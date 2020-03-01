import 'dart:html';

import 'game_event.dart';
import 'input.dart';
import 'math.dart';
import 'vector.dart';

const playerSpeed = 500;
const playerSize = 50;
const playerMovementStiffness = 10;
const playerGravity = 1200;

class Player implements GameEventHandler {
  var position = vec(50, 50);
  num fallingVelocity = 0;
  final _input = PlayerInput();

  @override
  void handleGameEvent(GameEvent event) {
    _input.handleGameEvent(event);

    if (event is UpdateEvent) {
      // movement
      position += vec(_input.currentMovement * playerSpeed * event.delta, 0);

      // apply gravity
      fallingVelocity += playerGravity * event.delta;
      position += vec(0, fallingVelocity * event.delta);
    }

    if (event is DrawEvent) {
      event.context2d
        ..fillStyle = 'white'
        ..fillRect(position.x, position.y, playerSize, playerSize);
    }
  }
}

class PlayerInput implements GameEventHandler {
  final _movementControl = Control([
    JoystickAxisInput(),
    CombinedAxisInput(KeyInput(KeyCode.LEFT), KeyInput(KeyCode.RIGHT)),
  ]);

  num currentMovement = 0;

  @override
  void handleGameEvent(GameEvent event) {
    _movementControl.handleGameEvent(event);

    if (event is UpdateEvent) {
      currentMovement = lerp(currentMovement, _movementControl.value,
          event.delta * playerMovementStiffness);
    }
  }
}