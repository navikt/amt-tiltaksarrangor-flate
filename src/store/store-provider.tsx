import React from 'react'

import { TilbakelenkeContextProvider } from './TilbakelenkeContextProvider'
import { TiltaksoversiktSokProvider } from './TiltaksoversiktSokProvider'
import { InnloggetBrukerContextProvider } from './InnloggetBrukerContextProvider'
import { KoordinatorsDeltakerlisterContextProvider } from './KoordinatorsDeltakerlisterContextProvider'
import { KoordinatorFilterMenyStoreProvider } from '../component/page/deltakerliste-detaljer/store/koordinator-filter-meny-store-provider'
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
        <KoordinatorFilterMenyStoreProvider>
          <VeilederFilterMenyStoreProvider>
            <InnloggetBrukerContextProvider>
              <TilbakelenkeContextProvider>
                {props.children}
              </TilbakelenkeContextProvider>
            </InnloggetBrukerContextProvider>
          </VeilederFilterMenyStoreProvider>
        </KoordinatorFilterMenyStoreProvider>
      </KoordinatorsDeltakerlisterContextProvider>
    </TiltaksoversiktSokProvider>
  )
}

export default StoreProvider
