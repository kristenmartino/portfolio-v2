const checks = [
  {
    area: "Source completeness",
    expected: "Required source records are available in the new system.",
    issue: "Missing records from the source-data load.",
  },
  {
    area: "Field mappings",
    expected: "Source values populate the intended target fields.",
    issue: "Fields mapped incorrectly between source and target.",
  },
  {
    area: "Booking-curve grouping",
    expected: "Historical bookings are grouped into the intended days-before-departure buckets.",
    issue: "Incorrect bucket assignment affecting the demand forecast.",
  },
];

export function RevenueManagementTestMatrix() {
  return (
    <figure className="my-10 border border-[var(--color-graphite-80)]">
      <figcaption className="border-b border-[var(--color-graphite-80)] px-6 py-4">
        <span className="block font-mono text-xs text-[var(--color-bone)]">
          Reconstructed test matrix
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-[var(--color-graphite-40)]">
          Illustrative checks created for this case study from the work described here.
        </span>
      </figcaption>
      <div aria-hidden="true" className="hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] gap-6 px-6 pt-5 font-mono text-xs text-[var(--color-graphite-40)] md:grid">
        <span>Check</span>
        <span>Expected behavior</span>
        <span>Example issue</span>
      </div>
      <dl className="divide-y divide-[var(--color-graphite-80)] px-6">
        {checks.map((check) => (
          <div key={check.area} className="grid gap-4 py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)_minmax(0,1.5fr)] md:gap-6">
            <dt className="min-w-0 text-sm font-medium text-[var(--color-bone)]">
              {check.area}
            </dt>
            <dd className="m-0 min-w-0 text-sm leading-relaxed text-[var(--color-graphite-40)]">
              <span className="mb-1 block font-mono text-xs md:sr-only">Expected behavior</span>
              {check.expected}
            </dd>
            <dd className="m-0 min-w-0 text-sm leading-relaxed text-[var(--color-graphite-40)]">
              <span className="mb-1 block font-mono text-xs md:sr-only">Example issue</span>
              {check.issue}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
