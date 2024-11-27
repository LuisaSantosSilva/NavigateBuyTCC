import scrapy
import re

class MagaluSpider(scrapy.Spider):
    name = 'bbs'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/fralda/?from=submit',
        'https://www.magazineluiza.com.br/busca/chupeta/?from=submit',
        'https://www.magazineluiza.com.br/busca/mamadeira/?from=submit',
        'https://magazineluiza.com.br/busca/carrinho+de+bebe/?from=submit',
        'https://www.magazineluiza.com.br/busca/cadeirinha+para+carro/?from=submit',
        'https://www.magazineluiza.com.br/busca/babador/?from=submit',
        'https://www.magazineluiza.com.br/busca/termometro+infantil/?from=submit',
        'https://www.magazineluiza.com.br/busca/banheira+de+bebe/?from=submit',
        'https://www.magazineluiza.com.br/busca/mobile+para+berco/?from=submit',
        'https://www.magazineluiza.com.br/busca/lencos+umedecidos/?from=submit',
        'https://www.magazineluiza.com.br/busca/mordedor/?from=submit',
        'https://www.magazineluiza.com.br/busca/brinquedo+educativo/?from=submit',
        'https://www.magazineluiza.com.br/busca/tapete+de+atividades+infantil/?from=icon',
        'https://www.magazineluiza.com.br/busca/roupinha+de+bebe/?from=submit',
        'https://www.magazineluiza.com.br/busca/protetor+de+berco/?from=submit',
    ]

    def parse(self, response):
        for i in response.xpath('//li[@class="sc-iNIeMn bDaikj"]'):
            product_link = response.urljoin(i.xpath('.//a[@data-testid="product-card-container"]/@href').get(default='').strip())
            product_image = i.xpath('.//img[@data-testid="image"]/@src').get(default='').strip()
            product_title = i.xpath('.//h2[@data-testid="product-title"]/text()').get(default='').strip()
            price_original = i.xpath('.//p[@data-testid="price-original"]/text()').get(default='').strip()
            price_vl = i.xpath('.//p[@data-testid="price-value"]/text()').get(default='').strip()

            price_value = price_vl.replace('R$', '').strip()  

            stars_text = i.xpath('.//span[contains(@class, "sc-fUkmAC geJyjP")]/text()').get(default='0.0').strip()
            evaluations_text = i.xpath('.//span[contains(@class, "sc-fUkmAC geJyjP")]/text()').get(default='sem').strip()

            stars = stars_text.split()[0] if stars_text else ''

            if evaluations_text.lower() == 'sem' or not evaluations_text.strip():
                evaluations = 'sem'
            else:
                evaluations_match = re.search(r'\((\d+)\)', evaluations_text)
                evaluations = evaluations_match.group(1) if evaluations_match else 'sem'

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