import { JCExperimentPage } from './app.po';

describe('jcexperiment App', () => {
  let page: JCExperimentPage;

  beforeEach(() => {
    page = new JCExperimentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('jcx works!');
  });
});
