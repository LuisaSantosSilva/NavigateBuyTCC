import scrapy


class UfSpider(scrapy.Spider):
    name = "beleza"
    start_urls = [
        "https://www.ultrafarma.com.br/categoria/beleza",
        "https://www.ultrafarma.com.br/categoria/cuidados-diarios",
    ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[@class="product-item"]'):
            yield {
                'preço': i.xpath('.//span[@class="product-item-price-for"]/text()').get().strip(),
                'título': i.xpath('.//span[@class="product-item-name"]/text()').get().strip(),
                'link': response.urljoin(i.xpath('.//a[contains(@class, "product-item-link")]/@href').get(default='')),
                'loja': 'ultrafarma',
                'estrelas': '0.0',
                'avaliações': 'sem',
                'imagem': i.xpath('.//img[@class="product-image"]/@src').get(default=''),
            }

    def start_requests(self):
        headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://www.google.com/',
        }
        yield scrapy.Request(
            url="https://www.ultrafarma.com.br/categoria/beleza",
            headers=headers
        )