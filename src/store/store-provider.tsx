import React from 'react'

import { TilbakelenkeContextProvider } from './TilbakelenkeContextProvider'
import { TiltaksoversiktSokProvider } from './TiltaksoversiktSokProvider'
import { InnloggetBrukerStoreProvider } from './innlogget-bruker-store'
import { KoordinatorsDeltakerlisterStoreProvider } from './koordinators-deltakerlister-store'
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
      <KoordinatorsDeltakerlisterStoreProvider>
        <KoordinatorFilterMenyStoreProvider>
          <VeilederFilterMenyStoreProvider>
            <InnloggetBrukerStoreProvider>
              <TilbakelenkeContextProvider>
                {props.children}
              </TilbakelenkeContextProvider>
            </InnloggetBrukerStoreProvider>
          </VeilederFilterMenyStoreProvider>
        </KoordinatorFilterMenyStoreProvider>
      </KoordinatorsDeltakerlisterStoreProvider>
    </TiltaksoversiktSokProvider>
  )
}

export default StoreProvider
