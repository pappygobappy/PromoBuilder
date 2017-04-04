import { PromoBuilder2Page } from './app.po';

describe('promo-builder2 App', function() {
  let page: PromoBuilder2Page;

  beforeEach(() => {
    page = new PromoBuilder2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
