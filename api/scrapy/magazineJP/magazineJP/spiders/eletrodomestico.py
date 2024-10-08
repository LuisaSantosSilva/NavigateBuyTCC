import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'eletrodo'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/geladeira/?from=submit',
        'https://www.magazineluiza.com.br/busca/micro+ondas/?from=submit',
        'https://www.magazineluiza.com.br/busca/fogao/?from=submit',
        'https://www.magazineluiza.com.br/busca/maquina+de+lavar+roupa/?from=submit',
        'https://www.magazineluiza.com.br/busca/lava+loucas/?from=submit',
        'https://www.magazineluiza.com.br/busca/ar+condicionado/?from=submit',
        'https://www.magazineluiza.com.br/busca/aspirador+de+po/?from=submit',
        'https://www.magazineluiza.com.br/busca/ferro+de+passar/?from=submit',
        'https://www.magazineluiza.com.br/busca/liquidificador/?from=submit',
        'https://www.magazineluiza.com.br/busca/batedeira/?from=submit',
        'https://www.magazineluiza.com.br/busca/torradeira/?from=submit',
        'https://www.magazineluiza.com.br/busca/cafeteira/?from=submit',
        'https://www.magazineluiza.com.br/busca/sanduicheira/?from=submit',
        'https://www.magazineluiza.com.br/busca/forno+eletrico/?from=submit',
        'https://www.magazineluiza.com.br/busca/televisao/?from=submit',
    ]
    
    def parse(self, response):
        products = response.xpath('//li[contains(@class, "sc-fTyFcS iTkWie")]')
        for product in products:
            product_link = response.urljoin(product.xpath('.//a[@data-testid="product-card-container"]/@href').get(default='').strip())
            product_image = product.xpath('.//img[@data-testid="image"]/@src').get(default='').strip()
            product_title = product.xpath('.//h2[@data-testid="product-title"]/text()').get(default='').strip()
            price_original = product.xpath('.//p[@data-testid="price-original"]/text()').get(default='').strip()
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
                'Preço Original': price_original,
                'Preço com Desconto': price_value,
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