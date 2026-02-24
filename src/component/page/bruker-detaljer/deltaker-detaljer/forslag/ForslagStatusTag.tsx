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
        <Tag
          data-color="info"
          variant="outline"
          size="small"
          className={className ?? ''}>Venter på svar fra Nav
        </Tag>
      )
    }
    case ForslagStatusType.Godkjent: {
      return (
        <Tag
          data-color="success"
          variant="outline"
          size="small"
          className={className ?? ''}>Godkjent av Nav
        </Tag>
      )
    }
    case ForslagStatusType.Avvist: {
      return (
        <Tag
          data-color="danger"
          variant="outline"
          size="small"
          className={className ?? ''}>Avvist av Nav
        </Tag>
      )
    }
  }
}
