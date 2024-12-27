"use client";

import {
  ChevronRight,
  Home,
  Package,
  Tag,
  Users,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function NavMain() {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Products",
      icon: Package,
      items: [
        { title: "Create Product", url: "/products/create" },
        { title: "All Products", url: "/dashboard/index-product" },
      ],
    },
    {
      title: "Categories",
      icon: Tag,
      items: [
        { title: "Create Category", url: "/dashboard/create-category" },
        { title: "All Categories", url: "/dashboard/index-category" },
      ],
    },
    {
      title: "Users",
      icon: Users,
      items: [
        { title: "All Users", url: "/users/all" },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items && (
                    <ChevronRight
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}


    
        
    

