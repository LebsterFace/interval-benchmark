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

const inputCount = 1e5;
const getInputs = (max = Math.floor(Number.MAX_SAFE_INTEGER / 10)) =>
	Array.from({ length: inputCount }, () => Math.floor(Math.random() * max));

type TestResults = { runtimes: number[], rawName: string, subName: string | null; };
const results = new Map<string, TestResults>;

// Returns a function which runs the given function on each of the inputs
const test = (rawName: string, callback: (n: number) => string | null, mapperFn: null | ((n: number) => number) = null, subName: string | null = null) => {
	const name = subName === null ? rawName : `${rawName} (${subName})`;
	if (results.has(name)) throw new Error("Test results for " + name + " already present.");
	const object: TestResults = { rawName, subName, runtimes: [] };
	results.set(name, object);
	return {
		name,
		fn: (rawInputs: number[]) => {
			const inputs = mapperFn !== null ? rawInputs.map(mapperFn) : rawInputs;
			let time = performance.now();
			for (const d of inputs) void callback(d);
			const duration = performance.now() - time;
			object.runtimes.push(duration);
		}
	};
};

//#region Imports
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
import prettyMilliseconds from "pretty-ms";
import { formatMilliseconds } from "format-ms";
//#endregion

const tests = [
	test("timespan-ts", d => TimeSpanTS.fromMilliseconds(d).toString()),
	test("@brycemarshall/timespan", d => Timespan.fromMilliseconds(d).toString()),
	test("@spacepumpkin/format-timespan", formatMsSpanNearestUnit, null, "nearest"),
	test("@spacepumpkin/format-timespan", formatMsSpanWords, null, "words"),
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
	test("interval-conversions", stringifyIntervalShort, null, 'short'),
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

const formatNumber = (n: number) => n.toLocaleString([], {
	notation: "compact",
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
});

const getDownloads = async (name: string): Promise<string> => {
	const response = await fetch("https://api.npmjs.org/downloads/point/last-week/" + name);
	const { downloads } = (await response.json() as { downloads: number; start: string; end: string; package: string; });
	if (downloads < 10) return '< 10';
	if (downloads < 100) return '< 100';
	if (downloads < 1000) return '< 1k';
	return formatNumber(downloads);
};

// Calculate average runtime per input, then sort by
const values = [...results.values()]
	.map(({ rawName, subName, runtimes }) => ({
		rawName,
		subName,
		averageRuntime: average(runtimes) / inputCount // Get average runtime per input
	})).sort((a, b) => b.averageRuntime - a.averageRuntime); // Sort ascending based on average runtime

console.log("| Name | Operations per second | Weekly downloads |");
console.log("| - | - | - |");

for (const { averageRuntime, rawName, subName } of values) {
	console.log(`| ${subName === null ?
		`\`${rawName}\`` :
		`\`${rawName}\` (${subName})`
	} | ${formatNumber(1000 / averageRuntime)} | ${await getDownloads(rawName)} |`);
}