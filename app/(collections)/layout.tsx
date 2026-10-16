// Route group for the protein-collagen, crystal-* and sos-* landing pages.
//
// Kept apart from (landing) on purpose: those pages were built as standalone
// Vite apps with their own plain CSS, and (landing)'s layout pulls in Tailwind,
// whose preflight reset would silently change their typography and spacing.
// Each page imports its own stylesheet from its own layout.
export default function ProteinCollagenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
