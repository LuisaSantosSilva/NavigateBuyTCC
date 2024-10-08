import scrapy

class KalungaSpider(scrapy.Spider):
    name = 'eletrodo'
    start_urls = [
        'https://www.kalunga.com.br/depto/coffee-break/maquinas-de-cafe/19/38',
        'https://www.kalunga.com.br/depto/eletronicos/tvs-smart/5/1907'
    ]

    def parse(self, response):
        for i in response.xpath('//div[@class="blocoproduto   col-6 col-md-4 col-xl-3"]'):
            product_link = response.urljoin(i.xpath('.//a[@class="blocoproduto__link h-100"]/@href').get(default='').strip())
            product_image = i.xpath('.//img[@class="blocoproduto__image"]/@src').get()

            if not product_image:
                product_image = i.xpath('.//img[@class="blocoproduto__image"]/@data-src').get()
            if not product_image:
                product_image = i.xpath('.//source/@srcset').get()
            if not product_image:
                product_image = i.xpath('.//source/@data-srcset').get()

            product_image = product_image.strip() if product_image else 'Imagem não disponível'
            product_title = i.xpath('.//h2[@class="blocoproduto__title mb-0 mt-2 pb-2 pb-lg-3"]/text()').get(default='').strip()
            price_value = i.xpath('.//span[@class="blocoproduto__text blocoproduto__text--bold blocoproduto__price"]/text()').get(default='').strip()
            stars = i.xpath('.//span[@class="reviews__star_text ps-2"]/text()').get(default='').strip()

            yield {
                'Loja': 'Kalunga',
                'Preço': price_value,
                'Título': product_title,
                'Link do Produto': product_link,
                'Estrelas': stars,
                'Imagem do Produto': product_image
            }

        next_page = response.xpath('//a[@rel="next"]/@href').get()
        if next_page:
            self.logger.info(f'Seguindo para a próxima página: {next_page}')
            yield response.follow(next_page, callback=self.parse)