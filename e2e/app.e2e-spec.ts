import { YouTubePlayerPage } from './app.po';

describe('you-tube-player App', () => {
  let page: YouTubePlayerPage;

  beforeEach(() => {
    page = new YouTubePlayerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
