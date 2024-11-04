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
  }
}
