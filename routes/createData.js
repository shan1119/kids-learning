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

function getNumberSet() {
  var rtn = [];
  while (rtn.length < 4) {
    let num = random(2, 9);
    if (!rtn.includes(num)) {
      rtn.push(num);
    }
  }

  return rtn;
}

const unitSet = {
  base: ["cm", "mm", "dL", "mL", "mL", "m", "g", "分"],
  next: ["m", "cm", "L", "dL", "L", "km", "kg", "時"],
  rate: [100, 10, 10, 100, 1000, 1000, 1000, 60]
};

function generateUnit(sign, i) {
  var numbers = new Array(6);
  let base = unitSet.base[i];
  let next = unitSet.next[i];
  let rate = unitSet.rate[i];

  numbers[0] = random(1, 9);
  numbers[1] = random(rate / 10, rate - 1);
  numbers[2] = random(1, 9);
  numbers[3] = random(rate / 10, rate - 1);

  numbers[5] = numbers[0] * rate + numbers[1] + numbers[2] * rate + numbers[3];
  numbers[4] = Math.floor(numbers[5] / rate);
  numbers[5] = numbers[5] - numbers[4] * rate;
  if (sign == 2) {
    // exchange
    numbers[0] += numbers[4];
    numbers[4] = numbers[0] - numbers[4];
    numbers[0] = numbers[0] - numbers[4];
    numbers[1] += numbers[5];
    numbers[5] = numbers[1] - numbers[5];
    numbers[1] = numbers[1] - numbers[5];
  }

  return [numbers[0], next, numbers[1], base, sign == 1 ? "＋" : "ー",
    numbers[2], next, numbers[3], base, "＝",
    numbers[4], next, numbers[5], base
  ];
}

module.exports = {
  random,
  generate2,
  generate3,
  getNumberSet,
  generateUnit,
  unitSet
};