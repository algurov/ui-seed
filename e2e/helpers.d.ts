import {ProtractorBrowser} from "protractor";

declare namespace TestHelper {

    interface Auth {
    }

    interface Menu {
        browser: ProtractorBrowser;
    }

    interface Faker {
        instance: any;
    }
}