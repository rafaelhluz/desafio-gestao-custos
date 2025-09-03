<main className="app-main" role="main" style={{ paddingTop: "60px" }}>
  <Routes>
    <Route path="/cost-centers" element={<CostCentersPage />} />
    <Route path="/expenses" element={<ExpensesPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/" element={<ExpensesPage />} />
  </Routes>
</main>
