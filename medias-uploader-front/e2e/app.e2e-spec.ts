import { FilesManagerFrontPage } from './app.po';

describe('files-manager-front App', function() {
  let page: FilesManagerFrontPage;

  beforeEach(() => {
    page = new FilesManagerFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
