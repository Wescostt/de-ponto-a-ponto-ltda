import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase, setRememberMe } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

const signInSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Mínimo 6 caracteres").max(100),
});

const signUpSchema = signInSchema.extend({
  full_name: z.string().trim().min(2, "Informe seu nome").max(120),
  phone: z.string().trim().min(8, "Telefone inválido").max(30),
  company_name: z.string().trim().min(2, "Informe a empresa").max(160),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    company_name: "",
  });

  useEffect(() => {
    if (!loading && user) navigate("/portal", { replace: true });
  }, [user, loading, navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const v = signInSchema.parse({ email: form.email, password: form.password });
        
        // Define dynamic storage choice before signing in
        setRememberMe(remember);

        const { data, error } = await supabase.auth.signInWithPassword({ 
          email: v.email, 
          password: v.password 
        });

        if (error) {
          try {
            await supabase.from("auth_login_events").insert({
              event_type: "login_failed",
              remember_me: remember,
              user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
              metadata: { email: v.email, error: error.message }
            });
          } catch (logErr) {
            console.error("Erro ao registrar falha de login:", logErr);
          }
          throw error;
        }

        const userId = data.user?.id;
        if (!userId) {
          throw new Error("Não foi possível identificar o usuário autenticado.");
        }

        // Validate profiles status is approved
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, status")
          .eq("id", userId)
          .single();

        if (profileError || !profile) {
          await supabase.auth.signOut();
          throw new Error("Perfil não localizado. Entre em contato com o suporte da De Ponto a Ponto.");
        }

        if (profile.status !== "approved") {
          await supabase.auth.signOut();
          if (profile.status === "pending") {
            throw new Error("Seu acesso ainda está pendente de aprovação.");
          } else {
            throw new Error("Seu acesso não foi aprovado. Entre em contato com o suporte.");
          }
        }

        // Log login_success
        try {
          await supabase.from("auth_login_events").insert({
            user_id: userId,
            event_type: "login_success",
            remember_me: remember,
            user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
            metadata: { email: v.email }
          });
        } catch (logErr) {
          console.error("Erro ao registrar sucesso de login:", logErr);
        }

        toast.success("Bem-vindo de volta.");
        navigate("/portal");
      } else {
        const v = signUpSchema.parse(form);
        const { error } = await supabase.auth.signUp({
          email: v.email,
          password: v.password,
          options: {
            emailRedirectTo: `${window.location.origin}/portal`,
            data: {
              full_name: v.full_name,
              phone: v.phone,
              company_name: v.company_name,
            },
          },
        });
        if (error) throw error;
        toast.success("Cadastro recebido. Aguarde aprovação do administrador.");
        setMode("signin");
      }
    } catch (err: unknown) {
      const errorObj = err as { errors?: { message: string }[]; message?: string };
      toast.error(errorObj?.errors?.[0]?.message ?? errorObj?.message ?? "Erro");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center mb-8 text-sm text-muted-foreground hover:text-foreground">
          ← Voltar ao site
        </Link>
        <Card className="glass p-8">
          <h1 className="text-2xl font-semibold mb-1">
            {mode === "signin" ? "Entrar no Portal" : "Solicitar acesso"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "signin"
              ? "Acesse sua área exclusiva De Ponto a Ponto."
              : "Seu cadastro será analisado pela nossa equipe."}
          </p>

          <form onSubmit={handle} className="space-y-4">
            {mode === "signup" && (
              <>
                <div>
                  <Label htmlFor="full_name">Nome completo</Label>
                  <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="company_name">Empresa</Label>
                  <Input id="company_name" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} />
                </div>
              </>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative flex items-center">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={form.password} 
                  onChange={(e) => setForm({ ...form, password: e.target.value })} 
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === "signin" && (
              <div className="flex items-start space-x-2 pt-1">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer mt-1"
                />
                <div className="grid gap-1 leading-none">
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Continuar conectado neste dispositivo
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use esta opção apenas em computadores ou celulares de confiança.
                  </p>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "signin" ? "Entrar" : "Solicitar acesso"}
            </Button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-sm text-muted-foreground hover:text-foreground mt-6 block w-full text-center"
          >
            {mode === "signin" ? "Não tem conta? Solicite acesso" : "Já tem conta? Entrar"}
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Auth;

