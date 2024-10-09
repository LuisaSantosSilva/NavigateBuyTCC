import scrapy

class ObtSpider(scrapy.Spider):
    name = 'blz'
    start_urls = [
        'https://www.boticario.com.br/cabelos/shampoo/',
        'https://www.boticario.com.br/busca/?q=Condicionador',
        'https://www.boticario.com.br/busca/?q=perfume',
        'https://www.boticario.com.br/busca/?q=Sombra',
        'https://www.boticario.com.br/busca/?q=corretivo',
        'https://www.boticario.com.br/maquiagem/boca/batom/',
        'https://www.boticario.com.br/busca/?q=gloss',
        'https://www.boticario.com.br/maquiagem/rosto/base/',
        'https://www.boticario.com.br/busca/?q=Delineador',
        'https://www.boticario.com.br/busca/?q=%20Bruma%20Fixadora',
        'https://www.boticario.com.br/busca/?q=Esfoliante',
        'https://www.boticario.com.br/busca/?q=%20P%C3%B3%20compacto',
        'https://www.boticario.com.br/busca/?q=Hidratante%20facial',
        'https://www.boticario.com.br/busca/?q=Protetor%20solar%20facial%20',
        'https://www.boticario.com.br/busca/?q=Blush',
        'https://www.boticario.com.br/busca/?q=primer',
                  ]

    def parse(self, response):
        seen_products = set() 
        for i in response.xpath('//div[contains(@class, "showcase-item")]'):
            product_link = i.xpath('.//a[contains(@class, "showcase-item-image")]/@href').get(default='').strip()
            product_link = response.urljoin(product_link)  

            if product_link in seen_products:
                continue  
            seen_products.add(product_link)

            product_image = i.xpath('.//img[contains(@class, "showcase-image")]/@data-src').get()
            if not product_image:
                product_image = i.xpath('.//img[contains(@class, "showcase-image")]/@src').get()
            if not product_image:
                product_image = i.xpath('.//img[contains(@class, "showcase-image")]/@data-srcset').get()
            if not product_image:
                product_image = i.xpath('.//source/@srcset').get()
            if not product_image:
                product_image = i.xpath('.//source/@data-srcset').get()
            if not product_image:
                product_image = i.xpath('.//img/@src').get()

            if product_image and product_image.startswith('data:image'):
                product_image = 'Sem imagem'

            if not product_image:
                product_image = i.xpath('.//img[contains(@class, "showcase-image")]/@data-src').get(default='')

            product_title = i.xpath('.//a[@class="showcase-item-title"]/text()').get(default='').strip()
            price_value = i.xpath('.//span[@class="price-value"]/text()').get(default='').strip()

            if not product_title and not price_value:
                continue  

            yield {
                'loja': 'Oboticario',
                'preço': price_value,
                'título': product_title,
                'link': product_link,
                'imagem': product_image if product_image else 'sem img'
            }

        next_page = response.xpath('//a[contains(@class, "pagination-next")]/@href').get()
        if next_page:
            next_page = response.urljoin(next_page)  
            yield scrapy.Request(url=next_page, callback=self.parse)  
