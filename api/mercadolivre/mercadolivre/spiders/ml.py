import scrapy


class MlSpider(scrapy.Spider):
    name = 'ml'

    start_urls = ['https://lista.mercadolivre.com.br/fone']

    def parse(self, response, **kwargs):
        for i in response.xpath('//li[@class="ui-search-layout__item shops__layout-item ui-search-layout__stack"]'):
            price = i.xpath('.//span[@class="andes-money-amount__fraction"]/text()').get()
            cents = i.xpath('.//span[@class="andes-money-amount__cents andes-money-amount__cents--superscript-24"]/text()').get()
            title = i.xpath('.//h2[@class="ui-search-item__title"]/text()').get()
            link = i.xpath('./a/@href').get()

            yield {
                'price': price,
                'cents': cents,
                'title': title,
                'link': link
            }