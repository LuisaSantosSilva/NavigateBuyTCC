import scrapy

class MrsSpider(scrapy.Spider):
    name = 'roupa'
    start_urls = [
        # Roupa
        "https://www.marisa.com.br/roupas/feminino/c/camisas",
        "https://www.marisa.com.br/roupas-m/masculino/c/camisetas-m",
        "https://www.marisa.com.br/roupas/feminino/c/calcas",
        "https://www.marisa.com.br/roupas-m/masculino/c/calcas-m",
        "https://www.marisa.com.br/roupas/feminino/casacos-jaquetas/c/jaquetas-casacos-jaquetas",
        "https://www.marisa.com.br/roupas-m/masculino/c/casacos-jaquetas-m",
        "https://www.marisa.com.br/roupas/feminino/casacos-jaquetas/c/moletom-casacos-jaquetas",
        "https://www.marisa.com.br/roupas/feminino/c/vestidos",
        "https://www.marisa.com.br/roupas/feminino/c/shorts",
        "https://www.marisa.com.br/roupas/feminino/c/saias",
        "https://www.marisa.com.br/roupas/feminino/casacos-jaquetas/c/casaco-casacos-jaquetas",
        "https://www.marisa.com.br/roupas/feminino/calcas/c/jeans-calcas",
        "https://www.marisa.com.br/roupas-m/masculino/c/bermudas-shorts-m",
        "https://www.marisa.com.br/lingerie/feminino/c/pijamas",
        "https://www.marisa.com.br/masculino/c/pijamas-m",
        "https://www.marisa.com.br/roupas/feminino/casacos-jaquetas/c/blazer-casacos-jaquetas",
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