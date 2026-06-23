import { injectDecoratorClientSide, logAnalyticsCustomEvent } from '@navikt/nav-dekoratoren-moduler'

import { APP_NAME, TEAM_NAME } from './constants'
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

export const setupNavDekorator = async (): Promise<void> => {
  await injectDecoratorClientSide({
    env: utledEnv(),
    teamName: TEAM_NAME,
    params: {
      context: 'samarbeidspartner',
      simpleFooter: true,
      shareScreen: false,
      level: 'Level4',
      logoutWarning: env.isProd || env.isPreprod
    }
  })

  await logAnalyticsCustomEvent({
    origin: APP_NAME,
    eventName: 'app-started',
    eventData: { teamName: TEAM_NAME }
  })
}
