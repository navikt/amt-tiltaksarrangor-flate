class Environment {
  get isProd(): boolean {
    return (
      window.location.hostname === 'nav.no' ||
      window.location.hostname === 'www.nav.no'
    )
  }

  get isPreprod(): boolean {
    return window.location.hostname.endsWith('dev.nav.no')
  }

  get isDemo(): boolean {
    return window.location.hostname.endsWith('github.io')
  }

  get baseUrl(): string {
    return import.meta.env.BASE_URL
  }

  get name(): string {
    if (this.isProd) {
      return 'production'
    } else if (this.isPreprod) {
      return 'preprod'
    } else if (this.isDemo) {
      return 'demo'
    } else {
      return 'development'
    }
  }
}

const env = new Environment()

export enum EndpointHandler {
  MOCK = 'MOCK',
  PROD = 'PROD'
}

export const getEndpointHandlerType = (): EndpointHandler => {
  return env.isDemo || import.meta.env.DEV
    ? EndpointHandler.MOCK
    : EndpointHandler.PROD
}

export default env
