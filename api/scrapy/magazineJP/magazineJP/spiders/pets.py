import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'pets'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/racao/?from=submit',
        'https://www.magazineluiza.com.br/busca/caixa+de+areia/?from=submit',
        'https://www.magazineluiza.com.br/busca/arranhador/?from=submit',
        'https://www.magazineluiza.com.br/busca/comedouro/?from=submit',
        'https://www.magazineluiza.com.br/busca/bebedouro+de+pets/?from=submit',
        'https://www.magazineluiza.com.br/busca/caminha+para+caes/?from=submit',
        'https://www.magazineluiza.com.br/busca/caminha+para+gatos/?from=submit',
        'https://www.magazineluiza.com.br/busca/tapete+higienico/?from=submit',
        'https://www.magazineluiza.com.br/busca/roupinha+para+pets/?from=submit',
        'https://www.magazineluiza.com.br/busca/coleira/?from=submit',
        'https://www.magazineluiza.com.br/busca/antipulgas/?from=submit',
        'https://www.magazineluiza.com.br/busca/casinha+para+cachorro/?from=submit',
        'https://www.magazineluiza.com.br/busca/escova+para+pelos/?from=submit',
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