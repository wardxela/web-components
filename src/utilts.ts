export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number) {
  return Math.floor(random(min, max + 1));
}

export function getRandom<T>(inputs: T[]) {
  return inputs[randomInt(0, inputs.length - 1)];
}

export function shuffle<T>(inputs: T[]) {
  for (let i = inputs.length - 1; i > 0; i--) {
    const randomJ = randomInt(0, i - 1);
    [inputs[i], inputs[randomJ]] = [inputs[randomJ], inputs[i]];
  }
  return inputs;
}
