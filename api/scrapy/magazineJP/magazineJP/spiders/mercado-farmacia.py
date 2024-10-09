import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'mercfarm'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/sabonete/?from=submit',
        'https://www.magazineluiza.com.br/busca/pasta+de+dente/?from=submit',
        'https://www.magazineluiza.com.br/busca/escova+de+dente/?from=submit',
        'https://www.magazineluiza.com.br/busca/desinfetante/?from=submit',
        'https://www.magazineluiza.com.br/busca/esmalte/?from=submit',
        'https://www.magazineluiza.com.br/busca/algodao/?from=submit',
        'https://www.magazineluiza.com.br/busca/lamina+de+barbear/?from=submit',
        'https://www.magazineluiza.com.br/busca/sabao+em+po/?from=submit',
        'https://www.magazineluiza.com.br/busca/amaciante/?from=submit',
        'https://www.magazineluiza.com.br/busca/alcool+em+gel/?from=submit',
        'https://www.magazineluiza.com.br/busca/repelente/?from=submit',
        'https://www.magazineluiza.com.br/busca/arroz/?from=submit',
        'https://www.magazineluiza.com.br/busca/feijao/?from=submit',
        'https://www.magazineluiza.com.br/busca/chocolate/?from=submit',
        'https://www.magazineluiza.com.br/busca/sorvete/?from=submit',
    ]

    def parse(self, response):
        products = response.xpath('//li[contains(@class, "sc-fTyFcS iTkWie")]')
        for product in products:
            product_link = response.urljoin(product.xpath('.//a[@data-testid="product-card-container"]/@href').get(default='').strip())
            product_image = product.xpath('.//img[@data-testid="image"]/@src').get(default='').strip()
            product_title = product.xpath('.//h2[@data-testid="product-title"]/text()').get(default='').strip()
            price_value = product.xpath('.//p[@data-testid="price-value"]/text()').get(default='').strip().replace('R$', '').strip()
            stars_text = product.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='0.0').strip()
            evaluations_text = product.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='sen').strip()

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