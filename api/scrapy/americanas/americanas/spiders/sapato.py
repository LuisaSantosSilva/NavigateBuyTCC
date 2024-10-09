import scrapy

class MlSpider(scrapy.Spider):
    name = 'sapato'
    start_urls = [
        # Sapato
        'https://www.americanas.com.br/busca/tenis',
        'https://www.americanas.com.br/busca/salto',
        'https://www.americanas.com.br/busca/sapatilha',
        'https://www.americanas.com.br/busca/chinelo',
        'https://www.americanas.com.br/busca/mocassim',
        'https://www.americanas.com.br/busca/sandalia',
        'https://www.americanas.com.br/busca/botas',
        'https://www.americanas.com.br/busca/sapato-social',
        'https://www.americanas.com.br/busca/sapato-esportivo',
        'https://www.americanas.com.br/busca/pantufa',
        'https://www.americanas.com.br/busca/tamanco',
        'https://www.americanas.com.br/busca/rasteirinha'
    ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[contains(@class, "col__StyledCol-sc-1snw5v3-0 ehOuCD theme-grid-col src__ColGridItem-sc-122lblh-1 cJnBan")]'):
            link = i.xpath('.//a[contains(@class, "inStockCard__Link")]/@href').get(default='').strip()
            #stars = len(i.xpath('.//div[contains(@class, "src__FilledStars")]'))

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.americanas.com.br{link}'

            yield {
                'preço': i.xpath('.//span[contains(@class, "styles__PromotionalPrice")]/text()').get(default='').strip(),
                'título': i.xpath('.//h3[contains(@class, "product-name")]/text()').get(default='').strip(),
                'link': link,
                'loja': 'americanas',
                #'estrelas': stars,
                'avaliações': i.xpath('.//span[contains(@class, "src__Count")]/text()').get(default='(0)').strip(),
                'imagem': i.xpath('.//img[contains(@class, "src__LazyImage")]/@src').get(default='').strip()
            }