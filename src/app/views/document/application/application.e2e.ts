import { browser } from 'protractor';
import { TestHelper } from '../../../../../e2e/helpers';

describe('Application create form', () => {

  beforeEach(() => {
      TestHelper.Auth.login(browser);
  });

  it('should have a title', () => {

      // browser.get('/main/document/application');
      let nav = new TestHelper.Navigator(browser);
      // nav.menu(TestHelper.Navigator.DOCUMENTS_ITEM);

      nav.route('/main/document/application');  });

});