import scrapy

class MlSpider(scrapy.Spider):
    name = 'aces'
    start_urls = [
        # Acessórios
        'https://www.centauro.com.br/busca/pulseira',
        'https://www.centauro.com.br/busca/anel',
        'https://www.centauro.com.br/busca/capacete',
        'https://www.centauro.com.br/busca/mouse-gamer',
        'https://www.centauro.com.br/busca/teclado',
        'https://www.centauro.com.br/busca/boné',
        'https://www.centauro.com.br/busca/bolsa',
        'https://www.centauro.com.br/busca/mochila',
        'https://www.centauro.com.br/busca/relogio',
        'https://www.centauro.com.br/busca/oculos-de-sol',
        'https://www.centauro.com.br/busca/fones-de-ouvido',
        'https://www.centauro.com.br/busca/carteira',
        'https://www.centauro.com.br/busca/cinto',
        'https://www.centauro.com.br/busca/chaveiro'
        ]

    def parse(self, response, **kwargs):
        for i in response.xpath('//section'):
            price = i.xpath('.//p[@data-testid="price-current"]/text()').get(default='').strip()
            image = i.xpath('.//img[@decoding="async"]/@src').get(default='').strip()
            title = i.xpath('.//p[@class="Typographystyled__Paragraph-sc-bdxvrr-1 knvuZc ProductCard-styled__Title-sc-97c94e5e-3 hzAjfq"]/text()').get(default='').strip()
            link = i.xpath('.//a[@class="ProductCard-styled__Card-sc-97c94e5e-0 gpfLHL"]/@href').get(default='').strip()
            # stars = len(i.xpath('.//div[@class="Rating-styled__RatingWrapper-sc-24daa866-0 iDwSVT"]'))
            # avaliations = i.xpath('.//span[@class="src__Count"]/text()').get(default='').strip()

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.centauro.com.br{link}'
                
            if all([price, title, link, image]):
                yield {
                    'preço': i.xpath('.//p[@data-testid="price-current"]/text()').get(default='').strip(),
                    'título': i.xpath('.//p[@class="Typographystyled__Paragraph-sc-bdxvrr-1 knvuZc ProductCard-styled__Title-sc-97c94e5e-3 hzAjfq"]/text()').get(default='').strip(),
                    'link': link,
                    'loja': 'centauro',
                    'estrelas': '0.0',
                    'avaliações': 'sem',
                    'imagem': i.xpath('.//img[@decoding="async"]/@src').get(default='').strip()
                }