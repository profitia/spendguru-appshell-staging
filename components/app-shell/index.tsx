'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'

type NavigationItem = {
  id: string
  href?: Route
  label: string
  tooltip: string
  shortLabel: string
  status: 'available' | 'planned'
  icon: 'dashboard' | 'categories' | 'suppliers' | 'offers' | 'assistant'
}

function ModuleIcon({ icon }: { icon: NavigationItem['icon'] }) {
  switch (icon) {
    case 'dashboard':
      return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" /></svg>
    case 'categories':
      return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 6h7v5H4zM13 6h7v5h-7zM4 13h7v5H4zM13 13h7v5h-7z" /></svg>
    case 'suppliers':
      return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 12a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 12 12Zm-6 8v-1a5.5 5.5 0 0 1 11 0v1Zm12-4.5a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5Zm0 1.5a4.4 4.4 0 0 1 4 2.6V20h-4.1" /></svg>
    case 'offers':
      return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 6h14v12H5z" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10h8M8 14h5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
    case 'assistant':
      return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3 14.2 7.8 19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2Z" /></svg>
  }
}

function NavigationButton({ item, isActive, soonLabel }: { item: NavigationItem; isActive: boolean; soonLabel: string }) {
  const content = (
    <>
      <span className="module-rail-icon-frame">
        <ModuleIcon icon={item.icon} />
      </span>
      <span className="module-rail-item-copy">
        <span className="module-rail-item-label">{item.shortLabel}</span>
        {item.status === 'planned' ? <span className="module-rail-item-badge">{soonLabel}</span> : null}
      </span>
    </>
  )

  if (item.status === 'available' && item.href) {
    return (
      <Link href={item.href} className={`module-rail-item${isActive ? ' is-active' : ''}`} aria-current={isActive ? 'page' : undefined} aria-label={item.label} title={item.tooltip}>
        {content}
      </Link>
    )
  }

  return (
    <span className="module-rail-item is-planned" aria-disabled="true" aria-label={`${item.label} · ${soonLabel}`} title={`${item.tooltip} · ${soonLabel}`}>
      {content}
    </span>
  )
}

export function AppShell({
  children,
  locale,
  title,
  description,
  navigationItems,
  soonLabel,
  brandLabel,
  mobileNavigationLabel,
}: {
  children: React.ReactNode
  locale: string
  title: string
  description: string
  navigationItems: NavigationItem[]
  soonLabel: string
  brandLabel: string
  mobileNavigationLabel: string
}) {
  const pathname = usePathname()
  const activeItem = navigationItems.find((item) => {
    if (!item.href) {
      return false
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`)
  }) ?? navigationItems[0]
  const dashboardHref = `/${locale}/workspace/dashboard` as Route

  return (
    <div className="workspace-shell">
      <aside className="module-rail" aria-label={mobileNavigationLabel}>
        <Link href={dashboardHref} className="module-rail-brand" title={brandLabel}>
          <span className="module-rail-brand-mark">SG</span>
          <span className="module-rail-brand-copy">{brandLabel}</span>
        </Link>

        <nav className="module-rail-nav">
          {navigationItems.map((item) => (
            <NavigationButton key={item.id} item={item} isActive={activeItem?.id === item.id} soonLabel={soonLabel} />
          ))}
        </nav>
      </aside>

      <div className="workspace-frame">
        <header className="workspace-header panel">
          <div>
            <p className="workspace-header-kicker">{brandLabel}</p>
            <h1 className="workspace-header-title">{title}</h1>
            <p className="workspace-header-description">{description}</p>
          </div>
        </header>

        <main className="workspace-viewport">{children}</main>
      </div>

      <nav className="mobile-module-nav" aria-label={mobileNavigationLabel}>
        {navigationItems.map((item) => {
          const isActive = activeItem?.id === item.id

          if (item.status === 'available' && item.href) {
            return (
              <Link key={item.id} href={item.href} className={`mobile-module-item${isActive ? ' is-active' : ''}`} aria-current={isActive ? 'page' : undefined} title={item.tooltip}>
                <ModuleIcon icon={item.icon} />
                <span>{item.shortLabel}</span>
              </Link>
            )
          }

          return (
            <span key={item.id} className="mobile-module-item is-planned" aria-disabled="true" title={`${item.tooltip} · ${soonLabel}`}>
              <ModuleIcon icon={item.icon} />
              <span>{item.shortLabel}</span>
            </span>
          )
        })}
      </nav>
    </div>
  )
}