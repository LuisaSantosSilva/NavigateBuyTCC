import scrapy

class MrsSpider(scrapy.Spider):
    name = 'decoracao'
    start_urls = [
        # Decoração
        "https://www.marisa.com.br/cama/casa/c/kit-colcha",
        "https://www.marisa.com.br/cama/casa/c/edredom",
        "https://www.marisa.com.br/cama/casa/c/jogo-de-cama",
        "https://www.marisa.com.br/cama/casa/c/lencol",
        "https://www.marisa.com.br/cama/casa/c/travesseiro",
        "https://www.marisa.com.br/decoracao/casa/c/almofada",
        "https://www.marisa.com.br/decoracao/casa/c/cortina",
        "https://www.marisa.com.br/decoracao/casa/c/kit-pano-copa",
        ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[contains(@class, "js-product-column")]'):

            link = response.urljoin(i.xpath('.//div[@class="thumb-wrapper"]/a/@href').get(default=''))

            yield {
                'preço': i.xpath('.//span[@itemprop="price"]/text()').get(default='').strip(),
                'título': i.xpath('.//h3[contains(@class, "product-title")]/a/text()').get(default='').strip(),
                'link': link,
                'loja': 'marisa',
                'estrelas': i.xpath('.//div[contains(@class, "avg-rating")]/text()').get(default='0.0').strip(),
                'avaliações': i.xpath('.//div[contains(@class, "review-count")]/text()').get(default='sem').strip(),
                'imagem': i.xpath('.//meta[@itemprop="image"]/@content').get(default=''),
            }