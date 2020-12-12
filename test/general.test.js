const QPool = require("../src/qPool");

const q1 = " cat ";
const q2 = " fish ";
const q3 = " goat ";
const q4 = " sheep ";

describe("QPool - general prototypes", () => {
  const tq = new QPool();

  it("push 4 inputs", () => {
    tq.push(`${q1}`);
    tq.push(`${q2}`);
    tq.push(`${q3}`);
    tq.push(`${q4}`);

    expect(tq.get()).toBe(q1 + q2 + q3 + q4);
  });

  it("shift 1 input", () => {
    tq.shift();
    expect(tq.get()).toBe(q2 + q3 + q4);
  });

  it("pop 1 input", () => {
    tq.pop();
    expect(tq.get()).toBe(q2 + q3);
  });

  it("unshift 1 input", () => {
    tq.unshift(q1);
    expect(tq.get()).toBe(q1 + q2 + q3);
  });

  it("tests prototype elementsSize", () => {
    expect(tq.elementsSize()).toStrictEqual([q1.length, q2.length, q3.length]);
  });

  it("tests prototype elementsLength", () => {
    expect(tq.elementsLength()).toBe(3);
  });

  it("tests flush prototype", () => {
    tq.flush();
    expect(tq.get()).toBe("");
  });

  it("tests length prototype", () => {
    tq.flush();
    expect(tq.length()).toBe(0);
  });
});
