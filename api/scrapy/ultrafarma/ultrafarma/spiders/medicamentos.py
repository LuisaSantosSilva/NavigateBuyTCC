import scrapy

class UfSpider(scrapy.Spider):
    name = "medicamentos"
    start_urls = [
        "https://www.ultrafarma.com.br/categoria/medicamentos",
        "https://www.ultrafarma.com.br/categoria/genericos",
        "https://www.ultrafarma.com.br/categoria/saude-e-bem-estar",
    ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[@class="product-item"]'):
            yield {
                'preço': i.xpath('.//span[@class="product-item-price-for"]/text()').get(default='').strip(),
                'título': i.xpath('.//span[@class="product-item-name"]/text()').get(default='').strip(),
                'link': response.urljoin(i.xpath('.//a[contains(@class, "product-item-link")]/@href').get(default='')),
                'loja': 'ultrafarma',
                'estrelas': '0.0',
                'avaliações': 'sem',
                'imagem': i.xpath('.//div[contains(@class, "product-image")]//img/@src').get(default=''),
            }