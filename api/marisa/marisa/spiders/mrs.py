import scrapy

class MrsSpider(scrapy.Spider):
    name = "mrs"
    start_urls = ["https://pesquisa.marisa.com.br/busca?q=bolsa"]

    def parse(self, response, **kwargs):
        for i in response.xpath('//li[@class="nm-product-item kfy-loaded"]'):
            price = i.xpath('.//span[@class="price-number"]/text()').get(default='').strip()
            image = i.xpath('.//img[@class="nm-product-img"]/@src').get(default='').strip()
            title = i.xpath('.//h4[@class="nm-product-name"]/text()').get(default='').strip()
            link = i.xpath('.//a[@itemprop="image"]/@href').get(default='').strip()
            # stars = len(i.xpath('.//div[@class="Rating-styled__RatingWrapper-sc-24daa866-0 iDwSVT"]'))
            avaliations = i.xpath('.//div[@class="review-count"]/text()').get(default='').strip()

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://pesquisa.marisa.com.br{link}'

            yield {
                    'preço': price,
                    'título': title,
                    'link': link,
                    # 'estrelas': stars,
                    'avaliações': avaliations,
                    'imagem': image
            }