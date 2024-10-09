import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'blz'
    start_urls = [
        'https://www.magazineluiza.com.br/busca/shampoo/?from=submit',
        'https://www.magazineluiza.com.br/busca/condicionador/?from=submit',
        'https://www.magazineluiza.com.br/busca/mascara+de+hidratacao/?from=submit',
        'https://www.magazineluiza.com.br/busca/perfume/?from=submit',
        'https://www.magazineluiza.com.br/busca/sombra/?from=submit',
        'https://www.magazineluiza.com.br/busca/corretivo+beleza/?from=submit',
        'https://www.magazineluiza.com.br/busca/batom/?from=submit',
        'https://www.magazineluiza.com.br/busca/gloss/?from=submit',
        'https://www.magazineluiza.com.br/busca/base+produto+de+beleza/?from=submit',
        'https://www.magazineluiza.com.br/busca/delineador/?from=submit',
        'https://www.magazineluiza.com.br/busca/bruma+fixadora/?from=submit',
        'https://www.magazineluiza.com.br/busca/esfoliante/?from=submit',
        'https://www.magazineluiza.com.br/busca/po+compacto/?from=submit',
        'https://www.magazineluiza.com.br/busca/hidratante+facial/?from=submit',
        'https://www.magazineluiza.com.br/busca/protetor+solar+facial/?from=submit',
        'https://magazineluiza.com.br/busca/blush/?from=submit',
        'https://www.magazineluiza.com.br/busca/primer+facial/?from=submit',
    ]

    def parse(self, response):
        for i in response.xpath('//li[@class="sc-fTyFcS iTkWie"]'):
            product_link = response.urljoin(i.xpath('.//a[@data-testid="product-card-container"]/@href').get(default='').strip())
            product_image = i.xpath('.//img[@data-testid="image"]/@src').get(default='').strip()
            product_title = i.xpath('.//h2[@data-testid="product-title"]/text()').get(default='').strip()
            price_original = i.xpath('.//p[@data-testid="price-original"]/text()').get(default='').strip()
            price_vl = i.xpath('.//p[@data-testid="price-value"]/text()').get(default='').strip()

            price_value = price_vl.replace('R$', '').strip()  

            stars_text = i.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='0.0').strip()
            evaluations_text = i.xpath('.//span[contains(@class, "sc-cezyBN")]/text()').get(default='sem').strip()

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
