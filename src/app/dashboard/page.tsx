export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Áttekintés</h1>
      <p className="text-muted-foreground">
        Üdv újra a Wavib vezérlőpultban! Itt láthatod az összes fontos adatot
        és statisztikát egy helyen.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 rounded-xl border border-border/50 bg-card/50">
          <h2 className="text-lg font-medium">Kiküldött üzenetek</h2>
          <p className="text-2xl font-semibold mt-2">1,245</p>
        </div>
        <div className="p-6 rounded-xl border border-border/50 bg-card/50">
          <h2 className="text-lg font-medium">Aktív kliensek</h2>
          <p className="text-2xl font-semibold mt-2">23</p>
        </div>
        <div className="p-6 rounded-xl border border-border/50 bg-card/50">
          <h2 className="text-lg font-medium">Csomag típusa</h2>
          <p className="text-2xl font-semibold mt-2">Pro</p>
        </div>
      </div>
    </div>
  );
}
