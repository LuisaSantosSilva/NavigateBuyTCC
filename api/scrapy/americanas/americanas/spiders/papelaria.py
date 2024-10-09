import scrapy

class MlSpider(scrapy.Spider):
    name = 'papelaria'
    start_urls = [
        # Papelaria
        'https://www.americanas.com.br/busca/caderno',
        'https://www.americanas.com.br/busca/caneta',
        'https://www.americanas.com.br/busca/lapis',
        'https://www.americanas.com.br/busca/borracha',
        'https://www.americanas.com.br/busca/regua',
        'https://www.americanas.com.br/busca/livro',
        'https://www.americanas.com.br/busca/post-it',
        'https://www.americanas.com.br/busca/grampeador',
        'https://www.americanas.com.br/busca/fichario',
        'https://www.americanas.com.br/busca/calculadora',
        'https://www.americanas.com.br/busca/agenda',
        'https://www.americanas.com.br/busca/clips-de-papel',
        'https://www.americanas.com.br/busca/cola',
        'https://www.americanas.com.br/busca/tesoura',
        'https://www.americanas.com.br/busca/papel-sulfite',
        'https://www.americanas.com.br/busca/marca-texto'
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