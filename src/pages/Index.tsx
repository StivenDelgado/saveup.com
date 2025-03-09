
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, PiggyBank, Target, BrainCircuit, MessageSquare, UserCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <header className="container mx-auto pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-moneywise-800 dark:text-moneywise-200">
            Toma control de tus <span className="text-moneywise-500">finanzas personales</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Ahorra de manera inteligente, establece metas financieras y haz crecer tu dinero con nuestra plataforma intuitiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-moneywise-500 hover:bg-moneywise-600">
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-moneywise-500 text-moneywise-500">
              <Link to="/register">Crear Cuenta</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-moneywise-700 dark:text-moneywise-300">
            Características Principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover-scale">
              <div className="w-12 h-12 bg-moneywise-100 dark:bg-moneywise-900 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="text-moneywise-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-moneywise-700 dark:text-moneywise-300">Ahorro Inteligente</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Registra tus ingresos y gastos para obtener recomendaciones personalizadas de ahorro.
              </p>
              <Link to="/smart-savings" className="inline-flex items-center text-moneywise-500 hover:text-moneywise-600">
                Explorar <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover-scale">
              <div className="w-12 h-12 bg-moneywise-100 dark:bg-moneywise-900 rounded-full flex items-center justify-center mb-4">
                <Target className="text-moneywise-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-moneywise-700 dark:text-moneywise-300">Metas de Ahorro</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Establece objetivos financieros y visualiza tu progreso hacia ellos.
              </p>
              <Link to="/savings-goals" className="inline-flex items-center text-moneywise-500 hover:text-moneywise-600">
                Explorar <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover-scale">
              <div className="w-12 h-12 bg-moneywise-100 dark:bg-moneywise-900 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-moneywise-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-moneywise-700 dark:text-moneywise-300">Asistente IA</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Chatbot inteligente que responde a tus preguntas sobre finanzas personales.
              </p>
              <Link to="/chatbot" className="inline-flex items-center text-moneywise-500 hover:text-moneywise-600">
                Explorar <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-moneywise-500/10 p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-moneywise-500/20 to-moneywise-600/20 z-0"></div>
            <div className="relative z-10">
              <PiggyBank className="text-moneywise-500 mx-auto mb-6" size={56} />
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-moneywise-800 dark:text-moneywise-200">
                Comienza tu viaje hacia la libertad financiera
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Únete a miles de personas que han transformado su relación con el dinero y alcanzado sus metas financieras.
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-moneywise-500 hover:bg-moneywise-600">
                  <Link to="/register">Registrarse Gratis</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-moneywise-700 dark:text-moneywise-300">MoneyWise</h3>
              <p className="text-gray-600 dark:text-gray-400">Tu compañero de finanzas personales</p>
            </div>
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-moneywise-500 dark:hover:text-moneywise-400">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-moneywise-500 dark:hover:text-moneywise-400">
                Registrarse
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} MoneyWise. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
