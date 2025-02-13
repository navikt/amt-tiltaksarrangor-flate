import { Tag } from '@navikt/ds-react'
import { ForslagStatusType } from '../../../../../api/data/forslag'

export function ForslagStatusTag({
  type,
  className
}: {
  type: ForslagStatusType
  className?: string
}) {
  switch (type) {
    case ForslagStatusType.VenterPaSvar: {
      return (
        <Tag variant="info" size="small" className={className ?? ''}>
          Venter på svar fra Nav
        </Tag>
      )
    }
    case ForslagStatusType.Godkjent: {
      return (
        <Tag variant="success" size="small" className={className ?? ''}>
          Godkjent av Nav
        </Tag>
      )
    }
    case ForslagStatusType.Avvist: {
      return (
        <Tag variant="error" size="small" className={className ?? ''}>
          Avvist av Nav
        </Tag>
      )
    }
  }
}
