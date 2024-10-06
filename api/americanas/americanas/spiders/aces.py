import scrapy

class MlSpider(scrapy.Spider):
    name = 'aces'
    start_urls = [
        # Acessórios
        'https://www.americanas.com.br/busca/pulseira',
        'https://www.americanas.com.br/busca/anel',
        'https://www.americanas.com.br/busca/capacete',
        'https://www.americanas.com.br/busca/carregador',
        'https://www.americanas.com.br/busca/mouse',
        'https://www.americanas.com.br/busca/teclado',
        'https://www.americanas.com.br/busca/boné',
        'https://www.americanas.com.br/busca/bolsa',
        'https://www.americanas.com.br/busca/mochila',
        'https://www.americanas.com.br/busca/relogio',
        'https://www.americanas.com.br/busca/oculos-de-sol',
        'https://www.americanas.com.br/busca/fones-de-ouvido',
        'https://www.americanas.com.br/busca/carteira',
        'https://www.americanas.com.br/busca/colar',
        'https://www.americanas.com.br/busca/cinto',
        'https://www.americanas.com.br/busca/chaveiro'
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