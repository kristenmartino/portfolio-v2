const rolloutSteps = [
  {
    title: "Review billing inputs",
    text: "Contract data, product mappings and billing configuration.",
  },
  {
    title: "Validate invoices",
    text: "Compare expected invoices and identify discrepancies.",
  },
  {
    title: "Confirm readiness",
    text: "Review open issues, dependencies and billing-cycle timing.",
  },
  {
    title: "Cut over and review",
    text: "Coordinate the move and follow up on billing issues.",
  },
];

const readinessChecks = [
  {
    area: "Billing inputs",
    detail: "Contract data, product mappings and billing configuration.",
  },
  {
    area: "Invoice validation",
    detail: "Expected invoices and discrepancies requiring resolution.",
  },
  {
    area: "Dependencies",
    detail: "Open issues, assigned owners and readiness requirements.",
  },
  {
    area: "Rollout and communications",
    detail: "Billing-cycle timing, revised dates and customer notices.",
  },
];

export function BillingMigrationWorkflow() {
  return (
    <figure className="my-10 border border-[var(--color-graphite-80)]">
      <figcaption className="border-b border-[var(--color-graphite-80)] px-6 py-4">
        <span className="block font-mono text-xs text-[var(--color-bone)]">
          Reconstructed rollout workflow
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-[var(--color-graphite-40)]">
          An illustration created for this case study from the work described here.
        </span>
      </figcaption>
      <ol className="m-0 grid list-none gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {rolloutSteps.map((step) => (
          <li key={step.title} className="min-w-0 border-t-2 border-[var(--color-signal-blue)] pt-4">
            <h3 className="text-base font-medium leading-snug text-[var(--color-bone)]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-graphite-40)]">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function BillingMigrationReadiness() {
  return (
    <figure className="my-10 border border-[var(--color-graphite-80)]">
      <figcaption className="border-b border-[var(--color-graphite-80)] px-6 py-4">
        <span className="block font-mono text-xs text-[var(--color-bone)]">
          Reconstructed readiness checklist
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-[var(--color-graphite-40)]">
          The checks are summarized for this case study; no project records or completion statuses are reproduced.
        </span>
      </figcaption>
      <dl className="divide-y divide-[var(--color-graphite-80)] px-6">
        {readinessChecks.map((check) => (
          <div key={check.area} className="grid gap-2 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6">
            <dt className="text-sm font-medium text-[var(--color-bone)]">
              {check.area}
            </dt>
            <dd className="m-0 text-sm leading-relaxed text-[var(--color-graphite-40)]">
              {check.detail}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
