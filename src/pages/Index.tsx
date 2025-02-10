
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { Heart, Users, Calendar, Shield, Book, Trophy, Target, Sparkles, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Dlaczego My</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              Odkryj funkcje, które czynią naszą platformę wyjątkową i skuteczną w wspieraniu Twojej drogi do zdrowia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Heart}
                title="Rozwój Osobisty"
                description="Śledź swoje postępy i świętuj kamienie milowe na swojej drodze do zdrowia dzięki naszym intuicyjnym narzędziom."
              />
              <FeatureCard
                icon={Users}
                title="Wsparcie Społeczności"
                description="Połącz się z innymi, którzy rozumieją i wspierają Twoją podróż w bezpiecznym, wspierającym środowisku."
              />
              <FeatureCard
                icon={Calendar}
                title="Codzienna Praktyka"
                description="Buduj zdrowe nawyki dzięki codziennym check-inom, ćwiczeniom i spersonalizowanym zaleceniom."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 slide-up">Kluczowe Korzyści</h2>
            <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto slide-up">
              Doświadcz kompleksowego podejścia do dobrostanu z naszą bogatą w funkcje platformą.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Shield}
                title="Prywatność"
                description="Twoja prywatność jest naszym priorytetem. Wszystkie dane są szyfrowane i bezpiecznie przechowywane."
              />
              <FeatureCard
                icon={Book}
                title="Biblioteka Zasobów"
                description="Uzyskaj dostęp do obszernej kolekcji artykułów, filmów i materiałów wspierających Twoją podróż."
              />
              <FeatureCard
                icon={Trophy}
                title="System Osiągnięć"
                description="Pozostań zmotywowany dzięki naszemu systemowi osiągnięć, który celebruje Twoje postępy."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
          <div className="container mx-auto">
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl" />
              <div className="grid md:grid-cols-2 gap-12 items-center relative">
                <div className="text-left">
                  <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6 animate-pulse">
                    Rozpocznij Swoją Podróż Dziś
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 slide-up">Rozpocznij Swoją Drogę do Rozwoju</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed slide-up">
                    Zrób pierwszy krok w kierunku bardziej świadomego i zrównoważonego życia. Nasza platforma zapewnia 
                    narzędzia, wskazówki i wsparcie potrzebne do rozpoczęcia Twojej drogi do zdrowia.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Wyznaczaj Cele</h3>
                        <p className="text-muted-foreground">Określ swoje osobiste cele</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Śledź Postępy</h3>
                        <p className="text-muted-foreground">Monitoruj swój rozwój</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 hover:scale-105 transition-transform duration-300">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Buduj Nawyki</h3>
                        <p className="text-muted-foreground">Rozwijaj zdrowe rutyny</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="aspect-video rounded-2xl overflow-hidden glass-card p-1 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                      alt="Droga do Rozwoju"
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-50" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="container mx-auto text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 slide-up">Gotowy na Rozpoczęcie Swojej Podróży?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto slide-up">
              Zrób pierwszy krok w kierunku lepszego jutra. Twoja droga do zdrowia zaczyna się tutaj.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 slide-up">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                  Rozpocznij Teraz
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 hover:bg-primary/5 transition-all duration-300 hover:scale-105">
                Dowiedz się Więcej
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
