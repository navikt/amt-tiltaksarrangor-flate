import React from 'react'

import { TilbakelenkeContextProvider } from './TilbakelenkeContextProvider'
import { TiltaksoversiktSokProvider } from './TiltaksoversiktSokProvider'
import { InnloggetBrukerContextProvider } from './InnloggetBrukerContextProvider'
import { KoordinatorsDeltakerlisterContextProvider } from './KoordinatorsDeltakerlisterContextProvider'
import { KoordinatorFilterContextProvider } from '../component/page/deltakerliste-detaljer/store/KoordinatorFilterContextProvider'
import { VeilederFilterMenyStoreProvider } from '../component/page/veileder/store/veileder-filter-meny-store-provider'

interface StoreProviderProps {
  children: React.ReactNode
}

const StoreProvider = (
  props: StoreProviderProps
): React.ReactElement<StoreProviderProps> => {
  return (
    <TiltaksoversiktSokProvider>
      <KoordinatorsDeltakerlisterContextProvider>
        <KoordinatorFilterContextProvider>
          <VeilederFilterMenyStoreProvider>
            <InnloggetBrukerContextProvider>
              <TilbakelenkeContextProvider>
                {props.children}
              </TilbakelenkeContextProvider>
            </InnloggetBrukerContextProvider>
          </VeilederFilterMenyStoreProvider>
        </KoordinatorFilterContextProvider>
      </KoordinatorsDeltakerlisterContextProvider>
    </TiltaksoversiktSokProvider>
  )
}

export default StoreProvider
