
const Dashboard = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-2">
              Your Wellness Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your progress and maintain your well-being journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
