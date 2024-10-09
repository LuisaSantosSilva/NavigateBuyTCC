import scrapy

class MlSpider(scrapy.Spider):
    name = 'roupa'
    start_urls = [
        # Roupa
        'https://www.centauro.com.br/busca/camiseta',
        'https://www.centauro.com.br/busca/calca',
        'https://www.centauro.com.br/busca/jaqueta',
        'https://www.centauro.com.br/busca/moletom',
        'https://www.centauro.com.br/busca/vestido',
        'https://www.centauro.com.br/busca/shorts',
        'https://www.centauro.com.br/busca/saia',
        'https://www.centauro.com.br/busca/camisa-social',
        'https://www.centauro.com.br/busca/camisa-termica',
        'https://www.centauro.com.br/busca/blusa-de-frio',
        'https://www.centauro.com.br/busca/calca-jeans',
        'https://www.centauro.com.br/busca/legging',
        'https://www.centauro.com.br/busca/bermuda',
        'https://www.centauro.com.br/busca/roupa-intima',
        'https://www.centauro.com.br/busca/pijama',
        'https://www.centauro.com.br/busca/blazer'
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