import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'acessorio'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/pulseira/?from=submit',
        'https://www.magazineluiza.com.br/busca/anel/?from=submit',
        'https://www.magazineluiza.com.br/busca/capacete/?from=submit',
        'https://www.magazineluiza.com.br/busca/carregador/?from=submit',
        'https://www.magazineluiza.com.br/busca/mouse/?from=submit',
        'https://www.magazineluiza.com.br/busca/teclado/?from=submit',
        'https://www.magazineluiza.com.br/busca/bone/?from=submit',
        'https://www.magazineluiza.com.br/busca/bolsa/?from=submit',
        'https://www.magazineluiza.com.br/busca/mochila/?from=submit',
        'https://www.magazineluiza.com.br/busca/relogio/?from=submit',
        'https://www.magazineluiza.com.br/busca/fones+de+ouvido/?from=submit',
        'https://www.magazineluiza.com.br/busca/carteira/?from=submit',
        'https://www.magazineluiza.com.br/busca/colar/?from=submit',
        'https://www.magazineluiza.com.br/busca/cinto/?from=submit',
        'https://www.magazineluiza.com.br/busca/chaveiro/?from=submit',
    ]

    def parse(self, response):
        for i in response.xpath('//li[@class="sc-fTyFcS iTkWie"]'):
            product_link = response.urljoin(i.xpath('.//a[@data-testid="product-card-container"]/@href').get(default='').strip())
            product_image = i.xpath('.//img[@data-testid="image"]/@src').get(default='').strip()
            product_title = i.xpath('.//h2[@data-testid="product-title"]/text()').get(default='').strip()
            price_original = i.xpath('.//p[@data-testid="price-original"]/text()').get(default='').strip()
            price_vl = i.xpath('.//p[@data-testid="price-value"]/text()').get(default='').strip()

            price_value = price_vl.replace('R$', '').strip()  

            stars_text = i.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='').strip()
            evaluations_text = i.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='').strip()

            if stars_text:
                stars = stars_text.split()[0]
            else:
                stars = ''

            if evaluations_text:
                evaluations = evaluations_text.split('(')[-1].strip() 
                evaluations = '(' + evaluations 
            else:
                evaluations = ''

            if price_value:
                yield {
                    'loja': 'Magazine Luiza',
                    'preço': price_value,
                    'título': product_title,
                    'link': product_link,
                    'estrelas': stars,
                    'avaliações': evaluations,
                    'imagem': product_image
                }
            else:
                yield {
                    'loja': 'Magazine Luiza',
                    'preço': price_original,
                    'título': product_title,
                    'link': product_link,
                    'estrelas': stars,
                    'avaliações': evaluations,
                    'imagem': product_image
                }

        next_page = response.xpath('//a[@data-testid="arrow-right"]/@href').get()
        if next_page:
            self.logger.info(f'Seguindo para a próxima página: {next_page}')
            yield response.follow(next_page, callback=self.parse)
