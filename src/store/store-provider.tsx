import React from 'react'

import { TilbakelenkeContextProvider } from './TilbakelenkeContextProvider'
import { TiltaksoversiktSokContextProvider } from './TiltaksoversiktSokContextProvider'
import { InnloggetBrukerContextProvider } from './InnloggetBrukerContextProvider'
import { KoordinatorsDeltakerlisterContextProvider } from './KoordinatorsDeltakerlisterContextProvider'
import { KoordinatorFilterContextProvider } from '../component/page/deltakerliste-detaljer/store/KoordinatorFilterContextProvider'
import { VeilederFilterContextProvider } from '../component/page/veileder/store/VeilederFilterContextProvider'

interface StoreProviderProps {
  children: React.ReactNode
}

const StoreProvider = (
  props: StoreProviderProps
): React.ReactElement<StoreProviderProps> => {
  return (
    <TiltaksoversiktSokContextProvider>
      <KoordinatorsDeltakerlisterContextProvider>
        <KoordinatorFilterContextProvider>
          <VeilederFilterContextProvider>
            <InnloggetBrukerContextProvider>
              <TilbakelenkeContextProvider>
                {props.children}
              </TilbakelenkeContextProvider>
            </InnloggetBrukerContextProvider>
          </VeilederFilterContextProvider>
        </KoordinatorFilterContextProvider>
      </KoordinatorsDeltakerlisterContextProvider>
    </TiltaksoversiktSokContextProvider>
  )
}

export default StoreProvider
