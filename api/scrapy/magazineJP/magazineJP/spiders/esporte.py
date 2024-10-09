import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'esporte'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/bola/?from=submit',
        'https://www.magazineluiza.com.br/busca/raquete/?from=submit',
        'https://www.magazineluiza.com.br/busca/prancha+de+surf/?from=submit',
        'https://www.magazineluiza.com.br/busca/bicicleta/?from=submit',
        'https://www.magazineluiza.com.br/busca/patins/?from=submit',
        'https://www.magazineluiza.com.br/busca/patinete/?from=submit',
        'https://www.magazineluiza.com.br/busca/bambole/?from=submit',
        'https://www.magazineluiza.com.br/busca/skate/?from=submit',
        'https://www.magazineluiza.com.br/busca/luva+de+boxe/?from=submit',
        'https://www.magazineluiza.com.br/busca/pesos+para+musculacao/?from=submit',
        'https://www.magazineluiza.com.br/busca/corda+de+pular/?from=submit',
        'https://www.magazineluiza.com.br/busca/barras+de+flexao/?from=submit',
        'https://www.magazineluiza.com.br/busca/esteira/?from=submit',
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
                'loja': 'Magazine Luiza',
                'título': product_title,
                'preço': price_value,
                'link': product_link,
                'estrelas': stars,
                'avaliações': evaluations,
                'imagem': product_image
            }

        next_page = response.xpath('//a[@data-testid="arrow-right"]/@href').get()
        if next_page:
            next_page = response.urljoin(next_page)
            self.logger.info(f'Seguindo para a próxima página: {next_page}')
            yield response.follow(next_page, callback=self.parse)