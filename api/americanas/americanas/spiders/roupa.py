import scrapy

class MlSpider(scrapy.Spider):
    name = 'roupa'
    start_urls = [

        # Roupa
        'https://www.americanas.com.br/busca/camiseta',
        'https://www.americanas.com.br/busca/calca',
        'https://www.americanas.com.br/busca/jaqueta',
        'https://www.americanas.com.br/busca/moletom',
        'https://www.americanas.com.br/busca/vestido',
        'https://www.americanas.com.br/busca/camisa-social',
        'https://www.americanas.com.br/busca/blusa-de-frio',
        'https://www.americanas.com.br/busca/calca-jeans',
        'https://www.americanas.com.br/busca/legging',
        'https://www.americanas.com.br/busca/blazer',
    ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[contains(@class, "col__StyledCol-sc-1snw5v3-0 ehOuCD theme-grid-col src__ColGridItem-sc-122lblh-1 cJnBan")]'):
            link = i.xpath('.//a[contains(@class, "inStockCard__Link")]/@href').get(default='').strip()
            #stars = len(i.xpath('.//div[contains(@class, "src__FilledStars")]'))

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.americanas.com.br/{link}'

            yield {
                'preço': i.xpath('.//span[contains(@class, "styles__PromotionalPrice")]/text()').get(default='').strip(),
                'título': i.xpath('.//h3[contains(@class, "product-name")]/text()').get(default='').strip(),
                'link': link,
                'loja': 'americanas',
                #'estrelas': stars,
                'avaliações': i.xpath('.//span[contains(@class, "src__Count")]/text()').get(default='(0)').strip(),
                'imagem': i.xpath('.//img[contains(@class, "src__LazyImage")]/@src').get(default='').strip()
            }