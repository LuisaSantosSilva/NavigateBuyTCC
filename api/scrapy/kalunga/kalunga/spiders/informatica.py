import scrapy

class KalungaSpider(scrapy.Spider):
    name = 'info'
    start_urls = [
        'https://www.kalunga.com.br/busca/1?q=celular',
        'https://www.kalunga.com.br/busca/1?q=computador',
        'https://www.kalunga.com.br/depto/midias-drives/hd-externo-portatil/23/1137?menuID=48&tipo=D',
        'https://www.kalunga.com.br/busca/1?q=headset',
        'https://www.kalunga.com.br/busca/1?q=impressora',
        'https://www.kalunga.com.br/busca/1?q=monitor',
        'https://www.kalunga.com.br/busca/1?q=mouse',
        'https://www.kalunga.com.br/busca/1?q=notebook',
        'https://www.kalunga.com.br/busca/1?q=roteador',
        'https://www.kalunga.com.br/busca/1?q=ssd',
        'https://www.kalunga.com.br/busca/1?q=switch',
        'https://www.kalunga.com.br/busca/1?q=tablet',
        'https://www.kalunga.com.br/busca/1?q=teclado-mecanico'
    ]

    def parse(self, response):
        for i in response.xpath('//div[@class="blocoproduto   col-6 col-md-4 col-xl-3"]'):
            product_title = i.xpath('.//h2[@class="blocoproduto__title mb-0 mt-2 pb-2 pb-lg-3"]/text()').get(default='').strip()

            if "suporte" not in product_title.lower():
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
                stars = stars.replace("(", "").replace(")", "")

                if all([product_image, product_title, product_link, stars]):
                    yield {
                        'loja': 'Kalunga',
                        'preço': price_value,
                        'título': product_title,
                        'link': product_link,
                        'estrelas': stars,
                        'avaliações': 'sem',
                        'imagem': product_image
                    }

        next_page = response.xpath('//a[@rel="next"]/@href').get()
        if next_page:
            self.logger.info(f'Seguindo para a próxima página: {next_page}')
            yield response.follow(next_page, callback=self.parse)