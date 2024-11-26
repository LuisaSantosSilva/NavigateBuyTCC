import scrapy

class MlSpider(scrapy.Spider):
    name = 'MF'
    start_urls = [        
        # Mercado/Farmácia
        'https://www.americanas.com.br/busca/sabonete',
        'https://www.americanas.com.br/busca/pasta-de-dente',
        'https://www.americanas.com.br/busca/escova-de-dente',
        'https://www.americanas.com.br/busca/desinfetante',
        'https://www.americanas.com.br/busca/esmalte',
        'https://www.americanas.com.br/busca/algodao-care',
        'https://www.americanas.com.br/busca/lamina-de-barbear',
        'https://www.americanas.com.br/busca/sabao-em-po',
        'https://www.americanas.com.br/busca/amaciante',
        'https://www.americanas.com.br/busca/caixa-bombom',
        'https://www.americanas.com.br/busca/alcool-em-gel',
        'https://www.americanas.com.br/busca/repelente'
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