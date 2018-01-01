import {by, element, ProtractorBrowser} from 'protractor';
import {DEV_SERVER_HOST} from '../constants';


export namespace TestHelper {

    export class Auth {

        /**
         * Login current user and redirect to /main page.
         * @param {ProtractorBrowser} browser
         */
        static login(browser: ProtractorBrowser): void {

            let host = `${DEV_SERVER_HOST}:3000/`;

            let faker = Faker.getInstance();
            console.log(faker.name.findName());

            // visit main page to set cookie to skip auth
            browser.get('http://' + host);
            browser.manage().addCookie('at', 'dev', '/', host);
            browser.manage().addCookie('reft', 'dev', '/', host);

            // go to documents page
            browser.get(`http://${DEV_SERVER_HOST}:3000/`);
            expect(element(by.css('.main')).isPresent()).toBe(true);
        }

    }

    export class Menu {

        public static readonly DOCUMENTS_ITEM = 'docs';

        private browser: ProtractorBrowser;

        /**
         * Constructor takes current browser instance.
         * @param {ProtractorBrowser} browser
         */
        constructor(browser: ProtractorBrowser) {
            this.browser = browser;
        }

        /**
         * Navigate user through navigation menu to given menu item.
         *
         * Load .nav-bar and find an icon, then get a parent of the icon.
         * Click to item and check breadcrumbs changed.
         * @param {string} item
         */
        go(item: string) {

            // get .nav-bar item by icon's parent
            let navBar = element(by.css('.nav-bar'));
            let navItem = navBar.element(by.css('.icon-icon_' + item)).element(by.xpath('..'));

            navItem.click();
            this.browser.wait(element(by.css('.breadcrumb__item-content')).isPresent());

            // check if breadcumbs text contains necessary title
            element(by.css('.breadcrumb')).getText().then((text) => {
                expect(text.indexOf('Документы') !== -1).toBeTruthy();
            });
        }
    }

    export class Faker {

        private static instance: any;

        public static getInstance() {
            if (!Faker.instance) {
                Faker.instance = require('faker');
                Faker.instance.locale = 'ru';
            }
            return Faker.instance;
        }

        private constructor() {
        }

    }
}

