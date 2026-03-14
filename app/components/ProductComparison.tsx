import {comparisonsByProduct} from '~/data/comparisons';
import {Check, X, Sparkles} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface ProductComparisonProps {
  productHandle: string;
}

export function ProductComparison({productHandle}: ProductComparisonProps) {
  const comparison =
    comparisonsByProduct[productHandle] || comparisonsByProduct.default;

  return (
    <div className="pt-10">
      {/* Header */}
      <div className="mb-8 max-w-xl">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          {comparison.title}
        </h2>
        <p className="text-sm text-muted-foreground">{comparison.subtitle}</p>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[32%] text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Feature
              </TableHead>

              {/* Brand Column */}
              <TableHead className="w-[34%]">
                <div className="flex items-center gap-2 font-semibold text-primary">
                  TerraVow
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[10px] font-semibold">
                    <Sparkles className="size-3" />
                    Best Choice
                  </span>
                </div>
              </TableHead>

              <TableHead className="w-[34%] text-muted-foreground font-medium">
                Generic Brands
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {comparison.rows.map((row, index) => (
              <TableRow
                key={index}
                className={`transition-colors ${
                  row.highlight ? 'bg-primary/5' : 'hover:bg-muted/40'
                }`}
              >
                {/* Feature */}
                <TableCell className="font-medium text-sm">
                  <div className="flex items-center gap-2">
                    {row.feature}

                    {row.highlight && (
                      <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Key Benefit
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* TerraVow */}
                <TableCell>
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-sm font-medium">{row.terravow}</span>
                  </div>
                </TableCell>

                {/* Generic */}
                <TableCell>
                  <div className="flex items-start gap-2">
                    <X className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {row.generic}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Trust Section */}
      <div className="mt-6 rounded-xl border bg-muted/40 p-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TerraVow Promise:</strong>{' '}
          Manufactured in GMP-certified facilities and third-party tested for
          purity and potency. Every formula uses clinically-studied ingredients
          at effective dosages — never under-dosed blends.
        </p>
      </div>
    </div>
  );
}
