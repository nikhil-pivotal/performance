export default class Service {

    constructor() {
        this.urls = {
            'account': {
                'account': '/flat/dummy-data.csv'
            },
            'country': {
                'country': 'flat/dummy-data-country.csv',
                'FR': 'flat/dummy-data-country-france-security.csv'
            },
            'currency': {
                'currency': 'flat/dummy-data-currency.csv',
                'USD': 'flat/dummy-data-currency-security.csv'
            },
            'assetClass': {
                'assetClass': 'flat/dummy-data-asset-class.csv',
                'EQ': 'flat/dummy-data-sub-asset-class.csv'
            },
            'sector': {
                'sector': '/flat/dummy-data-sector.csv',
                'INFORMATION TECHNOLOGY': '/flat/dummy-data-sector-industry.csv',
                'Electronic Equipment': '/flat/dummy-data-sector-industry-sub-industry.csv',
                'Electronic Components': '/flat/dummy-data-country-france-security.csv'
            }
        };
    }

    getUrl(portfolioDimension, node) {
        return this.urls[portfolioDimension][node];
    }

    getData(key) {
        if (arguments.length === 0) {
            return this.urls.root;
        }
    }
}