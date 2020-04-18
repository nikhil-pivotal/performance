export default class Service {

    constructor() {
        this.urls = {
            'root': '/flat/dummy-data.csv',
            'country': {
                'root': 'flat/dummy-data-country.csv',
                'FR': 'flat/dummy-data-country-france-security.csv'
            },
            'currency': {
                'root': 'flat/dummy-data-currency.csv',
                'USD': 'flat/dummy-data-currency-security.csv'
            },
            'assetClass': {
                'root': 'flat/dummy-data-asset-class.csv',
                'EQ': 'flat/dummy-data-sub-asset-class.csv'
            },
            'sector': {
                'root': '/flat/dummy-data-sector.csv',
                'INFORMATION TECHNOLOGY': '/flat/dummy-data-sector-industry.csv',
                'Electronic Equipment': '/flat/dummy-data-sector-industry-sub-industry.csv'
            }
        };
    }

    getData(key) {
        if (arguments.length === 0) {
            return this.urls.root;
        }
    }
}