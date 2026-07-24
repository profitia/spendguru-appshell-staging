import { redirect } from 'next/navigation'

export default function WorkspacePage({ params: { locale } }: { params: { locale: string } }) {
  redirect(`/${locale}/workspace/dashboard`)
}