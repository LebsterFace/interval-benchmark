# Interval Stringification Benchmark
Benchmarking some NPM interval stringification libraries.
## What is interval stringification?
Interval stringiciation is the conversion of an amount of time (usually measured in milliseconds) into a human-readable string.

- For example, `67,000` milliseconds --> "`1 minute and 7 seconds`"

## Results
| Name | Operations per second
| - | - |
| duration-time-conversion | 340.4K |
| interspell | 364.8K |
| enhanced-ms | 447.0K |
| humanize-duration | 648.6K |
| friendly-duration | 1.1M |
| pretty-print-ms | 1.1M |
| format-timespan (nearest) | 1.2M |
| format-ms | 1.3M |
| beautiful.ms | 1.3M |
| @jrohlandt/hhmmss | 1.4M |
| format-timespan (words) | 1.5M |
| yet-another-duration | 1.6M |
| pretty-ms | 1.7M |
| stringtime | 1.9M |
| interval-conversions | 2.1M |
| time-duration-stringify | 2.4M |
| simple-duration-converter | 2.4M |
| simple-duration | 2.6M |
| ms-human-format | 2.7M |
| custom-human-time | 3.0M |
| prettytime | 3.4M |
| ms-time | 4.3M |
| format-duration | 4.6M |
| f-duration | 4.8M |
| @brycemarshall/timespan | 5.0M |
| humanized-duration | 6.4M |
| @stdlib/time-ms2duration | 6.6M |
| tiny-human-time | 11.2M |
| readable-timespan | 11.6M |
| timespan-ts | 12.9M |
| interval-conversions (short) | 14.0M |
| casual-duration | 17.6M |
| @lukeed/ms | 19.5M |
| ms | 20.4M |