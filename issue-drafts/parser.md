# Shared date parser reads day-first dates as month-first

**Reports covered:** 379 distinct reports merged into support ticket #4471 (exported 4 October 2026).

The shared parser reads dates month first for tenants whose locale uses day-first dates. A valid date can therefore be interpreted as a different day and month, placing a booking on the wrong day.

Reproduce with a day-first tenant: enter a date such as 03/04/2026 through a path using the shared parser; check that it is interpreted as 3 April rather than March 4. Use a date whose day and month are both at most 12 to expose the silent swap.

Acceptance: parsing follows the tenant's date convention across the affected paths, including ambiguous dates, with regression coverage. The 379 reports include five the desk noted as one-day moves; the export's classification assigns them to this cause by tenant and channel, so their underlying symptoms should be checked during investigation.

Count method: deduplicate export rows by report ID, select reports merged into #4471, then use the tenant locale and booking form with the classification in `src/lib/kb/causes.ts`. This count is an export snapshot, not a live total.
