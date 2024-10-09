import scrapy


class UfSpider(scrapy.Spider):
    name = "medicamentos"
    start_urls = [
        # Medicamentos e Bem-Estar
        "https://www.ultrafarma.com.br/categoria/medicamentos",
        "https://www.ultrafarma.com.br/categoria/genericos",
        "https://www.ultrafarma.com.br/categoria/saude-e-bem-estar",
        ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[@class="product-wrapper in-stock"]'):
            yield {
                'preço': i.xpath('.//span[@class="product-price-sell"]/text()').get().strip(),
                'título': i.xpath('.//h3[@class="product-name font-bold"]/text()').get().strip(),
                'link': response.urljoin(i.xpath('.//a[contains(@class, "product-item-link")]/@href').get(default='')),
                'loja': 'ultrafarma',
                'estrelas': '0.0',
                'avaliações': 'sem',
                'imagem': i.xpath('.//figure/img/@data-original').get(default=''),
            }
