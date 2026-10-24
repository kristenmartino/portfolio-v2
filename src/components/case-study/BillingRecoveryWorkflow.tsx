const stages = [
  {
    title: "Recover",
    text: "Support billing for transactions that had failed before month-end close.",
  },
  {
    title: "Correct",
    text: "Address contract, order, product-mapping and billing-rule problems.",
  },
  {
    title: "Prevent",
    text: "Improve upstream controls, exception information and operating guidance.",
  },
];

export function BillingRecoveryWorkflow() {
  return (
    <figure className="my-10 border border-[var(--color-graphite-80)]">
      <figcaption className="border-b border-[var(--color-graphite-80)] px-6 py-4">
        <span className="block font-mono text-xs text-[var(--color-bone)]">
          Reconstructed program workflow
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-[var(--color-graphite-40)]">
          An illustration created for this case study from the work described here.
        </span>
      </figcaption>
      <ol className="m-0 grid list-none gap-6 p-6 md:grid-cols-3">
        {stages.map((stage) => (
          <li key={stage.title} className="min-w-0 border-t-2 border-[var(--color-signal-blue)] pt-4">
            <h3 className="text-base font-medium leading-snug text-[var(--color-bone)]">
              {stage.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-graphite-40)]">
              {stage.text}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
