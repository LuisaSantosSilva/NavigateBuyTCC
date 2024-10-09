import scrapy

class MlSpider(scrapy.Spider):
    name = 'eletro'
    start_urls = [
        # Eletrodoméstico
        'https://www.americanas.com.br/busca/geladeira',
        'https://www.americanas.com.br/busca/micro-ondas',
        'https://www.americanas.com.br/busca/fogao',
        'https://www.americanas.com.br/busca/maquina-de-lavar-roupa',
        'https://www.americanas.com.br/busca/lava-loucas',
        'https://www.americanas.com.br/busca/ar-condicionado',
        'https://www.americanas.com.br/busca/aspirador-de-po',
        'https://www.americanas.com.br/busca/ferro-de-passar',
        'https://www.americanas.com.br/busca/liquidificador',
        'https://www.americanas.com.br/busca/batedeira',
        'https://www.americanas.com.br/busca/torradeira',
        'https://www.americanas.com.br/busca/cafeteira',
        'https://www.americanas.com.br/busca/sanduicheira',
        'https://www.americanas.com.br/busca/forno-eletrico',
        'https://www.americanas.com.br/busca/televisao',
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