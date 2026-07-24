import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function LocaleHomePage({ params: { locale } }: { params: { locale: string } }) {
  redirect(`/${locale}/workspace/dashboard`)
}
