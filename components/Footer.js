import { useI18n } from "context/i18n";

export default function Footer() {
  const { t }= useI18n()
  return <footer className='mt-4 text-center text-gray-500 text-sm'>
    <p>{t('FOOTER_POWERED_BY')} <a href='https://xkcd.com' target='_blank' rel='noopener noreferrer'>xkcd</a></p>
    <p>
      {t('FOOTER_CREATED_BY')} <a href='https://github.com/chirinosjor' target='_blank' rel='noopener noreferrer'>Jorge Chirinos</a></p>
  </footer>
}