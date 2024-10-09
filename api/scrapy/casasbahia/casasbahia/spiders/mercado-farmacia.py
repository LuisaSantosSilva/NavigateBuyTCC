import scrapy

class CasasBSpider(scrapy.Spider):
    name = 'mercfarm'
    start_urls = [
        'https://www.casasbahia.com.br/Sabonete/b',
        'https://www.casasbahia.com.br/pasta-de-dente/b',
        'https://casasbahia.com.br/escova-de-dente/b',
        'https://www.casasbahia.com.br/desinfetante/b',
        'https://www.casasbahia.com.br/esmalte/b',
        'https://www.casasbahia.com.br/algodao/b',
        'https://www.casasbahia.com.br/lamina-de-barbear/b',
        'https://www.casasbahia.com.br/sabao-em-po/b',
        'https://www.casasbahia.com.br/amaciante/b',
        'https://www.casasbahia.com.br/alcool-em-gel/b',
        'https://www.casasbahia.com.br/repelente/b',
        'https://www.casasbahia.com.br/arroz/b',
        'https://www.casasbahia.com.br/chocolate/b',
    ]

    def parse(self, response):
        for i in response.xpath('//div[@class="css-1enexmx"]'):
            product_link = i.xpath('.//a[@class="dsvia-link-overlay css-1ogn60p"]/@href').get(default='').strip()
            product_image = i.xpath('.//img[@class="product-card__image"]/@src').get(default='').strip()
            product_title = i.xpath('.//span[@aria-hidden="true"]/text()').get(default='').strip()

            stars_text = i.xpath('.//span[contains(@class, "css-1vmkvrm")]/text()').get(default='').strip()
            if 'média' in stars_text:
                stars = stars_text.split('média')[-1].strip()
                stars = stars.split('.')[0].strip()  
            else:
                stars = ''

            avaliation = ' '.join(i.xpath('.//span[@class="product-card__reviews-count-text"]//text()').getall()).strip()

            yield response.follow(product_link, callback=self.parse_product, meta={
                'image': product_image,
                'title': product_title,
                'stars': stars,
                'avaliation': avaliation
            })

        next_page = response.xpath('//a[@rel="next"]/@href').get()
        if next_page:
            self.logger.info(f'Seguindo para a próxima página: {next_page}')
            yield response.follow(next_page, callback=self.parse)

    def parse_product(self, response):
        price_text = response.xpath('//p[@class="dsvia-text css-alcf85" and @data-testid="product-price-value"]/span[contains(text(), "R$")]/text()').get(default='').strip()

        if not price_text:
            self.logger.warning(f'Preço não encontrado para: {response.meta["title"]}')
            return 

        price_value = self.clean_price(price_text)

        yield {
            'loja': 'Casas Bahia',
            'preço': price_value,
            'título': response.meta['title'],
            'link': response.url,
            'estrelas': response.meta['stars'],
            'avaliações': response.meta['avaliation'],
            'imagem': response.meta['image']
        }

    def clean_price(self, price_str):
        return price_str.replace('R$', '').strip()