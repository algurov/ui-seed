import {browser, by, element, protractor, ProtractorBrowser} from 'protractor';
import { DEV_SERVER_HOST } from '../constants';


export namespace TestHelper {

    export class Auth {

        /**
         * Login current user and redirect to /main page.
         * @param {ProtractorBrowser} browser
         */
        static login(browser: ProtractorBrowser): void {

            let host = `${DEV_SERVER_HOST}:3000/`;

            // visit main page to set cookie to skip auth
            browser.get('http://' + host);

            (browser.manage() as any)
                .addCookie({ name: 'at', value: 'dev', path: '/', domain: host });
            (browser.manage() as any)
                .addCookie({ name: 'reft', value: 'dev', path: '/', domain: host });

            // go to documents page
            browser.get(`http://${DEV_SERVER_HOST}:3000/`);
            expect(element(by.css('.main')).isPresent()).toBe(true);
        }

    }

    export class Navigator {

        public static readonly DOCUMENTS_ITEM = 'docs';
        private browser: ProtractorBrowser;

        static routes() {
            return [{
                path: 'main',
                data: {breadcrumb: 'Кабинет'},
                children: [
                    {path: 'document/application', data: {breadcrumb: 'Заявка'}},
                    {path: 'document/application/:id', data: {breadcrumb: 'Заявка'}},
                    {path: 'document/application/:id/view', data: {breadcrumb: 'Заявка'}},
                    {path: 'document/act', data: {breadcrumb: 'Акт пробы'}},
                    {path: 'document/act/:id', data: {breadcrumb: 'Акт пробы'}},
                    {path: 'document/certificate', data: {breadcrumb: 'Сертификат'}},
                    {path: 'document/certificate/:id', data: {breadcrumb: 'Сертификат'}},
                    {path: 'document/assignment/:id', data: {breadcrumb: 'Направление'}},
                    {path: 'document/assignment', data: {breadcrumb: 'Направление'}},
                    {path: 'document/protocol/:id', data: {breadcrumb: 'Протокол'}},
                    {path: 'document/protocol', data: {breadcrumb: 'Протокол'}},
                    {path: 'document/analysis-card/:id'}
                ]
            }];
        }

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
        menu(item: string) {

            // get .nav-bar item by icon's parent
            let navBar = element(by.css('.nav-bar'));
            let navItem = navBar.element(by.css('.icon-icon_' + item)).element(by.xpath('..'));

            navItem.click();
            this.browser.wait(element(by.css('.breadcrumb')).isPresent());


            // this.browser.getPageSource().then(s => console.log(s));
            // check if breadcumbs text contains necessary title
            element(by.css('.breadcrumb')).getText().then((text) => {
                expect(text.indexOf('Документы') !== -1).toBeTruthy();
            });
        }

        route(routePath: string, params: Array<{}> = []) {

            // TODO: parse angular routes instead of hard copied version

            // looking for parent (root) route
            let parentRoute = Navigator.routes().filter(r => routePath.indexOf(r.path) === 1)[0];

            // remove parent route path from given route
            let routePathPartial = routePath.substr(parentRoute.path.length + 2);

            // get actual child route by given path
            let routeItem: any = parentRoute.children.filter(r => r.path === routePathPartial)[0];

            expect(routeItem).toBeTruthy('Can not find a route by path ' + routePath);

            this.browser.get(routePath);

            if ('data' in routeItem) {
                // this.expectBreadcrumbsHasText(routeItem.data.breadcrumb);
            }
        }

        expectBreadcrumbsHasText(text: string) {
            // check if breadcrumbs text contains necessary title

            element.all(by.css('.breadcrumb__item-content')).each(function(element, index) {
                console.log(1);
                element.getText().then(function(s) {
                    console.log(s);
                });
            });

            // Debug.printPageSource(this.browser);
/*
            element(by.css('.breadcrumb')).getText().then((s) => {
                console.log(s + '---' + text);
                expect(s.indexOf(text) !== -1).toBeTruthy('No breadcrumb has no text ' + text);
            });*/
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

        public static getApplication() {

            let faker = Faker.getInstance();

            return {
                number: 1
            };
        }

        private constructor() {
        }
    }

    export class Debug {
        static printPageSource(browser) {
            browser.getPageSource().then(s => console.log(s));
        }
    }
}
