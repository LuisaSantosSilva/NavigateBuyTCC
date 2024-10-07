import scrapy

class MlSpider(scrapy.Spider):
    name = 'pets'
    start_urls = [
        # Pets
        'https://www.americanas.com.br/busca/racao',
        'https://www.americanas.com.br/busca/brinquedo-pet',
        'https://www.americanas.com.br/busca/caixa-de-areia',
        'https://www.americanas.com.br/busca/arranhador',
        'https://www.americanas.com.br/busca/comedouro',
        'https://www.americanas.com.br/busca/bebedouro-pet',
        'https://www.americanas.com.br/busca/cama-para-caes',
        'https://www.americanas.com.br/busca/cama-para-gatos',
        'https://www.americanas.com.br/busca/tapete-higienico',
        'https://www.americanas.com.br/busca/roupinha-para-pets',
        'https://www.americanas.com.br/busca/coleira',
        'https://www.americanas.com.br/busca/antipulgas',
        'https://www.americanas.com.br/busca/casinha-para-cachorro',
        'https://www.americanas.com.br/busca/escova-para-pelos',
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