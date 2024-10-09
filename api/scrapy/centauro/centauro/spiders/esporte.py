import scrapy

class MlSpider(scrapy.Spider):
    name = 'esporte'
    start_urls = [
        # Esporte
        'https://www.centauro.com.br/busca/bola',
        'https://www.centauro.com.br/busca/raquete',
        'https://www.centauro.com.br/busca/prancha',
        'https://www.centauro.com.br/busca/bicicleta',
        'https://www.centauro.com.br/busca/patins',
        'https://www.centauro.com.br/busca/patinete',
        'https://www.centauro.com.br/busca/bambole',
        'https://www.centauro.com.br/busca/skate-spin',
        'https://www.centauro.com.br/busca/luva-de-boxe',
        'https://www.centauro.com.br/busca/pesos-para-musculacao',
        'https://www.centauro.com.br/busca/corda-de-pular',
        'https://www.centauro.com.br/busca/barras-de-flexao',
        'https://www.centauro.com.br/busca/esteira',
        'https://www.centauro.com.br/busca/mascara-natacao'
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
                    'preço': price,
                    'título': title,
                    'link': link,
                    'loja': 'centauro',
                    'estrelas': '0.0',
                    'avaliações': 'sem',
                    'imagem': image
                }