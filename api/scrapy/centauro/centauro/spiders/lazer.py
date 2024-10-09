import scrapy

class MlSpider(scrapy.Spider):
    name = 'lazer'
    start_urls = [
        # Lazer
        'https://www.centauro.com.br/busca/baralho-copag',
        'https://www.centauro.com.br/busca/dominó',
        'https://www.centauro.com.br/busca/tenda-de-acampamento',
        'https://www.centauro.com.br/busca/binoculos',
        'https://www.centauro.com.br/busca/rede-de-descanso'
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
                    # 'estrelas': stars,
                    # 'avaliações': avaliations,
                    'imagem': image
                }