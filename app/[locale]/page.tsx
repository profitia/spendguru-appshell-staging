import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'

import { DashboardShell } from '@/components/dashboard-shell'
import { RawDataView } from '@/components/raw-data-view'
import { getSeries } from '@/lib/time-series/series-query'

type LocaleHomePageProps = {
  params: {
    locale: 'pl' | 'en'
  }
  searchParams?: {
    embed?: string
    seriesId?: string
    range?: string
    displayName?: string
  }
}

export const dynamic = 'force-dynamic'

export default async function LocaleHomePage({ params: { locale }, searchParams }: LocaleHomePageProps) {
  noStore()

  const embedded = searchParams?.embed === '1'
  let initialBenchmarkSeries = null

  if (!embedded) {
    redirect(`/${locale}/workspace/dashboard`)
  }

  if (searchParams?.seriesId?.trim()) {
    const initialParams = new URLSearchParams({
      seriesId: searchParams.seriesId.trim(),
    })

    if (searchParams.range?.trim()) {
      initialParams.set('range', searchParams.range.trim())
    }

    if (searchParams.displayName?.trim()) {
      initialParams.set('displayName', searchParams.displayName.trim())
    }

    try {
      initialBenchmarkSeries = await getSeries(initialParams, locale)
    } catch {
      initialBenchmarkSeries = null
    }
  }

  return (
    <DashboardShell embedded={embedded}>
      <RawDataView embedded={embedded} initialBenchmarkSeries={initialBenchmarkSeries} />
    </DashboardShell>
  )
}
