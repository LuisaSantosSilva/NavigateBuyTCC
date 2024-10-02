import scrapy

class MlSpider(scrapy.Spider):
    name = 'extr'
    start_urls = ['https://www.extra.com.br/morango/b']

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[@class="css-1enexmx"]'):
            price = i.xpath('.//p[@data-testid="price-current"]/text()').get(default='').strip()
            image = i.xpath('.//img[@class="product-card__image"]/@src').get(default='').strip()
            title = i.xpath('.//h3[@class="product-card__title"]/text()').get(default='').strip()
            link = i.xpath('.//a/@href').get(default='').strip()
            stars = i.xpath('.//span[@class="product-card__reviews-count-text"]').get(default='').strip()
            # avaliations = i.xpath('.//span[@class="src__Count"]/text()').get(default='').strip()
                
            yield {
                    'preço': price,
                    'título': title,
                    'link': link,
                    'estrelas': stars,
                    # 'avaliações': avaliations,
                    'imagem': image
                }