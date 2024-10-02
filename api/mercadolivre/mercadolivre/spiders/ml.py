import scrapy

class MlSpider(scrapy.Spider):
    name = 'ml'

    start_urls = ['https://lista.mercadolivre.com.br/fone']

    def parse(self, response, **kwargs):
        for i in response.xpath('//li[@class="ui-search-layout__item shops__layout-item ui-search-layout__stack"]'):
            normal_price = i.xpath('.//span[contains(@class, "andes-money-amount--cents-superscript") and not(ancestor::s)]')
            if normal_price:
                price = normal_price.xpath('.//span[@class="andes-money-amount__fraction"]/text()').get(default='').strip()
                cents = normal_price.xpath('.//span[@class="andes-money-amount__cents andes-money-amount__cents--superscript-24"]/text()').get(default='').strip()
            else:
                price = ''
                cents = ''

            promo_price = i.xpath('.//s[@class="andes-money-amount andes-money-amount--previous"]/span[@class="andes-money-amount__fraction"]/text()').get(default='').strip()
            promo_cents = i.xpath('.//s[@class="andes-money-amount andes-money-amount--previous"]/span[@class="andes-money-amount__cents"]/text()').get(default='').strip()

            image = i.xpath('.//img[contains(@class, "ui-search-result-image__element")]/@src').get(default='').strip()
            title = i.xpath('.//a[@class="ui-search-link__title-card ui-search-link"]/text()').get(default='').strip()
            link = i.xpath('.//a[@class="ui-search-link__title-card ui-search-link"]/@href').get(default='').strip()
            stars = i.xpath('.//span[@class="ui-search-reviews__rating-number"]/text()').get(default='').strip()
            avaliations = i.xpath('.//span[@class="ui-search-reviews__amount"]/text()').get(default='').strip()

            if promo_price:
                yield {
                    'preço promocional': promo_price,
                    'centavos': promo_cents,
                    'título': title,
                    'link': link,
                    'estrelas': stars,
                    'avaliações': avaliations,
                    'imagem': image
                }
            else:
                yield {
                    'preço': price,
                    'centavos': cents,
                    'título': title,
                    'link': link,
                    'estrelas': stars,
                    'avaliações': avaliations,
                    'imagem': image
                }
