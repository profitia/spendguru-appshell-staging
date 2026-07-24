import { getTranslations } from 'next-intl/server'
import type { Route } from 'next'

import { AppShell } from '@/components/app-shell'

export default async function WorkspaceLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'AppShell' })
  const dashboardHref = `/${locale}/workspace/dashboard` as Route

  return (
    <AppShell
      locale={locale}
      title={t('dashboard.title')}
      description={t('dashboard.description')}
      brandLabel={t('brand')}
      soonLabel={t('soon')}
      mobileNavigationLabel={t('mobileNavigation')}
      navigationItems={[
        {
          id: 'dashboard',
          href: dashboardHref,
          label: t('dashboard.title'),
          tooltip: t('dashboard.tooltip'),
          shortLabel: t('dashboard.shortLabel'),
          status: 'available',
          icon: 'dashboard',
        },
        {
          id: 'categories',
          label: t('categories.title'),
          tooltip: t('categories.tooltip'),
          shortLabel: t('categories.shortLabel'),
          status: 'planned',
          icon: 'categories',
        },
        {
          id: 'suppliers',
          label: t('suppliers.title'),
          tooltip: t('suppliers.tooltip'),
          shortLabel: t('suppliers.shortLabel'),
          status: 'planned',
          icon: 'suppliers',
        },
        {
          id: 'offers',
          label: t('offers.title'),
          tooltip: t('offers.tooltip'),
          shortLabel: t('offers.shortLabel'),
          status: 'planned',
          icon: 'offers',
        },
        {
          id: 'assistant',
          label: t('assistant.title'),
          tooltip: t('assistant.tooltip'),
          shortLabel: t('assistant.shortLabel'),
          status: 'planned',
          icon: 'assistant',
        },
      ]}
    >
      {children}
    </AppShell>
  )
}