import scrapy

class MlSpider(scrapy.Spider):
    name = 'info'
    start_urls = [
        # Informática
        'https://www.americanas.com.br/busca/motorola',
        'https://www.americanas.com.br/busca/galaxy',
        'https://www.americanas.com.br/busca/iphone',
        'https://www.americanas.com.br/busca/poco',
        'https://www.americanas.com.br/busca/xiaomi',
        'https://www.americanas.com.br/busca/computador',
        'https://www.americanas.com.br/busca/console',
        'https://www.americanas.com.br/busca/monitor',
        'https://www.americanas.com.br/busca/impressora',
        'https://www.americanas.com.br/busca/mouse',
        'https://www.americanas.com.br/busca/notebook',
        'https://www.americanas.com.br/busca/tablet',
        'https://www.americanas.com.br/busca/roteador',
        'https://www.americanas.com.br/busca/switch-hdmi',
        'https://www.americanas.com.br/busca/placa-de-video',
        'https://www.americanas.com.br/busca/teclado-mecanico',
        'https://www.americanas.com.br/busca/ssd',
        'https://www.americanas.com.br/busca/hd-externo',
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