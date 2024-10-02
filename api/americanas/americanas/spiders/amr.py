import scrapy

class MlSpider(scrapy.Spider):
    name = 'amr'
    start_urls = ['https://www.americanas.com.br/busca/computador']

    def parse(self, response, **kwargs):
        for i in response.xpath('//div[contains(@class, "col__StyledCol-sc-1snw5v3-0 ehOuCD theme-grid-col src__ColGridItem-sc-122lblh-1 cJnBan")]'):
            promo_price = i.xpath('.//span[contains(@class, "styles__PromotionalPrice")]/text()').get(default='').strip()
            image = i.xpath('.//img[contains(@class, "src__LazyImage")]/@src').get(default='').strip()
            title = i.xpath('.//h3[contains(@class, "product-name")]/text()').get(default='').strip()
            link = i.xpath('.//a[contains(@class, "inStockCard__Link")]/@href').get(default='').strip()
            #stars = len(i.xpath('.//div[contains(@class, "src__FilledStars")]'))
            avaliations = i.xpath('.//span[contains(@class, "src__Count")]/text()').get(default='').strip()

            if link and not link.startswith(('http://', 'https://')):
                link = f'https://www.americanas.com.br/{link}'

            yield {
                'preço promocional': promo_price,
                'título': title,
                'link': link,
                #'estrelas': stars,
                'avaliações': avaliations,
                'imagem': image
            }