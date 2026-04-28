import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
        const { error } = await supabase.auth.signInWithPassword({ email: v.email, password: v.password });
        if (error) throw error;
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
    } catch (err: any) {
      toast.error(err?.errors?.[0]?.message ?? err?.message ?? "Erro");
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
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>

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
