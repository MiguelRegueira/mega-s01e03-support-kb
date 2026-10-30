# Booking-v3 displays a month-first hint for day-first tenants

**Reports covered:** 33 distinct reports merged into support ticket #4471 (exported 4 October 2026).

Booking-v3 displays `MM/DD/YYYY` under the date field for day-first tenants. People follow the hint, but the form reads their input according to the tenant's day-first convention; this can swap the intended day and month. This is separate from the shared parser issue.

Reproduce using booking-v3 for a day-first tenant such as Alder Physio: follow the displayed hint and enter 03/04/2026 intending March 4; inspect the interpreted date, which follows the tenant's day-first convention.

Acceptance: the displayed hint matches the date format the form actually accepts for each tenant locale, with regression coverage for booking-v3 and day-first locales.

Count method: deduplicate export rows by report ID, select reports merged into #4471, then use the tenant locale and booking form with the classification in `src/lib/kb/causes.ts`. This count is an export snapshot, not a live total.
