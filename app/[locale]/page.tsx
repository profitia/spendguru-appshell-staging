import { redirect } from 'next/navigation'

import { DashboardShell } from '@/components/dashboard-shell'
import { RawDataView } from '@/components/raw-data-view'

type LocaleHomePageProps = {
  params: {
    locale: string
  }
  searchParams?: {
    embed?: string
  }
}

export const dynamic = 'force-dynamic'

export default function LocaleHomePage({ params: { locale }, searchParams }: LocaleHomePageProps) {
  const embedded = searchParams?.embed === '1'

  if (!embedded) {
    redirect(`/${locale}/workspace/dashboard`)
  }

  return (
    <DashboardShell embedded={embedded}>
      <RawDataView embedded={embedded} />
    </DashboardShell>
  )
}
