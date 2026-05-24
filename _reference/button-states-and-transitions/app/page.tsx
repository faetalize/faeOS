"use client"

import { useState } from "react"
import { ExpandableButton } from "@/components/expandable-button"
import { Home, Settings, User, Bell, Mail, Heart, Star, Search } from "lucide-react"

export default function Page() {
  const [expanded, setExpanded] = useState(false)

  const buttons = [
    { icon: <Home />, label: "Go to Home", collapsedLabel: "Home" },
    { icon: <Settings />, label: "Open Settings", collapsedLabel: "Settings" },
    { icon: <User />, label: "View Profile", collapsedLabel: "Profile" },
    { icon: <Bell />, label: "Notifications", collapsedLabel: "Alerts" },
    { icon: <Mail />, label: "Check Messages", collapsedLabel: "Mail" },
    { icon: <Heart />, label: "Your Favorites", collapsedLabel: "Favs" },
    { icon: <Star />, label: "Starred Items", collapsedLabel: "Stars" },
    { icon: <Search />, label: "Search Everything", collapsedLabel: "Search" },
  ]

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Expandable Buttons
          </h1>
          <p className="text-muted-foreground">
            Buttons with collapsed and expanded states. Toggle the switch to see the transition.
          </p>
        </div>

        {/* Toggle Control */}
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
              expanded ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                expanded ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-sm font-medium text-foreground">
            {expanded ? "Expanded" : "Collapsed"}
          </span>
        </div>

        {/* Icon Only (Collapsed without label) */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Icon Only → Expanded</h2>
            <p className="text-sm text-muted-foreground">
              Collapsed state shows icon only. Expanded state shows icon with full label.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {buttons.slice(0, 4).map((btn, i) => (
              <ExpandableButton
                key={i}
                icon={btn.icon}
                label={btn.label}
                expanded={expanded}
                variant="default"
              />
            ))}
          </div>
        </section>

        {/* Icon with Small Label (Collapsed with label) */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Icon + Small Label → Expanded</h2>
            <p className="text-sm text-muted-foreground">
              Collapsed state shows icon with predefined small label below. Expanded state shows icon with full label inline.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-3">
            {buttons.slice(0, 4).map((btn, i) => (
              <ExpandableButton
                key={i}
                icon={btn.icon}
                label={btn.label}
                collapsedLabel={btn.collapsedLabel}
                expanded={expanded}
                variant="outline"
              />
            ))}
          </div>
        </section>

        {/* All Variants */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Button Variants</h2>
            <p className="text-sm text-muted-foreground">
              All style variants with icon + small label in collapsed state.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-4">
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Default</span>
              <ExpandableButton
                icon={<Home />}
                label="Go to Home"
                collapsedLabel="Home"
                expanded={expanded}
                variant="default"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Secondary</span>
              <ExpandableButton
                icon={<Settings />}
                label="Open Settings"
                collapsedLabel="Settings"
                expanded={expanded}
                variant="secondary"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Outline</span>
              <ExpandableButton
                icon={<User />}
                label="View Profile"
                collapsedLabel="Profile"
                expanded={expanded}
                variant="outline"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Ghost</span>
              <ExpandableButton
                icon={<Bell />}
                label="Notifications"
                collapsedLabel="Alerts"
                expanded={expanded}
                variant="ghost"
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground">Destructive</span>
              <ExpandableButton
                icon={<Heart />}
                label="Remove Favorite"
                collapsedLabel="Remove"
                expanded={expanded}
                variant="destructive"
              />
            </div>
          </div>
        </section>

        {/* Sidepanel Entry Variant - Interactive Demo */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Sidepanel Entry Variant</h2>
            <p className="text-sm text-muted-foreground">
              Frosted glass effect with more padding and left-aligned expanded content. Shown in a realistic sidepanel context.
            </p>
          </div>
          
          {/* Container with image background to showcase the blur effect */}
          <div className="relative overflow-hidden rounded-xl h-[500px]">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80")`,
              }}
            />
            {/* Subtle overlay for better contrast */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Sidepanel - no blur here, blur is on the buttons themselves */}
            <div 
              className={`absolute left-4 top-4 bottom-4 flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/10 p-3 transition-all duration-300 ease-in-out ${
                expanded ? "w-56" : "w-20"
              }`}
            >
              {/* Sidepanel header */}
              <div className={`flex items-center px-2 py-2 border-b border-white/10 mb-2 ${expanded ? "justify-between" : "justify-center"}`}>
                {expanded && <span className="text-sm font-semibold text-white">Menu</span>}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="size-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <svg 
                    className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex flex-col gap-2">
                <ExpandableButton
                  icon={<Home />}
                  label="Dashboard"
                  collapsedLabel="Home"
                  expanded={expanded}
                  variant="sidepanel-entry"
                />
                <ExpandableButton
                  icon={<Search />}
                  label="Search"
                  expanded={expanded}
                  variant="sidepanel-entry"
                />
                <ExpandableButton
                  icon={<Bell />}
                  label="Notifications"
                  collapsedLabel="Alerts"
                  expanded={expanded}
                  variant="sidepanel-entry"
                />
                <ExpandableButton
                  icon={<Mail />}
                  label="Messages"
                  collapsedLabel="Mail"
                  expanded={expanded}
                  variant="sidepanel-entry"
                />
                <ExpandableButton
                  icon={<Star />}
                  label="Favorites"
                  collapsedLabel="Stars"
                  expanded={expanded}
                  variant="sidepanel-entry"
                />
              </div>
              
              {/* Spacer */}
              <div className="flex-1" />
              
              {/* Bottom section */}
              <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
                <ExpandableButton
                  icon={<Settings />}
                  label="Settings"
                  collapsedLabel="Config"
                  expanded={expanded}
                  variant="sidepanel-entry"
                />
                <ExpandableButton
                  icon={<User />}
                  label="Account"
                  collapsedLabel="Profile"
                  expanded={expanded}
                  variant="sidepanel-entry"
                />
              </div>
            </div>
            
            {/* Content area with normal button variants - plain background, no image */}
            <div className={`absolute top-4 bottom-4 right-4 rounded-2xl border border-border bg-card p-6 overflow-auto transition-all duration-300 ${expanded ? "left-64" : "left-28"}`}>
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">Normal Button Variants</h3>
                  <p className="text-sm text-muted-foreground">Comparison of standard expandable buttons</p>
                </div>
                
                {/* Icon Only */}
                <div className="space-y-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Icon Only</span>
                  <div className="flex flex-wrap gap-2">
                    <ExpandableButton icon={<Home />} label="Home" expanded={expanded} variant="default" />
                    <ExpandableButton icon={<Settings />} label="Settings" expanded={expanded} variant="secondary" />
                    <ExpandableButton icon={<User />} label="Profile" expanded={expanded} variant="outline" />
                    <ExpandableButton icon={<Bell />} label="Alerts" expanded={expanded} variant="ghost" />
                    <ExpandableButton icon={<Heart />} label="Remove" expanded={expanded} variant="destructive" />
                  </div>
                </div>
                
                {/* Icon + Small Label */}
                <div className="space-y-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Icon + Small Label</span>
                  <div className="flex flex-wrap gap-2">
                    <ExpandableButton icon={<Home />} label="Go to Home" collapsedLabel="Home" expanded={expanded} variant="default" />
                    <ExpandableButton icon={<Settings />} label="Open Settings" collapsedLabel="Config" expanded={expanded} variant="secondary" />
                    <ExpandableButton icon={<User />} label="View Profile" collapsedLabel="Profile" expanded={expanded} variant="outline" />
                    <ExpandableButton icon={<Bell />} label="Notifications" collapsedLabel="Alerts" expanded={expanded} variant="ghost" />
                    <ExpandableButton icon={<Heart />} label="Remove Favorite" collapsedLabel="Remove" expanded={expanded} variant="destructive" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Side-by-side comparison */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">Side-by-Side Comparison</h2>
            <p className="text-sm text-muted-foreground">
              Static comparison of all three states.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-3 rounded-lg border border-border bg-card p-4">
              <span className="text-sm font-medium text-foreground">Collapsed (Icon Only)</span>
              <div className="flex gap-2">
                <ExpandableButton icon={<Home />} label="Home" variant="default" />
                <ExpandableButton icon={<Settings />} label="Settings" variant="outline" />
              </div>
            </div>
            <div className="space-y-3 rounded-lg border border-border bg-card p-4">
              <span className="text-sm font-medium text-foreground">Collapsed (Icon + Label)</span>
              <div className="flex gap-2">
                <ExpandableButton icon={<Home />} label="Home" collapsedLabel="Home" variant="default" />
                <ExpandableButton icon={<Settings />} label="Settings" collapsedLabel="Config" variant="outline" />
              </div>
            </div>
            <div className="space-y-3 rounded-lg border border-border bg-card p-4">
              <span className="text-sm font-medium text-foreground">Expanded</span>
              <div className="flex flex-col gap-2">
                <ExpandableButton icon={<Home />} label="Go to Home" expanded variant="default" />
                <ExpandableButton icon={<Settings />} label="Open Settings" expanded variant="outline" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
