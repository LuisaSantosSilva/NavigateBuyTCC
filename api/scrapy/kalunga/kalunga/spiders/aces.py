import scrapy

class KalungaSpider(scrapy.Spider):
    name = 'aces'
    start_urls = [
        'https://www.kalunga.com.br/busca/1?q=bolsa',
        'https://www.kalunga.com.br/busca/1?q=carregador',
        'https://www.kalunga.com.br/busca/1?q=fones-de-ouvido',
        'https://www.kalunga.com.br/busca/1?q=mochila',
        'https://www.kalunga.com.br/busca/1?q=mouse',
        'https://www.kalunga.com.br/busca/1?q=pulseira',
        'https://www.kalunga.com.br/busca/1?q=relogio',
        'https://www.kalunga.com.br/busca/1?q=teclado',
    ]

    def parse(self, response):
        for i in response.xpath('//div[@class="blocoproduto   col-6 col-md-4 col-xl-3"]'):
            product_title = i.xpath('.//h2[@class="blocoproduto__title mb-0 mt-2 pb-2 pb-lg-3"]/text()').get(default='').strip()

            product_link = response.urljoin(i.xpath('.//a[@class="blocoproduto__link h-100"]/@href').get(default='').strip())
            
            product_image = i.xpath('.//img[@class="blocoproduto__image"]/@src').get()
            if not product_image:
                product_image = i.xpath('.//img[@class="blocoproduto__image"]/@data-src').get()
            if not product_image:
                product_image = i.xpath('.//source/@srcset').get()
            if not product_image:
                product_image = i.xpath('.//source/@data-srcset').get()

            product_image = product_image.strip() if product_image else 'Imagem não disponível'
            price_value = i.xpath('.//span[@class="blocoproduto__text blocoproduto__text--bold blocoproduto__price"]/text()').get(default='').strip()
            stars = i.xpath('.//span[@class="reviews__star_text ps-2"]/text()').get(default='').strip()

            yield {
                'loja': 'Kalunga',
                'preço': price_value,
                'título': product_title,
                'link': product_link,
                'estrelas': stars,
                'imagem': product_image
            }

        next_page = response.xpath('//a[@rel="next"]/@href').get()
        if next_page:
            self.logger.info(f'Seguindo para a próxima página: {next_page}')
            yield response.follow(next_page, callback=self.parse)
