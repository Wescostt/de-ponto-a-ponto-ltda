import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import PortalLayout from "./components/portal/PortalLayout";
import Dashboard from "./pages/portal/Dashboard";
import Onboarding from "./pages/portal/Onboarding";
import Galeria from "./pages/portal/Galeria";
import Biblioteca from "./pages/portal/Biblioteca";
import Auditorias from "./pages/portal/Auditorias";
import Tickets from "./pages/portal/Tickets";
import Forum from "./pages/portal/Forum";
import Aprovacoes from "./pages/portal/admin/Aprovacoes";
import Empresas from "./pages/portal/admin/Empresas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/portal" element={<PortalLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="galeria" element={<Galeria />} />
              <Route path="biblioteca" element={<Biblioteca />} />
              <Route path="auditorias" element={<Auditorias />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="forum" element={<Forum />} />
              <Route path="admin/aprovacoes" element={<Aprovacoes />} />
              <Route path="admin/empresas" element={<Empresas />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
