# Interval Stringification Benchmark
Benchmarking some NPM interval stringification libraries.
## What is interval stringification?
Interval stringiciation is the conversion of an amount of time (usually measured in milliseconds) into a human-readable string.

- For example, `67,000` milliseconds --> "`1 minute and 7 seconds`"

## Results
```
duration-time-conversion     :  0.3M ops/s.
interspell                   :  0.4M ops/s. (+6.82%)
enhanced-ms                  :  0.4M ops/s. (+23.46%)
humanize-duration            :  0.6M ops/s. (+42.65%)
friendly-duration            :  1.0M ops/s. (+59.73%)
pretty-print-ms              :  1.1M ops/s. (+6.87%)
format-timespan (nearest)    :  1.1M ops/s. (+5.12%)
format-ms                    :  1.2M ops/s. (+8.01%)
beautiful.ms                 :  1.2M ops/s. (+1.36%)
@jrohlandt/hhmmss            :  1.4M ops/s. (+8.88%)
format-timespan (words)      :  1.5M ops/s. (+7.06%)
yet-another-duration         :  1.6M ops/s. (+10.69%)
pretty-ms                    :  1.6M ops/s. (+2.21%)
stringtime                   :  1.9M ops/s. (+12.89%)
interval-conversions         :  2.2M ops/s. (+19.38%)
time-duration-stringify      :  2.3M ops/s. (+5.72%)
simple-duration-converter    :  2.5M ops/s. (+5.18%)
simple-duration              :  2.5M ops/s. (+3.05%)
ms-human-format              :  2.7M ops/s. (+5.66%)
custom-human-time            :  2.9M ops/s. (+9.23%)
prettytime                   :  3.4M ops/s. (+14.69%)
ms-time                      :  4.2M ops/s. (+23.60%)
f-duration                   :  4.8M ops/s. (+16.30%)
format-duration              :  4.9M ops/s. (+2.10%)
@brycemarshall/timespan      :  5.1M ops/s. (+2.50%)
@stdlib/time-ms2duration     :  6.5M ops/s. (+28.19%)
humanized-duration           :  6.5M ops/s. (+0.12%)
tiny-human-time              : 11.3M ops/s. (+74.58%)
readable-timespan            : 11.8M ops/s. (+4.41%)
timespan-ts                  : 13.6M ops/s. (+14.70%)
interval-conversions (short) : 14.3M ops/s. (+5.11%)
casual-duration              : 17.5M ops/s. (+22.46%)
ms                           : 19.8M ops/s. (+13.14%)
@lukeed/ms                   : 20.5M ops/s. (+3.51%)
```