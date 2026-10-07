import AxeBuilder from '@axe-core/playwright'
import { expect, type Page, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://dekoratoren.ekstern.dev.nav.no/**', (route) =>
    route.abort()
  )
  await page.route(
    'https://www.nav.no/samarbeidspartner/deltakeroversikt',
    (route) => route.abort()
  )
})

const sjekkUU = async (page: Page, testid: string) => {
  await expect(page.getByTestId(testid)).toBeVisible()
  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules(['svg-img-alt'])
    .analyze()

  expect(accessibilityScanResults.violations).toEqual([])
}

const gaTilTiltakGjennomforingOversikt = async (page: Page) => {
  await page.goto('/deltakeroversikt/')
  await expect(
    page.getByTestId('gjennomforing-oversikt-page')
  ).toBeVisible()
}

const navigerTilTiltakGjennomforingDetaljer = async (page: Page) => {
  await page
    .getByTestId('gjennomforing-oversikt-page')
    .locator('a:not([data-testid="rad_adressebeskyttet"])')
    .nth(2)
    .click()

  await expect(
    page.getByTestId('gjennomforing-detaljer-page')
  ).toBeVisible()
}

const navigerTilDeltakerDetaljer = async (page: Page) => {
  await page
    .getByTestId('gjennomforing-detaljer-page')
    .locator('tbody')
    .getByRole('link')
    .first()
    .click()

  await expect(page.getByTestId('bruker-detaljer-page')).toBeVisible()
}

test.describe('Smoketest og UU', () => {
  test('Tiltaksgjennomføring oversikt skal oppfylle UU-krav', async ({
    page
  }) => {
    await gaTilTiltakGjennomforingOversikt(page)
    await sjekkUU(page, 'gjennomforing-oversikt-page')
  })

  test('Deltakerliste skal oppfylle UU-krav', async ({ page }) => {
    await gaTilTiltakGjennomforingOversikt(page)
    await navigerTilTiltakGjennomforingDetaljer(page)
    await sjekkUU(page, 'gjennomforing-detaljer-page')
  })

  test('Deltakerdetaljer skal oppfylle UU-krav', async ({ page }) => {
    await gaTilTiltakGjennomforingOversikt(page)
    await navigerTilTiltakGjennomforingDetaljer(page)
    await navigerTilDeltakerDetaljer(page)
    await sjekkUU(page, 'bruker-detaljer-page')
  })

  test('Legg til liste-siden skal oppfylle UU-krav', async ({ page }) => {
    await page.goto('/deltakeroversikt/legg-til-deltakerliste')
    await sjekkUU(page, 'administrer-deltakerlister-page')
  })
})
