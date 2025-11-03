import { Card } from '@/components/ui/card';
import { TypographyH2, TypographyMuted } from '@/components/ui/typography';
import { useTranslations } from 'next-intl';

export const ExamsCard = () => {
  const t = useTranslations('exams-card');
  return (
    <Card className="p-6">
      <TypographyH2 className="mb-4">{t('title')}</TypographyH2>
      <TypographyMuted>{t('label')}</TypographyMuted>
    </Card>
  );
};
