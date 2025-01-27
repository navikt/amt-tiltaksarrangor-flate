import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler'

import env from './environment'

const utledEnv = () => {
  if (env.isProd) {
    return 'prod'
  } else if (env.isPreprod) {
    return 'dev'
  } else if (env.isDemo) {
    return 'prod' // Demoen er åpen på internet, så vi bruker 'prod'
  } else {
    return 'dev'
  }
}

export const setupNavDekorator = (): Promise<void> => {
  return injectDecoratorClientSide({
    env: utledEnv(),
    params: {
      context: 'samarbeidspartner',
      simpleFooter: true,
      shareScreen: false,
      level: 'Level4',
      logoutWarning: env.isProd || env.isPreprod
    }
  })
}
