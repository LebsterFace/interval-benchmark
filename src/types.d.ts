declare module "@jrohlandt/hhmmss" {
	export function mstohhmmss(ms: number): string;
}

declare module "prettytime" {
	function prettytime(input: number | bigint | [number, number]): string;
	export default prettytime;
}

declare module "simple-duration" {
	export function stringify(seconds: number): string;
}

declare module "duration-time-conversion" {
	const DT: {
		d2t(input: number): string;
	};
	export default DT;
}

declare module "time-duration-stringify" {
	export function toStringLong(ms: number): string;
}

declare module "casual-duration" {
	export function format(ms: number): string;
}

declare module "humanized-duration" {
	function humanized_duration(ms: number): string;
	export default humanized_duration;
}

declare module "stringtime" {
	const st: {
		toString(ms: number): string;
	};
	export default st;
}

declare module "interspell" {
	const Interspell: {
		format(ms: number): string;
	};
	export default Interspell;
}

declare module "simple-duration-converter" {
	export function stringify(seconds: number): string;
}

declare module "beautiful.ms" {
	function beautifulMs(ms: number): string;
	export default beautifulMs;
}

declare module "ms-time" {
	function msTime(ms: number): string;
	export default msTime;
}

declare module "custom-human-time" {
	class HumanTime {
		constructor(...args: any[]);
		print(ms: number): string;
	}

	export default HumanTime;
}