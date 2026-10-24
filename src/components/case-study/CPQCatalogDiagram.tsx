const variations = ["Product · variation A", "Product · variation B", "Product · variation C"];

export function CPQCatalogDiagram() {
  return (
    <figure className="my-10 border border-[var(--color-graphite-80)]">
      <figcaption className="border-b border-[var(--color-graphite-80)] px-6 py-4">
        <span className="block font-mono text-xs text-[var(--color-bone)]">
          Reconstructed catalog structure
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-[var(--color-graphite-40)]">
          Illustrative before-and-after example. These are generic labels, not original catalog records.
        </span>
      </figcaption>
      <div className="grid divide-y divide-[var(--color-graphite-80)] md:grid-cols-2 md:divide-x md:divide-y-0">
        <section aria-label="Before: separate variations" className="min-w-0 p-6">
          <h3 className="font-mono text-xs text-[var(--color-graphite-40)]">Before · separate variations</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-bone)]">
            Each variation has its own SKU.
          </p>
          <ul className="mt-5 space-y-3" aria-label="Illustrative separate product entries">
            {variations.map((variation) => (
              <li key={variation} className="border border-[var(--color-graphite-80)] px-4 py-3 text-sm text-[var(--color-graphite-20)]">
                {variation}
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="After: configurable base product" className="min-w-0 p-6">
          <h3 className="font-mono text-xs text-[var(--color-graphite-40)]">After · configurable product</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-bone)]">
            A base product carries the configurable choices.
          </p>
          <div className="mt-5 border border-[var(--color-signal-blue)] px-4 py-3 text-sm text-[var(--color-bone)]">
            Base product
          </div>
          <div className="ml-4 border-l border-[var(--color-graphite-60)] py-3 pl-4">
            <p className="text-sm text-[var(--color-graphite-20)]">Configurable options</p>
            <p className="mt-2 text-sm text-[var(--color-graphite-40)]">Add-ons where needed</p>
          </div>
        </section>
      </div>
    </figure>
  );
}
