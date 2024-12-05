/* eslint-disable @typescript-eslint/no-explicit-any */
import {styled} from 'styled-components';
import { useTranslation } from 'react-i18next';

const Label: any = styled.label`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: ${({ width }: any) => `${width}%`};
  min-height: 100%;
  padding: 16px;
  p {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
  }
`;

const Description: any = styled.span`
  color: ${({ theme }) => theme.white};
  background: ${({ theme, description }: any) =>
    description === 'Optional' ? theme.greyHight : theme.bg_primary};
  padding: 3px 8px;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 10px;
`;

const FormLabel = ({
  title,
  width = 30,
  fontSize = 'size_14',
  fontWeight = 'fw_600',
  description,
  forTarget,
}: any) => {
  const { t } = useTranslation(['common']);
  return (
    <Label
      htmlFor={forTarget}
      width={width}>
      <p style={{ fontWeight, fontSize }}>{title}</p>
      {description && (
        <Description description={description}>
          {description === 'Optional' ? t('label_optional') : t('label_required')}
        </Description>
      )}
    </Label>
  );
};

export default FormLabel;