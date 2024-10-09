import scrapy

class MlSpider(scrapy.Spider):
    name = 'bebes'
    start_urls = [
        # Bebês
        'https://www.americanas.com.br/busca/fralda',
        'https://www.americanas.com.br/busca/chupeta',
        'https://www.americanas.com.br/busca/mamadeira',
        'https://www.americanas.com.br/busca/carrinho-de-bebe',
        'https://www.americanas.com.br/busca/cadeirinha-para-carro',
        'https://www.americanas.com.br/busca/babador',
        'https://www.americanas.com.br/busca/termometro-infantil',
        'https://www.americanas.com.br/busca/banheira-de-bebe',
        'https://www.americanas.com.br/busca/mobile-para-berco',
        'https://www.americanas.com.br/busca/lencos-umedecidos',
        'https://www.americanas.com.br/busca/mordedor',
        'https://www.americanas.com.br/busca/brinquedo-educativo',
        'https://www.americanas.com.br/busca/tapete-de-atividades',
        'https://www.americanas.com.br/busca/roupinha-de-bebe',
        'https://www.americanas.com.br/busca/protetor-de-berco'
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