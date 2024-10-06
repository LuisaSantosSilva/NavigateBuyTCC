import scrapy

class MlSpider(scrapy.Spider):
    name = 'esporte'
    start_urls = [        
        # Esporte
        'https://www.americanas.com.br/busca/bola',
        'https://www.americanas.com.br/busca/raquete',
        'https://www.americanas.com.br/busca/prancha',
        'https://www.americanas.com.br/busca/bicicleta',
        'https://www.americanas.com.br/busca/patins',
        'https://www.americanas.com.br/busca/patinete',
        'https://www.americanas.com.br/busca/bambole',
        'https://www.americanas.com.br/busca/skate',
        'https://www.americanas.com.br/busca/luva-de-boxe',
        'https://www.americanas.com.br/busca/pesos-para-musculacao',
        'https://www.americanas.com.br/busca/corda-de-pular',
        'https://www.americanas.com.br/busca/barras-de-flexao',
        'https://www.americanas.com.br/busca/esteira',
        'https://www.americanas.com.br/busca/mascara-natacao'
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