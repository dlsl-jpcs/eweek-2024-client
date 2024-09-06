
// tests

import { isCodeValid, generateCode } from "../index.ts";

import { expect, test } from "bun:test";

test("generateCode should return a valid code", () => {
    const code = generateCode();

    const valid = isCodeValid(code);

    expect(valid).toBe(true);
});

test("changing a character in the code should invalidate it", () => {
    const code = generateCode();

    // change the first character
    const invalidCode = "a" + code.slice(1);

    const valid = isCodeValid(invalidCode);

    expect(valid).toBe(false);
});

test("changing the check character should invalidate the code", () => {
    const code = generateCode();

    // change the check character
    const invalidCode = code.slice(0, 6) + "a";

    const valid = isCodeValid(invalidCode);

    expect(valid).toBe(false);
});


test("random code should be invalid", () => {
    // 6 random characters
    const invalidCode = "abcdef";

    const valid = isCodeValid(invalidCode);

    expect(valid).toBe(false);
});

test("empty code should be invalid", () => {
    const valid = isCodeValid("");

    expect(valid).toBe(false);
});

test("code with length less than 7 should be invalid", () => {
    const valid = isCodeValid("abc");

    expect(valid).toBe(false);
});

test("code with length more than 7 should be invalid", () => {
    const valid = isCodeValid("abcdefgh");

    expect(valid).toBe(false);
});