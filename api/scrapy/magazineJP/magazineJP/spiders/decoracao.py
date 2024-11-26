import scrapy
import re

class MagaluSpider(scrapy.Spider):
    name = 'decor'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/moldura/?from=submit',
        'https://www.magazineluiza.com.br/busca/tapete/?from=submit',
        'https://www.magazineluiza.com.br/busca/tinta/?from=submit',
        'https://www.magazineluiza.com.br/busca/quadro/?from=submit',
        'https://www.magazineluiza.com.br/busca/pintura/?from=submit',
        'https://www.magazineluiza.com.br/busca/fronha/?from=submit',
        'https://www.magazineluiza.com.br/busca/cobertor/?from=submit',
        'https://www.magazineluiza.com.br/busca/toalha/?from=submit',
        'https://www.magazineluiza.com.br/busca/vaso+decorativo/?from=submit',
        'https://www.magazineluiza.com.br/busca/almofada/?from=submit',
        'https://www.magazineluiza.com.br/busca/cortina/?from=submit',
        'https://www.magazineluiza.com.br/busca/abajur/?from=submit',
        'https://www.magazineluiza.com.br/busca/espelho+decorativo/?from=submit',
        'https://www.magazineluiza.com.br/busca/papel+de+parede/?from=submit',
        'https://www.magazineluiza.com.br/busca/porta+retrato/?from=submit',
    ]

    def parse(self, response):
        products = response.xpath('//li[contains(@class, "sc-iNIeMn bDaikj")]')
        for product in products:
            product_link = response.urljoin(product.xpath('.//a[@data-testid="product-card-container"]/@href').get(default='').strip())
            product_image = product.xpath('.//img[@data-testid="image"]/@src').get(default='').strip()
            product_title = product.xpath('.//h2[@data-testid="product-title"]/text()').get(default='').strip()
            price_value = product.xpath('.//p[@data-testid="price-value"]/text()').get(default='').strip().replace('R$', '').strip()
            stars_text = product.xpath('.//span[contains(@class, "sc-fUkmAC geJyjP")]/text()').get(default='0.0').strip()
            evaluations_text = product.xpath('.//span[contains(@class, "sc-fUkmAC geJyjP")]/text()').get(default='sem').strip()

            stars = stars_text.split()[0] if stars_text else ''

            if evaluations_text.lower() == 'sem' or not evaluations_text.strip():
                evaluations = 'sem'
            else:
                evaluations_match = re.search(r'\((\d+)\)', evaluations_text)
                evaluations = evaluations_match.group(1) if evaluations_match else 'sem'

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