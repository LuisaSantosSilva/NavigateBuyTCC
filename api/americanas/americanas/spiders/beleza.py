import scrapy

class MlSpider(scrapy.Spider):
    name = 'beleza'
    start_urls = [
        # Beleza
        'https://www.americanas.com.br/busca/shampoo',
        'https://www.americanas.com.br/busca/condicionador',
        'https://www.americanas.com.br/busca/mascara-de-hidratacao',
        'https://www.americanas.com.br/busca/perfume',
        'https://www.americanas.com.br/busca/sombra',
        'https://www.americanas.com.br/busca/corretivo',
        'https://www.americanas.com.br/busca/batom',
        'https://www.americanas.com.br/busca/gloss',
        'https://www.americanas.com.br/busca/base-liquida',
        'https://www.americanas.com.br/busca/delineador',
        'https://www.americanas.com.br/busca/bruma-fixadora',
        'https://www.americanas.com.br/busca/esfoliante',
        'https://www.americanas.com.br/busca/po-compacto',
        'https://www.americanas.com.br/busca/hidratante-facial',
        'https://www.americanas.com.br/busca/protetor-solar-facial',
        'https://www.americanas.com.br/busca/blush',
        'https://www.americanas.com.br/busca/primer'
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