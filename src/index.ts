const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length;

const shuffleArray = <T>(originalArray: T[]) => {
	const array = originalArray.slice(0);
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};

const CLEAR_LINE = '\x1b[2K\r';
const green = (s: string | number) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string | number) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s: string | number) => `\x1b[36m${s}\x1b[0m`;

const inputCount = 1e6;
const getInputs = (max = Math.floor(Number.MAX_SAFE_INTEGER / 10)) =>
	Array.from({ length: inputCount }, () => Math.floor(Math.random() * max));
const results = new Map;

// Returns a function which runs the given function on each of the inputs
const test = (name: string, callback: (n: number) => string) => {
	if (!results.has(name)) results.set(name, []);
	return {
		name,
		fn: (inputs: number[]) => {
			let time = performance.now();
			for (const d of inputs) void callback(d);
			const duration = performance.now() - time;
			results.get(name).push(duration);
		}
	};
};

import prettyMilliseconds from 'pretty-ms';
import { formatMilliseconds } from 'format-ms';

// Incorrectly typed modules:
import fDuration from 'f-duration';
const { formatDuration } = fDuration as unknown as { formatDuration: typeof fDuration; };
import prettyPrintMs from 'pretty-print-ms';
const { default: prettyPrint } = prettyPrintMs as unknown as { default: typeof prettyPrintMs; };

// No types:
// @ts-expect-error
import HumanTime from "custom-human-time";
const humanTime = new HumanTime() as { print: (n: number) => string };
// @ts-expect-error
import { mstohhmmss } from "@jrohlandt/hhmmss";
// @ts-expect-error
import prettytime from "prettytime";

// Types! :D
import ms from 'ms';
import format from "format-duration";
import ms2duration from '@stdlib/time-ms2duration';
import { format as lukeedformat } from '@lukeed/ms';
import { stringifyInterval, stringifyIntervalShort } from 'interval-conversions';

const tests = [
	test("pretty-ms", prettyMilliseconds),
	test('format-ms', formatMilliseconds),
	test('ms', ms),
	test('pretty-print-ms', prettyPrint),
	test('format-duration', format),
	test('@stdlib/time-ms2duration', ms2duration),
	test('f-duration', formatDuration),
	test('custom-human-time', humanTime.print.bind(humanTime)),
	test('@jrohlandt/hhmmss', mstohhmmss),
	test('prettytime', prettytime),
	test('@lukeed/ms', lukeedformat),
	test('interval-conversions', stringifyInterval),
	test('interval-conversions (short)', stringifyIntervalShort),
];

const runs = 10;
for (let i = 1; i <= runs; i++) {
	const inputs = getInputs();
	for (const { name, fn } of shuffleArray(tests)) {
		process.stderr.write(`${CLEAR_LINE}Iteration ${yellow(i)} / ${yellow(runs)} > ${green(name)}`);
		fn(inputs);
	}
}

process.stderr.write(CLEAR_LINE);
console.log('=========================[ Results ]=========================');
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
	const ops_string = Math.floor(ops_per_second).toLocaleString([], {
		notation: "compact",
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}).padStart(5);

	process.stdout.write(`${yellow(name)} : ${cyan(ops_string)} ops/s.`);
	if (last !== null) {
		const percentage = 100 * ops_per_second / last;

		process.stdout.write(' (');
		process.stdout.write(green(`+${(percentage - 100).toFixed(2)}%`));
		process.stdout.write(')');
	}

	last = 1000 / avgRuntime;
	process.stdout.write('\n');
}

console.log('\x1b[0m');