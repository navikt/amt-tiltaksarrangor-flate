import {
  CaretRightCircleFillIcon,
  ChevronRightCircleFillIcon,
  ChevronRightDoubleCircleFillIcon,
  ChevronRightLastCircleFillIcon,
  MenuElipsisHorizontalCircleFillIcon,
  MinusCircleFillIcon,
  PieChartFillIcon,
  PlusCircleFillIcon
} from '@navikt/aksel-icons'
import { EndringType } from '../../../../../api/data/historikk'

interface EndringTypeIkonProps {
  type: EndringType
  size?: 'medium' | 'large' | 'small'
}

export const HistorikkEndringTypeIkon = ({ type, size }: EndringTypeIkonProps) => {
  const sizeName = (size?: 'small' | 'medium' | 'large') => {
    if (size === 'large') {
      return 'h-7 w-7'
    } else if (size === 'small') {
      return 'h-5 w-5'
    } else {
      return 'h-6 w-6'
    }
  }
  switch (type) {
    case EndringType.EndreStartdato:
      return (
        <ChevronRightCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-deepblue-300)"
        />
      )
    case EndringType.ForlengDeltakelse:
      return (
        <ChevronRightDoubleCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-icon-success)"
        />
      )
    case EndringType.AvsluttDeltakelse:
    case EndringType.EndreSluttdato:
      return (
        <MinusCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-gray-600)"
        />
      )
    case EndringType.IkkeAktuell:
      return (
        <PlusCircleFillIcon
          className={`${sizeName(size)} rotate-45`}
          aria-hidden
          color="var(--a-orange-600)"
        />
      )
    case EndringType.EndreSluttarsak:
      return (
        <ChevronRightLastCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-gray-500)"
        />
      )
    case EndringType.EndreBakgrunnsinformasjon:
    case EndringType.EndreInnhold:
      return (
        <MenuElipsisHorizontalCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-deepblue-400)"
        />
      )
    case EndringType.EndreDeltakelsesmengde:
      return (
        <PieChartFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-purple-500)"
        />
      )
    case EndringType.ReaktiverDeltakelse:
      return (
        <CaretRightCircleFillIcon
          className={sizeName(size)}
          aria-hidden
          color="var(--a-icon-alt-2)"
        />
      )
  }
}
