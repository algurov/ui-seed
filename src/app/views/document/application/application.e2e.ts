import { browser } from 'protractor';
import { TestHelper } from '../../../../../e2e/helpers';

describe('Application create form', () => {

  beforeEach(() => {
      TestHelper.Auth.login(browser);
  });

  it('should have a title', () => {

      let menu = new TestHelper.Menu(browser);
      menu.go(TestHelper.Menu.DOCUMENTS_ITEM);
  });

});
