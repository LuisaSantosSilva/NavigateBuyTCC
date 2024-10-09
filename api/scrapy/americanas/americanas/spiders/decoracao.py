import scrapy

class MlSpider(scrapy.Spider):
    name = 'decoracao'
    start_urls = [
        # Decoração
        'https://www.americanas.com.br/busca/moldura',
        'https://www.americanas.com.br/busca/tapete',
        'https://www.americanas.com.br/busca/quadro',
        'https://www.americanas.com.br/busca/fronha',
        'https://www.americanas.com.br/busca/cobertor',
        'https://www.americanas.com.br/busca/toalha',
        'https://www.americanas.com.br/busca/vaso-decorativo',
        'https://www.americanas.com.br/busca/almofada',
        'https://www.americanas.com.br/busca/cortina',
        'https://www.americanas.com.br/busca/abajur',
        'https://www.americanas.com.br/busca/espelho-decorativo',
        'https://www.americanas.com.br/busca/papel-de-parede',
        'https://www.americanas.com.br/busca/porta-retrato'
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