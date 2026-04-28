import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PortalSidebar } from "./PortalSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, ShieldAlert } from "lucide-react";

const PortalLayout = () => {
  const { user, loading, profile, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando…</div>;
  }
  if (!user) return <Navigate to="/auth" replace />;

  if (profile?.status === "pending") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass max-w-md p-10 rounded-2xl text-center">
          <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-semibold mb-2">Cadastro em análise</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Recebemos sua solicitação de acesso. Nossa equipe revisará seus dados em breve e você
            receberá uma confirmação por email.
          </p>
          <Button variant="outline" onClick={async () => { await signOut(); navigate("/"); }}>
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </div>
    );
  }

  if (profile?.status === "rejected") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="glass max-w-md p-10 rounded-2xl">
          <h1 className="text-xl font-semibold mb-2">Acesso não aprovado</h1>
          <p className="text-muted-foreground text-sm mb-6">Entre em contato com o suporte.</p>
          <Button onClick={async () => { await signOut(); navigate("/"); }}>Sair</Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <PortalSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 backdrop-blur-xl bg-background/60 sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm text-muted-foreground hidden md:block">Portal De Ponto a Ponto</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:block">{profile?.full_name || profile?.email}</span>
              <Button size="sm" variant="ghost" onClick={async () => { await signOut(); navigate("/"); }}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PortalLayout;
