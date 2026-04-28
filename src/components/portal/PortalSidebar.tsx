import { LayoutDashboard, Image as ImageIcon, FileText, LifeBuoy, ClipboardList, FileCheck2, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const items = [
  { title: "Dashboard", url: "/portal", icon: LayoutDashboard, end: true },
  { title: "Onboarding", url: "/portal/onboarding", icon: Sparkles },
  { title: "Galeria", url: "/portal/galeria", icon: ImageIcon },
  { title: "Biblioteca", url: "/portal/biblioteca", icon: FileText },
  { title: "Auditorias", url: "/portal/auditorias", icon: FileCheck2 },
  { title: "Tickets", url: "/portal/tickets", icon: LifeBuoy },
  { title: "Fórum", url: "/portal/forum", icon: MessageSquare },
];

const adminItems = [
  { title: "Aprovações", url: "/portal/admin/aprovacoes", icon: ShieldCheck },
  { title: "Empresas", url: "/portal/admin/empresas", icon: ClipboardList },
];

export function PortalSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isAdmin } = useAuth();
  const location = useLocation();

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
      isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
    }`;

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-card/40 backdrop-blur-xl">
        <div className="px-4 py-4 flex items-center gap-2 border-b border-border/50">
          <img src={logo} alt="De Ponto a Ponto" className="w-8 h-8 object-contain" />
          {!collapsed && <span className="font-semibold text-sm">De Ponto a Ponto</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.end} className={linkCls}>
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={linkCls}>
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
