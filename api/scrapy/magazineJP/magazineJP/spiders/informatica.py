import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'info'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/celular/?from=submit',
        'https://www.magazineluiza.com.br/busca/computador/?from=submit',
        'https://www.magazineluiza.com.br/busca/video+game/?from=submit',
        'https://www.magazineluiza.com.br/busca/monitor/?from=submit',
        'https://www.magazineluiza.com.br/busca/impressora/?from=submit',
        'https://www.magazineluiza.com.br/busca/notebook/?from=submit',
        'https://www.magazineluiza.com.br/busca/tablet/?from=submit',
        'https://www.magazineluiza.com.br/busca/roteador/?from=submit',
        'https://www.magazineluiza.com.br/busca/switch+de+rede/?from=submit',
        'https://www.magazineluiza.com.br/busca/placa+de+video/?from=submit',
        'https://www.magazineluiza.com.br/busca/teclado+mecanico/?from=submit',
        'https://www.magazineluiza.com.br/busca/ssd/?from=submit',
        'https://www.magazineluiza.com.br/busca/hd/?from=submit',
        'https://www.magazineluiza.com.br/busca/mouse/?from=submit',
        'https://www.magazineluiza.com.br/busca/headset/?from=submit',
    ]

    def parse(self, response):
        products = response.xpath('//li[contains(@class, "sc-fTyFcS iTkWie")]')
        for product in products:
            product_link = response.urljoin(product.xpath('.//a[@data-testid="product-card-container"]/@href').get(default='').strip())
            product_image = product.xpath('.//img[@data-testid="image"]/@src').get(default='').strip()
            product_title = product.xpath('.//h2[@data-testid="product-title"]/text()').get(default='').strip()
            price_value = product.xpath('.//p[@data-testid="price-value"]/text()').get(default='').strip().replace('R$', '').strip()
            stars_text = product.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='').strip()
            evaluations_text = product.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='').strip()

            if stars_text:
                stars = stars_text.split()[0]
            else:
                stars = ''

            if evaluations_text:
                evaluations = evaluations_text.split('(')[-1].strip() 
                evaluations = '(' + evaluations 
            else:
                evaluations = ''

            yield {
                'Loja': 'Magazine Luiza',
                'Título': product_title,
                'Preço': price_value,
                'Link do Produto': product_link,
                'Estrelas': stars,
                'Avaliações': evaluations,
                'Imagem do Produto': product_image
            }

        next_page = response.xpath('//a[@data-testid="arrow-right"]/@href').get()
        if next_page:
            next_page = response.urljoin(next_page)
            self.logger.info(f'Seguindo para a próxima página: {next_page}')
            yield response.follow(next_page, callback=self.parse)