# Interval Stringification Benchmark
Benchmarking some NPM interval stringification libraries.
## What is interval stringification?
Interval stringiciation is the conversion of an amount of time (usually measured in milliseconds) into a human-readable string.

- For example, `67,000` milliseconds --> "`1 minute and 7 seconds`"

## Results
```
pretty-print-ms              :  1.3M ops/s.
format-ms                    :  1.5M ops/s. (+11.23%)
@jrohlandt/hhmmss            :  1.6M ops/s. (+8.03%)
pretty-ms                    :  1.9M ops/s. (+19.88%)
interval-conversions         :  2.4M ops/s. (+27.35%)
custom-human-time            :  3.4M ops/s. (+40.25%)
prettytime                   :  3.8M ops/s. (+14.27%)
f-duration                   :  5.7M ops/s. (+48.13%)
format-duration              :  5.7M ops/s. (+0.35%)
@stdlib/time-ms2duration     :  7.4M ops/s. (+30.04%)
interval-conversions (short) : 15.2M ops/s. (+104.21%)
ms                           : 21.3M ops/s. (+40.69%)
@lukeed/ms                   : 21.4M ops/s. (+0.45%)
```