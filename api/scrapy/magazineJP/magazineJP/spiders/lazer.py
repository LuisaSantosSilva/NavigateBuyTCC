import scrapy
import re

class MagaluSpider(scrapy.Spider):
    name = 'lazer'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/baralho/?from=submit',
        'https://www.magazineluiza.com.br/busca/skate/?from=submit',
        'https://www.magazineluiza.com.br/busca/patinete+eletrico/?from=submit',
        'https://www.magazineluiza.com.br/busca/patins/?from=submit',
        'https://www.magazineluiza.com.br/busca/bicicleta/?from=submit',
        'https://www.magazineluiza.com.br/busca/domino/?from=submit',
        'https://www.magazineluiza.com.br/busca/tenda+de+acampamento/?from=submit',
        'https://www.magazineluiza.com.br/busca/uno/?from=submit',
        'https://www.magazineluiza.com.br/busca/binoculos/?from=submit',
        'https://www.magazineluiza.com.br/busca/isopor+termico/?from=submit',
        'https://www.magazineluiza.com.br/busca/rede+de+descanso/?from=submit',
        'https://www.magazineluiza.com.br/busca/poltrona/?from=submit',
        'https://www.magazineluiza.com.br/busca/cadeira+madeira/?from=submit',
        'https://www.magazineluiza.com.br/busca/guitarra/?from=submit',
        'https://www.magazineluiza.com.br/busca/violao/?from=submit',
        'https://www.magazineluiza.com.br/busca/bateria+acustica/?from=submit',
        'https://www.magazineluiza.com.br/busca/saxofone/?from=submit',
        'https://www.magazineluiza.com.br/busca/flauta+doce/?from=submit',
        'https://www.magazineluiza.com.br/busca/teclado+musical/?from=submit',
        'https://www.magazineluiza.com.br/busca/equipamento+de+mergulho/?from=submit',
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