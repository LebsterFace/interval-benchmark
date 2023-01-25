const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

const shuffleArray = <T>(originalArray: T[]) => {
	const array = originalArray.slice(0);
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};

const CLEAR_LINE = "\x1b[2K\r";
const green = (s: string | number) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string | number) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s: string | number) => `\x1b[36m${s}\x1b[0m`;

const inputCount = 1e5;
const getInputs = (max = Math.floor(Number.MAX_SAFE_INTEGER / 10)) =>
	Array.from({ length: inputCount }, () => Math.floor(Math.random() * max));
const results = new Map;

// Returns a function which runs the given function on each of the inputs
const test = (name: string, callback: (n: number) => string | null, mapperFn?: (n: number) => number) => {
	if (!results.has(name)) results.set(name, []);
	return {
		name,
		fn: (rawInputs: number[]) => {
			const inputs = mapperFn ? rawInputs.map(mapperFn) : rawInputs;
			let time = performance.now();
			for (const d of inputs) void callback(d);
			const duration = performance.now() - time;
			results.get(name).push(duration);
		}
	};
};

import prettyMilliseconds from "pretty-ms";
import { formatMilliseconds } from "format-ms";

// Incorrectly typed modules:
import prettyPrintMs from "pretty-print-ms";
const { default: prettyPrint } = prettyPrintMs as unknown as { default: typeof prettyPrintMs; };

// No types:
// @ts-expect-error
import HumanTime from "custom-human-time";
const humanTime = new HumanTime() as { print: (n: number) => string; };
// @ts-expect-error
import { mstohhmmss } from "@jrohlandt/hhmmss";
// @ts-expect-error
import prettytime from "prettytime";
// @ts-expect-error
import * as sd from "simple-duration";
// @ts-expect-error
import DT from "duration-time-conversion";
// @ts-expect-error
import { toStringLong } from "time-duration-stringify";
// @ts-expect-error
import { format as casualDuration } from "casual-duration";
// @ts-expect-error
import humanized_duration from "humanized-duration";
// @ts-expect-error
import st from "stringtime";
// @ts-expect-error
import Interspell from "interspell";
// @ts-expect-error
import sdc from "simple-duration-converter";
// @ts-expect-error
import beautifulMs from "beautiful.ms";
// @ts-expect-error
import msTime from "ms-time";

// Types! :D
import ms from "ms";
import { formatDuration as fDuration } from "f-duration";
import formatDuration from "format-duration";
import ms2duration from "@stdlib/time-ms2duration";
import { format as lukeedformat } from "@lukeed/ms";
import { stringifyInterval, stringifyIntervalShort } from "interval-conversions";
import humanizeDuration from "humanize-duration";
import friendlyDuration from "friendly-duration";
import yad from "yet-another-duration";
import { Timespan as ReadableTimespan } from "readable-timespan";
const readableTimespan = new ReadableTimespan();
import ems from "enhanced-ms";
import { formatMs } from "ms-human-format";
import tinyHumanTime from "tiny-human-time";
import { formatMsSpanWords, formatMsSpanNearestUnit } from "@spacepumpkin/format-timespan";
import { Timespan } from "@brycemarshall/timespan";
import { TimeSpan as TimeSpanTS } from "timespan-ts";

const tests = [
	test("timespan-ts", d => TimeSpanTS.fromMilliseconds(1287948).toString()),
	test("@brycemarshall/timespan", d => Timespan.fromMilliseconds(d).toString()),
	test("format-timespan (nearest)", formatMsSpanNearestUnit),
	test("format-timespan (words)", formatMsSpanWords),
	test("tiny-human-time", tinyHumanTime),
	test("ms-time", msTime),
	test("beautiful.ms", beautifulMs),
	test("simple-duration-converter", sdc.stringify, n => n / 1000),
	test("ms-human-format", formatMs),
	test("interspell", Interspell.format),
	test("stringtime", st.toString),
	test("humanized-duration", humanized_duration),
	test("enhanced-ms", ems),
	test("readable-timespan", readableTimespan.parse.bind(readableTimespan)),
	test("yet-another-duration", d => yad.duration(d).toString()),
	test("casual-duration", casualDuration),
	test("time-duration-stringify", toStringLong),
	test("friendly-duration", friendlyDuration),
	test("duration-time-conversion", DT.d2t, n => n / 1000),
	test("simple-duration", sd.stringify, n => n / 1000),
	test("humanize-duration", humanizeDuration),
	test("pretty-ms", prettyMilliseconds),
	test("format-ms", formatMilliseconds),
	test("ms", ms),
	test("pretty-print-ms", prettyPrint),
	test("format-duration", formatDuration),
	test("@stdlib/time-ms2duration", ms2duration),
	test("f-duration", fDuration),
	test("custom-human-time", humanTime.print.bind(humanTime)),
	test("@jrohlandt/hhmmss", mstohhmmss),
	test("prettytime", prettytime),
	test("@lukeed/ms", lukeedformat),
	test("interval-conversions", stringifyInterval),
	test("interval-conversions (short)", stringifyIntervalShort),
];

const runs = 100;
for (let i = 1; i <= runs; i++) {
	const inputs = getInputs();
	for (const { name, fn } of shuffleArray(tests)) {
		process.stderr.write(`${CLEAR_LINE}Iteration ${yellow(i)} / ${yellow(runs)} > ${green(name)}`);
		fn(inputs);
	}
}

process.stderr.write(CLEAR_LINE);
console.log("=========================[ Results ]=========================");
// Get length of the longest name
const longestName = Math.max(...Array.from(results.keys(), s => s.length));

// Calculate average runtime per input, then sort by
const values = [...results.entries()]
	.map(([name, runtimes]) => [name, average(runtimes) / inputCount]) // Get average runtime per input
	.sort(([, a], [, b]) => b - a); // Sort ascending based on average runtime

let last = null;
for (const [pkg, avgRuntime] of values) {
	const name = pkg.padEnd(longestName);
	const ops_per_second = 1000 / avgRuntime;
	const ops_string = (ops_per_second / 1e6).toLocaleString([], {
		notation: "compact",
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}).padStart(4) + "M";

	process.stdout.write(`${yellow(name)} : ${cyan(ops_string)} ops/s.`);
	if (last !== null) {
		const percentage = 100 * ops_per_second / last;

		process.stdout.write(" (");
		process.stdout.write(green(`+${(percentage - 100).toFixed(2)}%`));
		process.stdout.write(")");
	}

	last = ops_per_second;
	process.stdout.write("\n");
}

console.log("\x1b[0m");