import scrapy

class BesniSpider(scrapy.Spider):
    name = "acessorio"
    start_urls = [
        # Acessorio
        'https://www.besni.com.br/s?q=anel',
        'https://www.besni.com.br/s?q=Bon%C3%A9',
        'https://www.besni.com.br/s?q=bolsa',
        'https://www.besni.com.br/s?q=mochila',
        'https://www.besni.com.br/s?q=relogio',
        'https://www.besni.com.br/s?q=carteira',
        'https://www.besni.com.br/s?q=colar',
        'https://www.besni.com.br/s?q=cinto',
    ]

    def parse(self, response):
        if response.status == 200:
            self.logger.info("Acessando a página de produtos.")
            products = response.xpath('//article[contains(@class, "product-card aud-flex aud-flex-col aud-h-full aud-relative aud-duration-300 aud-border-transparent aud-group hoverWishlist")]')
            self.logger.info(f'Produtos encontrados: {len(products)}')

            for product in products:
                product_link = product.xpath('.//a[contains(@tabindex, "-1")]/@href').get()
                product_image = product.xpath('.//img[@class="product-card__img mobile-only:aud-h-[var(--mobile-image-height)] lg:aud-h-[var(--desk-image-height)] product-card__img--first lg:aud-transition-all lg:aud-duration-300 aud-object-contain aud-w-full"]/@src').get()
                product_title = product.xpath('.//h3[contains(@class, "product-card__title aud-text-sm")]/text()').get()
                price_original = product.xpath('.//span[contains(@class, "product-card__priceper aud-block")]/text()').get()

                price_value = price_original.replace('R$', '').strip() if price_original else None

                if not product_image:
                    yield response.follow(product_link, callback=self.parse_product_page, meta={'title': product_title, 'price': price_value})
                    continue

                if product_link and product_title and price_value and product_image:
                    yield {
                        'loja': 'Besni',
                        'preço': price_value.strip(),
                        'título': product_title.strip(),
                        'link': response.urljoin(product_link),
                        'imagem': product_image.strip(),
                    }

            next_page = response.xpath('//a[@data-testid="arrow-right"]/@href').get()
            if next_page:
                self.logger.info(f'Seguindo para a próxima página: {next_page}')
                yield response.follow(next_page, callback=self.parse)
            else:
                self.logger.info("Não há mais páginas para seguir.")
        else:
            self.logger.error(f'Falha ao acessar a página, status: {response.status}')

    def parse_product_page(self, response):
        product_image = response.xpath('//img[contains(@class, "gallery-carousel__image aud-w-full aud-h-full aud-object-contain aud-max-h-[480px]")]/@src').get()
        product_title = response.meta.get('title')
        product_price = response.meta.get('price')

        if product_title and product_price and product_image:
            yield {
                'loja': 'Besni',
                'preço': product_price.strip(),
                'título': product_title.strip(),
                'link': response.url,
                'imagem': product_image.strip(),
            }