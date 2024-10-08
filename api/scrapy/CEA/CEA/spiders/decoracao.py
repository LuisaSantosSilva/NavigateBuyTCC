import scrapy

class MagaluSpider(scrapy.Spider):
    name = 'decor'
    start_urls = [
        'https://www.cea.com.br/search/tapete',
        'https://www.cea.com.br/search/Cobertor',
        'https://www.cea.com.br/search/Toalha',
        'https://www.cea.com.br/search/Almofada',
    ]

    def parse(self, response):
        for i in response.xpath('//div[@class="vtex-search-result-3-x-galleryItem vtex-search-result-3-x-galleryItem--normal vtex-search-result-3-x-galleryItem--THREE_COLUMNS pa4"]'):
            product_link = response.urljoin(i.xpath('.//a[@class="vtex-product-summary-2-x-clearLink h-100 flex flex-column"]/@href').get(default='').strip())
            product_image = i.xpath('.//img[@class="w-100 h-100 dn absolute top-0 left-0 z-999 vtex-product-summary-2-x-image vtex-product-summary-2-x-image--hover vtex-product-summary-2-x-imageNormal vtex-product-summary-2-x-hoverImage"]/@src').get(default='').strip()
            product_title = i.xpath('.//span[@class="vtex-product-summary-2-x-productBrand vtex-product-summary-2-x-brandName t-body"]/text()').get(default='').strip()
            price_value = i.xpath('.//p[@class="cea-cea-store-theme-0-x-spotPriceShelf__price cea-cea-store-theme-0-x-spotPriceShelf__price--spotPriceBlack"]/text()').get(default='Com preço exclusivo').replace('R$', '').strip()
            price_exclusive = i.xpath('.//p[@class="cea-cea-store-theme-0-x-spotPriceShelf__price cea-cea-store-theme-0-x-spotPriceShelf__price--spotPriceGreen"]/text()').get(default='Sem preço exclusivo').replace('R$', '').strip()
            product_image_exclusivo = i.xpath('.//img[@class="vtex-product-summary-2-x-imageNormal vtex-product-summary-2-x-image"]/@src').get(default='Não tem imagem de produto exclusivo').strip()

            yield {
                'Loja': 'C&A',
                'Preço': price_value,
                'Preço Exclusivo': price_exclusive,
                'Título': product_title,
                'Link do Produto': product_link,
                'Imagem do Produto Exclusivo': product_image_exclusivo,
                'Imagem do produto': product_image
            }

        next_page = response.xpath('//a[@class="vtex-pagination-2-x-next"]/@href').get()
        if next_page:
            next_page = response.urljoin(next_page) 
            yield scrapy.Request(url=next_page, callback=self.parse)  
