function random(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
// sign: 1:plus 2:minus
function generate2(sign) {
  var numbers = new Array(3);
  for (let index = 0; index < 2; index++) {
    numbers[index] = random(11, 999);
  }
  numbers[2] = numbers[0] + numbers[1];
  if (sign == 2) {
    // exchange
    numbers[0] += numbers[2];
    numbers[2] = numbers[0] - numbers[2];
    numbers[0] = numbers[0] - numbers[2];
  }

  return [numbers[0], sign == 1 ? "＋" : "ー", numbers[1], "＝", numbers[2]];
}

// sign: 1:plux-plus 2:plus-minux 3:minus-plus 4:minux-minux
function generate3(sign) {
  var numbers = new Array(4);

  if (sign == 1) {
    numbers[0] = random(101, 800);
    numbers[1] = random(11, 99);
    numbers[2] = random(11, 99);
    numbers[3] = numbers[0] + numbers[1] + numbers[2];
  }
  if (sign == 2) {
    numbers[0] = random(201, 800);
    numbers[1] = random(11, 99);
    numbers[2] = random(101, 200);
    numbers[3] = numbers[0] + numbers[1] - numbers[2];
  }
  if (sign == 3) {
    numbers[0] = random(201, 800);
    numbers[1] = random(11, 99);
    numbers[2] = random(11, 99);
    numbers[3] = numbers[0] - numbers[1] + numbers[2];
  }
  if (sign == 4) {
    numbers[0] = random(201, 800);
    numbers[1] = random(11, 99);
    numbers[2] = random(11, 99);
    numbers[3] = numbers[0] - numbers[1] - numbers[2];
  }

  return [
    numbers[0],
    sign < 3 ? "＋" : "ー",
    numbers[1],
    sign % 2 == 1 ? "＋" : "ー",
    numbers[2],
    "＝",
    numbers[3]
  ];
}

module.exports.random = random;
module.exports.generate2 = generate2;
module.exports.generate3 = generate3;
